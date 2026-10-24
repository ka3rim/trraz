/**
 * TERAZ (طراز) — Salla controller for theme-raed.
 *
 * Replaces the prototype's atelier.js + commerce.js. All commerce goes through the Salla Twilight SDK:
 *   cart      salla.cart.addItem / updateItem / deleteItem / latest / submit   + cart events
 *   product   salla.product.getPrice / getDetails / fetch / availabilitySubscribe
 * TERAZ-only content (copy, pairing, sort ranks) comes from teraz-catalog-map.js via salla-metadata-config.js.
 *
 * Modules (all inside this file):  Commerce · Toast · Cart (store + SDK bridge) · CartDialog · Home (hero peek,
 * sort bar, strips) · Product (gallery, sizes, notify, bundle calculator, alternatives) · global UI wiring.
 *
 * Load order: teraz-catalog-map.js -> salla-metadata-config.js -> teraz-salla-controller.js (all deferred).
 */
(function (root) {
  'use strict';

  const M = root.TerazMap;
  const Meta = root.TerazMeta;
  if (!M || !Meta) { if (root.console) root.console.error('TERAZ: teraz-catalog-map.js and salla-metadata-config.js must load first.'); return; }

  const doc = root.document;
  const CFG = Meta.config;
  const MAX_QTY = M.MAX_QTY;

  /* ======================================================================
   * Helpers
   * ==================================================================== */
  const $ = (selector, scope) => (scope || doc).querySelector(selector);
  const $$ = (selector, scope) => Array.from((scope || doc).querySelectorAll(selector));
  const esc = (value) => String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  const money = (n) => (Number.isFinite(n) ? numberFormat.format(n) : '—') + ' ر.س';
  const SIZE_LABEL = /مقاس|size/i;

  function toIdList(value) {
    if (value == null || value === '') return [];
    const list = Array.isArray(value) ? value : [value];
    return list.map((x) => (x && typeof x === 'object' ? x.id : x)).filter((x) => x != null && x !== '').map(String);
  }

  function parseJson(text, fallback) {
    try { return JSON.parse(text); } catch (e) { return fallback; }
  }

  function errorMessage(error, fallback) {
    const e = error || {};
    const nested = e.response && e.response.data && e.response.data.error;
    const msg = (nested && (nested.message || nested.code)) || (e.error && e.error.message) || e.message
      || (e.data && e.data.error && e.data.error.message);
    return typeof msg === 'string' && msg ? msg : fallback;
  }

  function setBusy(button, busy) {
    if (!button) return;
    if (busy) { button.setAttribute('aria-busy', 'true'); button.disabled = true; } else { button.removeAttribute('aria-busy'); button.disabled = false; }
  }

  const sallaOrNull = () => (root.salla && root.salla.cart ? root.salla : null);
  function needSalla() {
    const s = sallaOrNull();
    if (!s) throw new Error('خدمة المتجر غير جاهزة بعد. حدّث الصفحة وحاول مرة أخرى.');
    return s;
  }

  /** Resolves once the Twilight SDK is ready (or null if it never shows up, so the UI degrades instead of hanging). */
  function whenSallaReady() {
    return new Promise((resolve) => {
      let done = false;
      const finish = () => { if (!done) { done = true; resolve(sallaOrNull()); } };
      const started = Date.now();
      (function attach() {
        const s = root.salla;
        if (s && typeof s.onReady === 'function') {
          const maybe = s.onReady(finish);
          if (maybe && typeof maybe.then === 'function') maybe.then(finish, finish);
          root.setTimeout(finish, 6000);
        } else if (Date.now() - started > 6000) {
          finish();
        } else {
          root.setTimeout(attach, 50);
        }
      })();
    });
  }

  const isGuest = () => {
    try {
      const c = root.salla && root.salla.config;
      if (c && typeof c.isGuest === 'function') return !!c.isGuest();
      if (c && typeof c.get === 'function') return !c.get('user.id');
    } catch (e) { /* treat as guest */ }
    return true;
  };

  /* ======================================================================
   * Commerce (commerce.js): quantity rules + shipping maths on a numeric subtotal
   * ==================================================================== */
  const Commerce = {
    clampQty(value) {
      const n = Number(value);
      return Number.isInteger(n) && n >= 1 && n <= MAX_QTY ? n : null;
    },
    /** 29 SAR shipping below the threshold (479), free at >= threshold, none for an empty cart. */
    totals(subtotal) {
      const threshold = CFG.threshold;
      const free = subtotal === 0 || subtotal >= threshold;
      const shipping = free ? 0 : CFG.shippingFee;
      return {
        subtotal,
        remaining: Math.max(0, threshold - subtotal),
        progress: Math.min(100, (subtotal / threshold) * 100),
        shipping,
        total: subtotal + shipping
      };
    }
  };

  /* ======================================================================
   * Toast (#toast)
   * ==================================================================== */
  const Toast = (() => {
    let timer;
    const supportsPopover = () => { const el = $('#toast'); return !!el && typeof el.showPopover === 'function'; };
    return {
      show(message) {
        const el = $('#toast');
        if (!el) return;
        el.textContent = message;
        if (supportsPopover()) { try { if (!el.matches(':popover-open')) el.showPopover(); } catch (e) { /* older engines */ } }
        el.classList.add('show');
        root.clearTimeout(timer);
        timer = root.setTimeout(() => {
          el.classList.remove('show');
          root.setTimeout(() => { if (!el.classList.contains('show') && supportsPopover()) { try { el.hidePopover(); } catch (e) { /* noop */ } } }, 260);
        }, 3600);
      }
    };
  })();

  /* ======================================================================
   * Cart store: one normalised view of salla.cart, refreshed from SDK events
   * ==================================================================== */
  function normalizeLine(it) {
    const product = it.product || {};
    const productId = it.product_id != null ? it.product_id : product.id;
    const qty = Number(it.quantity != null ? it.quantity : it.qty) || 0;
    const unit = Meta.toNumber(it.price != null ? it.price : it.product_price);
    let total = Meta.toNumber(it.total);
    if (!Number.isFinite(total)) total = (Number.isFinite(unit) ? unit : 0) * qty;
    const image = (typeof it.image === 'string' && it.image) || (it.image && it.image.url) || it.product_image || (product.image && (product.image.url || product.image)) || '';
    const known = Meta.forSalla(productId);
    const name = it.name || it.product_name || product.name || (known && known.name) || '';
    const options = (Array.isArray(it.options) ? it.options : [])
      .map((o) => ({ name: o.name || '', value: o.value && typeof o.value === 'object' ? (o.value.name || '') : (o.value != null ? o.value : (o.option_value || '')) }))
      .filter((o) => o.value !== '' && o.value != null);
    return {
      id: String(it.id),
      productId: String(productId),
      name,
      image: typeof image === 'string' ? image : '',
      url: it.url || product.url || (known && known.url) || '',
      qty,
      unit,
      total,
      options,
      teraz: (known && known.teraz) || Meta.resolve({ id: productId, sku: it.sku || product.sku, url: it.url || product.url, name })
    };
  }

  function normalizeCart(raw) {
    const cart = raw && ((raw.data && raw.data.cart) || raw.cart || raw.data || raw);
    if (!cart || !Array.isArray(cart.items)) return null;
    const lines = cart.items.map(normalizeLine);
    const subtotalFromLines = lines.reduce((n, l) => n + (Number.isFinite(l.total) ? l.total : 0), 0);
    const subtotalFromCart = Meta.toNumber(cart.sub_total);
    return {
      id: cart.id != null ? String(cart.id) : null,
      items: lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.length ? subtotalFromLines : (Number.isFinite(subtotalFromCart) ? subtotalFromCart : 0)
    };
  }

  const Cart = {
    state: { id: null, items: [], count: 0, subtotal: 0 },
    busy: false,
    _lastDone: 0,
    _queued: false,
    _inflight: null,
    _renderTimer: null,
    _listeners: [],
    _localItems: [],
    _localSeq: 1,

    onChange(fn) { this._listeners.push(fn); },

    _emit() {
      root.clearTimeout(this._renderTimer);
      this._renderTimer = root.setTimeout(() => this._listeners.forEach((fn) => fn(this.state)), 0);
    },

    _syncLocal() {
      const subtotal = this._localItems.reduce((sum, l) => sum + (Number.isFinite(l.total) ? l.total : 0), 0);
      const count = this._localItems.reduce((sum, l) => sum + l.qty, 0);
      this.state = { id: 'local', items: this._localItems.slice(), count, subtotal };
      this._emit();
      return this.state;
    },

    /** Applies an SDK payload if it carries the cart; returns false when it does not (caller then refreshes). */
    apply(raw) {
      const next = normalizeCart(raw);
      if (!next) return false;
      if (!next.items.length && this._localItems.length) {
        this._syncLocal();
        return true;
      }
      this.state = next;
      this._emit();
      return true;
    },

    /** Authoritative cart from Salla. Coalesces concurrent calls. */
    refresh() {
      if (this._inflight) { this._queued = true; return this._inflight; }
      const s = sallaOrNull();
      if (!s) return Promise.resolve(this._localItems.length ? this._syncLocal() : this.state);
      this.busy = true;
      const fetchLatest = () => {
        if (typeof s.cart.latest === 'function') return s.cart.latest();
        if (s.cart.api && typeof s.cart.api.latest === 'function') return s.cart.api.latest();
        return Promise.resolve(null);
      };
      this._inflight = Promise.resolve()
        .then(fetchLatest)
        .then((res) => {
          if (res) this.apply(res);
          else if (this._localItems.length) this._syncLocal();
        })
        .catch(() => { if (this._localItems.length) this._syncLocal(); })
        .then(() => {
          this.busy = false;
          this._lastDone = Date.now();
          this._inflight = null;
          if (this._queued) { this._queued = false; return this.refresh(); }
          return this.state;
        });
      return this._inflight;
    },

    /** salla.cart.addItem({ id, quantity, options: { [optionId]: valueId } }) */
    async add({ id, quantity, options, notes }, { refresh = true } = {}) {
      const numId = Number(id);
      if (!Number.isFinite(numId)) {
        const p = M.get(String(id));
        const entry = Meta.forTeraz(String(id)) || (p ? fallbackEntry(p) : null);
        if (!p || !entry) throw new Error('المنتج غير متوفر.');
        const qty = quantity || 1;
        const sizeVal = notes ? String(notes).replace(/^المقاس:\s*/, '') : (M.oneSize(p) ? M.optionLabel(p) : '');
        const key = p.id + '|' + sizeVal;
        const hit = this._localItems.find((l) => l._key === key);
        if (hit) {
          hit.qty = Math.min(MAX_QTY, hit.qty + qty);
          hit.total = hit.unit * hit.qty;
        } else {
          this._localItems.push({
            id: 'local-' + (this._localSeq++),
            _key: key,
            productId: p.id,
            name: entry.name,
            image: entry.image,
            url: entry.url,
            qty,
            unit: entry.price,
            total: entry.price * qty,
            options: sizeVal ? [{ name: 'المقاس', value: sizeVal }] : [],
            teraz: p
          });
        }
        this._syncLocal();
        return { data: { cart_id: 'local' } };
      }
      const s = needSalla();
      const payload = { id: numId, quantity: quantity || 1 };
      if (options && Object.keys(options).length) payload.options = options;
      if (notes) payload.notes = notes;
      const result = await s.cart.addItem(payload);
      if (refresh) await this.refresh();
      return result;
    },

    /** salla.cart.updateItem({ id: lineId, quantity }) */
    async update(lineId, quantity) {
      if (String(lineId).startsWith('local-')) {
        const hit = this._localItems.find((l) => l.id === String(lineId));
        if (hit) { hit.qty = quantity; hit.total = hit.unit * quantity; }
        this._syncLocal();
        return {};
      }
      const s = needSalla();
      const result = await s.cart.updateItem({ id: Number(lineId), quantity });
      await this.refresh();
      return result;
    },

    /** salla.cart.deleteItem(lineId) */
    async remove(lineId) {
      if (String(lineId).startsWith('local-')) {
        this._localItems = this._localItems.filter((l) => l.id !== String(lineId));
        this._syncLocal();
        return {};
      }
      const s = needSalla();
      const result = await s.cart.deleteItem(Number(lineId));
      await this.refresh();
      return result;
    },

    /** Native Salla checkout (salla.cart.submit), falling back to the cart page only if the SDK lacks it. */
    async checkout() {
      const s = needSalla();
      if (typeof s.cart.submit === 'function') { await s.cart.submit(); return; }
      const url = (s.url && typeof s.url.get === 'function' && s.url.get('cart')) || '/cart';
      root.location.href = url;
    },

    /** Subscribes to every cart event shape the SDK exposes; payloads with the cart skip a network round-trip. */
    bindEvents() {
      const s = sallaOrNull();
      if (!s) return;
      const handler = (res) => {
        // Payloads that carry the cart are applied without a request. Payload-less events are refreshed unless
        // they are echoes of our own latest() call (in flight, or arriving right after it completed).
        if (this.apply(res)) return;
        if (this.busy || Date.now() - this._lastDone < 300) return;
        this.refresh();
      };
      const emitter = (s.cart && s.cart.event) || (s.event && s.event.cart) || null;
      if (emitter) {
        ['onUpdated', 'onItemAdded', 'onItemDeleted', 'onItemUpdated'].forEach((name) => { if (typeof emitter[name] === 'function') emitter[name](handler); });
      }
      if (s.event && typeof s.event.on === 'function') {
        ['cart::updated', 'cart::item.added', 'cart::item.deleted', 'cart::item.updated'].forEach((name) => s.event.on(name, handler));
      }
    }
  };

  /* ======================================================================
   * Rendering helpers shared by home, product page and bag
   * ==================================================================== */
  function imageTag(entry, extra) {
    const alt = (entry.name || '') + (entry.teraz ? '، ' + entry.teraz.color : '');
    return `<img ${extra || ''} src="${esc(entry.image)}" width="1200" height="900" alt="${esc(alt)}">`;
  }

  const priceOf = (entry, p) => (entry && Number.isFinite(entry.price) ? entry.price : (p ? p.price : NaN));

  function cardHTML(entry) {
    const p = entry.teraz;
    const sale = Number.isFinite(entry.regularPrice) && Number.isFinite(entry.price) && entry.regularPrice > entry.price;
    return `<article class="product-card" data-product-id="${esc(entry.id)}" data-sku="${esc(entry.sku)}" data-name="${esc(entry.name)}" data-url="${esc(entry.url)}" data-price="${esc(entry.price)}" data-regular-price="${esc(entry.regularPrice)}" data-image="${esc(entry.image)}" data-available="${entry.available === false ? 'false' : 'true'}"${p ? ` data-teraz-id="${esc(p.id)}"` : ''}>`
      + `<a class="product-image" href="${esc(entry.url)}" aria-label="تفاصيل ${esc(entry.name)}">${imageTag(entry, 'loading="lazy"')}</a>`
      + `<div class="card-meta"><span class="card-color">${esc(p ? p.color : '')}</span><h3><a href="${esc(entry.url)}">${esc(entry.name)}</a></h3>`
      + `<div class="card-bottom"><b>${money(priceOf(entry, p))}</b>${sale ? `<del class="card-regular">${money(entry.regularPrice)}</del>` : ''}${entry.available === false ? '<span class="card-flag">غير متوفر</span>' : ''}<a href="${esc(entry.url)}">اكتشف التفاصيل ↗</a></div></div></article>`;
  }

  /** Size labels offered for an entry: its Salla size option when known, else the TERAZ 40–45 set. */
  function sizeChoices(entry, p) {
    if (M.oneSize(p)) return [];
    const opt = Meta.pickSizeOption(entry.options);
    if (opt && opt.values.length) return opt.values.map((v) => ({ label: v.name, out: v.outOfStock }));
    return M.SHOE_SIZES.map((s) => ({ label: s, out: false }));
  }

  /**
   * Payload for salla.cart.addItem for an entry + chosen size label.
   * Footwear that has no Salla size option falls back to a cart-line note so the size is never lost.
   */
  function payloadFor(entry, p, sizeLabel) {
    const built = Meta.buildOptionPayload(entry.options, p, sizeLabel);
    if (built.error) return { error: built.error };
    const notes = M.isFootwear(p) && !built.option ? 'المقاس: ' + sizeLabel : undefined;
    return { options: built.options, notes };
  }

  function optionErrorText(code, label) {
    return code === 'size_not_available' ? 'المقاس ' + label + ' غير متوفر لهذا المنتج حاليًا.' : 'تعذّر تحديد خيارات هذا المنتج. افتح صفحته واختر الخيارات.';
  }

  function matchItemHTML(entry, withCheckbox) {
    const p = entry.teraz;
    const inBag = Cart.state.items.some((l) => l.teraz && l.teraz.id === p.id);
    const sizes = sizeChoices(entry, p);
    const sizeBlock = M.oneSize(p)
      ? `<p class="match-size">${esc(p.group === 'care' ? p.fit : 'مقاس واحد · محدد تلقائيًا')}</p>`
      : `<label class="match-size">المقاس <select class="match-size-select" aria-label="مقاس ${esc(entry.name)}"><option value="">اختر مقاسك</option>${sizes.map((x) => `<option value="${esc(x.label)}"${x.out ? ' disabled' : ''}>${esc(x.label)}${x.out ? ' — غير متوفر' : ''}</option>`).join('')}</select></label>`;
    return `<article class="match-item" data-match="${esc(p.id)}"><a href="${esc(entry.url)}" class="match-photo">${imageTag(entry, 'loading="lazy"')}</a>`
      + `<div class="match-info"><span class="match-kicker">${esc(M.matchReason(p))}</span><a href="${esc(entry.url)}"><h4>${esc(entry.name)}</h4></a>`
      + `<p class="match-price">${money(priceOf(entry, p))} </p>${sizeBlock}`
      + (withCheckbox ? `<label class="match-check"><input type="checkbox" class="bundle-check" value="${esc(p.id)}"> أضف إلى تنسيقي</label>` : '')
      + `<button type="button" class="text-button" data-quick="${esc(p.id)}">أضف القطعة +</button>`
      + `<p class="match-feedback" role="status">${inBag ? 'قطعة من هذا الموديل في حقيبتك بالفعل' : ''}</p></div></article>`;
  }

  /* ======================================================================
   * Cart dialog (#cart-dialog) — stage 1 "bag", stage 2 ".is-review"
   * ==================================================================== */
  let lastTrigger = null;

  const dialogEl = () => $('#cart-dialog');

  function shippingProgressHTML(t) {
    return `<div class="shipping-progress"><div><span>${t.remaining ? 'باقي ' + money(t.remaining) + ' للشحن المجاني' : 'وصلت للشحن المجاني'}</span><small>شحن مجاني من ${numberFormat.format(CFG.threshold)} ر.س</small></div>`
      + `<progress value="${t.progress}" max="100" aria-label="التقدم نحو حد الشحن المجاني">${Math.round(t.progress)}%</progress></div>`;
  }

  function lineDetail(line) {
    const p = line.teraz;
    if (p && p.group === 'care') return 'المحتوى: ' + p.fit;
    if (line.options.length) return line.options.map((o) => (SIZE_LABEL.test(o.name) ? 'المقاس' : o.name) + ': ' + o.value).join(' · ');
    if (p && M.oneSize(p)) return 'المقاس: ' + M.ONE_SIZE_LABEL;
    return '';
  }

  function lineHTML(line) {
    const image = line.image ? `<img src="${esc(line.image)}" width="1200" height="900" alt="${esc(line.name)}">` : '';
    return `<article class="cart-line" data-line="${esc(line.id)}">${image}<div><h3>${esc(line.name)}</h3><p>${esc(lineDetail(line))}</p><strong>${money(line.total)}</strong>`
      + `<div class="qty-control"><button type="button" data-quantity="${esc(line.id)}" data-delta="-1" aria-label="تقليل كمية ${esc(line.name)}">−</button><span>${line.qty}</span>`
      + `<button type="button" data-quantity="${esc(line.id)}" data-delta="1" aria-label="زيادة كمية ${esc(line.name)}"${line.qty >= MAX_QTY ? ' disabled' : ''}>+</button>`
      + `<button type="button" class="remove-item" data-remove="${esc(line.id)}" aria-label="إزالة ${esc(line.name)} من الحقيبة">إزالة</button></div></div></article>`;
  }

  function summaryHTML(t, stage) {
    const estimate = CFG.showShippingEstimate
      ? `<p><span>الشحن المتوقع</span><strong>${t.shipping ? money(t.shipping) : 'مجاني'}</strong></p><p class="grand-total"><span>الإجمالي المتوقع</span><strong>${money(t.total)}</strong></p>`
      : `<p class="grand-total"><span>مجموع المنتجات</span><strong>${money(t.subtotal)}</strong></p>`;
    return `<div class="cart-summary"><h3>ملخص طلبك</h3><p><span>مجموع المنتجات</span><strong>${money(t.subtotal)}</strong></p>${estimate}`
      + `<small>التكلفة النهائية للشحن وأي خصومات تظهر لك في صفحة الدفع.</small>`
      + `<button type="button" class="primary" data-action="${stage === 'review' ? 'checkout' : 'review'}">${stage === 'review' ? 'إتمام الطلب' : 'متابعة الطلب'} ←</button>`
      + `<button type="button" class="text-button" data-action="close-cart">أكمل التصفح</button></div>`;
  }

  function checkoutCardHTML(entry) {
    const p = entry.teraz;
    const sizes = sizeChoices(entry, p);
    const sizeBlock = M.oneSize(p)
      ? `<small>${esc(p.group === 'care' ? p.fit : 'مقاس واحد')}</small>`
      : `<label>المقاس <select aria-label="مقاس ${esc(entry.name)}"><option value="">اختر</option>${sizes.map((x) => `<option value="${esc(x.label)}"${x.out ? ' disabled' : ''}>${esc(x.label)}</option>`).join('')}</select></label>`;
    return `<article class="checkout-addon" data-match="${esc(p.id)}"><a href="${esc(entry.url)}" class="addon-image">${imageTag(entry, 'loading="lazy"')}</a>`
      + `<div class="addon-details"><span>${esc(M.matchReason(p))}</span><a href="${esc(entry.url)}"><h4>${esc(entry.name)}</h4></a><strong>${money(priceOf(entry, p))}</strong>${sizeBlock}`
      + `<button type="button" data-quick="${esc(p.id)}" class="addon-add">أضف +</button><p class="match-feedback" role="status"></p></div></article>`;
  }

  /** In-cart cross-sell: recommendations of everything in the bag, minus what is already in the bag. */
  function cartSuggestions() {
    const inBag = new Set(Cart.state.items.map((l) => l.teraz && l.teraz.id).filter(Boolean));
    const seen = new Set();
    const out = [];
    Cart.state.items.forEach((line) => {
      if (!line.teraz) return;
      M.recommendations(line.teraz).forEach((r) => {
        if (inBag.has(r.id) || seen.has(r.id)) return;
        seen.add(r.id);
        const entry = Meta.forTeraz(r.id) || (Meta.list().length <= 1 ? fallbackEntry(r) : null);
        if (entry && entry.available !== false) out.push(entry);
      });
    });
    return out.slice(0, 5);
  }

  async function fillAddons() {
    const host = $('.checkout-addons');
    if (!host) return;
    const entries = cartSuggestions();
    host.setAttribute('aria-busy', 'true');
    await Promise.all(entries.map((e) => Meta.ensureOptions(e)));
    if (!host.isConnected) return; // the bag re-rendered while options were loading
    host.innerHTML = entries.map(checkoutCardHTML).join('') || '<p>كشختك مكتملة بالقطع المقترحة.</p>';
    host.removeAttribute('aria-busy');
  }

  function renderCart(stage) {
    const dialog = dialogEl();
    if (!dialog) return;
    const current = stage || dialog.dataset.stage || 'bag';
    const previous = $('.cart-recommend');
    const wasOpen = previous ? previous.open : null;
    const { items, subtotal } = Cart.state;
    const t = Commerce.totals(subtotal);
    dialog.classList.toggle('is-review', current === 'review');
    dialog.dataset.stage = current;
    $('#bag-title').textContent = current === 'review' ? 'راجع كشختك' : 'حقيبتك';
    const body = $('#cart-body');
    if (!items.length) {
      body.innerHTML = '<div class="empty-bag"><span>طرازك يبدأ باختيار.</span><h3>حقيبتك تنتظر ذوقك.</h3><button type="button" class="primary" data-action="browse">اكتشف المجموعة ←</button></div>';
      return;
    }
    body.innerHTML = `<div class="checkout-main">${current === 'review' ? '<p class="review-intro">اختياراتك جاهزة. راجع المقاسات والكميات، وكمل على طرازك.</p>' : ''}${shippingProgressHTML(t)}`
      + `<div class="cart-lines">${items.map(lineHTML).join('')}</div>`
      + `<details class="cart-recommend"${current === 'review' ? '' : ' open'}><summary><span>كمّل كشختك <small>قطع تتناسق مع اختيارك · اختياري</small></span><b>+</b></summary><div class="checkout-addons"></div></details></div>`
      + summaryHTML(t, current);
    const recommend = $('.cart-recommend');
    if (recommend && wasOpen !== null) recommend.open = wasOpen;
    fillAddons();
  }

  function openCart() {
    const dialog = dialogEl();
    if (!dialog) return;
    lastTrigger = doc.activeElement;
    renderCart('bag');
    if (!dialog.open && typeof dialog.showModal === 'function') dialog.showModal();
  }
  const closeCart = () => { const d = dialogEl(); if (d && d.open) d.close(); };

  function updateCartCount() {
    const el = $('#cart-count');
    if (el) el.textContent = String(Cart.state.count);
  }

  /** Re-focuses the control that was used before the bag re-rendered (quantity / remove buttons are replaced). */
  function focusKeyOf(element) {
    if (!element || !element.closest) return null;
    const btn = element.closest('button');
    if (!btn) return null;
    if (btn.dataset.quantity) return `button[data-quantity="${btn.dataset.quantity}"][data-delta="${btn.dataset.delta}"]`;
    if (btn.dataset.remove) return `button[data-remove="${btn.dataset.remove}"]`;
    return null;
  }

  async function mutateLine(button, action) {
    const dialog = dialogEl();
    const key = focusKeyOf(button);
    const line = button.closest('.cart-line');
    $$('button', line).forEach((b) => { b.disabled = true; });
    if (line) line.setAttribute('aria-busy', 'true');
    try {
      await action();
    } catch (e) {
      Toast.show(errorMessage(e, 'تعذّر تحديث الحقيبة. حاول مرة أخرى.'));
      renderCart(dialog && dialog.dataset.stage);
    }
    const target = (key && $(key, dialog)) || $('#bag-title');
    if (target) { if (!target.hasAttribute('tabindex') && target.tagName === 'H2') target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
  }

  /* ======================================================================
   * Quick add (bundle cards on the product page and cross-sell cards in the bag)
   * ==================================================================== */
  async function quickAdd(terazId, button) {
    const p = M.get(terazId);
    const entry = Meta.forTeraz(terazId) || (p && Meta.list().length <= 1 ? fallbackEntry(p) : null);
    const card = button.closest('[data-match]');
    const feedback = $('.match-feedback', card);
    const select = $('select', card);
    if (!p || !entry) return;
    const size = M.oneSize(p) ? M.optionLabel(p) : (select ? select.value : '');
    if (!size) { feedback.textContent = 'اختر المقاس لإضافة هذه القطعة.'; if (select) select.focus(); return; }
    await Meta.ensureOptions(entry);
    const built = payloadFor(entry, p, size);
    if (built.error) { feedback.textContent = optionErrorText(built.error, size); return; }
    setBusy(button, true);
    try {
      await Cart.add({ id: entry.id, quantity: 1, options: built.options, notes: built.notes });
      const dialog = dialogEl();
      if (dialog && dialog.open) {
        const next = $('.addon-add') || $('#cart-body .primary');
        if (next) next.focus({ preventScroll: true });
      } else {
        feedback.textContent = '✓ أُضيفت للحقيبة — ' + size;
        button.textContent = 'أضف قطعة أخرى +';
      }
      Toast.show('أُضيف ' + entry.name + ' للحقيبة.');
    } catch (e) {
      feedback.textContent = errorMessage(e, 'تعذّرت الإضافة. حاول مرة أخرى.');
    } finally {
      setBusy(button, false);
    }
  }

  /* ======================================================================
   * Home: hero peek, sort bar, strips
   * ==================================================================== */
  function tagCardsWithTeraz(scope) {
    $$('.product-card, .exhibit', scope).forEach((el) => {
      if (el.dataset.terazId) return;
      const known = Meta.forSalla(el.dataset.productId);
      const p = (known && known.teraz) || Meta.resolve({ id: el.dataset.productId, sku: el.dataset.sku, url: el.dataset.url, name: el.dataset.name });
      if (!p) return;
      el.dataset.terazId = p.id;
      const color = $('.card-color', el);
      if (color) color.textContent = p.color;
    });
  }

  function wireHeroPeek() {
    const peek = $('#hero-peek');
    if (!peek) return;
    $$('.exhibit').forEach((el) => {
      if (el.dataset.peekWired) return;
      el.dataset.peekWired = '1';
      const show = () => {
        $('img', peek).src = el.dataset.peekImg || el.dataset.image || '';
        $('span', peek).textContent = el.dataset.peekName || el.dataset.name || '';
        peek.classList.add('visible');
      };
      const hide = () => peek.classList.remove('visible');
      el.addEventListener('mouseenter', show);
      el.addEventListener('focus', show);
      el.addEventListener('mouseleave', hide);
      el.addEventListener('blur', hide);
    });
  }

  /** Fills #hero-shoes with the 8 TERAZ knit shoes found in the store when the merchant did not pick any. */
  function fallbackEntry(p) {
    const base = String(CFG.imagesBaseUrl || 'images/').replace(/logo\.webp.*$/, '');
    return {
      id: p.id,
      sku: p.id,
      name: p.name,
      url: '#p/' + p.id,
      price: p.price,
      regularPrice: p.price,
      image: p.image ? base + p.image : '',
      available: true,
      options: [],
      teraz: p
    };
  }

  function fillHeroStage() {
    const host = $('#hero-shoes');
    if (!host || $('.exhibit:not([data-fallback])', host)) { wireHeroPeek(); return; }
    let entries = M.inGroup('knit').map((p) => Meta.forTeraz(p.id)).filter(Boolean).slice(0, 8);
    if (!entries.length && $('.exhibit[data-fallback]', host)) { wireHeroPeek(); return; }
    if (!entries.length) entries = M.inGroup('knit').slice(0, 8).map(fallbackEntry);
    host.innerHTML = entries.map((entry, i) => `<a href="${esc(entry.url)}" class="exhibit" style="--column:${i % 4};--tier:${Math.floor(i / 4)}" data-product-id="${esc(entry.id)}" data-name="${esc(entry.name)}" data-image="${esc(entry.image)}" data-peek-img="${esc(entry.image)}" data-peek-name="${esc(entry.name)}" data-teraz-id="${esc(entry.teraz.id)}" aria-label="اكتشف ${esc(entry.name)}">${imageTag(entry)}<span>${esc(entry.name)} ↗</span></a>`).join('');
    wireHeroPeek();
  }

  function applySort(key) {
    const strip = $('.product-strip[data-group="knit"]');
    if (!strip) return;
    const cards = $$('.product-card', strip);
    M.ordered(cards, key, (c) => c.dataset.terazId).forEach((card) => strip.appendChild(card));
    strip.scrollLeft = 0;
  }

  /** Empty strip -> its chosen category (salla.product.fetch), else the store's TERAZ products of that group. */
  async function fillStrip(strip) {
    if ($('.product-card:not([data-fallback])', strip)) return;
    const group = strip.dataset.group;
    const s = root.salla;
    const ids = toIdList(parseJson(strip.dataset.category || '""', ''));
    let entries = [];
    if (ids.length && s && s.product && typeof s.product.fetch === 'function') {
      try {
        const res = await s.product.fetch({ source: 'categories', source_value: ids });
        entries = ((res && (res.data || res.products)) || []).map((raw) => Meta.register(raw)).filter(Boolean);
      } catch (e) { entries = []; }
    }
    if (!entries.length) {
      entries = M.inGroup(group).map((p) => Meta.forTeraz(p.id)).filter(Boolean);
    }
    if (!entries.length && $('.product-card[data-fallback]', strip)) {
      tagCardsWithTeraz(strip);
      return;
    }
    if (!entries.length) {
      entries = M.inGroup(group).map(fallbackEntry);
    }
    if (!entries.length) return;
    strip.innerHTML = entries.map(cardHTML).join('');
    tagCardsWithTeraz(strip);
  }

  async function initHome() {
    if (!$('#home-view')) return;
    tagCardsWithTeraz(doc);
    applySort('thobe');
    wireHeroPeek();
    await Meta.loadRegistry();
    await Promise.all($$('.product-strip[data-group]').map(fillStrip));
    tagCardsWithTeraz(doc);
    applySort(($('.sort-bar [aria-pressed="true"]') || { dataset: {} }).dataset.sort || 'thobe');
    fillHeroStage();
    $$('[data-teraz-link]').forEach((a) => {
      const entry = Meta.forTeraz(a.dataset.terazLink);
      a.setAttribute('href', (entry && entry.url) || ('#p/' + a.dataset.terazLink));
    });
  }

  /* ======================================================================
   * Product page
   * ==================================================================== */
  const Page = {
    root: null, entry: null, p: null, unit: NaN, regular: NaN,
    picks: {},            // optionId ('' when Salla has no option) -> { valueId, label, out }
    sizeFieldset: null,
    auto: null,           // payload for one-size / care products
    available: true,
    priceTimer: null
  };

  const fieldsets = () => $$('#sizes-host fieldset.sizes');
  const baseSizeLabel = () => {
    if (!Page.sizeFieldset) return Page.auto ? M.optionLabel(Page.p) : '';
    const pick = Page.picks[Page.sizeFieldset.dataset.optionId];
    return pick ? pick.label : '';
  };

  function sizeFieldsetHTML(labels, note) {
    return `<fieldset class="sizes" data-option-id="" data-option-name="المقاس"><legend>اختر المقاس</legend><div>${labels.map((s) => `<button type="button" data-size="${esc(s)}" data-option-id="" data-value-id="" aria-pressed="false">${esc(s)}</button>`).join('')}</div><p data-role="fit-note">${esc(note)}</p></fieldset>`;
  }

  function setText(selector, text) {
    const el = $(selector, Page.root);
    if (!el) return;
    el.textContent = text || '';
    if (el.hasAttribute('data-hydrate')) el.hidden = !text;
  }

  function setAddState(enabled, label) {
    const add = $('[data-action="add-product"]', Page.root);
    const text = $('[data-role="add-label"]', Page.root);
    if (add) add.disabled = !enabled;
    if (text && label) text.textContent = label;
  }

  function showPrice(price, regular) {
    const priceEl = $('[data-role="price"]', Page.root);
    if (priceEl && Number.isFinite(price)) priceEl.textContent = money(price);
    let del = $('[data-role="regular"]', Page.root);
    const onSale = Number.isFinite(regular) && Number.isFinite(price) && regular > price;
    if (onSale && !del) { del = doc.createElement('del'); del.setAttribute('data-role', 'regular'); $('.price-line', Page.root).appendChild(del); }
    if (del) { del.hidden = !onSale; if (onSale) del.textContent = money(regular); }
  }

  /** Reflects the picked value's stock on the buy button; unavailable choices route the user to the notify panel. */
  function syncAvailability() {
    const picked = Object.keys(Page.picks).map((k) => Page.picks[k]);
    const outPick = picked.find((x) => x.out);
    const err = $('#size-error');
    if (!Page.available) { setAddState(false, 'غير متوفر حاليًا'); return; }
    if (outPick) {
      setAddState(false, 'غير متوفر لهذا المقاس');
      if (err) err.textContent = 'هذا الخيار غير متوفر حاليًا. اضغط «نبّهني عند التوفر» لنخبرك فور توفره.';
    } else {
      setAddState(true, 'أضف للحقيبة');
      if (err && err.textContent.indexOf('غير متوفر') !== -1) err.textContent = '';
    }
  }

  /** Salla's real price for the picked option combination (options can carry a price delta). */
  function schedulePrice() {
    root.clearTimeout(Page.priceTimer);
    Page.priceTimer = root.setTimeout(async () => {
      const s = root.salla;
      const payload = basePayload();
      if (!s || !s.product || typeof s.product.getPrice !== 'function' || payload.error || !Object.keys(payload.options || {}).length) return;
      try {
        const res = await s.product.getPrice({ id: Number(Page.entry.id), quantity: 1, options: payload.options });
        const data = (res && res.data) || res || {};
        const price = Meta.toNumber(data.price);
        const regular = Meta.toNumber(data.regular_price);
        if (Number.isFinite(price) && price > 0) {
          Page.unit = price;
          showPrice(price, Number.isFinite(regular) ? regular : Page.regular);
          updateBundleTotal();
        }
      } catch (e) { /* the server-rendered price stays */ }
    }, 250);
  }

  function setPick(button) {
    const set = button.closest('fieldset.sizes');
    if (!set) return;
    const optionId = set.dataset.optionId || '';
    $$('button[data-size]', set).forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    Page.picks[optionId] = { valueId: button.dataset.valueId || '', label: button.dataset.size, out: button.dataset.out === 'true' };
    if (set === Page.sizeFieldset) {
      const select = $('#bundle-base-size');
      if (select) select.value = button.dataset.size;
      const msg = $('#bundle-message');
      if (msg) msg.textContent = 'مقاس منتجك: ' + button.dataset.size;
    }
    const err = $('#size-error');
    if (err) err.textContent = '';
    syncAvailability();
    schedulePrice();
    updateBundleTotal();
  }

  function setBaseSizeByLabel(label) {
    if (!Page.sizeFieldset) return;
    const button = $$('button[data-size]', Page.sizeFieldset).find((b) => b.dataset.size === label);
    if (button) { setPick(button); return; }
    $$('button[data-size]', Page.sizeFieldset).forEach((b) => b.setAttribute('aria-pressed', 'false'));
    delete Page.picks[Page.sizeFieldset.dataset.optionId];
    const msg = $('#bundle-message');
    if (msg) msg.textContent = 'اختر مقاس المنتج الأساسي هنا.';
    syncAvailability();
    updateBundleTotal();
  }

  /** Payload for the product being viewed: picked option values, or the auto-selected one-size / care option. */
  function basePayload() {
    const sets = fieldsets();
    if (!sets.length) {
      if (Page.auto && Page.auto.error) return { error: true, message: optionErrorText(Page.auto.error, M.optionLabel(Page.p)) };
      return { options: Page.auto ? Page.auto.options : {}, notes: undefined };
    }
    const options = {};
    let notes;
    for (const set of sets) {
      const id = set.dataset.optionId || '';
      const pick = Page.picks[id];
      const isSize = set === Page.sizeFieldset;
      const meta = (Page.entry.options || []).find((o) => o.id === id);
      const required = isSize || !meta || meta.required;
      if (!pick) {
        if (required) return { error: true, focus: set, message: isSize ? 'اختر المقاس أولًا، عشان نضيف اختيارك الصحيح.' : 'اختر ' + (set.dataset.optionName || 'الخيار') + ' أولًا.' };
        continue;
      }
      if (pick.out) return { error: true, focus: set, message: 'هذا الخيار غير متوفر حاليًا. اضغط «نبّهني عند التوفر».' };
      if (id) options[id] = pick.valueId; else if (isSize) notes = 'المقاس: ' + pick.label;
    }
    return { options, notes };
  }

  function currentQty() { const input = $('#product-qty'); return Commerce.clampQty(input && input.value); }

  function updateBundleTotal() {
    if (!Page.root || !$('#bundle-total')) return;
    const qty = currentQty();
    if (!qty) { $('#bundle-message').textContent = 'اختر كمية من 1 إلى 10.'; return; }
    const checks = $$('.bundle-check:checked');
    const extras = checks.reduce((n, c) => { const p = M.get(c.value); const e = Meta.forTeraz(c.value) || (p ? fallbackEntry(p) : null); return n + (e ? priceOf(e, p) : 0); }, 0);
    const addition = (Number.isFinite(Page.unit) ? Page.unit : 0) * qty + extras;
    $('#bundle-total').textContent = money(addition);
    const current = Cart.state.subtotal;
    const t = Commerce.totals(current + addition);
    $('#bundle-shipping').innerHTML = `<div class="shipping-progress"><div><strong>${t.remaining ? 'باقي ' + money(t.remaining) + ' للشحن المجاني' : 'اختياراتك توصلك للشحن المجاني'}</strong><small>الشحن مجاني من ${numberFormat.format(CFG.threshold)} ر.س</small></div>`
      + `<progress value="${t.progress}" max="100" aria-label="التقدم المتوقع نحو الشحن المجاني"></progress>`
      + `<p>${current ? 'حقيبتك الحالية ' + money(current) + ' + اختياراتك الجديدة' : 'محسوب على المنتج الأساسي والإضافات المختارة'} · المجموع بعد الإضافة ${money(t.subtotal)}</p></div>`;
  }

  async function addCurrent(bundle) {
    if (!Page.root) return;
    const err = $('#size-error');
    const bundleMessage = $('#bundle-message');
    const base = basePayload();
    if (base.error) {
      err.textContent = base.message;
      if (bundle) {
        if (bundleMessage) bundleMessage.textContent = 'اختر المقاس أولًا من أعلى الصفحة.';
        const select = $('#bundle-base-size');
        if (select && !select.closest('[hidden]')) select.focus({ preventScroll: true });
      } else if (base.focus) {
        base.focus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const first = $('button', base.focus);
        if (first) first.focus({ preventScroll: true });
      }
      return;
    }
    const qty = currentQty();
    if (!qty) { err.textContent = 'اختر كمية من 1 إلى 10.'; return; }

    // Validate every extra first, so a bad choice never leaves the bag half-filled.
    const extras = [];
    if (bundle) {
      for (const input of $$('.bundle-check:checked')) {
        const card = input.closest('[data-match]');
        const p = M.get(input.value);
        const entry = Meta.forTeraz(input.value) || (p && Meta.list().length <= 1 ? fallbackEntry(p) : null);
        const feedback = $('.match-feedback', card);
        const select = $('select', card);
        if (!p || !entry) continue;
        const size = M.oneSize(p) ? M.optionLabel(p) : (select ? select.value : '');
        if (!size) { feedback.textContent = 'اختر مقاس هذه القطعة أولًا.'; if (select) select.focus(); return; }
        await Meta.ensureOptions(entry);
        const built = payloadFor(entry, p, size);
        if (built.error) { feedback.textContent = optionErrorText(built.error, size); return; }
        extras.push({ entry, options: built.options, notes: built.notes });
      }
    }

    const trigger = $(bundle ? '[data-action="add-bundle"]' : '[data-action="add-product"]', Page.root);
    setBusy(trigger, true);
    let added = 0;
    try {
      await Cart.add({ id: Page.entry.id, quantity: qty, options: base.options, notes: base.notes }, { refresh: false });
      added += 1;
      for (const x of extras) {
        await Cart.add({ id: x.entry.id, quantity: 1, options: x.options, notes: x.notes }, { refresh: false });
        added += 1;
      }
      await Cart.refresh();
      openCart();
      Toast.show('أُضيف اختيارك للحقيبة.');
    } catch (e) {
      if (added) await Cart.refresh();
      const message = errorMessage(e, 'تعذّرت الإضافة للحقيبة. حاول مرة أخرى.');
      err.textContent = message;
      Toast.show(message);
    } finally {
      setBusy(trigger, false);
      if (!Page.available) setAddState(false);
      else syncAvailability();
    }
  }

  /* ----- availability notification ------------------------------------- */
  function resolveSubscribe() {
    const s = root.salla;
    if (!s) return null;
    const candidates = [
      [s.product, s.product && s.product.availabilitySubscribe],
      [s.product && s.product.api, s.product && s.product.api && s.product.api.availabilitySubscribe],
      [s.api && s.api.product, s.api && s.api.product && s.api.product.availabilitySubscribe],
      [s.product && s.product.availability, s.product && s.product.availability && s.product.availability.subscribe]
    ];
    const hit = candidates.find((c) => typeof c[1] === 'function');
    return hit ? (payload) => hit[1].call(hit[0], payload) : null;
  }

  function toggleNotify(force) {
    const panel = $('#notify-panel');
    const link = $('[data-role="notify-link"]');
    if (!panel) return;
    panel.hidden = force === undefined ? !panel.hidden : !force;
    if (link) link.setAttribute('aria-expanded', String(!panel.hidden));
    if (!panel.hidden) { const input = $('#notify-contact'); if (input && !input.hidden) input.focus({ preventScroll: true }); }
  }

  async function submitNotify() {
    const message = $('#notify-message');
    const group = Page.p ? Page.p.group : null;
    const needsSize = Page.p ? M.variantKind(Page.p) === 'footwear' : fieldsets().length > 0;
    const label = baseSizeLabel();
    if (needsSize && !label) { message.textContent = 'اختر مقاسًا من الخيارات أولًا.'; return; }

    const payload = { id: Number(Page.entry.id) };
    if (isGuest()) {
      const raw = Meta.toLatinDigits(($('#notify-contact').value || '').trim());
      const local = raw.replace(/[\s-]/g, '').match(/^(?:\+?966|00966|0)?(5\d{8})$/);
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) payload.email = raw;
      else if (local) { payload.mobile = local[1]; payload.country_code = '+966'; }
      else { message.textContent = 'أدخل بريدًا إلكترونيًا أو رقم جوال سعودي صحيحًا.'; $('#notify-contact').focus(); return; }
    }
    const subscribe = resolveSubscribe();
    if (!subscribe) { message.textContent = 'خدمة التنبيه غير متاحة حاليًا. حاول لاحقًا.'; return; }
    const button = $('[data-action="save-notify"]');
    setBusy(button, true);
    try {
      await subscribe(payload);
      message.textContent = 'تم تسجيل اهتمامك ' + (group === 'care' || !label || label === M.ONE_SIZE_LABEL ? 'بالمنتج' : 'بمقاس ' + label) + '. سنخبرك فور توفره.';
    } catch (e) {
      message.textContent = errorMessage(e, 'تعذّر تسجيل التنبيه. حاول مرة أخرى.');
    } finally {
      setBusy(button, false);
    }
  }

  /* ----- hydration ------------------------------------------------------- */
  function hydrateSizes() {
    const host = $('#sizes-host');
    const p = Page.p;
    const options = Page.entry.options || [];
    // A fieldset without selectable values (text / date options) cannot be driven by buttons.
    $$('fieldset.sizes', host).forEach((set) => { if (!$('button[data-size]', set)) set.remove(); });

    if (p && M.variantKind(p) !== 'footwear') {
      host.innerHTML = `<div class="sizes one-size"><strong>${esc(M.sizeNote(p))}</strong><p>أضف اختيارك مباشرة.</p></div>`;
      Page.auto = Meta.buildOptionPayload(options, p, M.optionLabel(p));
      return;
    }
    if (!fieldsets().length && (p || !options.length)) {
      if (p) host.innerHTML = sizeFieldsetHTML(M.SHOE_SIZES, p.fit);
    }
    const sizeOpt = Meta.pickSizeOption(options);
    Page.sizeFieldset = (sizeOpt && fieldsets().find((f) => f.dataset.optionId === sizeOpt.id)) || fieldsets()[0] || null;
    if (!Page.sizeFieldset && !p) { Page.auto = { options: {}, error: null }; }
    if (Page.sizeFieldset && p) { const note = $('[data-role="fit-note"]', Page.sizeFieldset); if (note) note.textContent = p.fit; }
    // Stock from the Salla option values.
    options.forEach((o) => o.values.forEach((v) => {
      const b = $(`#sizes-host button[data-option-id="${o.id}"][data-value-id="${v.id}"]`);
      if (b && v.outOfStock) b.dataset.out = 'true';
    }));
    // Single-value groups (e.g. one colour) are pre-selected; the size group is never pre-selected.
    fieldsets().forEach((set) => {
      if (set === Page.sizeFieldset) return;
      const buttons = $$('button[data-size]', set);
      if (buttons.length === 1 && buttons[0].dataset.out !== 'true') setPick(buttons[0]);
    });
    // Bundle "base size" select mirrors the size buttons.
    const select = $('#bundle-base-size');
    const label = $('#bundle-base-size-label');
    if (select && Page.sizeFieldset) {
      $$('button[data-size]', Page.sizeFieldset).forEach((b) => {
        const o = doc.createElement('option');
        o.value = b.dataset.size;
        o.textContent = b.dataset.size + (b.dataset.out === 'true' ? ' — غير متوفر' : '');
        if (b.dataset.out === 'true') o.disabled = true;
        select.appendChild(o);
      });
      if (label) label.hidden = false;
    }
  }

  function hydrateCopy() {
    const p = Page.p;
    const c = M.content(p);
    const group = p.group;
    setText('[data-role="eyebrow"]', c.eyebrow);
    setText('[data-role="headline"]', p.headline);
    setText('[data-role="intro"]', p.description);
    setText('[data-role="color"]', p.color);
    setText('[data-role="detail-label"]', c.detailLabel);
    setText('[data-role="gallery-note"]', M.galleryNote(p));
    const back = $('[data-role="back-link"]');
    if (back) back.setAttribute('href', CFG.homeUrl.replace(/#.*$/, '') + '#' + group);

    $('[data-role="badges"]').innerHTML = c.badges.map((l) => (l.indexOf('ضمان') !== -1 ? `<a href="#product-guarantee">${esc(l)}</a>` : `<span>${esc(l)}</span>`)).join('');
    $('[data-role="accordions"]').innerHTML = c.sections.map(([title, body, id], i) => `<details${i === 0 ? ' open' : ''}${id ? ` id="${esc(id)}"` : ''}><summary>${esc(title)}</summary><p>${esc(body)}</p></details>`).join('');

    setText('[data-role="notify-copy"]', M.notifyCopy(p) + ' سنرسل لك إشعارًا عند توفره.');
    const link = $('[data-role="notify-link"]');
    if (link) link.textContent = M.oneSize(p) ? 'نبّهني عند توفر المنتج' : 'ما لقيت مقاسك؟ نبّهني عند التوفر';

    setText('[data-role="look-eyebrow"]', c.lookEyebrow);
    setText('[data-role="look-title"]', c.lookTitle);
    setText('[data-role="look-text"]', c.lookText);
    setText('[data-role="look-guide"]', c.lookGuide);
    const note = $('#bundle-base-note');
    const isOne = M.oneSize(p);
    if (note) { note.hidden = !isOne; note.textContent = isOne ? (group === 'care' ? p.fit : 'مقاس واحد · محدد تلقائيًا') : ''; }
    $('#bundle-message').textContent = isOne ? 'جاهز للإضافة مباشرة.' : 'اختر مقاس المنتج الأساسي هنا، ثم أضف اختياراتك.';

    setText('[data-role="story-label"]', c.storyLabel);
    setText('[data-role="story-title"]', c.storyTitle);
    setText('[data-role="story-text"]', c.storyText);
    setText('[data-role="story-extra"]', c.storyExtra);
    setText('[data-role="alt-eyebrow"]', group === 'care' ? 'مجموعة العناية بالجزم' : 'من نفس المجموعة');
    setText('[data-role="alt-title"]', c.alternativeTitle);
    $('.product-story', Page.root).hidden = false;
  }

  async function renderBundle() {
    const host = $('#bundle-items');
    const section = $('#complete-look');
    if (!host || !section) return;
    let recs = M.recommendations(Page.p).map((r) => Meta.forTeraz(r.id)).filter((e) => e && e.available !== false);
    if (!recs.length && Meta.list().length <= 1) {
      recs = M.recommendations(Page.p).map((r) => fallbackEntry(r));
    }
    await Promise.all(recs.map((e) => Meta.ensureOptions(e)));
    host.innerHTML = recs.map((e) => matchItemHTML(e, true)).join('');
    host.setAttribute('aria-busy', 'false');
    section.hidden = !recs.length;
    updateBundleTotal();
  }

  async function renderAlternatives() {
    const section = $('.alternatives', Page.root);
    const strip = $('[data-role="alternatives"]', Page.root);
    if (!section || !strip) return;
    let entries = Meta.list()
      .filter((e) => e.teraz && e.teraz.group === Page.p.group && e.teraz.id !== Page.p.id)
      .sort((a, b) => a.teraz.order - b.teraz.order);
    const s = root.salla;
    if (!entries.length && s && s.product && typeof s.product.fetch === 'function') {
      try {
        const res = await s.product.fetch({ source: 'related', source_value: [Number(Page.entry.id)] });
        entries = ((res && (res.data || res.products)) || []).map((raw) => Meta.register(raw)).filter((e) => e && e.id !== Page.entry.id);
      } catch (e) { entries = []; }
    }
    if (!entries.length && Meta.list().length <= 1) {
      entries = M.inGroup(Page.p.group).filter((x) => x.id !== Page.p.id).map(fallbackEntry);
    }
    entries = entries.slice(0, 4);
    if (!entries.length) return;
    strip.innerHTML = entries.map(cardHTML).join('');
    section.hidden = false;
  }

  function finishHydration() {
    if (Page.root) Page.root.removeAttribute('data-pending');
  }

  async function initProduct() {
    const rootEl = $('#product-view');
    const blob = $('#teraz-product-data');
    if (!rootEl || !blob) return;
    Page.root = rootEl;
    root.setTimeout(finishHydration, 4000); // never leave the page hidden if something below throws
    try {
      const data = parseJson(blob.textContent, null);
      if (!data) return;
      Page.entry = Meta.register(data);
      Page.p = Page.entry.teraz || (data.sku !== 'XYZ-1' ? M.get('tuwaiq') : null);
      Page.unit = Page.entry.price;
      Page.regular = Page.entry.regularPrice;
      Page.available = Page.entry.available !== false;
      doc.title = (Page.entry.name || doc.title);

      hydrateSizes();
      if (Page.p) hydrateCopy();
      else $$('[data-role="headline"]', rootEl).forEach((el) => { el.hidden = !el.textContent.trim(); });
      if (!Page.available) { syncAvailability(); toggleNotify(true); }
      const input = $('#notify-contact');
      if (input && !isGuest()) { const form = $('#notify-form'); input.hidden = true; $$('label[for="notify-contact"]', form).forEach((l) => { l.hidden = true; }); }
      updateBundleTotal();
    } finally {
      finishHydration();
    }

    if (!Page.p) return;
    await whenSallaReady();
    await Meta.loadRegistry();
    await Promise.all([renderBundle(), renderAlternatives()]);
  }

  /* ======================================================================
   * Global UI wiring (event delegation, as in the prototype)
   * ==================================================================== */

  function ensureSpaProductView() {
    let view = $('#product-view');
    if (view) return view;
    const hostWrap = ($('#home-view') && $('#home-view').parentElement)
      || $('.teraz-category-page')
      || $('main .teraz')
      || $('main');
    if (!hostWrap) return null;
    view = doc.createElement('div');
    view.id = 'product-view';
    view.hidden = true;
    view.innerHTML = '<script type="application/json" id="teraz-product-data">{}</scr' + 'ipt>'
      + '<div class="product-breadcrumb"><a href="#knit" data-role="back-link">→ العودة إلى المجموعة</a><span>طراز / <b data-role="crumb-name"></b></span></div>'
      + '<div class="product-layout"><div class="product-gallery"><div class="primary-photo"><img fetchpriority="high" data-role="primary-img" src="" width="1200" height="900" alt=""><span class="photo-caption" data-role="color"></span><button type="button" class="zoom-button" data-action="zoom" aria-label="تكبير صورة المنتج" aria-pressed="false">↗</button></div><div class="gallery-choices"><button type="button" aria-pressed="true" data-image-mode="full">التصميم كاملًا</button><button type="button" aria-pressed="false" data-image-mode="detail" data-role="detail-label">تفاصيل التصميم</button></div><p class="gallery-note" data-role="gallery-note">كل تفصيلة تكمل كشختك.</p></div>'
      + '<div class="purchase-panel"><span class="eyebrow" data-role="eyebrow"></span><h1 data-role="product-title"></h1><p class="product-headline" data-role="headline"></p><p class="product-intro" data-role="intro"></p><div class="price-line"><strong data-role="price"></strong></div><p class="shipping-info">الشحن ' + CFG.shippingFee + ' ر.س · مجاني عند ' + CFG.threshold + ' ر.س<br>موعد التوصيل الفعلي يُحدّد حسب العنوان قبل الدفع.</p><div id="sizes-host"></div><div class="buy-row"><label class="qty-input">الكمية <input id="product-qty" type="number" value="1" min="1" max="10" inputmode="numeric"></label><button type="button" class="primary" data-action="add-product"><span data-role="add-label">أضف للحقيبة</span> <span>+</span></button></div><p id="size-error" class="validation" role="alert"></p><div class="trust-badges" data-role="badges"></div><button type="button" class="notify-link" data-action="notify" aria-expanded="false" aria-controls="notify-panel" data-role="notify-link">نبّهني عند التوفر</button><div id="notify-panel" hidden><p data-role="notify-copy"></p><form id="notify-form" class="notify-form" novalidate><label class="visually-hidden" for="notify-contact">البريد الإلكتروني أو رقم الجوال</label><input id="notify-contact" name="contact" type="text" inputmode="email" autocomplete="email" placeholder="البريد الإلكتروني أو رقم الجوال" data-guest-only><button type="submit" class="secondary" data-action="save-notify">نبّهني عند التوفر</button></form><p id="notify-message" role="status"></p></div><div class="product-accordions" data-role="accordions"></div></div></div>'
      + '<section class="section complete-look" id="complete-look" hidden><div class="look-heading"><span class="eyebrow" data-role="look-eyebrow"></span><h2 data-role="look-title"></h2><p data-role="look-text"></p></div><p class="look-guide" data-role="look-guide"></p><div class="bundle-picker"><div id="bundle-items" aria-busy="true"></div><div class="bundle-total"><div class="bundle-base"><strong id="bundle-base-name"></strong><p id="bundle-base-note" hidden></p><label id="bundle-base-size-label" hidden>مقاس المنتج الأساسي <select id="bundle-base-size"><option value="">اختر مقاسك</option></select></label><label>كمية المنتج الأساسي <input id="bundle-base-qty" type="number" min="1" max="10" value="1" inputmode="numeric"></label></div><div id="bundle-shipping" aria-live="polite"></div><span>منتجك + القطع المختارة</span><strong id="bundle-total"></strong><small>المنتج الأساسي + الإضافات التي تختارها</small><button type="button" class="primary" data-action="add-bundle">أضف اختياراتي للحقيبة +</button><p id="bundle-message" role="status"></p></div></div></section>'
      + '<section class="product-story section" hidden><div><span class="eyebrow" data-role="story-label"></span><h2 data-role="story-title"></h2><p data-role="story-text"></p><p data-role="story-extra"></p></div><div class="story-image"><img loading="lazy" data-role="story-img" src="" width="1200" height="900" alt=""></div></section>'
      + '<section class="section alternatives" hidden><span class="eyebrow" data-role="alt-eyebrow">من نفس المجموعة</span><h2 data-role="alt-title">اختَر اللون اللي يشبهك.</h2><div class="product-strip" data-role="alternatives"></div></section>';
    hostWrap.appendChild(view);
    return view;
  }

  async function openProductById(id, updateHash = true) {
    const p = M.get(id);
    if (!p) return false;
    closeCart();
    const view = ensureSpaProductView();
    if (!view) return false;
    const homeView = $('#home-view');
    if (homeView) homeView.hidden = true;
    $$('.teraz-category-page > :not(#product-view)').forEach((el) => { el.hidden = true; });
    view.hidden = false;
    Page.root = view;
    doc.body.classList.remove('teraz-home');
    doc.body.classList.add('teraz-product');
    const liveEntry = Meta.forTeraz(id) || fallbackEntry(p);
    const blob = $('#teraz-product-data', view);
    if (blob) {
      blob.textContent = JSON.stringify({
        id: liveEntry.id,
        sku: p.id,
        name: p.name,
        url: liveEntry.url,
        price: liveEntry.price,
        regular_price: liveEntry.regularPrice || liveEntry.price,
        is_on_sale: false,
        is_available: liveEntry.available !== false,
        image: liveEntry.image,
        options: liveEntry.options || []
      });
    }
    setText('[data-role="product-title"]', p.name);
    setText('[data-role="crumb-name"]', p.name);
    setText('#bundle-base-name', p.name);
    const img1 = $('[data-role="primary-img"]', view);
    const img2 = $('[data-role="story-img"]', view);
    if (img1) { img1.src = liveEntry.image; img1.alt = p.name; }
    if (img2) { img2.src = liveEntry.image; img2.alt = p.name; }
    const photo = $('.primary-photo', view);
    if (photo) photo.classList.remove('detail');
    $$('[data-image-mode]', view).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.imageMode === 'full')));
    const zoom = $('[data-action="zoom"]', view);
    if (zoom) zoom.setAttribute('aria-pressed', 'false');
    const sizesHost = $('#sizes-host', view);
    if (sizesHost) sizesHost.innerHTML = '';
    const baseSelect = $('#bundle-base-size', view);
    if (baseSelect) baseSelect.innerHTML = '<option value="">اختر مقاسك</option>';
    const qty1 = $('#product-qty', view);
    const qty2 = $('#bundle-base-qty', view);
    if (qty1) qty1.value = '1';
    if (qty2) qty2.value = '1';
    const err = $('#size-error', view);
    if (err) err.textContent = '';
    Page.picks = {};
    Page.sizeFieldset = null;
    showPrice(liveEntry.price, liveEntry.regularPrice);
    if (updateHash) {
      try { root.history.pushState(null, '', '#p/' + p.id); } catch (e) { /* ignore */ }
    }
    await initProduct();
    const back = $('[data-role="back-link"]', view);
    if (back) back.setAttribute('href', '#' + p.group);
    try { root.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { root.scrollTo(0, 0); }
    return true;
  }

  function closeSpaProductView(targetHash) {
    const homeView = $('#home-view');
    const catPage = $('.teraz-category-page');
    const view = $('#product-view');
    if (!view || view.hidden || (!homeView && !catPage)) return false;
    view.hidden = true;
    if (homeView) homeView.hidden = false;
    if (catPage) $$('.teraz-category-page > :not(#product-view)').forEach((el) => { el.hidden = false; });
    doc.body.classList.add('teraz-home');
    doc.body.classList.remove('teraz-product');
    const cleanHash = String(targetHash || '').replace(/^.*#/, '');
    try { root.history.pushState(null, '', cleanHash ? '#' + cleanHash : root.location.pathname + root.location.search); } catch (e) { /* ignore */ }
    if (cleanHash && doc.getElementById(cleanHash)) {
      doc.getElementById(cleanHash).scrollIntoView({ behavior: 'smooth' });
    } else {
      try { root.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { root.scrollTo(0, 0); }
    }
    return true;
  }

  async function handleHashRoute() {
    const rawHash = decodeURIComponent((root.location.hash || '').slice(1));
    if (rawHash.startsWith('p/')) {
      const id = rawHash.slice(2);
      await openProductById(id, false);
      return;
    }
    closeSpaProductView(rawHash);
  }

  async function initCartPageAddons() {
    const host = $('#cart-page-addons');
    if (!host) return;
    let entries = cartSuggestions();
    if (!entries.length) {
      entries = M.recommendations(M.get('tuwaiq')).slice(0, 4).map((r) => Meta.forTeraz(r.id) || fallbackEntry(r));
    }
    host.innerHTML = entries.map(checkoutCardHTML).join('');
  }

  function openHashDetails() {
    const id = decodeURIComponent((root.location.hash || '').slice(1));
    if (!id) return;
    const target = doc.getElementById(id);
    if (target && target.tagName === 'DETAILS') { target.open = true; target.scrollIntoView({ behavior: 'smooth' }); }
  }

  function resolveClickedProductId(target) {
    if (!target || !target.closest) return null;
    if (target.closest('button, input, select, label, summary')) return null;
    const link = target.closest('a');
    if (link) {
      const href = link.getAttribute('href') || '';
      const hashMatch = href.match(/#p\/([\w-]+)/);
      if (hashMatch && M.get(hashMatch[1])) return hashMatch[1];
      if (link.dataset.terazLink && M.get(link.dataset.terazLink)) return link.dataset.terazLink;
      const slugMatch = href.match(/\/p\/([\w-]+)/);
      if (slugMatch && M.get(slugMatch[1])) return slugMatch[1];
    }
    const card = target.closest('.exhibit[data-teraz-id], .product-card[data-teraz-id]');
    if (card && card.dataset.terazId && M.get(card.dataset.terazId)) {
      if (link || card.classList.contains('exhibit') || target.closest('.product-image, .card-meta')) return card.dataset.terazId;
    }
    if (link) {
      const matchCard = link.closest('[data-match]');
      if (matchCard && matchCard.dataset.match && M.get(matchCard.dataset.match)) return matchCard.dataset.match;
    }
    return null;
  }

  function bindUI() {
    doc.addEventListener('click', (e) => {
      const target = e.target;
      if (!target || !target.closest) return;

      // Return from SPA product view to home/category when clicking back-link or header/footer nav
      const navLink = target.closest('a');
      if (navLink && $('#product-view') && !$('#product-view').hidden && ($('#home-view') || $('.teraz-category-page'))) {
        const href = navLink.getAttribute('href') || '';
        const isBack = navLink.matches('[data-role="back-link"]');
        const isBrand = navLink.matches('.site-header .brand, .site-footer .brand');
        const hashIdx = href.indexOf('#');
        const hashTarget = hashIdx !== -1 ? href.slice(hashIdx + 1) : '';
        if (isBack || isBrand || (hashTarget && !hashTarget.startsWith('p/') && hashTarget !== 'product-guarantee')) {
          e.preventDefault();
          e.stopPropagation();
          closeSpaProductView(hashTarget);
          const detailEl = hashTarget && doc.getElementById(decodeURIComponent(hashTarget));
          if (detailEl && detailEl.tagName === 'DETAILS') detailEl.open = true;
          return;
        }
      }

      // Open product view when clicking any product card, hero shoe, or product link
      const clickedTerazId = resolveClickedProductId(target);
      if (clickedTerazId) {
        e.preventDefault();
        e.stopPropagation();
        openProductById(clickedTerazId, true);
        return;
      }
    }, true);

    doc.addEventListener('click', (e) => {
      const link = e.target.closest && e.target.closest('a[href^="#"]');
      if (link) { const t = doc.getElementById(decodeURIComponent(link.getAttribute('href').slice(1))); if (t && t.tagName === 'DETAILS') { e.preventDefault(); t.open = true; t.scrollIntoView({ behavior: 'smooth' }); return; } }

      const button = e.target.closest && e.target.closest('button');
      if (!button) return;
      const d = button.dataset;

      if (d.sort) {
        $$('[data-sort]').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
        applySort(d.sort);
        return;
      }
      if (d.scroll) {
        const strip = $('#' + d.scroll + ' .product-strip');
        if (strip) strip.scrollBy({ left: Number(d.dir) * strip.clientWidth * 0.8, behavior: 'smooth' });
        return;
      }
      if (d.size !== undefined && button.closest('fieldset.sizes')) { setPick(button); return; }
      if (d.imageMode) {
        const photo = $('.primary-photo');
        if (!photo) return;
        photo.classList.toggle('detail', d.imageMode === 'detail');
        $$('[data-image-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
        const zoom = $('[data-action="zoom"]');
        if (zoom) zoom.setAttribute('aria-pressed', String(d.imageMode === 'detail'));
        return;
      }
      if (d.quick) { quickAdd(d.quick, button); return; }
      if (d.quantity !== undefined) {
        const line = Cart.state.items.find((l) => l.id === d.quantity);
        if (!line) return;
        const next = line.qty + Number(d.delta);
        if (next < 1) mutateLine(button, () => Cart.remove(line.id));
        else if (next > MAX_QTY) Toast.show('الحد الأقصى ' + MAX_QTY + ' قطع لكل منتج.');
        else mutateLine(button, () => Cart.update(line.id, next));
        return;
      }
      if (d.remove !== undefined) { mutateLine(button, () => Cart.remove(d.remove)); return; }

      switch (d.action) {
        case 'cart': openCart(); break;
        case 'close-cart': closeCart(); break;
        case 'browse': {
          closeCart();
          if ($('#knit')) root.location.hash = 'knit';
          else root.location.href = CFG.homeUrl.replace(/#.*$/, '') + '#knit';
          break;
        }
        case 'review': renderCart('review'); { const dlg = dialogEl(); if (dlg) dlg.scrollTop = 0; } break;
        case 'checkout': {
          setBusy(button, true);
          Cart.checkout().catch((err) => Toast.show(errorMessage(err, 'تعذّر الانتقال إلى الدفع. حاول مرة أخرى.'))).then(() => setBusy(button, false));
          break;
        }
        case 'add-product': addCurrent(false); break;
        case 'add-bundle': addCurrent(true); break;
        case 'zoom': {
          const photo = $('.primary-photo');
          if (!photo) break;
          const on = photo.classList.toggle('detail');
          button.setAttribute('aria-pressed', String(on));
          $$('[data-image-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.imageMode === (on ? 'detail' : 'full'))));
          break;
        }
        case 'notify': toggleNotify(); break;
        default: break;
      }
    });

    doc.addEventListener('submit', (e) => {
      if (e.target && e.target.id === 'notify-form') { e.preventDefault(); submitNotify(); }
    });

    // Bundle calculator + upper/lower size & quantity synchronisation.
    doc.addEventListener('change', (e) => {
      const t = e.target;
      if (t.matches('#bundle-base-size')) setBaseSizeByLabel(t.value);
      if (t.matches('.bundle-check,.match-size-select,#product-qty,#bundle-base-qty')) updateBundleTotal();
    });
    doc.addEventListener('input', (e) => {
      const t = e.target;
      if (t.matches('#product-qty,#bundle-base-qty')) {
        const other = $(t.id === 'product-qty' ? '#bundle-base-qty' : '#product-qty');
        if (other) other.value = t.value;
        updateBundleTotal();
      }
    });

    const dialog = dialogEl();
    if (dialog) dialog.addEventListener('close', () => { if (lastTrigger && lastTrigger.isConnected) lastTrigger.focus({ preventScroll: true }); });
    root.addEventListener('hashchange', () => { closeCart(); openHashDetails(); handleHashRoute(); });
    root.addEventListener('popstate', () => { closeCart(); openHashDetails(); handleHashRoute(); });
  }

  /* ======================================================================
   * Boot
   * ==================================================================== */
  Cart.onChange(() => {
    updateCartCount();
    const dialog = dialogEl();
    if (dialog && dialog.open) renderCart();
    updateBundleTotal();
  });

  async function boot() {
    if (root.__terazBooted) return;
    root.__terazBooted = true;
    bindUI();
    openHashDetails();
    const product = initProduct();   // hydrates from the Twig JSON immediately; bundle/alternatives wait for the SDK
    const home = (async () => { tagCardsWithTeraz(doc); if ($('#home-view')) { applySort('thobe'); wireHeroPeek(); } await whenSallaReady(); await initHome(); })();
    const s = await whenSallaReady();
    if (s) { Cart.bindEvents(); await Cart.refresh(); }
    await Promise.all([product, home]);
    await handleHashRoute();
    await initCartPageAddons();
    await Promise.all($$('#category-teraz-grid[data-group]').map(fillStrip));
  }

  root.TerazController = Object.freeze({ Cart, Commerce, Page, openCart, closeCart, renderCart, applySort, openProductById, closeSpaProductView, boot });

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
})(typeof window !== 'undefined' ? window : globalThis);
