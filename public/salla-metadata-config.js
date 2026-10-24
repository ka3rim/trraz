/**
 * TERAZ ⇄ Salla metadata bridge.
 *
 * Maps a live Salla product (id / SKU / URL slug / name / custom field) to its TERAZ record in
 * teraz-catalog-map.js, keeps a registry of the store's TERAZ products (live price, image, URL,
 * availability) and turns TERAZ sizes (40–45 / one-size) into Salla option payloads.
 *
 * Resolution order for `TerazMeta.resolve(ref)` — first hit wins:
 *   1. ref.teraz                       explicit key, e.g. <article data-teraz-id="caps-0">
 *   2. theme setting "teraz_product_map"   { "tuwaiq": 1234567890, ... }  (TERAZ id -> Salla product id)
 *   3. Salla custom field / metadata named `teraz_id`
 *   4. SKU equal to the TERAZ id (case-insensitive, optional `TERAZ-` prefix): "tuwaiq", "TERAZ-caps-0"
 *   5. URL slug segment equal to the TERAZ id, or an Arabic slug equal to the TERAZ product name
 *   6. Product name equal to / containing the TERAZ name ("حذاء ثرى طويق", "كاب طراز - أسود")
 * A product that matches nothing is simply rendered as a plain Salla product (no TERAZ extras).
 *
 * Runtime config is injected by master.twig into window.TERAZ_SALLA_CONFIG.
 * Exposes: window.TerazMeta
 */
(function (root) {
  'use strict';

  const M = root.TerazMap;
  if (!M) throw new Error('teraz-catalog-map.js must be loaded before salla-metadata-config.js');

  /* ----------------------------------------------------------------- config */
  const injected = root.TERAZ_SALLA_CONFIG || {};
  const positive = (v, fallback) => { const n = Number(v); return Number.isFinite(n) && n >= 0 ? n : fallback; };

  /** Accepts an object, a JSON string, or "tuwaiq=123" lines (what a textarea theme setting yields). */
  function parseProductMap(value) {
    if (!value) return {};
    if (typeof value === 'object') return value;
    const text = String(value).trim();
    if (!text) return {};
    try { const parsed = JSON.parse(text); return parsed && typeof parsed === 'object' ? parsed : {}; } catch (e) { /* fall through to lines */ }
    return text.split(/\r?\n/).reduce((acc, line) => {
      const m = line.match(/^\s*([\w-]+)\s*[=:]\s*(\d+)\s*$/);
      if (m) acc[m[1].toLowerCase()] = m[2];
      return acc;
    }, {});
  }

  /** Theme "items" settings may arrive as [1,2], ["1","2"] or [{id:1},{id:2}]. */
  const parseIds = (value) => (Array.isArray(value) ? value : (value == null || value === '' ? [] : [value]))
    .map((x) => (x && typeof x === 'object' ? x.id : x))
    .filter((x) => x !== undefined && x !== null && x !== '')
    .map(String);

  const config = Object.freeze({
    threshold: positive(injected.threshold, M.FREE_SHIPPING_THRESHOLD),
    shippingFee: positive(injected.shippingFee, M.SHIPPING_FEE),
    showShippingEstimate: injected.showShippingEstimate !== false,
    categoryIds: parseIds(injected.categoryIds),
    productMap: parseProductMap(injected.productMap),
    homeUrl: injected.homeUrl || '/',
    preloaded: Array.isArray(injected.products) ? injected.products : []
  });

  const BY_SALLA_ID = Object.keys(config.productMap).reduce((acc, terazId) => {
    if (M.get(terazId.toLowerCase())) acc[String(config.productMap[terazId])] = terazId.toLowerCase();
    return acc;
  }, {});

  /* ---------------------------------------------------------------- helpers */
  const toLatinDigits = (s) => String(s == null ? '' : s)
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776));

  function toNumber(value) {
    if (value == null) return NaN;
    if (typeof value === 'number') return value;
    if (typeof value === 'object') return toNumber(value.amount != null ? value.amount : value.value != null ? value.value : value.price);
    return parseFloat(toLatinDigits(value).replace(/,/g, '').replace(/[^\d.]/g, ''));
  }

  /* ------------------------------------------------------------- resolution */
  const resolveCache = new Map();

  function fromSku(sku) {
    const s = String(sku || '').trim().toLowerCase().replace(/^teraz[-_\s]/, '');
    return s ? M.get(s) : null;
  }

  function fromUrl(url) {
    if (!url) return null;
    let path = String(url);
    try { path = new URL(path, root.location ? root.location.href : 'https://x.invalid/').pathname; } catch (e) { /* keep raw */ }
    const segments = path.split('/').filter(Boolean).map((seg) => { try { return decodeURIComponent(seg); } catch (e) { return seg; } });
    for (const seg of segments) {
      const key = seg.toLowerCase().replace(/^teraz[-_]/, '');
      if (M.get(key)) return M.get(key);
      const byName = M.matchByName(seg.replace(/-/g, ' '));
      if (byName) return M.get(byName);
    }
    return null;
  }

  /**
   * @param {{teraz?:string,id?:(string|number),sku?:string,url?:string,slug?:string,name?:string,metadata?:object,custom_fields?:object}} ref
   * @returns {object|null} TERAZ record from TerazMap, or null.
   */
  function resolve(ref) {
    if (!ref) return null;
    const sallaId = ref.id != null ? String(ref.id) : '';
    if (sallaId && resolveCache.has(sallaId)) return resolveCache.get(sallaId);

    let found = null;
    const explicit = ref.teraz || ref.terazId;
    if (explicit && M.get(String(explicit).toLowerCase())) found = M.get(String(explicit).toLowerCase());
    if (!found && sallaId && BY_SALLA_ID[sallaId]) found = M.get(BY_SALLA_ID[sallaId]);
    if (!found) {
      const fields = ref.metadata || ref.custom_fields || ref.customFields || {};
      const custom = Array.isArray(fields)
        ? (fields.find((f) => f && (f.key === 'teraz_id' || f.name === 'teraz_id')) || {}).value
        : fields.teraz_id;
      if (custom && M.get(String(custom).toLowerCase())) found = M.get(String(custom).toLowerCase());
    }
    if (!found) found = fromSku(ref.sku);
    if (!found) found = fromUrl(ref.url || ref.slug);
    if (!found && ref.name) { const id = M.matchByName(ref.name); if (id) found = M.get(id); }

    if (sallaId) resolveCache.set(sallaId, found);
    return found;
  }

  /* --------------------------------------------------------------- registry */
  const registry = new Map();      // TERAZ id -> snapshot
  const bySallaId = new Map();     // Salla id -> snapshot

  /** Normalises any Salla product shape (SDK fetch, Twig json_encode, DOM dataset) into one snapshot. */
  function snapshot(raw) {
    if (!raw || raw.id == null) return null;
    const price = toNumber(raw.sale_price != null && raw.is_on_sale ? raw.sale_price : raw.price);
    const regular = toNumber(raw.regular_price != null ? raw.regular_price : raw.price);
    const image = (raw.image && (raw.image.url || raw.image)) || raw.image_url || raw.thumbnail
      || (Array.isArray(raw.images) && raw.images[0] && (raw.images[0].url || raw.images[0])) || '';
    const options = Array.isArray(raw.options) && raw.options.length ? normalizeOptions(raw.options) : null;
    const entry = {
      id: String(raw.id),
      sku: raw.sku || '',
      name: raw.name || '',
      url: raw.url || '',
      image: typeof image === 'string' ? image : '',
      price: Number.isFinite(price) ? price : NaN,
      regularPrice: Number.isFinite(regular) ? regular : NaN,
      available: raw.is_available != null ? !!raw.is_available : raw.status ? raw.status === 'sale' : true,
      hasOptions: raw.has_options != null ? !!raw.has_options : options ? options.length > 0 : null,
      options,
      teraz: resolve(raw)
    };
    return entry;
  }

  function register(raw) {
    const entry = snapshot(raw);
    if (!entry) return null;
    const known = bySallaId.get(entry.id);
    if (known) {
      Object.keys(entry).forEach((k) => {
        const v = entry[k];
        if (v !== '' && v !== null && !(typeof v === 'number' && Number.isNaN(v))) known[k] = v;
      });
      return known;
    }
    bySallaId.set(entry.id, entry);
    if (entry.teraz && !registry.has(entry.teraz.id)) registry.set(entry.teraz.id, entry);
    return entry;
  }

  /** Reads <… data-product-id data-sku data-name data-url data-price data-image data-available data-teraz-id> nodes. */
  function scan(scope) {
    (scope || document).querySelectorAll('[data-product-id][data-name]').forEach((el) => {
      const d = el.dataset;
      if (!d.productId) return;
      register({
        id: d.productId, sku: d.sku, name: d.name, url: d.url, price: d.price, regular_price: d.regularPrice || d.price,
        image: d.image, is_available: d.available !== 'false', teraz: d.terazId
      });
    });
  }

  const forTeraz = (terazId) => registry.get(terazId) || null;
  const forSalla = (sallaId) => bySallaId.get(String(sallaId)) || null;
  const list = () => Array.from(registry.values());

  /* ------------------------------------------------------------ SDK loading */
  let registryPromise = null;

  /**
   * Fills the registry from: server-embedded products, DOM data-attributes and — when the merchant
   * picked the TERAZ categories in the theme settings — salla.product.fetch() over those categories.
   */
  function loadRegistry() {
    if (registryPromise) return registryPromise;
    config.preloaded.forEach(register);
    scan(document);
    const sdk = root.salla && root.salla.product && typeof root.salla.product.fetch === 'function' ? root.salla.product : null;
    if (!sdk || !config.categoryIds.length) { registryPromise = Promise.resolve(list()); return registryPromise; }

    const pull = async (page) => {
      const res = await sdk.fetch({ source: 'categories', source_value: config.categoryIds, page });
      const items = (res && (res.data || res.products)) || [];
      items.forEach(register);
      const next = res && res.cursor && res.cursor.next;
      if (next && page < 6 && items.length) await pull(Number(next) || page + 1);
    };
    registryPromise = pull(1).catch(() => { /* a failed fetch must never break the page: DOM-registered items still work */ }).then(list);
    return registryPromise;
  }

  /* ----------------------------------------------------------------- options */
  /** Salla option groups -> [{id,name,required,values:[{id,name,price,outOfStock,isDefault}]}] */
  function normalizeOptions(rawOptions) {
    return (Array.isArray(rawOptions) ? rawOptions : []).map((o) => ({
      id: String(o.id),
      name: o.name || '',
      required: !!o.required,
      values: (o.details || o.values || o.items || []).map((v) => ({
        id: String(v.id),
        name: v.name || v.option_name || '',
        price: toNumber(v.price),
        outOfStock: !!(v.is_out_of_stock || v.out_of_stock || v.is_available === false || v.quantity === 0),
        isDefault: !!v.is_default
      }))
    }));
  }

  /** Loads (and caches) the option groups of a registered product via salla.product.getDetails. */
  async function ensureOptions(entry) {
    if (!entry) return [];
    if (entry.options) return entry.options;
    const sdk = root.salla && root.salla.product;
    if (!sdk || typeof sdk.getDetails !== 'function') return [];
    try {
      const res = await sdk.getDetails(entry.id, ['options']);
      const data = (res && res.data) || res || {};
      entry.options = normalizeOptions(data.options);
      entry.hasOptions = entry.options.length > 0;
    } catch (e) {
      entry.options = [];
    }
    return entry.options;
  }

  const SIZE_NAME = /مقاس|size/i;

  /** The option group that holds sizes: the only group, else one named مقاس/size, else the first required one. */
  function pickSizeOption(options) {
    if (!options || !options.length) return null;
    if (options.length === 1) return options[0];
    return options.find((o) => SIZE_NAME.test(o.name)) || options.find((o) => o.required) || options[0];
  }

  const digitsOf = (s) => toLatinDigits(s).replace(/\D/g, '');

  /** Footwear: match "40" against "40" / "مقاس 40" / "٤٠". One-size & care: default value, else first in-stock, else first. */
  function findValue(option, label, terazProduct) {
    if (!option) return null;
    const values = option.values;
    if (terazProduct && M.oneSize(terazProduct)) return values.find((v) => v.isDefault) || values.find((v) => !v.outOfStock) || values[0] || null;
    const wanted = digitsOf(label);
    return values.find((v) => wanted && digitsOf(v.name) === wanted) || values.find((v) => M.normalize(v.name) === M.normalize(label)) || null;
  }

  /**
   * Builds the `options` payload of salla.cart.addItem for a product + chosen size label.
   * Every required option other than the size group must have a default, otherwise the caller gets `error`.
   * @returns {{options:Object<string,string>, error:(string|null), option:(object|null), value:(object|null)}}
   */
  function buildOptionPayload(options, terazProduct, sizeLabel) {
    const payload = {};
    if (!options || !options.length) return { options: payload, error: null, option: null, value: null };
    const sizeOption = pickSizeOption(options);
    const value = findValue(sizeOption, sizeLabel, terazProduct);
    if (sizeOption && !value) return { options: payload, error: 'size_not_available', option: sizeOption, value: null };
    if (sizeOption && value) payload[sizeOption.id] = value.id;
    for (const o of options) {
      if (o === sizeOption || !o.required) continue;
      const fallback = o.values.find((v) => v.isDefault) || (o.values.length === 1 ? o.values[0] : null);
      if (!fallback) return { options: payload, error: 'option_required', option: o, value: null };
      payload[o.id] = fallback.id;
    }
    return { options: payload, error: null, option: sizeOption, value };
  }

  root.TerazMeta = Object.freeze({
    config, resolve, snapshot, register, scan, forTeraz, forSalla, list, loadRegistry,
    normalizeOptions, ensureOptions, pickSizeOption, findValue, buildOptionPayload, toNumber, toLatinDigits
  });
})(typeof window !== 'undefined' ? window : globalThis);
