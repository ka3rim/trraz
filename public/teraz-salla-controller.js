/*
  TERAZ store settings — the one file to edit before launch.
  Every value marked "CONFIRM" is a placeholder chosen during the review and must be checked.
*/
window.TERAZ_CONFIG = {
  currency: 'SAR',

  // Shipping
  shippingFee: 29,
  freeShippingThreshold: 449,        // free delivery above 449 SAR (owner's decision)
  deliveryDays: '2 إلى 4',               // CONFIRM with your courier (working days, main cities)

  // Offers
  bundles: {
    starter: { price: 389, name: 'طقم البداية', includes: 'الجزمة، وشراب بلونها، وعدة التنظيف، وبخاخ العزل' },
    pair2:   { price: 579, name: 'لونين',       includes: 'جزمتين بلونين' }
  },
  sockAddonPrice: 39,                // one socks pack per shoe in the bag, instead of 59

  // Policy
  firstExchangeFree: true,           // Teraz pays shipping on the first size exchange (per the cost sheet)
  returnDays: 14,
  exchangeDays: 20,

  // Payment methods shown as text chips (no BNPL by decision). CONFIRM what Salla has enabled.
  payments: ['مدى', 'Apple Pay', 'فيزا / ماستركارد', 'STC Pay'],

  // Contact & legal — leave empty to hide
  whatsapp: '+966570442661',         // WhatsApp contact number
  crNumber: '',                      // السجل التجاري
  vatNumber: '',                     // الرقم الضريبي
  maroofUrl: '',                     // رابط معروف / المركز السعودي للأعمال

  // Social proof — only real figures. Leave null to hide.
  customerCount: null,               // e.g. 1200 → "+1,200 عميل"

  // Size chart (EU size → foot length in cm). CONFIRM against the factory chart.
  sizeChart: [
    { eu: '40', cm: '25.3' },
    { eu: '41', cm: '26.0' },
    { eu: '42', cm: '26.7' },
    { eu: '43', cm: '27.3' },
    { eu: '44', cm: '28.0' },
    { eu: '45', cm: '28.7' }
  ],

  // Ad pixels — paste IDs to activate. On the live Salla store prefer Salla's built-in pixel settings.
  pixels: { meta: '', snap: '', tiktok: '', ga4: '' }
};

;
/*
  Customer reviews (voice notes + written reviews).
  To use real WhatsApp/customer voice notes, place your audio files (.mp3, .ogg, .m4a, .wav)
  in assets/ and set the `src` property on each item in `voice` below.
  Leave `voice` and `items` empty to hide all review sections across the site.

  Shape:
  window.TERAZ_REVIEWS = {
    summary: { rating: 4.9, count: 214, fit: { small: 6, true: 88, large: 6 } },
    voice: [
      {
        id: 'v1',
        title: 'رسالة صوتية',
        name: 'عبدالله',
        city: 'الرياض',
        product: 'عتيم الليل',
        duration: 11,
        src: '' // e.g. 'assets/voice-1.mp3'
      }
    ],
    items: [
      { name: 'عبدالله', city: 'الرياض', rating: 5, product: 'night', size: '42',
        text: 'نص التقييم كما كتبه العميل', photo: 'assets/reviews/r1.webp', date: '2026-10-01' }
    ]
  };
*/
window.TERAZ_REVIEWS = {
  summary: null,
  voice: [
    {
      id: 'v1',
      title: 'رسالة صوتية',
      name: 'عبدالله',
      city: 'الرياض',
      product: 'عتيم الليل',
      duration: 11,
      src: '',
      peaks: [35, 62, 48, 80, 55, 92, 44, 75, 88, 50, 68, 95, 60, 82, 45, 72, 90, 52, 78, 64, 85, 42, 70, 58, 86, 48, 66, 40]
    },
    {
      id: 'v2',
      title: 'رسالة صوتية',
      name: 'سلطان',
      city: 'جدة',
      product: 'سمر العود',
      duration: 16,
      src: '',
      peaks: [42, 70, 85, 52, 64, 90, 76, 48, 82, 94, 58, 72, 45, 88, 66, 78, 50, 92, 62, 80, 54, 74, 86, 46, 68, 55, 75, 38]
    },
    {
      id: 'v3',
      title: 'رسالة صوتية',
      name: 'فهد',
      city: 'الدمام',
      product: 'مقناص طويق',
      duration: 14,
      src: '',
      peaks: [50, 78, 44, 86, 92, 60, 74, 52, 88, 65, 96, 48, 72, 84, 56, 70, 90, 42, 76, 62, 82, 54, 68, 80, 46, 74, 52, 36]
    },
    {
      id: 'v4',
      title: 'رسالة صوتية',
      name: 'محمد',
      city: 'الرياض',
      product: 'لوفر الكشخة',
      duration: 9,
      src: '',
      peaks: [38, 66, 82, 58, 90, 46, 74, 88, 54, 78, 95, 62, 48, 84, 70, 52, 86, 64, 92, 50, 72, 60, 80, 44, 68, 56, 48, 34]
    },
    {
      id: 'v5',
      title: 'رسالة صوتية',
      name: 'نايف',
      city: 'القصيم',
      product: 'غصن الرمث',
      duration: 19,
      src: '',
      peaks: [46, 74, 60, 88, 52, 94, 68, 44, 80, 90, 56, 72, 84, 48, 92, 64, 76, 50, 86, 58, 70, 82, 42, 78, 62, 54, 66, 40]
    }
  ],
  items: []
};

;
window.TERAZ_CATALOG=[
  {
    "id": "tuwaiq",
    "name": "ثرى طويق",
    "image": "beige-white.webp",
    "color": "بيج دافئ، بني، وأبيض",
    "headline": "هدوء الرمل. وحضورك واضح.",
    "description": "لون بيج دافئ يخفف حدة الإطلالة، وتفاصيل بنية تعطي النسيج عمقًا. ثرى طويق يناسبك إذا تبي جزمة سهلة التنسيق، بطابع مرتب مع الثوب أو لبس نهاية الأسبوع.",
    "styling": "البيج ينسجم مع الأبيض والألوان الترابية، والقاعدة البيضاء تمنح التصميم تباينًا خفيفًا. اختره مع كاب بيج وشراب موكا لإطلالة متقاربة الألوان.",
    "pair": [
      "caps-3",
      "socks-2"
    ],
    "group": "knit",
    "price": 319,
    "priceNote": "السعر المعتمد",
    "verified": true,
    "materials": "نسيج من خيوط البوليستر 100% مع تفاصيل من الجلد الطبيعي. قاعدة من البولي يوريثان، وفرشة من رغوة البولي يوريثان مغطاة بطبقة من جلد الماعز الطبيعي.",
    "fit": "اطلب مقاسك المعتاد، وإذا كنت بين مقاسين اختر الأصغر.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. أزل الغبار بفرشاة ناعمة، وتجنب الغمر بالماء أو التجفيف بحرارة مباشرة. اختبر أي منظف على جزء غير ظاهر أولًا.",
    "thumb": "beige-white.webp"
  },
  {
    "id": "badr",
    "name": "ظل البدر",
    "image": "black-white.webp",
    "color": "أسود مع قاعدة بيضاء",
    "headline": "حضور الأسود. بخفة الأبيض.",
    "description": "إذا تبي جزمة سوداء بطابع أخف على العين، ظل البدر يجمع الجزء العلوي الأسود مع قاعدة بيضاء واضحة. تلبسه مع الثوب الأبيض، وتكمل فيه يومك بلبس كاجوال دون تغيير أسلوبك.",
    "styling": "التباين بين الأسود والأبيض هو شخصية هذا الموديل. الكاب والشراب الأسود يكملان التناسق ويتركان القاعدة البيضاء تفصيلته الأوضح.",
    "pair": [
      "caps-0",
      "socks-0"
    ],
    "group": "knit",
    "price": 319,
    "priceNote": "السعر المعتمد",
    "verified": true,
    "materials": "نسيج من خيوط البوليستر 100% مع تفاصيل من الجلد الطبيعي. قاعدة من البولي يوريثان، وفرشة من رغوة البولي يوريثان مغطاة بطبقة من جلد الماعز الطبيعي.",
    "fit": "اطلب مقاسك المعتاد، وإذا كنت بين مقاسين اختر الأصغر.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. أزل الغبار بفرشاة ناعمة، وتجنب الغمر بالماء أو التجفيف بحرارة مباشرة. اختبر أي منظف على جزء غير ظاهر أولًا.",
    "thumb": "black-white.webp"
  },
  {
    "id": "night",
    "name": "عتيم الليل",
    "image": "black.webp",
    "color": "أسود بالكامل",
    "headline": "أناقة ما تحتاج ترفع صوتها.",
    "description": "من الرباط إلى القاعدة، أسود متصل يعطي إطلالتك شكلًا متماسكًا. عتيم الليل لك إذا تفضّل تفاصيل قليلة، وحضورًا هادئًا يناسب الثوب واللبس اليومي.",
    "styling": "خيارك الأول للثوب في ترتيب طراز. نسّقه مع الكاب والشراب الأسود لتحافظ على امتداد اللون من أعلى الإطلالة إلى آخر خطوة.",
    "pair": [
      "caps-0",
      "socks-0"
    ],
    "group": "knit",
    "price": 319,
    "priceNote": "السعر المعتمد",
    "verified": true,
    "materials": "نسيج من خيوط البوليستر 100% مع تفاصيل من الجلد الطبيعي. قاعدة من البولي يوريثان، وفرشة من رغوة البولي يوريثان مغطاة بطبقة من جلد الماعز الطبيعي.",
    "fit": "اطلب مقاسك المعتاد، وإذا كنت بين مقاسين اختر الأصغر.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. أزل الغبار بفرشاة ناعمة، وتجنب الغمر بالماء أو التجفيف بحرارة مباشرة. اختبر أي منظف على جزء غير ظاهر أولًا.",
    "thumb": "black.webp"
  },
  {
    "id": "oud",
    "name": "عتيق العود",
    "image": "brown-white.webp",
    "color": "بني غني مع قاعدة بيضاء",
    "headline": "دفء اللون، ووقار التفاصيل.",
    "description": "بني غني يبرز ملمس النسيج والجلد الطبيعي، وقاعدة بيضاء تمنح الإطلالة مساحة من الضوء. عتيق العود يضيف دفئًا للثوب، ويجمع الألوان الترابية في لبسك اليومي.",
    "styling": "البني ينسجم مع درجات الرمل والبيج. كاب رملي مع شراب بني يكمل هذا الدفء دون أن تكون كل التفاصيل بلون واحد.",
    "pair": [
      "caps-1",
      "socks-1"
    ],
    "group": "knit",
    "price": 319,
    "priceNote": "السعر المعتمد",
    "verified": true,
    "materials": "نسيج من خيوط البوليستر 100% مع تفاصيل من الجلد الطبيعي. قاعدة من البولي يوريثان، وفرشة من رغوة البولي يوريثان مغطاة بطبقة من جلد الماعز الطبيعي.",
    "fit": "اطلب مقاسك المعتاد، وإذا كنت بين مقاسين اختر الأصغر.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. أزل الغبار بفرشاة ناعمة، وتجنب الغمر بالماء أو التجفيف بحرارة مباشرة. اختبر أي منظف على جزء غير ظاهر أولًا.",
    "thumb": "brown-white.webp"
  },
  {
    "id": "ramth",
    "name": "غصن الرمث",
    "image": "olive.webp",
    "color": "زيتي، بني، وأبيض",
    "headline": "لون من الأرض. لإطلالة مختلفة.",
    "description": "الزيتي مع التفاصيل البنية يقدّم بديلًا هادئًا عن الأسود والبيج. غصن الرمث يضيف شخصية إلى لبسك اليومي، وتبقى قاعدته البيضاء واضحة وخفيفة في التنسيق.",
    "styling": "اخترناه أولًا في ترتيب المشي الذي اعتمدته طراز. الكاب والشراب الزيتوني يربطان الإطلالة ببعضها، خصوصًا مع الملابس المحايدة.",
    "pair": [
      "caps-2",
      "socks-3"
    ],
    "group": "knit",
    "price": 319,
    "priceNote": "السعر المعتمد",
    "verified": true,
    "materials": "نسيج من خيوط البوليستر 100% مع تفاصيل من الجلد الطبيعي. قاعدة من البولي يوريثان، وفرشة من رغوة البولي يوريثان مغطاة بطبقة من جلد الماعز الطبيعي.",
    "fit": "اطلب مقاسك المعتاد، وإذا كنت بين مقاسين اختر الأصغر.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. أزل الغبار بفرشاة ناعمة، وتجنب الغمر بالماء أو التجفيف بحرارة مباشرة. اختبر أي منظف على جزء غير ظاهر أولًا.",
    "thumb": "olive.webp"
  },
  {
    "id": "evening",
    "name": "سكون المساء",
    "image": "gray.webp",
    "color": "رمادي مع قاعدة سوداء",
    "headline": "تدرّج هادئ. وتفاصيل محسوبة.",
    "description": "رمادي يوضح نقشة النسيج، مع جلد وقاعدة داكنين يحددان شكل الجزمة. سكون المساء يجمع هدوء اللون مع فرق واضح في الملمس؛ لدوامك والطلعات اليومية.",
    "styling": "مع الأبيض والأسود والرمادي، يبقى التنسيق بسيطًا. أضف كابًا وشرابًا أسودين لربط القاعدة الداكنة ببقية الإطلالة.",
    "pair": [
      "caps-0",
      "socks-0"
    ],
    "group": "knit",
    "price": 319,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "نسيج محاك بنقشة واضحة، وتفاصيل جلدية حول الرباط والخلف. تباين الخامات يبرز التصميم ويكمل كشختك.",
    "fit": "جرّب الحذاء داخل المنزل مع الشراب الذي تلبسه عادة، وتأكد من المقاس قبل الاستخدام الخارجي.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. أزل الغبار بفرشاة ناعمة، وتجنب الغمر بالماء أو التجفيف بحرارة مباشرة. اختبر أي منظف على جزء غير ظاهر أولًا.",
    "thumb": "gray.webp"
  },
  {
    "id": "dahna",
    "name": "أرض الدهناء",
    "image": "beige.webp",
    "color": "بيج مع قاعدة بنية",
    "headline": "من درجات الرمل، على طرازك.",
    "description": "قماش بيج محاك فوق قاعدة بنية كاملة، وتفاصيل جلدية حول الرباط والخلف. أرض الدهناء يمنحك فرقًا واضحًا بين لون النسيج وعمق القاعدة، بإطلالة ترابية متناسقة.",
    "styling": "يبرز مع الثوب الأبيض والملابس بدرجات الكريم. الكاب البيج والشراب الموكا يكملان هذا التدرّج الدافئ.",
    "pair": [
      "caps-3",
      "socks-2"
    ],
    "group": "knit",
    "price": 319,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "نسيج محاك بنقشة واضحة، وتفاصيل جلدية حول الرباط والخلف. تباين الخامات يبرز التصميم ويكمل كشختك.",
    "fit": "جرّب الحذاء داخل المنزل مع الشراب الذي تلبسه عادة، وتأكد من المقاس قبل الاستخدام الخارجي.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. أزل الغبار بفرشاة ناعمة، وتجنب الغمر بالماء أو التجفيف بحرارة مباشرة. اختبر أي منظف على جزء غير ظاهر أولًا.",
    "thumb": "beige.webp"
  },
  {
    "id": "coffee",
    "name": "حمسة البنّ",
    "image": "brown.webp",
    "color": "بني بالكامل",
    "headline": "لون غني، من أول تفصيلة.",
    "description": "بني متصل من النسيج إلى القاعدة، مع اختلاف الملمس بين القماش والجلد. حمسة البنّ لك إذا تحب عمق اللون الواحد وتبي تنسيقًا هادئًا مع الثوب والكاجوال.",
    "styling": "تأتي ثانيًا في ترتيب الثوب المعتمد لطراز. جرّبها مع كاب رملي وشراب بني، ليبقى البني أساس الإطلالة وتفتح الدرجة الرملية تفاصيلها.",
    "pair": [
      "caps-1",
      "socks-1"
    ],
    "group": "knit",
    "price": 319,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "نسيج محاك بنقشة واضحة، وتفاصيل جلدية حول الرباط والخلف. تباين الخامات يبرز التصميم ويكمل كشختك.",
    "fit": "جرّب الحذاء داخل المنزل مع الشراب الذي تلبسه عادة، وتأكد من المقاس قبل الاستخدام الخارجي.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. أزل الغبار بفرشاة ناعمة، وتجنب الغمر بالماء أو التجفيف بحرارة مباشرة. اختبر أي منظف على جزء غير ظاهر أولًا.",
    "thumb": "brown.webp"
  },
  {
    "id": "caps-0",
    "name": "كاب طراز أسود",
    "family": "كاب طراز",
    "image": "caps-0.webp",
    "color": "أسود",
    "headline": "تفصيلة سوداء تضبط الإطلالة.",
    "description": "كاب قابل للطي يرافق مشوارك وينحط بسهولة في شنطتك. لونه مختار ليتناسق مع عائلة ألوان جزم طراز، وتفاصيله الهادئة تكمل لبسك بدون زحمة.",
    "styling": "خذ لونًا من جزمتك وكرره في الكاب. تطلع الإطلالة مترابطة بدون تكلف.",
    "group": "caps",
    "price": 79,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "تصميم قابل للطي، بمقاس واحد، وألوان تنسجم مع مجموعة أحذية طراز.",
    "fit": "مقاس واحد يناسب الكل.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. تجنب الحرارة المباشرة أو استخدام منظفات قوية دون تعليمات المنتج.",
    "thumb": "caps-0.webp"
  },
  {
    "id": "caps-1",
    "name": "كاب طراز رملي",
    "family": "كاب طراز",
    "image": "caps-1.webp",
    "color": "رملي",
    "headline": "درجة دافئة تكمّل البني.",
    "description": "كاب قابل للطي يرافق مشوارك وينحط بسهولة في شنطتك. لونه مختار ليتناسق مع عائلة ألوان جزم طراز، وتفاصيله الهادئة تكمل لبسك بدون زحمة.",
    "styling": "خذ لونًا من جزمتك وكرره في الكاب. تطلع الإطلالة مترابطة بدون تكلف.",
    "group": "caps",
    "price": 79,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "تصميم قابل للطي، بمقاس واحد، وألوان تنسجم مع مجموعة أحذية طراز.",
    "fit": "مقاس واحد يناسب الكل.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. تجنب الحرارة المباشرة أو استخدام منظفات قوية دون تعليمات المنتج.",
    "thumb": "caps-1.webp"
  },
  {
    "id": "caps-2",
    "name": "كاب طراز زيتوني",
    "family": "كاب طراز",
    "image": "caps-2.webp",
    "color": "زيتوني",
    "headline": "امتداد هادئ للزيتي.",
    "description": "كاب قابل للطي يرافق مشوارك وينحط بسهولة في شنطتك. لونه مختار ليتناسق مع عائلة ألوان جزم طراز، وتفاصيله الهادئة تكمل لبسك بدون زحمة.",
    "styling": "خذ لونًا من جزمتك وكرره في الكاب. تطلع الإطلالة مترابطة بدون تكلف.",
    "group": "caps",
    "price": 79,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "تصميم قابل للطي، بمقاس واحد، وألوان تنسجم مع مجموعة أحذية طراز.",
    "fit": "مقاس واحد يناسب الكل.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. تجنب الحرارة المباشرة أو استخدام منظفات قوية دون تعليمات المنتج.",
    "thumb": "caps-2.webp"
  },
  {
    "id": "caps-3",
    "name": "كاب طراز بيج",
    "family": "كاب طراز",
    "image": "caps-3.webp",
    "color": "بيج",
    "headline": "خفّة اللون، وأناقة التفصيل.",
    "description": "كاب قابل للطي يرافق مشوارك وينحط بسهولة في شنطتك. لونه مختار ليتناسق مع عائلة ألوان جزم طراز، وتفاصيله الهادئة تكمل لبسك بدون زحمة.",
    "styling": "خذ لونًا من جزمتك وكرره في الكاب. تطلع الإطلالة مترابطة بدون تكلف.",
    "group": "caps",
    "price": 79,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "تصميم قابل للطي، بمقاس واحد، وألوان تنسجم مع مجموعة أحذية طراز.",
    "fit": "مقاس واحد يناسب الكل.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. تجنب الحرارة المباشرة أو استخدام منظفات قوية دون تعليمات المنتج.",
    "thumb": "caps-3.webp"
  },
  {
    "id": "socks-0",
    "name": "شرابات الأناقة أسود",
    "family": "شرابات الأناقة",
    "hex": "#1f1e1c",
    "image": "socks-0.webp",
    "color": "أسود",
    "headline": "الأساس اللي يكمّل الداكن.",
    "description": "شرابات طويلة وخفيفة من ألياف البامبو، بثلاثة أزواج في الباك، ومقاس واحد. لونها يكمل جزمتك ويمنحك خيارًا مرتبًا مع اللبس الرسمي واليومي.",
    "styling": "قرّب لون الشراب من الجزمة أو البنطلون؛ يعطي التنسيق امتدادًا أهدأ.",
    "group": "socks",
    "price": 59,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "نسيج خفيف من ألياف البامبو، في باك من 3 أزواج بمقاس واحد. ألوان مختارة لتكمل مجموعة الأناقة.",
    "fit": "مقاس واحد يناسب الكل.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. تجنب الحرارة المباشرة أو استخدام منظفات قوية دون تعليمات المنتج.",
    "thumb": "socks-0.webp"
  },
  {
    "id": "socks-1",
    "name": "شرابات الأناقة بني",
    "family": "شرابات الأناقة",
    "hex": "#4b3626",
    "image": "socks-1.webp",
    "color": "بني",
    "headline": "تناسق يمتد إلى آخر خطوة.",
    "description": "شرابات طويلة وخفيفة من ألياف البامبو، بثلاثة أزواج في الباك، ومقاس واحد. لونها يكمل جزمتك ويمنحك خيارًا مرتبًا مع اللبس الرسمي واليومي.",
    "styling": "قرّب لون الشراب من الجزمة أو البنطلون؛ يعطي التنسيق امتدادًا أهدأ.",
    "group": "socks",
    "price": 59,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "نسيج خفيف من ألياف البامبو، في باك من 3 أزواج بمقاس واحد. ألوان مختارة لتكمل مجموعة الأناقة.",
    "fit": "مقاس واحد يناسب الكل.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. تجنب الحرارة المباشرة أو استخدام منظفات قوية دون تعليمات المنتج.",
    "thumb": "socks-1.webp"
  },
  {
    "id": "socks-2",
    "name": "شرابات الأناقة موكا",
    "family": "شرابات الأناقة",
    "hex": "#8b715a",
    "image": "socks-2.webp",
    "color": "موكا",
    "headline": "دفء خفيف مع درجات الرمل.",
    "description": "شرابات طويلة وخفيفة من ألياف البامبو، بثلاثة أزواج في الباك، ومقاس واحد. لونها يكمل جزمتك ويمنحك خيارًا مرتبًا مع اللبس الرسمي واليومي.",
    "styling": "قرّب لون الشراب من الجزمة أو البنطلون؛ يعطي التنسيق امتدادًا أهدأ.",
    "group": "socks",
    "price": 59,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "نسيج خفيف من ألياف البامبو، في باك من 3 أزواج بمقاس واحد. ألوان مختارة لتكمل مجموعة الأناقة.",
    "fit": "مقاس واحد يناسب الكل.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. تجنب الحرارة المباشرة أو استخدام منظفات قوية دون تعليمات المنتج.",
    "thumb": "socks-2.webp"
  },
  {
    "id": "socks-3",
    "name": "شرابات الأناقة زيتوني",
    "family": "شرابات الأناقة",
    "hex": "#555b3d",
    "image": "socks-3.webp",
    "color": "زيتوني",
    "headline": "تفصيلة متناسقة مع الزيتي.",
    "description": "شرابات طويلة وخفيفة من ألياف البامبو، بثلاثة أزواج في الباك، ومقاس واحد. لونها يكمل جزمتك ويمنحك خيارًا مرتبًا مع اللبس الرسمي واليومي.",
    "styling": "قرّب لون الشراب من الجزمة أو البنطلون؛ يعطي التنسيق امتدادًا أهدأ.",
    "group": "socks",
    "price": 59,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "نسيج خفيف من ألياف البامبو، في باك من 3 أزواج بمقاس واحد. ألوان مختارة لتكمل مجموعة الأناقة.",
    "fit": "مقاس واحد يناسب الكل.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. تجنب الحرارة المباشرة أو استخدام منظفات قوية دون تعليمات المنتج.",
    "thumb": "socks-3.webp"
  },
  {
    "id": "clogs-0",
    "name": "خفّ الكشخة أسود",
    "family": "خفّ الكشخة",
    "image": "clogs-0.webp",
    "color": "أسود",
    "headline": "للمشوار السريع، بطرازك.",
    "description": "مقدمة مغلقة وخلف مفتوح لسهولة اللبس، مع إبزيم ظاهر يحدد شخصية التصميم. اختَر خفّ الكشخة لمشوارك القريب أو جلستك في البيت، بلون يكمل لبسك اليومي.",
    "styling": "نسّقه مع ألوان محايدة وخله تفصيلتك للمشاوير البسيطة.",
    "group": "clogs",
    "price": 129,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "مقدمة مغلقة وخلف مفتوح لسهولة اللبس، مع إبزيم وتفاصيل بلون يكمّل مشاويرك اليومية.",
    "fit": "اختر مقاسك وجرّب الخفّ داخل المنزل قبل الاستخدام الخارجي.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. تجنب الحرارة المباشرة أو استخدام منظفات قوية دون تعليمات المنتج.",
    "thumb": "clogs-0.webp"
  },
  {
    "id": "clogs-1",
    "name": "خفّ الكشخة جملي",
    "family": "خفّ الكشخة",
    "image": "clogs-1.webp",
    "color": "جملي",
    "headline": "دفء الجملي في تفاصيل يومك.",
    "description": "مقدمة مغلقة وخلف مفتوح لسهولة اللبس، مع إبزيم ظاهر يحدد شخصية التصميم. اختَر خفّ الكشخة لمشوارك القريب أو جلستك في البيت، بلون يكمل لبسك اليومي.",
    "styling": "نسّقه مع ألوان محايدة وخله تفصيلتك للمشاوير البسيطة.",
    "group": "clogs",
    "price": 129,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "مقدمة مغلقة وخلف مفتوح لسهولة اللبس، مع إبزيم وتفاصيل بلون يكمّل مشاويرك اليومية.",
    "fit": "اختر مقاسك وجرّب الخفّ داخل المنزل قبل الاستخدام الخارجي.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. تجنب الحرارة المباشرة أو استخدام منظفات قوية دون تعليمات المنتج.",
    "thumb": "clogs-1.webp"
  },
  {
    "id": "clogs-2",
    "name": "خفّ الكشخة زيتوني",
    "family": "خفّ الكشخة",
    "image": "clogs-2.webp",
    "color": "زيتوني",
    "headline": "لون هادئ لوقتك الخفيف.",
    "description": "مقدمة مغلقة وخلف مفتوح لسهولة اللبس، مع إبزيم ظاهر يحدد شخصية التصميم. اختَر خفّ الكشخة لمشوارك القريب أو جلستك في البيت، بلون يكمل لبسك اليومي.",
    "styling": "نسّقه مع ألوان محايدة وخله تفصيلتك للمشاوير البسيطة.",
    "group": "clogs",
    "price": 129,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "مقدمة مغلقة وخلف مفتوح لسهولة اللبس، مع إبزيم وتفاصيل بلون يكمّل مشاويرك اليومية.",
    "fit": "اختر مقاسك وجرّب الخفّ داخل المنزل قبل الاستخدام الخارجي.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. تجنب الحرارة المباشرة أو استخدام منظفات قوية دون تعليمات المنتج.",
    "thumb": "clogs-2.webp"
  },
  {
    "id": "clogs-3",
    "name": "خفّ الكشخة بيج",
    "family": "خفّ الكشخة",
    "image": "clogs-3.webp",
    "color": "بيج",
    "headline": "ببساطة البيج، وراحة الاختيار.",
    "description": "مقدمة مغلقة وخلف مفتوح لسهولة اللبس، مع إبزيم ظاهر يحدد شخصية التصميم. اختَر خفّ الكشخة لمشوارك القريب أو جلستك في البيت، بلون يكمل لبسك اليومي.",
    "styling": "نسّقه مع ألوان محايدة وخله تفصيلتك للمشاوير البسيطة.",
    "group": "clogs",
    "price": 129,
    "priceNote": "السعر المعتمد",
    "verified": false,
    "materials": "مقدمة مغلقة وخلف مفتوح لسهولة اللبس، مع إبزيم وتفاصيل بلون يكمّل مشاويرك اليومية.",
    "fit": "اختر مقاسك وجرّب الخفّ داخل المنزل قبل الاستخدام الخارجي.",
    "care": "اتبع تعليمات العناية المرفقة بالمنتج. تجنب الحرارة المباشرة أو استخدام منظفات قوية دون تعليمات المنتج.",
    "thumb": "clogs-3.webp"
  },
  {
    "id": "cleaning-kit",
    "name": "مجموعة تنظيف الجزم",
    "image": "cleaning-kit.webp",
    "color": "فوم 100 مل + فرشاة + منشفة",
    "group": "care",
    "price": 29,
    "priceNote": "السعر المعتمد",
    "headline": "كشختك تبدأ بجزمة نظيفة.",
    "description": "لأن نظافة الجزمة من تمام كشختك. مجموعة عناية تجمع فوم تنظيف بحجم 100 مل، وفرشاة ومنشفة؛ أدواتك الأساسية لتنظيف جزمتك والعناية بتفاصيلها في مكان واحد.",
    "materials": "تحتوي المجموعة على: فوم تنظيف 100 مل، فرشاة تنظيف، ومنشفة للمسح والتجفيف.",
    "styling": "نظّف جزمتك أولًا، ثم استخدم بخاخ عزل الماء على الخامات المناسبة بعد جفافها، وفق تعليمات العبوة.",
    "fit": "مجموعة من 3 قطع",
    "care": "أزل الغبار السطحي، ثم استخدم الفوم والفرشاة وفق تعليمات العبوة وامسح بالمنشفة. اختبر على جزء مخفي أولًا وتحقق من ملاءمة المنتج لخامة جزمتك.",
    "thumb": "cleaning-kit.webp"
  },
  {
    "id": "water-shield",
    "name": "بخاخ عزل الماء",
    "image": "water-shield.webp",
    "color": "100 مل",
    "group": "care",
    "price": 29,
    "priceNote": "السعر المعتمد",
    "headline": "حماية لجزمتك. واهتمام بكشختك.",
    "description": "بخاخ عزل الماء بحجم 100 مل يساعد على حماية سطح جزمتك من الماء ورذاذ السوائل اليومي. حماية تدوم حتى شهر حسب الاستخدام؛ جدّدها عند الحاجة وخلّ العناية جزءًا من روتينك.",
    "materials": "عبوة بخاخ عزل الماء بحجم 100 مل. مدة الحماية حتى شهر، وتتغير حسب الاستخدام والتعرض للماء والتنظيف.",
    "styling": "استخدمه بعد تنظيف الجزمة وجفافها، وجدّد الحماية حسب الاستخدام وتعليمات العبوة.",
    "fit": "عبوة 100 مل",
    "care": "تحقق من ملاءمته لخامة الجزمة واختبره على جزء مخفي. رش وفق تعليمات العبوة على سطح نظيف وجاف وفي مكان جيد التهوية، واتركه يجف تمامًا قبل اللبس. لا يعني العزل ملاءمة غمر الجزمة بالماء.",
    "thumb": "water-shield.webp"
  },
  {
    "id": "care-pack",
    "name": "طقم العناية",
    "image": "care-pack.webp",
    "color": "عدة التنظيف وبخاخ العزل",
    "group": "care",
    "price": 49,
    "compareAt": 58,
    "priceNote": "السعر المعتمد",
    "headline": "نظّفها واحمها، بطقم واحد.",
    "description": "عدة التنظيف (فوم 100 مل وفرشاة ومنشفة) مع بخاخ عزل الموية 100 مل، مع بعض وبسعر أوفر. نظّف جزمتك، خلها تنشف، ورش عليها وانت مرتاح.",
    "materials": "يحتوي الطقم على: فوم تنظيف 100 مل، فرشاة، منشفة، وبخاخ عزل ماء 100 مل.",
    "styling": "نظّف أولًا، ثم استخدم بخاخ العزل على جزمة نظيفة وجافة وفق تعليمات العبوة.",
    "fit": "طقم من 4 قطع",
    "care": "اتبع تعليمات كل عبوة واختبر على جزء مخفي أولًا.",
    "parts": [
      "cleaning-kit",
      "water-shield"
    ],
    "thumb": "care-pack.webp"
  },
  {
    "id": "mule-0",
    "name": "لوفر الكشخة أسود",
    "family": "لوفر الكشخة",
    "image": "mule-0-life.webp",
    "images": [
      "mule-0-life.webp",
      "mule-group.webp"
    ],
    "photo": true,
    "color": "أسود",
    "group": "mule",
    "price": 229,
    "priceNote": "السعر المعتمد",
    "headline": "أسود يمشي مع كل شي.",
    "description": "لوفر خلفه مفتوح، تدخل رجلك وتطلع بدون لا تنحني ولا تربط. ملمسه سويدي ناعم وحزامه كلاسيكي، يمشي مع الثوب في المشاوير ومع الجينز في الطلعات.",
    "materials": "سطح بملمس سويدي، خياطة ظاهرة حول المقدمة، فرشة مبطنة تقدر تطلعها، ونعل خفيف.",
    "styling": "البسه مع شراب أسود أو رمادي غامق، أو مع ثوب أبيض يبيّن لونه.",
    "fit": "خذ مقاسك المعتاد. خلفه مفتوح فيريحك أكثر.",
    "care": "امسحه بفرشاة ناعمة ناشفة، وبعّده عن الموية. بخاخ العزل يحميه أكثر.",
    "thumb": "mule-0-life.webp"
  },
  {
    "id": "mule-1",
    "name": "لوفر الكشخة بيج",
    "family": "لوفر الكشخة",
    "image": "mule-1-detail.webp",
    "images": [
      "mule-1-detail.webp",
      "mule-1-life.webp",
      "mule-group.webp"
    ],
    "photo": true,
    "color": "بيج",
    "group": "mule",
    "price": 229,
    "priceNote": "السعر المعتمد",
    "headline": "بيج يفتح النفس.",
    "description": "لوفر خلفه مفتوح، تدخل رجلك وتطلع بدون لا تنحني ولا تربط. ملمسه سويدي ناعم وحزامه كلاسيكي، يمشي مع الثوب في المشاوير ومع الجينز في الطلعات.",
    "materials": "سطح بملمس سويدي، خياطة ظاهرة حول المقدمة، فرشة مبطنة تقدر تطلعها، ونعل خفيف.",
    "styling": "مع شراب أبيض وجينز فاتح، أو مع الثوب لمشوار القهوة.",
    "fit": "خذ مقاسك المعتاد. خلفه مفتوح فيريحك أكثر.",
    "care": "امسحه بفرشاة ناعمة ناشفة، وبعّده عن الموية. بخاخ العزل يحميه أكثر.",
    "thumb": "mule-1-detail.webp"
  },
  {
    "id": "mule-2",
    "name": "لوفر الكشخة رمادي",
    "family": "لوفر الكشخة",
    "image": "mule-2-life.webp",
    "images": [
      "mule-2-life.webp",
      "mule-group.webp"
    ],
    "photo": true,
    "color": "رمادي",
    "group": "mule",
    "price": 229,
    "priceNote": "السعر المعتمد",
    "headline": "رمادي رايق لكل مشوار.",
    "description": "لوفر خلفه مفتوح، تدخل رجلك وتطلع بدون لا تنحني ولا تربط. ملمسه سويدي ناعم وحزامه كلاسيكي، يمشي مع الثوب في المشاوير ومع الجينز في الطلعات.",
    "materials": "سطح بملمس سويدي، خياطة ظاهرة حول المقدمة، فرشة مبطنة تقدر تطلعها، ونعل خفيف.",
    "styling": "مع شراب أبيض وجينز، ويركب حلو مع الثوب الأبيض والرمادي.",
    "fit": "خذ مقاسك المعتاد. خلفه مفتوح فيريحك أكثر.",
    "care": "امسحه بفرشاة ناعمة ناشفة، وبعّده عن الموية. بخاخ العزل يحميه أكثر.",
    "thumb": "mule-2-life.webp"
  }
];
;
/*
  Pricing and cart maths. No DOM access; tested in Node by test-commerce.cjs.

  Cart line: { id, size, qty }
    product:          id = catalog id                    size = '42' or 'مقاس واحد'
    starter bundle:   id = 'bundle:starter:<shoeId>'     size = '42'
    two-pairs bundle: id = 'bundle:pair2:<shoeA>+<shoeB>' size = '42/43'
*/
(function (scope) {
  const DEFAULTS = {
    shippingFee: 29,
    freeShippingThreshold: 449,
    sockAddonPrice: 39,
    bundles: { starter: { price: 389, name: 'طقم البداية' }, pair2: { price: 579, name: 'لونين' } }
  };

  // Knit collection order per use (index = catalog position of the 8 knit shoes)
  const ranks = { thobe: [7, 6, 1, 5, 8, 4, 3, 2], casual: [1, 2, 8, 7, 3, 4, 5, 6], walking: [2, 3, 8, 4, 1, 7, 5, 6] };
  function ordered(items, key) {
    return items.map((p, i) => ({ p, r: ranks[key][i] })).sort((a, b) => a.r - b.r).map(x => x.p);
  }

  function settings(cfg) {
    if (typeof cfg === 'number') return { ...DEFAULTS, freeShippingThreshold: cfg };
    return { ...DEFAULTS, ...(cfg || {}), bundles: { ...DEFAULTS.bundles, ...((cfg && cfg.bundles) || {}) } };
  }

  const find = (catalog, id) => catalog.find(p => p.id === id);

  /* Describe one cart line: what it is, its regular value and its offer price per unit. */
  function lineInfo(item, catalog, cfg) {
    const s = settings(cfg);
    const [kind, type, rest] = String(item.id).split(':');
    if (kind === 'bundle' && type === 'starter') {
      const shoe = find(catalog, rest);
      if (!shoe) return null;
      const parts = [find(catalog, shoe.pair[1]), find(catalog, 'cleaning-kit'), find(catalog, 'water-shield')].filter(Boolean);
      const list = shoe.price + parts.reduce((n, p) => n + p.price, 0);
      return { kind: 'starter', name: s.bundles.starter.name + ': ' + shoe.name, shoes: [shoe], parts, unit: s.bundles.starter.price, list, shoeCount: 1, group: 'bundle' };
    }
    if (kind === 'bundle' && type === 'pair2') {
      const shoes = String(rest).split('+').map(id => find(catalog, id));
      if (shoes.length !== 2 || shoes.some(x => !x)) return null;
      const name = s.bundles.pair2.name + ': ' + (shoes[0].id === shoes[1].id ? shoes[0].name : shoes[0].name + ' + ' + shoes[1].name);
      return { kind: 'pair2', name, shoes, parts: [], unit: s.bundles.pair2.price, list: shoes[0].price + shoes[1].price, shoeCount: 2, group: 'bundle' };
    }
    const p = find(catalog, item.id);
    if (!p) return null;
    return { kind: 'product', name: p.name, product: p, parts: [], unit: p.price, list: p.compareAt || p.price, shoeCount: p.group === 'knit' ? 1 : 0, group: p.group };
  }

  /* Totals with offers applied: socks at the add-on price (one pack per shoe that has no socks of its own). */
  function totals(items, catalog, cfg) {
    const s = settings(cfg);
    const infos = items.map(item => lineInfo(item, catalog, s));
    // shoes eligible for the socks add-on price (starter kits already include socks)
    let eligible = items.reduce((n, item, i) => {
      const info = infos[i];
      if (!info) return n;
      if (info.kind === 'pair2') return n + 2 * item.qty;
      if (info.kind === 'product' && info.group === 'knit') return n + item.qty;
      return n;
    }, 0);
    const lines = items.map((item, i) => {
      const info = infos[i];
      if (!info) return { total: 0, list: 0, discounted: 0 };
      let total = info.unit * item.qty, discounted = 0;
      if (info.kind === 'product' && info.group === 'socks' && eligible > 0) {
        discounted = Math.min(item.qty, eligible);
        eligible -= discounted;
        total = discounted * s.sockAddonPrice + (item.qty - discounted) * info.unit;
      }
      return { total, list: info.list * item.qty, discounted };
    });
    const subtotal = lines.reduce((n, l) => n + l.total, 0);
    const listTotal = lines.reduce((n, l) => n + l.list, 0);
    const threshold = s.freeShippingThreshold;
    const shipping = subtotal === 0 || subtotal >= threshold ? 0 : s.shippingFee;
    return {
      lines,
      subtotal,
      savings: Math.max(0, listTotal - subtotal),
      remaining: Math.max(0, threshold - subtotal),
      progress: Math.min(100, (subtotal / threshold) * 100),
      shipping,
      total: subtotal + shipping,
      socksAddonLeft: eligible   // shoes in the bag that could still get socks at the add-on price
    };
  }

  function add(items, id, size, qty = 1) {
    const list = items.map(i => ({ ...i }));
    const match = list.find(i => i.id === id && i.size === size);
    if (match) match.qty = Math.min(10, match.qty + qty);
    else list.push({ id, size, qty: Math.min(10, qty) });
    return list;
  }
  function change(items, index, delta) {
    return items.map((i, n) => ({ ...i, qty: n === index ? Math.min(10, i.qty + delta) : i.qty })).filter(i => i.qty > 0);
  }

  const api = { ranks, ordered, settings, lineInfo, totals, add, change };
  if (typeof module !== 'undefined') module.exports = api; else scope.TerazCommerce = api;
})(typeof window !== 'undefined' ? window : this);

;
/*
  Ad and analytics events for Meta, Snapchat, TikTok and GA4.
  Pixels load only when their ID is set in config.js. Every event is also pushed to window.dataLayer,
  so Google Tag Manager can pick it up. On the live Salla store, use Salla's built-in pixel settings
  for checkout and purchase, and keep these calls for the landing pages if they live outside Salla.
*/
(function () {
  const cfg = (window.TERAZ_CONFIG && window.TERAZ_CONFIG.pixels) || {};
  window.dataLayer = window.dataLayer || [];
  const load = src => { const s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); };

  if (cfg.meta) {
    const f = window.fbq = function () { f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); };
    f.push = f; f.loaded = true; f.version = '2.0'; f.queue = []; window._fbq = f;
    load('https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', cfg.meta); fbq('track', 'PageView');
  }
  if (cfg.snap) {
    const a = window.snaptr = function () { a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments); };
    a.queue = [];
    load('https://sc-static.net/scevent.min.js');
    snaptr('init', cfg.snap); snaptr('track', 'PAGE_VIEW');
  }
  if (cfg.tiktok) {
    const q = []; const t = window.ttq = { _q: q };
    ['page', 'track', 'identify'].forEach(m => { t[m] = function () { q.push([m].concat([].slice.call(arguments))); }; });
    load('https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=' + encodeURIComponent(cfg.tiktok) + '&lib=ttq');
    ttq.page();
  }
  if (cfg.ga4) {
    window.gtag = function () { window.dataLayer.push(arguments); };
    load('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.ga4));
    gtag('js', new Date()); gtag('config', cfg.ga4);
  }

  const names = {
    view_item:      { meta: 'ViewContent',      snap: 'VIEW_CONTENT',   tiktok: 'ViewContent' },
    add_to_cart:    { meta: 'AddToCart',        snap: 'ADD_CART',       tiktok: 'AddToCart' },
    begin_checkout: { meta: 'InitiateCheckout', snap: 'START_CHECKOUT', tiktok: 'InitiateCheckout' },
    purchase:       { meta: 'Purchase',         snap: 'PURCHASE',       tiktok: 'CompletePayment' },
    generate_lead:  { meta: 'Lead',             snap: 'SIGN_UP',        tiktok: 'SubmitForm' }
  };

  /* TerazTrack.event('add_to_cart', { value: 389, items: [{ id, name, price, qty }] }) */
  window.TerazTrack = {
    event(name, data = {}) {
      const value = data.value || 0, currency = 'SAR';
      const ids = (data.items || []).map(i => i.id);
      window.dataLayer.push({ event: name, ecommerce: { currency, value, items: data.items || [] } });
      const n = names[name] || {};
      try {
        if (window.fbq && n.meta) fbq('track', n.meta, { value, currency, content_ids: ids, content_type: 'product' });
        if (window.snaptr && n.snap) snaptr('track', n.snap, { price: value, currency, item_ids: ids });
        if (window.ttq && n.tiktok) ttq.track(n.tiktok, { value, currency, contents: (data.items || []).map(i => ({ content_id: i.id, quantity: i.qty || 1, price: i.price })) });
        if (window.gtag) gtag('event', name, { value, currency, items: (data.items || []).map(i => ({ item_id: i.id, item_name: i.name, price: i.price, quantity: i.qty || 1 })) });
      } catch (e) { /* a pixel failing must never break the store */ }
    }
  };
})();

;
/* TERAZ storefront prototype: rendering and interactions. Pricing maths lives in commerce.js. */
const catalog = window.TERAZ_CATALOG, C = window.TerazCommerce, CFG = window.TERAZ_CONFIG || {}, REV = window.TERAZ_REVIEWS || { summary: null, voice: [], items: [] };
const hasReviews = () => Boolean((REV.voice && REV.voice.length) || (REV.items && REV.items.length));
const S = C.settings(CFG);
const $ = s => document.querySelector(s), $$ = s => Array.from(document.querySelectorAll(s));
const money = n => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n) + ' ريال';
const byId = id => catalog.find(p => p.id === id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const knit = catalog.filter(p => p.group === 'knit');
const oneSize = p => ['caps', 'socks', 'care'].includes(p.group);
const optionLabel = p => p.group === 'care' ? 'عبوة / مجموعة' : 'مقاس واحد';
const sizesFor = p => oneSize(p) ? [] : ((CFG.sizeChart || []).length ? CFG.sizeChart.map(x => x.eu) : ['40', '41', '42', '43', '44', '45']);
const CART_KEY = 'teraz-cart-v4';
const jumpTop = () => { window.scrollTo({ top: 0, behavior: 'instant' }); requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' })); };
const track = (name, data) => { try { window.TerazTrack && TerazTrack.event(name, data); } catch (e) {} };

/* ---------- images ---------- */
const ASSET_BASE = (window.TERAZ_SALLA_CONFIG && window.TERAZ_SALLA_CONFIG.assetsBase) || 'assets/';
const siteImages = {
  logo: 'logo.webp',
  heroBg: 'atelier.webp',
  muleLife: 'mule-1-life.webp',
  offers: {
    single: 'thumb/black.webp',
    starter: 'thumb/offer-starter.webp',
    pair2: 'thumb/offer-pair.webp'
  }
};
const RAED_DUMMY_HASHES = [
  'MopzhoqpTkDObcKc8Q8n77AuydanfsGXdZO7iinH',
  '3gOhYSaIhaHxhH2IHWxJYDl9JHwxP6dGKiZFSq4K',
  'D7bG3pgSit43TheOejBOZV7LIfG1y1Cj0hWLmgIh',
  'pzOCEw10wCfXeVSpKnL0Ifd1O9ZkTfnZ17RkE14R',
  'lkyDjYwvWJNmAQoGnLALLcUkm66rCCDbTyVlSGdH'
];
function isValidCustomImage(url) {
  if (!url || typeof url !== 'string') return false;
  const s = url.trim();
  if (!s || s === 'null' || s === 'undefined') return false;
  if (RAED_DUMMY_HASHES.some(h => s.includes(h))) return false;
  if (s === 'images/logo.webp' || s.endsWith('/placeholder.png')) return false;
  return true;
}
function assetUrl(file, thumb = false) {
  if (!file) return '';
  if (/^(https?:\/\/|data:|blob:|\/)/i.test(file)) return file;
  const clean = String(file).replace(/^assets\//, '');
  return ASSET_BASE + (thumb && !clean.startsWith('thumb/') ? 'thumb/' + clean : clean);
}
function img(p, { thumb = false, extra = '', cls = '' } = {}) {
  if (!p.image) return `<div class="img-placeholder ${cls}" role="img" aria-label="${esc(p.name)}"><span>${esc(p.name)}</span><small>الصور جاية قريب</small></div>`;
  const src = assetUrl(thumb ? p.thumb : p.image, thumb);
  if (p.photo) cls += ' is-photo';
  return `<img ${extra} class="${cls.trim()}" src="${src}" width="${thumb ? 640 : 1200}" height="${thumb ? 480 : 900}" alt="${esc(p.name)}، ${esc(p.color)}">`;
}

/* ---------- state ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]').filter(x => C.lineInfo(x, catalog, S) && typeof x.size === 'string' && Number.isInteger(x.qty) && x.qty > 0 && x.qty <= 10); } catch { cart = []; }
let toastTimer, lastTrigger = null, view = 'home';
let panel = null;           // { p, offer, size, size2, shoe2, mode }
let stickyObserver = null;

function persist() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
  const count = cart.reduce((n, i) => n + i.qty, 0), badge = $('#cart-count');
  if (String(count) !== badge.textContent) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }
  badge.textContent = count;
  $('#cart-sum').textContent = count ? money(C.totals(cart, catalog, S).subtotal) : '';
  if (panel) updatePanel();
}
function toast(message) {
  const t = $('#toast'); t.textContent = message; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ---------- shared pieces ---------- */
function stars(rating) {
  const full = Math.round(rating);
  return `<span class="stars" aria-hidden="true">${'★'.repeat(full)}${'☆'.repeat(5 - full)}</span>`;
}
function ratingLine(small = false) {
  const s = REV.summary;
  if (!s || !s.count) return '';
  return `<a class="rating-line${small ? ' small' : ''}" href="#reviews">${stars(s.rating)} <b>${s.rating.toFixed(1)}</b> <span>(${s.count} تقييم)</span></a>`;
}
function payChips() { return (CFG.payments || []).map(x => `<span class="pay-chip">${esc(x)}</span>`).join(''); }
function assurances({ compact = false } = {}) {
  const items = [
    ['truck', `توصلك خلال ${CFG.deliveryDays || '2 إلى 4'} أيام`],
    ['swap', CFG.firstExchangeFree ? 'أول تبديل مقاس علينا' : `تقدر تبدّل خلال ${CFG.exchangeDays || 20} يوم`],
    ['gift', `التوصيل مجاني فوق ${S.freeShippingThreshold} ريال`],
    ['lock', 'ادفع بـ' + (CFG.payments || []).slice(0, 2).join(' أو ')]
  ];
  const icon = name => ({
    truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>',
    swap: '<path d="M4 9h14l-3-3M20 15H6l3 3"/>',
    gift: '<path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="1"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'
  }[name]);
  return items.map(([k, t]) => `<li><svg viewBox="0 0 24 24" width="${compact ? 18 : 22}" height="${compact ? 18 : 22}" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">${icon(k)}</svg><span>${t}</span></li>`).join('');
}
function whatsappLink(text) {
  const num = (CFG.whatsapp || '+966570442661').replace(/[^\d+]/g, '');
  return 'https://wa.me/' + num + (text ? '?text=' + encodeURIComponent(text) : '');
}

/* ---------- recommendations ---------- */
const toneOf = p => p.group === 'knit' ? ({ tuwaiq: 3, badr: 0, night: 0, oud: 1, ramth: 2, evening: 0, dahna: 3, coffee: 1 }[p.id])
  : ['caps', 'clogs'].includes(p.group) ? Number(p.id.split('-')[1])
  : p.group === 'socks' ? [0, 1, 3, 2][Number(p.id.split('-')[1])]
  : p.group === 'mule' ? [0, 3, 0][Number(p.id.split('-')[1])] : 0;
function recommendations(p) {
  if (p.group === 'care') return ['care-pack', 'cleaning-kit', 'water-shield'].filter(id => id !== p.id).map(byId).concat([byId('night')]);
  const tone = toneOf(p);
  const shoe = byId(['night', 'coffee', 'ramth', 'dahna'][tone]);
  const cap = byId('caps-' + tone), sock = byId('socks-' + [0, 1, 3, 2][tone]), clog = byId('clogs-' + tone);
  if (p.group === 'knit') return [byId(p.pair[1]), byId(p.pair[0]), clog, byId('care-pack')];
  return [shoe, cap, sock, clog, byId(tone === 3 ? 'mule-1' : 'mule-0'), byId('care-pack')].filter(x => x && x.id !== p.id).slice(0, 4);
}
function priceTag(p) {
  if (p.group === 'socks') return `<b>${money(p.price)}</b><small class="deal">بـ ${S.sockAddonPrice} مع أي جزمة</small>`;
  if (p.compareAt) return `<b>${money(p.price)}</b><s>${money(p.compareAt)}</s>`;
  return `<b>${money(p.price)}</b>`;
}

/* ---------- cards ---------- */
function productCard(p) {
  return `<article class="product-card">
    <a class="product-image" href="#p/${p.id}" aria-label="تفاصيل ${esc(p.name)}">${img(p, { thumb: true, extra: 'loading="lazy"' })}</a>
    <div class="card-meta">
      <span class="card-color">${esc(p.color)}</span>
      <h3><a href="#p/${p.id}">${esc(p.name)}</a></h3>
      <div class="card-bottom"><span class="card-price">${priceTag(p)}</span>${oneSize(p)
        ? `<button class="card-add" data-quick="${p.id}" aria-label="أضف ${esc(p.name)} للسلة">أضف للسلة</button>`
        : `<a class="card-add" href="#p/${p.id}">اختر مقاسك</a>`}</div>
    </div>
  </article>`;
}
/* one card per product family (caps, socks, clogs, mule): colours are variants, not separate products */
function familyCard(group) {
  const list = catalog.filter(p => p.group === group), p = list[0];
  return `<article class="product-card family-card">
    <a class="product-image" href="#p/${p.id}" aria-label="${esc(p.family)}">${img(p, { thumb: true, extra: 'loading="lazy"' })}</a>
    <div class="card-meta">
      <div class="card-dots">${list.map(v => `<a href="#p/${v.id}" title="${esc(v.color)}">${img(v, { thumb: true, extra: 'loading="lazy"' })}</a>`).join('')}</div>
      <h3><a href="#p/${p.id}">${esc(p.family)}</a></h3>
      <div class="card-bottom"><span class="card-price">${priceTag(p)}</span><a class="card-add" href="#p/${p.id}">اختر لونك</a></div>
    </div>
  </article>`;
}
function renderCollection(sort = 'thobe') {
  $('[data-group="knit"]').innerHTML = C.ordered(knit, sort).map(productCard).join('');
}
const categories = [
  { key: 'mule', id: 'new-mule', name: 'لوفر الكشخة', all: 'اختر لون اللوفر', isNew: true, image: 'mule-group.webp', photo: true, from: 229,
    line: 'للمشاوير اللي ما تحتاج تجهيز: قهوة الصبح، الصلاة، زيارة سريعة. تدخل رجلك وتطلع، وشكله يبيّض الوجه مع الثوب والجينز.',
  },
  { key: 'clogs', id: 'clogs', name: 'خفّ الكشخة', all: 'اختر لون الخف', image: 'clogs-1.webp', from: 129,
    line: 'لقهوة الصبح والجلسة في البيت. مقدمته مقفلة وخلفه مفتوح، تلبسه بثانية وتبقى على كشختك.' },
  { key: 'caps', id: 'caps', name: 'كابات طراز', all: 'اختر لون الكاب', image: 'caps-1.webp', from: 79,
    line: 'ينطوي ويدخل جيبك أو شنطتك. خذ لون من جزمتك وكرره في الكاب، وتطلع الإطلالة مترابطة بدون تكلف.' },
  { key: 'socks', id: 'socks', name: 'شرابات الأناقة', all: 'اختر لون الشراب', image: 'socks-1.webp', from: 59,
    line: `ثلاث أزواج طويلة من ألياف البامبو، خفيفة وتريّح. ومع أي جزمة من طراز تاخذ الباك بـ ${S.sockAddonPrice} بدل 59.` },
  { key: 'care', id: 'care', name: 'العناية', all: 'شوف منتجات العناية', image: 'care-pack.webp', from: 29,
    line: 'جزمتك تستاهل تدليع. نظّفها بالعدة، رش عليها بخاخ العزل، واطلع وهي كأنها جديدة. الطقم كامل بـ 49 بدل 58.' }
];
const catByKey = k => categories.find(c => c.key === k);
const familyGroups = ['mule', 'clogs', 'caps', 'socks'];
const catHref = c => familyGroups.includes(c.key) ? '#p/' + catalog.find(p => p.group === c.key).id : '#c/' + c.key;
function renderCategories() {
  $('#category-rows').innerHTML = categories.map((c, n) => {
    const list = catalog.filter(p => p.group === c.key);
    return `<article class="category-block${n % 2 ? ' flip' : ''}${c.isNew ? ' is-new' : ''}" id="${c.id}">
      <a class="category-feature${c.photo ? ' photo' : ''}" href="${catHref(c)}" aria-label="${c.name}"><img src="${assetUrl(c.image)}" alt="" loading="lazy"></a>
      <div class="category-copy">
        ${c.isNew ? '<span class="badge-new">جديد عندنا</span>' : ''}
        <h3>${c.name}</h3><p>${c.line}</p>
        <div class="category-peek">${list.slice(0, 4).map(p => `<a href="#p/${p.id}" title="${esc(p.name)}">${img(p, { thumb: true, extra: 'loading="lazy"' })}</a>`).join('')}</div>
        <p class="category-price">من ${money(c.from)}${list.length > 1 ? ` · ${list.length} ${c.key === 'care' ? 'منتجات' : 'ألوان'}` : ''}</p>
        <a class="primary" href="${catHref(c)}">${c.all} <span>←</span></a>
      </div>
    </article>`;
  }).join('');
}

/* ---------- full collection page: #c/<key> ---------- */
function viewCollection(key) {
  const c = catByKey(key);
  if (!c) { location.hash = 'accessories'; return; }
  if (familyGroups.includes(key)) { location.replace(catHref(c)); return; }
  showView('collection');
  document.title = c.name + ' | طراز';
  const list = catalog.filter(p => p.group === c.key);
  if (c.key === 'care') list.sort((a, b) => (a.id === 'care-pack' ? -1 : b.id === 'care-pack' ? 1 : 0));
  const others = categories.filter(x => x.key !== key);
  $('#collection-view').innerHTML = `
    <div class="product-breadcrumb"><a href="#accessories" data-action="back">→ رجوع</a><span>طراز / ${c.name}</span></div>
    <header class="collection-hero${c.photo ? ' photo' : ''}">
      <div class="collection-hero-image"><img src="${assetUrl(c.image)}" alt="${c.name}" fetchpriority="high"></div>
      <div class="collection-hero-copy">${c.isNew ? '<span class="badge-new">جديد عندنا</span>' : ''}<h1>${c.name}</h1><p>${c.line}</p><p class="category-price">من ${money(c.from)}</p></div>
    </header>
    <section class="section collection-page"><div class="collection-grid">${list.map(productCard).join('')}</div>
      ${c.key === 'socks' ? `<p class="collection-note">تاخذ الباك بـ ${S.sockAddonPrice} بدل 59 لما يكون معه جزمة في السلة.</p>` : ''}</section>
    <section class="section pairs-with"><h2>يكمّلها جزمة من طراز</h2><p>اختر جزمتك، وكل قطعة هنا لونها على لونها.</p>
      <div class="product-strip">${C.ordered(knit, 'thobe').slice(0, 4).map(productCard).join('')}</div>
      <a class="secondary" href="#knit">شوف الألوان الثمانية</a></section>
    <section class="section other-collections"><h2>وكمان عندنا</h2><div class="other-grid">${others.map(o => `<a class="other-card" href="${catHref(o)}"><img src="${assetUrl(o.image, true)}" alt="" loading="lazy"><span>${o.name}</span><small>من ${money(o.from)}</small></a>`).join('')}</div></section>`;
  jumpTop();
}

/* ---------- why TERAZ comparison ---------- */
function compareHTML() {
  const rows = [['مع الثوب', 'شكله غريب', 'يضبط', 'يضبط، وله هيبة'], ['مع الجينز', 'يضبط', 'رسمي زيادة', 'يضبط'], ['في الحر', 'يهوّي', 'حار وثقيل', 'يهوّي'], ['من الصبح لليل', 'مريح', 'يتعب', 'مريح']];
  return `<div class="compare" role="table" aria-label="طراز مقارنة بالرياضي والكلاسيكي">
    <div class="compare-row compare-head" role="row"><span role="columnheader"></span><span role="columnheader">الرياضي</span><span role="columnheader">الكلاسيكي الجلد</span><span role="columnheader" class="ours">طراز</span></div>
    ${rows.map(r => `<div class="compare-row" role="row"><span role="rowheader">${r[0]}</span><span role="cell">${r[1]}</span><span role="cell">${r[2]}</span><span role="cell" class="ours">${r[3]}</span></div>`).join('')}
  </div>`;
}

/* ---------- need finder ---------- */
const needs = [
  { where: 'الدوام', pick: ['night', 'evening'], why: 'أسود ورمادي هادي يضبط مع الثوب، ومريحة من الصبح للعصر.', href: '#lp/thobe' },
  { where: 'العزايم والمجالس', pick: ['oud', 'tuwaiq'], why: 'البني والبيج مع القاعدة البيضاء، شكل يبيّض الوجه قدام الربع والأهل.', href: '#p/oud' },
  { where: 'الطلعات', pick: ['ramth', 'dahna'], why: 'ألوان ترابية تضبط مع الجينز والتيشيرت.', href: '#lp/casual' },
  { where: 'المشوار القريب', pick: ['mule-0', 'clogs-1'], why: 'تدخلها وتطلع، بدون ربط ولا انحناء.', href: '#lp/mule' },
  { where: 'هدية', pick: ['tuwaiq', 'care-pack'], why: 'طقم البداية: جزمة وشرابها وعدتها في طلب واحد، وأول تبديل مقاس علينا.', href: '#lp/gift' }
];
function renderNeeds() {
  const name = p => p.family || p.name;
  $('#needs-grid').innerHTML = `<div class="needs-table" role="table" aria-label="وش يناسب كل مشوار">
    <div class="needs-row needs-head" role="row"><span role="columnheader">وين رايح؟</span><span role="columnheader">وش يناسبك</span><span role="columnheader">ليش</span><span role="columnheader"></span></div>
    ${needs.map(n => { const a = byId(n.pick[0]), b = byId(n.pick[1]); return `<a class="needs-row" role="row" href="${n.href}">
      <span role="cell" class="needs-where">${n.where}</span>
      <span role="cell" class="needs-pick"><span class="needs-thumbs">${img(a, { thumb: true, extra: 'loading="lazy"' })}${img(b, { thumb: true, extra: 'loading="lazy"' })}</span><span>${esc(name(a))}<small>أو ${esc(name(b))}</small></span></span>
      <span role="cell" class="needs-why">${n.why}</span>
      <span role="cell" class="needs-go">شوف ←</span></a>`; }).join('')}
  </div>`;
}

/* ---------- offers ---------- */
function offersFor(p) {
  const sock = byId(p.pair[1]);
  const starterList = p.price + sock.price + byId('cleaning-kit').price + byId('water-shield').price;
  return [
    { key: 'single', title: 'لون واحد', sub: 'الجزمة بس.', price: p.price, list: p.price },
    { key: 'starter', title: S.bundles.starter.name, sub: 'الجزمة، وشراب بلونها، وعدة التنظيف، وبخاخ العزل. كل اللي تحتاجه من أول يوم.', price: S.bundles.starter.price, list: starterList },
    { key: 'pair2', title: S.bundles.pair2.name, sub: 'جزمتين بلونين: وحدة للدوام ووحدة للطلعات، أو لك ولأخوك.', price: S.bundles.pair2.price, list: p.price * 2 }
  ];
}
const shipNote = price => price >= S.freeShippingThreshold ? '<span class="free-ship">التوصيل مجاني</span>' : `<span class="ship-fee">+ ${S.shippingFee} ريال توصيل</span>`;
function renderHomeOffers() {
  const p = byId('night'), [single, starter, pair] = offersFor(p);
  const card = (o, image, href, cta) => `<a class="offer-card${o.key === 'starter' ? ' featured' : ''}" href="${href}">
    <div class="offer-image"><img src="${assetUrl(image)}" alt="" loading="lazy" width="1400" height="1050"></div>
    <h3>${o.title}</h3><p>${o.sub}</p>
    <div class="offer-price"><strong>${money(o.price)}</strong>${o.list > o.price ? `<s>${money(o.list)}</s>` : ''}</div>
    ${o.list > o.price ? `<p class="offer-save">توفر ${money(o.list - o.price)}</p>` : ''}
    ${shipNote(o.price)}
    <span class="offer-cta">${cta} ←</span></a>`;
  $('#home-offers').innerHTML = card(single, siteImages.offers.single, '#lp/all/single', 'اختر لونك') + card(starter, siteImages.offers.starter, '#lp/all/starter', 'اختر لونك ومقاسك') + card(pair, siteImages.offers.pair2, '#lp/all/pair2', 'اختر اللونين');
}

/* ---------- reviews, guarantee, FAQ, footer ---------- */
const DEFAULT_PEAKS = [35, 62, 48, 80, 55, 92, 44, 75, 88, 50, 68, 95, 60, 82, 45, 72, 90, 52, 78, 64, 85, 42, 70, 58, 86, 48, 66, 40];
const fmtTime = sec => { const s = Math.max(0, Math.round(sec || 0)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

function voiceReviewsHTML() {
  const list = REV.voice || [];
  if (!list.length) return '';
  return `<div class="voice-reviews">
    <header class="voice-header">
      <span class="voice-pill">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"/></svg>
        <span>تجارب صوتية</span>
      </span>
      <h2>اسمع تجربتهم بنفسك</h2>
      <p>لا تصدق كلامنا بس، اسمع بنفسك! مقاطع صوتية حقيقية من عملاء جربوا المنتج وشاركونا رضاهم بصوتهم</p>
    </header>
    <div class="voice-track" tabindex="0" aria-label="مقاطع صوتية من العملاء">
      ${list.map((v, idx) => {
        const dur = Number(v.duration) || 11;
        const initSec = idx === 0 ? Math.min(7, Math.floor(dur * 0.65)) : 0;
        const peaks = Array.isArray(v.peaks) && v.peaks.length ? v.peaks : DEFAULT_PEAKS;
        const ratio = dur > 0 ? initSec / dur : 0;
        const activeBars = Math.round(ratio * peaks.length);
        return `<article class="voice-card" data-voice-card="${esc(v.id || ('v' + idx))}" data-voice-idx="${idx}" data-duration="${dur}" data-current="${initSec}" ${idx === 0 ? 'data-init-preview="true"' : ''} data-speed="1" data-src="${esc(v.src || '')}">
          <button type="button" class="voice-play" data-voice-play="${esc(v.id || ('v' + idx))}" aria-label="تشغيل الرسالة الصوتية ${idx + 1}" aria-pressed="false">
            <svg class="icon-play" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5z"/></svg>
            <svg class="icon-pause" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
          </button>
          <div class="voice-main">
            <div class="voice-top">
              <div class="voice-label">
                <span class="voice-mic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"/></svg>
                </span>
                <div class="voice-title-wrap">
                  <strong class="voice-title">${esc(v.title || 'رسالة صوتية')}</strong>
                  ${v.name ? `<small class="voice-meta">${esc(v.name)}${v.city ? ' · ' + esc(v.city) : ''}</small>` : ''}
                </div>
              </div>
              <div class="voice-speeds" role="group" aria-label="سرعة التشغيل" dir="ltr">
                <button type="button" data-voice-speed="1" aria-pressed="true">x1</button>
                <button type="button" data-voice-speed="1.5" aria-pressed="false">x1.5</button>
                <button type="button" data-voice-speed="2" aria-pressed="false">x2</button>
              </div>
            </div>
            <div class="voice-bottom" dir="ltr">
              <span class="voice-time" data-voice-time>${fmtTime(initSec)} / ${fmtTime(dur)}</span>
              <div class="voice-wave" data-voice-wave role="slider" aria-label="مؤشر الصوت" aria-valuemin="0" aria-valuemax="${dur}" aria-valuenow="${initSec}" tabindex="0">
                ${peaks.map((h, i) => `<span class="voice-bar${i < activeBars ? ' played' : ''}" data-voice-bar="${i}" style="--h:${h}%"></span>`).join('')}
              </div>
            </div>
          </div>
        </article>`;
      }).join('')}
    </div>
    <div class="voice-dots" role="tablist" aria-label="التنقل بين التجارب الصوتية">
      ${list.map((_, i) => `<button type="button" role="tab" class="voice-dot" data-voice-dot="${i}" aria-selected="${i === 0}" aria-label="الرسالة الصوتية ${i + 1}"></button>`).join('')}
    </div>
  </div>`;
}

let activeVoice = null;
function renderVoiceProgress(card, current, duration) {
  card.dataset.current = String(current);
  const ratio = duration > 0 ? Math.min(1, Math.max(0, current / duration)) : 0;
  const timeEl = card.querySelector('[data-voice-time]');
  if (timeEl) timeEl.textContent = `${fmtTime(current)} / ${fmtTime(duration)}`;
  const waveEl = card.querySelector('[data-voice-wave]');
  if (waveEl) waveEl.setAttribute('aria-valuenow', String(Math.round(current)));
  const bars = card.querySelectorAll('.voice-bar');
  const activeCount = Math.round(ratio * bars.length);
  bars.forEach((b, i) => b.classList.toggle('played', i < activeCount));
}
function stopVoice() {
  if (!activeVoice) return;
  if (activeVoice.raf) cancelAnimationFrame(activeVoice.raf);
  if (activeVoice.audio) { try { activeVoice.audio.pause(); } catch {} }
  if (activeVoice.card && activeVoice.card.isConnected) {
    activeVoice.card.classList.remove('is-playing');
    const btn = activeVoice.card.querySelector('[data-voice-play]');
    if (btn) btn.setAttribute('aria-pressed', 'false');
  }
  activeVoice = null;
}
function toggleVoice(card) {
  if (!card) return;
  if (activeVoice && activeVoice.card === card) { stopVoice(); return; }
  stopVoice();
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  let duration = Number(card.dataset.duration) || 11;
  let current = Number(card.dataset.current) || 0;
  if (card.dataset.initPreview === 'true' || current >= duration - 0.15) {
    delete card.dataset.initPreview;
    current = 0;
    renderVoiceProgress(card, 0, duration);
  }
  const speed = Number(card.dataset.speed) || 1;
  const src = card.dataset.src || '';
  card.classList.add('is-playing');
  const btn = card.querySelector('[data-voice-play]');
  if (btn) btn.setAttribute('aria-pressed', 'true');
  const state = { card, duration, current, speed, lastTs: performance.now(), raf: 0, audio: null };
  activeVoice = state;
  if (src) {
    const resolvedSrc = (window.TERAZ_EMBED_ASSETS && window.TERAZ_EMBED_ASSETS[src]) || src;
    const audio = card._audio || (card._audio = new Audio(resolvedSrc));
    state.audio = audio;
    audio.playbackRate = speed;
    try { audio.currentTime = current; } catch {}
    audio.onloadedmetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        state.duration = audio.duration;
        card.dataset.duration = String(audio.duration);
      }
    };
    audio.onended = () => {
      renderVoiceProgress(card, state.duration, state.duration);
      stopVoice();
    };
    audio.play().catch(() => {});
  }
  const tick = now => {
    if (activeVoice !== state || !card.isConnected) { stopVoice(); return; }
    if (state.audio && !state.audio.paused) {
      state.current = state.audio.currentTime;
      if (Number.isFinite(state.audio.duration) && state.audio.duration > 0) state.duration = state.audio.duration;
    } else {
      const dt = (now - state.lastTs) / 1000;
      state.lastTs = now;
      state.current += dt * state.speed;
    }
    if (state.current >= state.duration) {
      renderVoiceProgress(card, state.duration, state.duration);
      stopVoice();
      return;
    }
    renderVoiceProgress(card, state.current, state.duration);
    state.raf = requestAnimationFrame(tick);
  };
  state.raf = requestAnimationFrame(tick);
}
function setVoiceSpeed(card, speed) {
  if (!card) return;
  card.dataset.speed = String(speed);
  card.querySelectorAll('[data-voice-speed]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.voiceSpeed) === speed)));
  if (activeVoice && activeVoice.card === card) {
    activeVoice.speed = speed;
    if (activeVoice.audio) activeVoice.audio.playbackRate = speed;
  }
}
function seekVoice(card, ratio) {
  if (!card) return;
  delete card.dataset.initPreview;
  const duration = Number(card.dataset.duration) || 11;
  const target = Math.min(duration, Math.max(0, ratio * duration));
  renderVoiceProgress(card, target, duration);
  if (activeVoice && activeVoice.card === card) {
    activeVoice.current = target;
    activeVoice.lastTs = performance.now();
    if (activeVoice.audio) { try { activeVoice.audio.currentTime = target; } catch {} }
  } else {
    toggleVoice(card);
  }
}
function bindVoiceTracks(root = document) {
  root.querySelectorAll('.voice-track').forEach(trackEl => {
    if (trackEl._bound) return;
    trackEl._bound = true;
    const wrap = trackEl.closest('.voice-reviews');
    const dots = wrap ? Array.from(wrap.querySelectorAll('[data-voice-dot]')) : [];
    const cards = Array.from(trackEl.querySelectorAll('.voice-card'));
    let ticking = false;
    trackEl.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const rect = trackEl.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        let bestIdx = 0, bestDist = Infinity;
        cards.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const d = Math.abs((r.left + r.width / 2) - center);
          if (d < bestDist) { bestDist = d; bestIdx = i; }
        });
        dots.forEach((dot, i) => dot.setAttribute('aria-selected', String(i === bestIdx)));
      });
    }, { passive: true });
  });
}

function reviewsHTML() {
  if (!hasReviews()) return '';
  const voiceBlock = voiceReviewsHTML();
  if (!REV.items || !REV.items.length) return voiceBlock;
  const s = REV.summary;
  const fit = s && s.fit ? `<div class="fit-bar"><span>المقاس</span><div><i style="width:${s.fit.small}%"></i><i class="ok" style="width:${s.fit.true}%"></i><i style="width:${s.fit.large}%"></i></div><small>${s.fit.true}% قالوا المقاس مضبوط</small></div>` : '';
  return `${voiceBlock}<header class="section-heading"><div><h2>وش قالوا عنها؟</h2>${s ? `<p>${stars(s.rating)} ${s.rating.toFixed(1)} من 5، من ${s.count} تقييم</p>` : ''}</div>${fit}</header>
    <div class="review-grid">${REV.items.slice(0, 6).map(r => `<article class="review-card">${r.photo ? `<img src="${esc(r.photo)}" alt="" loading="lazy">` : ''}<div>${stars(r.rating)}<p>${esc(r.text)}</p><small>${esc(r.name)}${r.city ? ' · ' + esc(r.city) : ''}${r.size ? ' · مقاس ' + esc(r.size) : ''}</small></div></article>`).join('')}</div>`;
}
function renderTrust() { $('#trust').innerHTML = `<ul>${assurances()}</ul>`; }
function renderGuarantee() {
  $('#guarantee-facts').innerHTML = `
    <article><strong>${CFG.exchangeDays} <small>يوم</small></strong><h3>تبدّل فيها المقاس أو اللون</h3><p>${CFG.firstExchangeFree ? 'وأول تبديل، شحنه علينا.' : 'حسب توفر المقاس.'}</p></article>
    <article><strong>${CFG.returnDays} <small>يوم</small></strong><h3>ترجعها فيها إذا غيرت رايك</h3><p>بشرط تكون بحالتها وفي كرتونها.</p></article>
    <p class="fine-print">إذا غيرت رايك، شحن الإرجاع عليك. وإذا وصلك شي غلط أو فيه عيب، علينا كامل. جرّبها داخل البيت قبل تطلع فيها.</p>`;
}
const faqs = [
  ['كيف أعرف مقاسي؟', `قِس رجلك بالسنتي وطابقها مع جدول المقاسات. وإذا طحت بين مقاسين، خذ الأصغر لأن النسيج يوسع شوي مع اللبس. وإذا ما ضبط، أول تبديل علينا.`],
  ['متى توصلني؟', `غالبًا خلال ${CFG.deliveryDays} أيام عمل، ويطلع لك الموعد بالضبط حسب مدينتك قبل تدفع.`],
  ['كم التوصيل؟', `${S.shippingFee} ريال، وإذا طلبك فوق ${S.freeShippingThreshold} ريال التوصيل علينا.`],
  ['وش طرق الدفع؟', (CFG.payments || []).join('، ') + '.'],
  ['وش يجيني في طقم البداية؟', `جزمتك، وباك شراب ثلاث أزواج بلونها، وعدة التنظيف، وبخاخ عزل الموية. كلها بـ ${S.bundles.starter.price} بدل 436.`],
  ['أقدر آخذ لونين؟', `أكيد. اختر عرض اللونين، وحدد اللون الثاني ومقاس كل وحدة، والثنتين بـ ${S.bundles.pair2.price} والتوصيل مجاني.`]
];
const faqHTML = list => list.map(([q, a], i) => `<details ${i === 0 ? 'open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('');
function renderFooter() {
  $('#footer-pay').innerHTML = payChips();
  const legal = [CFG.crNumber && 'السجل التجاري: ' + esc(CFG.crNumber), CFG.vatNumber && 'الرقم الضريبي: ' + esc(CFG.vatNumber), CFG.maroofUrl && `<a href="${esc(CFG.maroofUrl)}" target="_blank" rel="noopener">موثّقين في المركز السعودي للأعمال</a>`].filter(Boolean);
  $('#footer-legal').innerHTML = legal.length ? legal.map(x => `<span>${x}</span>`).join('') : '';
  $('#faq-help').innerHTML = `ما لقيت جوابك؟ <a href="https://wa.me/+966570442661" target="_blank" rel="noopener" data-action="whatsapp">كلمنا واتساب</a> ونرد عليك.`;
}
function renderSizeGuide() {
  const rows = (CFG.sizeChart || []).map(r => `<tr><td>${r.eu}</td><td>${r.cm} سم</td></tr>`).join('');
  const s = REV.summary;
  return `<div class="size-guide">
    <table><thead><tr><th>المقاس</th><th>طول الرجل</th></tr></thead><tbody>${rows}</tbody></table>
    <ol class="measure-steps">
      <li>حط ورقة على الأرض، وقف عليها وكعبك لاصق في الجدار.</li>
      <li>علّم عند طرف أطول صبع.</li>
      <li>قِس من الجدار للعلامة بالسنتي، وطابقها مع الجدول.</li>
    </ol>
    <p class="size-tip">بين مقاسين؟ خذ الأصغر، النسيج يوسع شوي مع اللبس.${CFG.firstExchangeFree ? ' وإذا ما ضبط، أول تبديل علينا.' : ''}</p>
    ${s && s.fit ? `<p class="size-tip">${s.fit.true}% من عملائنا قالوا المقاس مضبوط.</p>` : ''}
  </div>`;
}

/* ---------- purchase panel (product page + landing page) ---------- */
function newPanel(p, mode, offer) {
  const isShoe = p.group === 'knit';
  return { p, mode, offer: isShoe ? (offer || 'starter') : 'single', size: oneSize(p) ? optionLabel(p) : '', size2: '', shoe2: p.group === 'knit' ? (p.id === 'coffee' ? 'night' : 'coffee') : p.id, view: 'photo', socksShoe: 'night' };
}
function currentOffer() { return panel.p.group === 'knit' ? offersFor(panel.p).find(o => o.key === panel.offer) : { key: 'single', price: panel.p.price, list: panel.p.compareAt || panel.p.price }; }
const siblings = p => catalog.filter(x => x.group === p.group);
const hasSwatches = p => p.group === 'knit' || !!p.family;
function swatches(p, mode) {
  return `<div class="swatches${p.group === 'knit' ? '' : ' few'}" role="group" aria-label="اختر اللون">${siblings(p).map(s =>
    `<button type="button" class="swatch" data-swatch="${s.id}" aria-pressed="${s.id === p.id}" title="${esc(s.family ? s.color : s.name)}">${img(s, { thumb: true })}<span>${esc(s.family ? s.color : s.name)}</span></button>`).join('')}</div>`;
}
function purchasePanel() {
  const { p, mode } = panel, isShoe = p.group === 'knit';
  const sizes = sizesFor(p);
  const p2 = isShoe ? (byId(panel.shoe2) || knit[0]) : null;
  return `<div class="purchase-panel" data-panel>
    <span class="eyebrow">${{ knit: 'مجموعة الأناقة', mule: 'جديد عندنا', clogs: 'خفّ الكشخة', caps: 'كابات طراز', socks: 'شرابات الأناقة', care: 'العناية' }[p.group]}</span>
    <h1 data-panel-name>${esc(p.family || p.name)}</h1>
    <p class="color-line">${p.family ? 'اللون: ' + esc(p.color) : esc(p.color)}</p>
    ${ratingLine(true)}
    <div class="price-line" data-panel-price></div>
    ${hasSwatches(p) ? `<p class="field-label"><span data-color-label>${isShoe && panel.offer === 'pair2' ? 'اللون الأول' : 'اللون'}</span> <small>${['', 'لون واحد', 'لونين', 'ثلاث ألوان', 'أربع ألوان', 'خمس ألوان', 'ست ألوان', 'سبع ألوان', 'ثمان ألوان'][siblings(p).length] || ''}</small></p>${swatches(p, mode)}` : ''}
    ${isShoe ? `<fieldset class="offers-picker"><legend class="field-label">وش تبي تاخذ؟</legend>${offersFor(p).map(o => `
      <label class="offer-option${o.key === panel.offer ? ' selected' : ''}">
        <input type="radio" name="offer" value="${o.key}" ${o.key === panel.offer ? 'checked' : ''}>
        <span class="offer-main"><b>${o.title}</b><small>${o.sub}</small></span>
        <span class="offer-side"><strong>${money(o.price)}</strong>${o.list > o.price ? `<s>${money(o.list)}</s>` : ''}</span>
      </label>`).join('')}</fieldset>` : ''}
    ${sizes.length ? `<fieldset class="sizes" id="sizes"><legend class="field-label"><span data-size-label>${panel.offer === 'pair2' ? 'مقاس اللون الأول' : 'مقاسك'}</span><button type="button" class="link-button" data-action="size-guide">ما تعرف مقاسك؟</button></legend>
      <div>${sizes.map(s => `<button type="button" data-size="${s}" aria-pressed="${s === panel.size}">${s}</button>`).join('')}</div></fieldset>` : `<p class="one-size-note">${p.group === 'care' ? esc(p.fit) : 'مقاس واحد يناسب الكل'}</p>`}
    ${isShoe ? `<div class="pair2-extra" data-pair2 ${panel.offer === 'pair2' ? '' : 'hidden'}>
      <div class="pair2-color">
        <p class="field-label"><span>اللون الثاني</span> <small data-shoe2-label>${esc(p2.name)} · ${esc(p2.color)}</small></p>
        <div class="swatches" role="group" aria-label="اختر اللون الثاني">${knit.map(s =>
          `<button type="button" class="swatch" data-swatch2="${s.id}" aria-pressed="${s.id === panel.shoe2}" title="${esc(s.name)}">${img(s, { thumb: true })}<span>${esc(s.name)}</span></button>`).join('')}</div>
      </div>
      <fieldset class="sizes" id="sizes2"><legend class="field-label"><span>مقاس اللون الثاني</span><small data-size2-note>${panel.size2 ? 'مقاس ' + esc(panel.size2) : (panel.size ? 'نفس الأول (' + esc(panel.size) + ')' : 'نفس مقاس الأول أو اختر مقاسه')}</small></legend>
        <div>${sizes.map(s => `<button type="button" data-size2="${s}" aria-pressed="${s === (panel.size2 || panel.size)}">${s}</button>`).join('')}</div></fieldset>
    </div>` : ''}
    <p id="size-error" class="validation" role="alert"></p>
    <button class="primary add-main" id="main-add" data-action="add-panel"><span data-add-label>أضف للسلة</span><span data-add-price></span></button>
    <div class="dbar-slot" data-dbar></div>
    <div class="panel-addons" data-addons></div>
    <ul class="assurances">${assurances({ compact: true })}</ul>
    <div class="pay-chips">${payChips()}</div>
    <p class="help-line">محتار في المقاس أو اللون؟ <a href="https://wa.me/+966570442661" target="_blank" rel="noopener" data-action="whatsapp">كلمنا واتساب</a></p>
  </div>`;
}
function updatePanel() {
  if (!panel || !$('[data-panel]')) return;
  const o = currentOffer();
  $('[data-panel-price]').innerHTML = `<strong>${money(o.price)}</strong>${o.list > o.price ? `<s>${money(o.list)}</s><em class="save">توفر ${money(o.list - o.price)}</em>` : ''}`;
  $('[data-add-price]').textContent = money(o.price);
  $$('.offer-option').forEach(l => l.classList.toggle('selected', l.querySelector('input').value === panel.offer));
  const pair = $('[data-pair2]'); if (pair) pair.hidden = panel.offer !== 'pair2';
  const colorLabel = $('[data-color-label]'); if (colorLabel && panel.p.group === 'knit') colorLabel.textContent = panel.offer === 'pair2' ? 'اللون الأول' : 'اللون';
  const label = $('[data-size-label]'); if (label) label.textContent = panel.offer === 'pair2' ? 'مقاس اللون الأول' : 'مقاسك';
  if (panel.p.group === 'knit') {
    const p2 = byId(panel.shoe2) || knit[0];
    const shoe2Label = $('[data-shoe2-label]'); if (shoe2Label) shoe2Label.textContent = `${p2.name} · ${p2.color}`;
    $$('[data-swatch2]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.swatch2 === panel.shoe2)));
    const effSize2 = panel.size2 || panel.size;
    $$('[data-size2]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size2 === effSize2)));
    const size2Note = $('[data-size2-note]');
    if (size2Note) size2Note.textContent = panel.size2 ? 'مقاس ' + panel.size2 : (panel.size ? 'نفس الأول (' + panel.size + ')' : 'نفس مقاس الأول أو اختر مقاسه');
  }
  deliveryBar($('[data-dbar]'), C.totals(cart, catalog, S).subtotal, o.price);
  const addKey = panel.offer + '|' + cart.map(c => c.id).join(',');
  if ($('[data-addons]') && panel._addons !== addKey) { panel._addons = addKey; $('[data-addons]').innerHTML = addonsHTML(); }
  refreshStage();
  $('#sticky-name').textContent = (panel.p.group === 'knit' && panel.offer !== 'single' ? o.title + ' · ' : '') + panel.p.name + (panel.p.group === 'knit' && panel.offer === 'pair2' ? ' + ' + (byId(panel.shoe2)?.name || '') : '');
  $('#sticky-price').innerHTML = `${money(o.price)}${o.list > o.price ? ` <s>${money(o.list)}</s>` : ''}`;
}
function addFromPanel() {
  const { p } = panel;
  if (!panel.size) {
    $('#size-error').textContent = 'اختر مقاسك أول.';
    $('#sizes')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    $('#sizes button')?.focus({ preventScroll: true });
    return;
  }
  const o = currentOffer();
  let id = p.id, size = panel.size;
  if (p.group === 'knit' && panel.offer === 'starter') id = 'bundle:starter:' + p.id;
  if (p.group === 'knit' && panel.offer === 'pair2') { id = 'bundle:pair2:' + p.id + '+' + panel.shoe2; size = panel.size + '/' + (panel.size2 || panel.size); }
  cart = C.add(cart, id, size, 1);
  persist();
  syncItemToSallaCart(id, size, 1);
  track('add_to_cart', { value: o.price, items: [{ id, name: p.name, price: o.price, qty: 1 }] });
  toast('انضافت للسلة.');
  openCart();
}
function setupSticky() {
  if (stickyObserver) stickyObserver.disconnect();
  const bar = $('#sticky-buy'), target = $('#main-add');
  if (!target) { bar.hidden = true; return; }
  bar.hidden = false; bar.classList.remove('show');
  stickyObserver = new IntersectionObserver(([e]) => bar.classList.toggle('show', !e.isIntersecting));
  stickyObserver.observe(target);
}

/* ---------- free-delivery bar: what's in the bag, what this choice adds, and the 449 goal ---------- */
function deliveryBar(el, current, adding = 0) {
  if (!el) return;
  const T = S.freeShippingThreshold, total = current + adding;
  const pc = Math.min(100, current / T * 100), pt = Math.min(100, total / T * 100), left = Math.max(0, T - total);
  const msg = left === 0
    ? (adding ? 'مع اختيارك يصير <b>توصيلك مجاني</b>' : '<b>مبروك، توصيلك صار مجاني</b>')
    : (adding && current ? `سلتك ${money(current)} + اختيارك ${money(adding)}. باقي لك <b>${money(left)}</b> وتوصيلك مجاني`
      : `باقي لك <b>${money(left)}</b> وتوصيلك مجاني`);
  if (!el.querySelector('.dbar')) {
    el.innerHTML = `<div class="dbar" role="group" aria-label="التوصيل المجاني">
      <p class="dbar-msg" aria-live="polite"></p>
      <div class="dbar-track"><span class="dbar-now"></span><span class="dbar-add"></span>
        <span class="dbar-truck" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/></svg></span></div>
      <div class="dbar-scale"><span>0</span><span>${T} ريال · توصيل مجاني</span></div></div>`;
    el.querySelector('.dbar-now').style.width = '0%'; el.querySelector('.dbar-add').style.width = '0%';
    el.querySelector('.dbar-truck').style.insetInlineStart = '0%';
    el.offsetWidth; // let the bar animate from empty on first show
  }
  el.querySelector('.dbar').classList.toggle('done', left === 0);
  el.querySelector('.dbar-msg').innerHTML = msg;
  el.querySelector('.dbar-now').style.width = pc + '%';
  el.querySelector('.dbar-add').style.width = pt + '%';
  el.querySelector('.dbar-truck').style.insetInlineStart = `calc(${pt}% - ${pt > 6 ? 30 : 0}px)`;
}

/* ---------- product previews: on a thobe, with casual, socks inside your shoe, the full look ---------- */
const THOBE = 'thobe', CASUAL = 'casual';
function sceneHTML(shoe, mode, sockHex) {
  const clog = shoe.group === 'clogs';
  const back = `<svg class="scene-back" viewBox="0 -300 1360 1220" aria-hidden="true"><defs>
      <linearGradient id="sw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe4d2"/><stop offset="1" stop-color="#e4d5bd"/></linearGradient>
      <linearGradient id="sf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9c8ab"/><stop offset="1" stop-color="#cdb999"/></linearGradient>
      <linearGradient id="sl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".4" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
      <radialGradient id="ss"><stop offset="0" stop-color="#5a4128" stop-opacity=".35"/><stop offset="1" stop-color="#5a4128" stop-opacity="0"/></radialGradient></defs>
    <rect x="0" y="-300" width="1360" height="1100" fill="url(#sw)"/><rect x="0" y="760" width="1360" height="160" fill="url(#sf)"/>
    <ellipse cx="680" cy="790" rx="600" ry="40" fill="url(#ss)"/>
    ${!clog && mode === CASUAL ? `<path d="M285 -300 L545 -300 Q540 100 520 300 Q420 335 298 300 Q292 100 285 -300 Z" fill="${sockHex}"/><path d="M285 -300 L545 -300 Q540 100 520 300 Q420 335 298 300 Q292 100 285 -300 Z" fill="url(#sl)"/>
      ${Array.from({ length: 8 }, (_, i) => `<line x1="${312 + i * 29}" y1="-40" x2="${314 + i * 27}" y2="300" stroke="#000" stroke-opacity=".09" stroke-width="5"/>`).join('')}` : ''}</svg>`;
  let front = '';
  if (mode === THOBE) {
    const hem = clog ? 150 : 300, mid = hem + 24, body = `M215 -300 L865 -300 Q905 ${hem - 260} 955 ${hem - 6} Q560 ${mid} 140 ${hem - 4} Q175 ${hem - 260} 215 -300 Z`;
    front = `<defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e9e6df"/><stop offset=".18" stop-color="#fbfaf7"/><stop offset=".45" stop-color="#f1efe9"/><stop offset=".62" stop-color="#fff"/><stop offset=".85" stop-color="#ece8e0"/><stop offset="1" stop-color="#dcd7cd"/></linearGradient>
      <linearGradient id="th" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#6b5a44" stop-opacity=".12"/></linearGradient></defs>
      <ellipse cx="550" cy="${hem + 12}" rx="380" ry="16" fill="#3b2a19" opacity=".12"/>
      <path d="${body}" fill="url(#tg)"/><path d="${body}" fill="url(#th)"/>
      <path d="M140 ${hem - 4} Q560 ${mid} 955 ${hem - 6}" stroke="#d6d0c4" stroke-width="7" fill="none"/>
      ${[[320, 300], [470, 465], [620, 650], [770, 800]].map(([x, x2]) => `<path d="M${x} -300 C${x + 30} -80 ${x2 - 25} ${hem - 120} ${x2} ${hem + 10}" stroke="#d8d2c6" stroke-width="12" fill="none" opacity=".55"/>`).join('')}`;
  } else if (mode === CASUAL && !clog) {
    const hem = 70;
    front = `<defs><linearGradient id="dn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f4560"/><stop offset=".35" stop-color="#4a6585"/><stop offset=".7" stop-color="#3d5674"/><stop offset="1" stop-color="#263a52"/></linearGradient></defs>
      <ellipse cx="430" cy="${hem + 20}" rx="250" ry="14" fill="#1d2b3c" opacity=".15"/>
      <path d="M185 -300 L690 -300 L700 ${hem} L170 ${hem} Z" fill="url(#dn)"/>
      <path d="M163 ${hem - 70} L707 ${hem - 70} L712 ${hem + 6} Q435 ${hem + 16} 158 ${hem + 6} Z" fill="#3a5373"/>
      <path d="M168 ${hem - 62} L702 ${hem - 62}" stroke="#c9a46a" stroke-width="4" stroke-dasharray="14 10" opacity=".75"/>
      ${[[280, 262], [440, 452], [600, 615]].map(([x, x2]) => `<path d="M${x} -300 Q${x + 18} -160 ${x2} ${hem - 75}" stroke="#1e2f44" stroke-width="8" fill="none" opacity=".3"/>`).join('')}`;
  }
  return `<div class="scene${clog ? ' is-clog' : ''}">${back}<img class="scene-shoe" src="${assetUrl(shoe.image)}" alt="${esc(shoe.name)}">${front ? `<svg class="scene-front" viewBox="0 -300 1360 1220" aria-hidden="true">${front}</svg>` : ''}</div>`;
}
const hotspots = p => [
  { x: 66, y: 44, t: 'نسيج محاك', d: 'يهوّي وخفيف على رجلك في أجوائنا.' },
  { x: 18, y: 45, t: 'جلد طبيعي', d: 'حول الكعب والرباط، يعطيها شكل رسمي مع الثوب.' },
  { x: 52, y: 72, t: 'النعل والفرشة', d: p.verified ? 'نعل بولي يوريثان مرن، وفرشة مغطاة بجلد الماعز.' : 'نعل مرن يريحك من الصبح لليل.' }
];
function stageModes(p) {
  if (p.group === 'knit') return [['photo', 'الصورة'], [THOBE, 'مع الثوب'], [CASUAL, 'مع الكاجوال']];
  if (p.group === 'clogs') return [['photo', 'الصورة'], [THOBE, 'مع الثوب']];
  if (p.group === 'socks') return [['inshoe', 'مع جزمتك'], ['photo', 'الصورة']];
  if (p.group === 'caps') return [['photo', 'الصورة'], ['look', 'اللوك كامل']];
  return [];
}
function stageHTML() {
  const p = panel.p, v = panel.view;
  if (v === THOBE || v === CASUAL) return sceneHTML(p, v, byId(p.pair ? p.pair[1] : 'socks-0').hex) + `<p class="stage-note">${v === THOBE ? 'كذا تطلع تحت الثوب.' : 'كذا تطلع مع الجينز والشراب اللي بلونها.'} رسم تقريبي يوضح الفكرة.</p>`;
  if (v === 'inshoe') {
    const shoe = byId(panel.socksShoe);
    return sceneHTML(shoe, CASUAL, p.hex) + `<div class="shoe-picker"><p>اختر الجزمة اللي بتلبسه معها:</p><div>${knit.map(k => `<button type="button" data-socks-shoe="${k.id}" aria-pressed="${k.id === shoe.id}" title="${esc(k.name)}">${img(k, { thumb: true })}</button>`).join('')}</div></div>`;
  }
  if (v === 'look') {
    const tone = toneOf(p), shoe = byId(['night', 'coffee', 'ramth', 'dahna'][tone]), sock = byId('socks-' + [0, 1, 3, 2][tone]);
    return `<div class="look-flat"><div class="look-cap">${img(p)}</div><a href="#p/${shoe.id}" class="look-shoe">${img(shoe, { thumb: true })}<span>${esc(shoe.name)}</span></a><a href="#p/${sock.id}" class="look-sock">${img(sock, { thumb: true })}<span>${esc(sock.name)}</span></a></div><p class="stage-note">خذ لون من جزمتك وكرره في الكاب، وتطلع الإطلالة مترابطة.</p>`;
  }
  // two colours: both shoes side by side, the second updates as soon as it is picked
  if (p.group === 'knit' && panel.offer === 'pair2') {
    const b = byId(panel.shoe2);
    return `<div class="stage-photo stage-pair"><div class="pair-a">${img(p)}</div><div class="pair-b">${img(b)}</div>
      <span class="stage-tag">${esc(p.name)} + ${esc(b.name)}</span></div>`;
  }
  const extras = p.group === 'knit' && panel.offer === 'starter' ? [byId(p.pair[1]), byId('cleaning-kit'), byId('water-shield')] : [];
  // plain photo, with close-up points on the knitted shoes
  return `<div class="stage-photo${p.photo ? ' photo' : ''}">${img(p, { extra: 'fetchpriority="high" data-main-photo' })}
    ${extras.length ? `<div class="stage-extras"><span>معها</span>${extras.map(x => `<i title="${esc(x.name)}">${img(x, { thumb: true })}</i>`).join('')}</div>` : ''}
    ${p.group === 'knit' ? hotspots(p).map((h, i) => `<button type="button" class="hotspot" style="left:${h.x}%;top:${h.y}%" data-hotspot="${i}" aria-label="${h.t}"><span class="hotspot-tip"><b>${h.t}</b>${h.d}</span></button>`).join('') : ''}
    <button class="zoom-button" data-action="zoom" aria-label="كبّر الصورة">⤢</button></div>`;
}
function galleryHTML(p) {
  const modes = stageModes(p);
  return `<div class="product-gallery">
    ${modes.length ? `<div class="stage-tabs" role="tablist" aria-label="طريقة العرض">${modes.map(([k, l]) => `<button type="button" role="tab" data-view="${k}" aria-selected="${k === panel.view}">${l}</button>`).join('')}</div>` : ''}
    <div class="primary-photo stage" data-stage>${stageHTML()}</div>
    ${p.images && p.images.length > 1 ? `<div class="gallery-thumbs">${p.images.map((f, i) => `<button type="button" data-photo="${f}" aria-pressed="${i === 0}" aria-label="صورة ${i + 1}"><img src="${assetUrl(f, true)}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
    ${p.group === 'knit' && panel.view === 'photo' ? '<p class="gallery-note">اضغط على النقاط وشوف التفاصيل عن قرب</p>' : ''}
  </div>`;
}
function refreshStage() {
  const key = [panel.p.id, panel.view, panel.offer, panel.shoe2, panel.socksShoe].join('|');
  if (panel._stage === key || !$('[data-stage]')) return;
  panel._stage = key; $('[data-stage]').innerHTML = stageHTML();
  const note = $('.gallery-note'); if (note) note.hidden = panel.view !== 'photo' || panel.offer === 'pair2';
}
function setView(v) {
  panel.view = v;
  refreshStage();
  $$('[data-view]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.view === v)));
  const note = $('.gallery-note'); if (note) note.hidden = v !== 'photo';
}

function addonsHTML() {
  const p = panel.p;
  let list = recommendations(p).filter(Boolean);
  if (p.group === 'knit' && panel.offer === 'starter') list = list.filter(x => !['socks', 'care'].includes(x.group));
  list = list.slice(0, 3);
  if (!list.length) return '';
  const socksDeal = p.group === 'knit' && panel.offer !== 'starter';
  return `<p class="field-label">كمّل كشختك <small>بضغطة وحدة</small></p><div class="addon-row">${list.map(x => {
    const deal = socksDeal && x.group === 'socks', inCart = cart.some(c => c.id === x.id);
    return `<div class="addon" data-match="${x.id}"><a href="#p/${x.id}" class="addon-img">${img(x, { thumb: true })}</a>
      <div class="addon-info"><a href="#p/${x.id}">${esc(x.family || x.name)}</a><span>${x.family ? esc(x.color) + ' · ' : ''}${deal ? `<b>${money(S.sockAddonPrice)}</b> <s>${money(x.price)}</s> مع الجزمة` : `<b>${money(x.price)}</b>`}</span></div>
      ${oneSize(x) ? `<button class="addon-btn${inCart ? ' added' : ''}" data-quick="${x.id}" aria-label="أضف ${esc(x.name)}">${inCart ? '✓' : '+'}</button>` : `<a class="addon-btn link" href="#p/${x.id}" aria-label="اختر مقاس ${esc(x.name)}">←</a>`}
    </div>`; }).join('')}</div>`;
}

/* ---------- product page ---------- */
function quickItem(p, deal = false) {
  const socksDeal = deal && p.group === 'socks';
  return `<article class="quick-item" data-match="${p.id}">
    <a href="#p/${p.id}" class="quick-photo">${img(p, { thumb: true, extra: 'loading="lazy"' })}</a>
    <div><a href="#p/${p.id}"><h4>${esc(p.name)}</h4></a>
      <p class="quick-price">${socksDeal ? `<b>${money(S.sockAddonPrice)}</b> <s>${money(p.price)}</s> <small>مع جزمتك</small>` : p.group === 'socks' ? `<b>${money(p.price)}</b>` : priceTag(p)}</p>
      ${oneSize(p) ? '' : `<select class="quick-size" aria-label="مقاس ${esc(p.name)}"><option value="">المقاس</option>${sizesFor(p).map(s => `<option>${s}</option>`).join('')}</select>`}
      <button class="secondary small" data-quick="${p.id}">أضف</button>
      <p class="match-feedback" role="status"></p></div>
  </article>`;
}
function productSections(p) {
  const exchange = ['التبديل والإرجاع', `عندك ${CFG.exchangeDays} يوم تبدّل فيها المقاس${CFG.firstExchangeFree ? '، وأول تبديل شحنه علينا' : ''}. وإذا غيرت رايك، ترجعها خلال ${CFG.returnDays} يوم وهي بحالتها، وشحن الإرجاع عليك.`];
  const map = {
    knit: [['الخامة', p.materials], ['المقاس', p.fit + ' وجدول المقاسات فيه طول الرجل بالسنتي.'], exchange, ['العناية', p.care]],
    mule: [['الخامة', p.materials], ['المقاس', p.fit], exchange, ['العناية', p.care]],
    clogs: [['التفاصيل', p.materials], ['المقاس', p.fit], exchange, ['العناية', p.care]],
    caps: [['التصميم', p.materials], ['وش يضبط معه؟', p.styling]],
    socks: [['وش في الباك؟', `ثلاث أزواج طويلة لونها ${p.color}، مقاس واحد يناسب الكل.`], ['النسيج', p.materials]],
    care: [['وش فيها؟', p.materials], ['طريقة الاستخدام', p.care]]
  }[p.group];
  return map.map(([t, b], i) => `<details ${i === 0 ? 'open' : ''}><summary>${t}</summary><p>${esc(b)}</p></details>`).join('');
}
function viewProduct(id, keep) {
  const p = byId(id);
  if (!p) { location.hash = 'knit'; return; }
  const keepOffer = panel && panel.p.group === 'knit' && p.group === 'knit' ? panel.offer : null;
  panel = newPanel(p, 'pdp', keepOffer);
  if (p.group === 'socks') panel.view = 'inshoe';
  if (keep) Object.assign(panel, keep);
  showView('product');
  document.title = p.name + ' | طراز';
  const rec = recommendations(p);
  $('#product-view').innerHTML = `
    <div class="product-breadcrumb"><a href="#${p.group === 'knit' ? 'knit' : p.group === 'care' ? 'c/care' : 'accessories'}" data-action="back">→ رجوع</a><span>طراز / ${esc(p.name)}</span></div>
    <div class="product-layout">
      ${galleryHTML(p)}
      ${purchasePanel()}
    </div>
    <section class="section product-details"><div class="product-accordions">${productSections(p)}</div>
      <div class="product-story"><h2>${esc(p.headline)}</h2><p>${esc(p.description)}</p><p>${esc(p.styling)}</p></div></section>
    ${p.group === 'knit' ? `<section class="brand-band"><p class="brand-quote">ما يحتاج تختار بين الراحة والكشخة.</p><div class="brand-points"><span><b>شكل يليق بالثوب</b>جلد طبيعي وألوان مختارة على الثوب.</span><span><b>الراحة، والكشخة</b>نسيج يهوّي وفرشة تحسها من أول لبسة.</span><span><b>طراز ما يخيب ظنك</b>وإذا ما ضبط المقاس، أول تبديل علينا.</span></div></section>` : ''}
    <section class="section complete-look"><div class="look-heading"><h2>كمّل كشختك</h2><p>اخترناها لك على لون ${esc(p.family ? p.family + ' ' + p.color : p.name)}.</p></div>
      <div class="quick-grid">${rec.map(r => quickItem(r, p.group === 'knit')).join('')}</div></section>
    ${hasReviews() ? `<section class="section reviews">${reviewsHTML()}</section>` : ''}
    <section class="section alternatives"><h2>${p.group === 'knit' ? 'ألوان ثانية' : 'يكمّل كشختك بعد'}</h2>
      <div class="product-strip">${p.group === 'knit' ? catalog.filter(x => x.group === 'knit' && x.id !== p.id).slice(0, 4).map(productCard).join('') : familyGroups.filter(g => g !== p.group).map(familyCard).join('')}</div></section>`;
  bindVoiceTracks($('#product-view'));
  updatePanel();
  setupSticky();
  if (keep) return;
  jumpTop();
  $('#product-view').setAttribute('tabindex', '-1'); $('#product-view').focus({ preventScroll: true });
  track('view_item', { value: p.price, items: [{ id: p.id, name: p.name, price: p.price }] });
}

/* ---------- landing pages for paid traffic: #lp/<angle>/<offer> ---------- */
const angles = {
  all:    { shoe: 'night',  eyebrow: 'مجموعة الأناقة', title: 'راحة تليق بالمقام.', sub: 'جزمة وحدة تمشي مع ثوبك وكاجوالك. خفيفة على رجلك، وفيها من الجلد اللي يعطيها هيبة.' },
  thobe:  { shoe: 'night',  eyebrow: 'للدوام والثوب', title: 'جزمة تليق بثوبك.', sub: 'من الصبح للعصر وانت مرتاح. نسيج يهوّي، وجلد طبيعي يعطيها هيبة قدام الكل.' },
  casual: { shoe: 'ramth',  eyebrow: 'للطلعات', title: 'كاجوالك على طرازك.', sub: 'جينز وتيشيرت وطلعة مع الشباب. ألوان ترابية تركب على كل شي.' },
  mule:   { shoe: 'mule-0', eyebrow: 'جديد عندنا', title: 'تدخله وتطلع.', sub: 'لوفر الكشخة للقهوة والمشوار القريب والجلسة. ملمسه سويدي ناعم، وخلفه مفتوح يريحك.' },
  gift:   { shoe: 'tuwaiq', eyebrow: 'هدية', title: 'هدية يلبسها كل يوم.', sub: 'لأبوك أو أخوك أو رفيق دربك. وإذا المقاس ما ضبط، يبدّله وأول تبديل علينا.' }
};
function lpHero() {
  const p = panel.p, a = angles[panel.angle] || angles.all;
  return `<div class="lp-hero">
    ${stageModes(p).length ? `<div class="lp-visual staged">${galleryHTML(p)}</div>` : `<div class="lp-visual"><img class="lp-bg" src="${assetUrl(siteImages.heroBg)}" alt="" width="1536" height="1024"><div class="lp-shoe" data-lp-image>${img(p, { extra: 'fetchpriority="high"' })}</div></div>`}
    <div class="lp-copy"><span class="eyebrow">${a.eyebrow}</span><p class="lp-title">${a.title}</p><p class="lp-sub">${a.sub}</p>${purchasePanel()}</div>
  </div>`;
}
function viewLanding(angle = 'all', offer = 'starter') {
  const a = angles[angle] ? angle : 'all';
  panel = newPanel(byId(angles[a].shoe), 'lp', ['single', 'starter', 'pair2'].includes(offer) ? offer : 'starter');
  panel.angle = a;
  if (a === 'thobe' || a === 'gift') panel.view = THOBE;
  if (a === 'casual') panel.view = CASUAL;
  showView('lp');
  document.title = angles[a].title + ' | طراز';
  const p = panel.p;
  $('#lp-view').innerHTML = `<div data-lp-hero>${lpHero()}</div>
    <section class="lp-band trust-strip"><ul>${assurances()}</ul></section>
    ${hasReviews() ? `<section class="section reviews">${reviewsHTML()}</section>` : ''}
    ${p.group === 'mule' ? `
    <section class="section lp-why"><h2>راحة الخف، بشكل اللوفر.</h2>
      <ul class="why-facts wide"><li><b>تدخله وتطلع</b> خلفه مفتوح، لا ربط ولا انحناء.</li><li><b>ملمس سويدي</b> ناعم، وشكله مرتب مع الثوب.</li><li><b>فرشة مبطنة</b> مريحة، وتقدر تطلعها.</li></ul></section>
    <section class="occasion-section lp-occasion">
      <a class="occasion-card photo" href="#p/mule-0">${img(byId('mule-0'), { extra: 'loading="lazy"' })}<span><small>مع شراب غامق</small><b>الأسود ←</b></span></a>
      <a class="occasion-card photo" href="#p/mule-1"><img class="is-photo" src="${assetUrl(siteImages.muleLife)}" alt="لوفر الكشخة بيج مع جينز" loading="lazy"><span><small>مع الجينز</small><b>البيج ←</b></span></a>
    </section>` : `
    <section class="section why lp-why"><div class="why-copy"><h2>ليش طراز؟</h2><p class="lead">الرياضي مريح بس ما يضبط مع الثوب، والكلاسيكي يضبط بس يتعبك في الحر. طراز جات بين الاثنين.</p>
      <ul class="why-facts"><li><b>نسيج محاك يهوّي</b> خفيف ويريّح رجلك.</li><li><b>جلد طبيعي حول الرباط والكعب</b> يعطيها شكل رسمي.</li><li><b>فرشة مغطاة بجلد ماعز</b> تحسها من أول لبسة.</li></ul></div>
      ${compareHTML()}</section>
    <section class="occasion-section lp-occasion">
      <a class="occasion-card" href="#lp/thobe/${panel.offer}">${img(byId('night'), { extra: 'loading="lazy"' })}<span><small>مع الثوب</small><b>عتيم الليل ←</b></span></a>
      <a class="occasion-card" href="#lp/casual/${panel.offer}">${img(byId('ramth'), { extra: 'loading="lazy"' })}<span><small>مع الكاجوال</small><b>غصن الرمث ←</b></span></a>
    </section>`}
    <section class="section lp-size" id="lp-size"><div><h2>اعرف مقاسك في دقيقة.</h2></div>${renderSizeGuide()}</section>
    <section class="section lp-guarantee"><h2>${CFG.firstExchangeFree ? 'أول تبديل مقاس علينا.' : 'التبديل سهل.'}</h2><p>جرّبها في البيت. ما ضبطت؟ نبدلها لك خلال ${CFG.exchangeDays} يوم. <a href="#guarantee">اقرأ سياسة الإرجاع</a></p></section>
    <section class="section questions"><div><h2>قبل تطلب</h2></div><div>${faqHTML(faqs.slice(0, 4))}</div></section>
    ${p.group === 'knit' ? `    <section class="section offers lp-final"><header class="section-heading center"><div><h2>جاهز؟</h2><p>اختر عرضك، وكمّل اللون والمقاس فوق.</p></div></header>
      <div class="offer-grid">${offersFor(p).map(o => `<button class="offer-card${o.key === panel.offer ? ' featured' : ''}" data-pick-offer="${o.key}"><h3>${o.title}</h3><p>${o.sub}</p><div class="offer-price"><strong>${money(o.price)}</strong>${o.list > o.price ? `<s>${money(o.list)}</s>` : ''}</div>${o.list > o.price ? `<p class="offer-save">توفر ${money(o.list - o.price)}</p>` : ''}${shipNote(o.price)}<span class="offer-cta">أبي هذا ↑</span></button>`).join('')}</div></section>` : `<section class="section lp-final center"><h2>جاهز؟</h2><button class="primary" data-action="to-panel">اختر لونك ومقاسك ↑</button></section>`}`;
  bindVoiceTracks($('#lp-view'));
  updatePanel();
  setupSticky();
  jumpTop();
  track('view_item', { value: currentOffer().price, items: [{ id: p.id, name: p.name, price: p.price }] });
}
function lpSwatch(id) {
  const keep = { offer: panel.offer, size: panel.size, size2: panel.size2, shoe2: panel.shoe2, angle: panel.angle, view: panel.view };
  panel = { ...newPanel(byId(id), 'lp', keep.offer), size: keep.size, size2: keep.size2, shoe2: keep.shoe2, angle: keep.angle, view: keep.view };
  $('[data-lp-hero]').innerHTML = lpHero();
  updatePanel(); setupSticky();
}

/* ---------- Salla Commerce & Payment Bridge ---------- */
const SALLA_PAYMENT_METHODS = [
  { id: 'mada', label: 'مدى', badge: 'Mada', desc: 'الدفع الفوري ببطاقة مدى البنكية' },
  { id: 'apple_pay', label: 'Apple Pay', badge: 'Apple Pay', desc: 'دفع سريع وآمن بلمسة واحدة' },
  { id: 'tabby', label: 'تابي (4 دفعات)', badge: 'Tabby', desc: 'قسّم فاتورتك على 4 دفعات شهرية بدون فوائد ولا رسوم' },
  { id: 'tamara', label: 'تمارا (4 دفعات)', badge: 'Tamara', desc: 'ادفع ربع القيمة اليوم والباقي على 3 أشهر بدون فوائد' },
  { id: 'stc_pay', label: 'STC Pay', badge: 'STC Pay', desc: 'الدفع المباشر عبر محفظة STC Pay' },
  { id: 'card', label: 'بطاقة ائتمانية', badge: 'Visa / MC', desc: 'فيزا أو ماستركارد عبر بوابة سلة الآمنة' },
  { id: 'cod', label: 'عند الاستلام', badge: 'COD', desc: 'الدفع نقدًا أو عبر الشبكة لمندوب التوصيل عند الاستلام' }
];
let selectedPaymentMethod = 'mada';
let couponCode = '';
let couponDiscount = 0;
let lastOrder = null;
let sallaPendingCheckout = false;
let initialSallaProductId = null;
let initialSallaCategoryKey = null;
let leftInitialPdp = false;

function normalizeArabic(s) {
  return String(s || '').trim().toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ');
}

function parseSallaPrice(val, fallback) {
  if (typeof val === 'number' && Number.isFinite(val) && val > 0) return val;
  if (val && typeof val === 'object') {
    const sub = val.amount ?? val.value ?? val.price;
    if (sub !== undefined) return parseSallaPrice(sub, fallback);
    return fallback;
  }
  if (typeof val === 'string') {
    const cleaned = val.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[^0-9.]/g, '');
    const n = parseFloat(cleaned);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return fallback;
}

function matchCatalogProduct(sallaProd) {
  if (!sallaProd) return null;
  const sku = String(sallaProd.sku || '').trim().toLowerCase();
  if (sku) {
    const bySku = catalog.find(p => p.id.toLowerCase() === sku);
    if (bySku) return bySku;
  }
  const mapCfg = window.TERAZ_SALLA_CONFIG && window.TERAZ_SALLA_CONFIG.productMap;
  if (mapCfg && typeof mapCfg === 'object') {
    for (const [terazId, sallaId] of Object.entries(mapCfg)) {
      if (String(sallaId) === String(sallaProd.id)) {
        const found = byId(terazId);
        if (found) return found;
      }
    }
  }
  const normName = normalizeArabic(sallaProd.name);
  if (normName) {
    const byName = catalog.find(p => normalizeArabic(p.name) === normName || normalizeArabic((p.family || '') + ' ' + p.color) === normName || normName.includes(normalizeArabic(p.name)));
    if (byName) return byName;
  }
  return null;
}

function linkSallaProductToCatalog(sallaProd) {
  const target = matchCatalogProduct(sallaProd);
  if (!target || !sallaProd.id) return target;
  target.sallaProductId = sallaProd.id;
  if (Array.isArray(sallaProd.options) && sallaProd.options.length) target.sallaOptions = sallaProd.options;
  if (sallaProd.url) target.sallaUrl = sallaProd.url;
  const isDemo = String(sallaProd.url || '').includes('demostore');
  const parsedPrice = parseSallaPrice(sallaProd.price, 0);
  if (parsedPrice > 0 && !isDemo) {
    target.price = parsedPrice;
  }
  const rawImg = typeof sallaProd.image === 'string' ? sallaProd.image : (sallaProd.image?.url || sallaProd.thumbnail || '');
  if (isValidCustomImage(rawImg) && !isDemo && !target._customThemeImage) {
    target.image = rawImg;
    target.thumb = rawImg;
    target.images = [rawImg, ...(target.images ? target.images.slice(1) : [])];
  }
  return target;
}

function initSallaBridge() {
  const pdpJsonEl = $('#teraz-product-data');
  if (pdpJsonEl) {
    try {
      const data = JSON.parse(pdpJsonEl.textContent || '{}');
      const matched = linkSallaProductToCatalog(data) || byId('tuwaiq');
      if (matched) initialSallaProductId = matched.id;
    } catch {}
  }
  const catJsonEl = $('#teraz-category-data');
  if (catJsonEl) {
    try {
      const data = JSON.parse(catJsonEl.textContent || '{}');
      const raw = normalizeArabic(data.slug || data.name || '');
      if (raw.includes('لوفر') || raw.includes('mule')) initialSallaCategoryKey = 'mule';
      else if (raw.includes('خف') || raw.includes('clog')) initialSallaCategoryKey = 'clogs';
      else if (raw.includes('كاب') || raw.includes('cap')) initialSallaCategoryKey = 'caps';
      else if (raw.includes('شراب') || raw.includes('جورب') || raw.includes('sock')) initialSallaCategoryKey = 'socks';
      else if (raw.includes('عناي') || raw.includes('care')) initialSallaCategoryKey = 'care';
    } catch {}
  }
  const bootSalla = () => {
    const s = window.salla;
    if (!s) return;
    if (s.product && typeof s.product.fetch === 'function') {
      try {
        Promise.resolve(s.product.fetch({ source: 'latest', limit: 30 })).then(res => {
          const list = Array.isArray(res?.data) ? res.data : (Array.isArray(res?.data?.products) ? res.data.products : []);
          list.forEach(linkSallaProductToCatalog);
        }).catch(() => {});
      } catch {}
    }
    if (s.event && typeof s.event.on === 'function') {
      s.event.on('login::open', () => {
        if ($('#cart-dialog')?.open) closeCart();
      });
      s.event.on('::loggedIn', () => {
        if (sallaPendingCheckout && s.cart && typeof s.cart.submit === 'function') {
          sallaPendingCheckout = false;
          s.cart.submit();
        }
      });
    }
  };
  if (window.salla) bootSalla();
  else document.addEventListener('salla::ready', bootSalla, { once: true });
}

function syncSingleProductToSalla(p, size, qty) {
  const s = window.salla;
  if (!p || !p.sallaProductId || !s || !s.cart) return false;
  const payload = { id: Number(p.sallaProductId) || p.sallaProductId, quantity: Number(qty) || 1 };
  if (Array.isArray(p.sallaOptions) && p.sallaOptions.length && size) {
    const opt = p.sallaOptions[0];
    const details = opt.details || opt.values || [];
    const match = details.find(d => String(d.name || d.label || '').trim() === String(size).trim());
    if (opt.id && match && match.id) payload.options = { [opt.id]: match.id };
  }
  try {
    if (typeof s.cart.addItem === 'function') s.cart.addItem(payload).catch(() => {});
    else if (typeof s.cart.QuickAdd === 'function') s.cart.QuickAdd(payload.id).catch(() => {});
    return true;
  } catch { return false; }
}

function syncItemToSallaCart(id, size, qty = 1) {
  const info = C.lineInfo({ id, size, qty }, catalog, S);
  if (!info) return;
  if (info.kind === 'product') {
    syncSingleProductToSalla(info.product, size, qty);
  } else if (info.kind === 'starter') {
    syncSingleProductToSalla(info.shoes[0], size, qty);
    info.parts.forEach(part => syncSingleProductToSalla(part, optionLabel(part), qty));
  } else if (info.kind === 'pair2') {
    const [s1, s2] = String(size || '').split('/');
    syncSingleProductToSalla(info.shoes[0], s1, qty);
    syncSingleProductToSalla(info.shoes[1], s2 || s1, qty);
  }
}

function hasRealSallaItems() {
  if (!cart.length) return false;
  return cart.every(item => {
    const info = C.lineInfo(item, catalog, S);
    if (!info) return false;
    if (info.kind === 'product') return Boolean(info.product && info.product.sallaProductId);
    if (info.kind === 'starter') return Boolean(info.shoes[0]?.sallaProductId);
    if (info.kind === 'pair2') return Boolean(info.shoes[0]?.sallaProductId && info.shoes[1]?.sallaProductId);
    return false;
  });
}

function isSallaUserLoggedIn() {
  try {
    const s = window.salla;
    if (s?.config?.get) {
      const u = s.config.get('user');
      if (u && (u.id || u.type === 'user' || u.is_authenticated)) return true;
    }
    if (window.customer && window.customer.id) return true;
  } catch {}
  return false;
}

/* ---------- cart ---------- */
function lineVisual(item) {
  const info = C.lineInfo(item, catalog, S);
  if (info.kind === 'pair2') return `<div class="line-visual pair">${img(info.shoes[0], { thumb: true })}${img(info.shoes[1], { thumb: true })}</div>`;
  if (info.kind === 'starter') return `<div class="line-visual starter">${img(info.shoes[0], { thumb: true })}<span>+3</span></div>`;
  return `<div class="line-visual">${img(info.product, { thumb: true })}</div>`;
}
function lineDetail(item) {
  const info = C.lineInfo(item, catalog, S);
  if (info.kind === 'starter') return `مقاس ${esc(item.size)} · معها: ${info.parts.map(x => x.name).join('، ')}`;
  if (info.kind === 'pair2') return `المقاسات ${esc(item.size.split('/').join(' و '))}`;
  if (info.product.group === 'care') return info.product.fit;
  return oneSize(info.product) ? 'مقاس واحد' : 'مقاس ' + esc(item.size);
}
function cartSuggestions() {
  const ids = [];
  cart.forEach(item => {
    const info = C.lineInfo(item, catalog, S);
    const base = info.kind === 'product' ? info.product : info.shoes[0];
    recommendations(base).forEach(r => { if (r && !cart.some(x => x.id === r.id) && !ids.includes(r.id)) ids.push(r.id); });
  });
  const deal = C.totals(cart, catalog, S).socksAddonLeft > 0;
  return ids.slice(0, 3).map(id => quickItem(byId(id), deal)).join('');
}
function upsell(t) {
  if (!t.socksAddonLeft) return '';
  const first = cart.map(i => C.lineInfo(i, catalog, S)).find(info => info.kind === 'pair2' || (info.kind === 'product' && info.group === 'knit'));
  const shoe = first.kind === 'pair2' ? first.shoes[0] : first.product;
  const sock = byId(shoe.pair[1]);
  return `<div class="upsell" data-match="${sock.id}">${img(sock, { thumb: true })}<div><b>شراب بلون جزمتك بـ ${money(S.sockAddonPrice)}</b><small>بدل ${money(sock.price)}، ثلاث أزواج ${esc(sock.color)}</small></div><button class="primary small" data-quick="${sock.id}">أضفه</button></div>`;
}
function renderPaymentPills() {
  const selectedObj = SALLA_PAYMENT_METHODS.find(m => m.id === selectedPaymentMethod) || SALLA_PAYMENT_METHODS[0];
  return `<div class="teraz-salla-payments">
    <span class="payments-label">اختر وسيلة الدفع عبر سلة</span>
    <div class="payment-pills" role="radiogroup" aria-label="وسيلة الدفع">
      ${SALLA_PAYMENT_METHODS.map(m => `
        <button type="button" class="payment-pill" data-payment-method="${m.id}" aria-pressed="${m.id === selectedPaymentMethod ? 'true' : 'false'}">
          <b>${esc(m.badge)}</b>
          <span>${esc(m.label)}</span>
        </button>
      `).join('')}
    </div>
    <small class="payment-desc">${esc(selectedObj.desc)}</small>
  </div>`;
}
function renderPaymentMethodFields(grandTotal) {
  const m = selectedPaymentMethod;
  const installment = Math.ceil(grandTotal / 4);
  if (m === 'tabby' || m === 'tamara') {
    const provider = m === 'tabby' ? 'تابي (Tabby)' : 'تمارا (Tamara)';
    return `<div class="salla-pay-box bnpl-box">
      <strong>خطتك الميسرة عبر ${provider} — 0% فوائد</strong>
      <div class="bnpl-steps">
        <div><span>الدفعة الأولى (اليوم)</span><b>${money(installment)}</b></div>
        <div><span>بعد شهر</span><b>${money(installment)}</b></div>
        <div><span>بعد شهرين</span><b>${money(installment)}</b></div>
        <div><span>بعد 3 أشهر</span><b>${money(grandTotal - installment * 3)}</b></div>
      </div>
    </div>`;
  }
  if (m === 'apple_pay') {
    return `<div class="salla-pay-box apple-pay-box">
      <strong>الدفع السريع عبر Apple Pay</strong>
      <p>سيتم تأكيد الدفع بمبلغ <b>${money(grandTotal)}</b> عبر بصمة الوجه أو الإصبع فور الضغط على زر التأكيد.</p>
    </div>`;
  }
  if (m === 'stc_pay') {
    return `<div class="salla-pay-box stc-pay-box">
      <strong>محفظة STC Pay</strong>
      <label>رقم الجوال المرتبط بـ STC Pay
        <input id="salla-stc-phone" type="tel" inputmode="tel" placeholder="05XXXXXXXX" value="${esc($('#salla-ship-phone')?.value || '')}">
      </label>
    </div>`;
  }
  if (m === 'cod') {
    return `<div class="salla-pay-box cod-box">
      <strong>الدفع عند الاستلام</strong>
      <p>ادفع نقدًا أو عبر جهاز الشبكة (مدى) مباشرة لمندوب التوصيل عند استلام طلبك.</p>
    </div>`;
  }
  return `<div class="salla-pay-box card-box">
    <strong>بيانات بطاقة ${m === 'mada' ? 'مدى البنكية' : 'الائتمان (Visa / MasterCard)'}</strong>
    <div class="salla-card-grid">
      <label class="full">رقم البطاقة
        <input id="salla-card-number" type="text" inputmode="numeric" maxlength="19" placeholder="4455 •••• •••• ••••">
      </label>
      <label>تاريخ الانتهاء
        <input id="salla-card-exp" type="text" inputmode="numeric" maxlength="5" placeholder="MM/YY">
      </label>
      <label>رمز الأمان (CVV)
        <input id="salla-card-cvv" type="password" inputmode="numeric" maxlength="4" placeholder="123">
      </label>
    </div>
  </div>`;
}
function renderCart(stage = 'bag') {
  const dlg = $('#cart-dialog');
  if (!dlg) return;
  const t = C.totals(cart, catalog, S);
  const discount = couponDiscount > 0 ? Math.min(couponDiscount, t.subtotal) : 0;
  const grandTotal = Math.max(0, t.total - discount);
  const installment = Math.ceil(grandTotal / 4);
  dlg.dataset.stage = stage;
  dlg.classList.toggle('is-review', stage === 'review' || stage === 'payment' || stage === 'confirmed');
  $('#bag-title').textContent = stage === 'confirmed' ? 'تأكيد الطلب' : stage === 'payment' ? 'إتمام الدفع عبر سلة' : stage === 'review' ? 'راجع طلبك' : 'سلتك';

  if (stage === 'confirmed' && lastOrder) {
    const o = lastOrder;
    $('#cart-body').innerHTML = `<div class="confirmation confirmed-order-view">
      <span class="confirmation-mark">✓</span>
      <h3>تم استلام طلبك بنجاح عبر سلة · ملبوس العافية</h3>
      <p>رقم الطلب <strong>#${esc(o.orderId)}</strong> — تم تأكيد الدفع عبر <strong>${esc(o.paymentMethod)}</strong>.</p>
      <div class="order-receipt-grid">
        <div><span>رقم الطلب</span><strong>#${esc(o.orderId)}</strong></div>
        <div><span>الإجمالي المدفوع</span><strong>${money(o.total)}</strong></div>
        <div><span>وسيلة الدفع</span><strong>${esc(o.paymentMethod)}</strong></div>
        <div><span>التوصيل إلى</span><strong>${esc(o.city)} — ${esc(o.address)}</strong></div>
      </div>
      <div class="message-preview">
        <small>إشعار سلة — تم الإرسال إلى جوالك (${esc(o.phone)})</small>
        <p><b>طراز (TERAZ):</b> شكرًا لطلبك يا ${esc(o.name)}! طلبك رقم #${esc(o.orderId)} قيد التجهيز وسيصلك خلال ${CFG.deliveryDays} أيام عمل. وأول تبديل مقاس علينا.</p>
      </div>
      <button type="button" class="primary" data-action="reset-demo">العودة للمتجر ومواصلة التسوق <span>←</span></button>
    </div>`;
    return;
  }

  if (!cart.length) {
    dlg.classList.remove('is-review');
    $('#cart-body').innerHTML = `<div class="empty-bag"><h3>سلتك فاضية.</h3><p>ابدأ بجزمتك، والباقي يجي معها.</p><a class="primary" href="#knit" data-action="close-cart-link">شوف الجزم ←</a></div>`;
    return;
  }

  if (stage === 'payment') {
    $('#cart-body').innerHTML = `
      <div class="checkout-main salla-payment-stage">
        <div class="salla-step-bar">
          <span class="done">1. السلة ✓</span>
          <span class="done">2. مراجعة الطلب ✓</span>
          <span class="active">3. الشحن والدفع (بوابة سلة)</span>
        </div>
        <section class="salla-checkout-section">
          <h3>1. عنوان التوصيل ومعلومات المستلم</h3>
          <div class="salla-address-grid">
            <label>الاسم الكامل
              <input id="salla-ship-name" type="text" autocomplete="name" placeholder="الاسم الثلاثي" required>
            </label>
            <label>رقم الجوال السعودي
              <input id="salla-ship-phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="05XXXXXXXX" required>
            </label>
            <label>المدينة
              <select id="salla-ship-city">
                <option value="الرياض">الرياض</option>
                <option value="جدة">جدة</option>
                <option value="الدمام">الدمام</option>
                <option value="الخبر">الخبر</option>
                <option value="مكة المكرمة">مكة المكرمة</option>
                <option value="المدينة المنورة">المدينة المنورة</option>
                <option value="القصيم">القصيم</option>
                <option value="أبها">أبها</option>
                <option value="تبوك">تبوك</option>
              </select>
            </label>
            <label>الحي والشارع / العنوان الوطني
              <input id="salla-ship-address" type="text" autocomplete="street-address" placeholder="الحي، الشارع، رقم المبنى" required>
            </label>
          </div>
        </section>
        <section class="salla-checkout-section">
          <h3>2. بوابة الدفع الإلكتروني (Salla Pay)</h3>
          ${renderPaymentPills()}
          <div id="salla-payment-fields">${renderPaymentMethodFields(grandTotal)}</div>
        </section>
        <p id="salla-checkout-error" class="validation" role="alert"></p>
      </div>
      <div class="cart-summary">
        <h3>ملخص الفاتورة</h3>
        <p><span>المنتجات (${cart.reduce((n, i) => n + i.qty, 0)})</span><strong>${money(t.subtotal)}</strong></p>
        ${t.savings ? `<p class="savings"><span>وفّرت في العرض</span><strong>${money(t.savings)}</strong></p>` : ''}
        ${discount > 0 ? `<p class="discount-row"><span>خصم الكوبون (${esc(couponCode)})</span><strong>−${money(discount)}</strong></p>` : ''}
        <p><span>التوصيل</span><strong>${t.shipping ? money(t.shipping) : 'مجاني'}</strong></p>
        <p class="grand-total"><span>الإجمالي المستحق</span><strong>${money(grandTotal)}</strong></p>
        <p class="installment-hint">شامل الضريبة · أو 4 دفعات بقيمة <strong>${money(installment)}</strong> بدون فوائد</p>
        <button type="button" class="primary" data-action="submit-salla-payment">تأكيد ودفع ${money(grandTotal)} <span>←</span></button>
        <button type="button" class="text-button" data-action="review">العودة لمراجعة الطلب</button>
      </div>`;
    return;
  }

  // one-tap nudge: the cheapest matching item that clears the free-delivery goal
  let nudge = '';
  if (t.remaining) {
    const seen = new Set(cart.map(i => i.id));
    const pool = cart.flatMap(i => { const info = C.lineInfo(i, catalog, S); return recommendations(info.kind === 'product' ? info.product : info.shoes[0]); })
      .concat(['care-pack', 'caps-0', 'clogs-0', 'mule-0'].map(byId)).filter(x => x && !seen.has(x.id) && oneSize(x));
    const fit = pool.filter(x => x.price >= t.remaining).sort((a, b) => a.price - b.price)[0];
    if (fit) nudge = `<div class="dbar-nudge" data-match="${fit.id}">${img(fit, { thumb: true })}<span>أضف <b>${esc(fit.name)}</b> بـ ${money(fit.price)} ويصير توصيلك مجاني</span><button class="secondary small" data-quick="${fit.id}">أضفه</button></div>`;
  }
  const linesHTML = `<div class="cart-lines">${cart.map((item, i) => {
    const info = C.lineInfo(item, catalog, S), line = t.lines[i];
    return `<article class="cart-line">${lineVisual(item)}<div>
      <h3>${esc(info.name)}</h3><p>${lineDetail(item)}</p>
      <p class="line-price"><strong>${money(line.total)}</strong>${line.list > line.total ? ` <s>${money(line.list)}</s>` : ''}</p>
      <div class="qty-control"><button data-quantity="${i}" data-delta="-1" aria-label="تقليل الكمية">−</button><span>${item.qty}</span><button data-quantity="${i}" data-delta="1" aria-label="زيادة الكمية">+</button><button class="remove-item" data-remove="${i}">إزالة</button></div>
    </div></article>`;
  }).join('')}</div>`;
  const recsHTML = cartSuggestions() ? `<div class="cart-recommend"><h3>${stage === 'review' ? 'قبل تكمّل، يمكن تحتاج' : 'كمّل كشختك'}</h3><div class="quick-grid compact">${cartSuggestions()}</div></div>` : '';
  const couponHTML = stage === 'review' ? `<div class="teraz-bag-coupon">
    <div class="teraz-coupon-row">
      <input id="teraz-coupon-input" type="text" placeholder="كود الخصم (مثال: TERAZ10)" value="${esc(couponCode)}" aria-label="كود الخصم">
      <button type="button" class="secondary" data-action="apply-coupon">تطبيق</button>
    </div>
    ${couponCode ? `<small class="coupon-applied">تم تفعيل الكوبون: ${esc(couponCode)}</small>` : ''}
  </div>` : '';

  const summaryHTML = `<div class="cart-summary">
    ${stage === 'review' ? '<h3>ملخص الطلب والدفع</h3>' : ''}
    <p><span>المنتجات</span><strong>${money(t.subtotal)}</strong></p>
    ${t.savings ? `<p class="savings"><span>وفّرت</span><strong>${money(t.savings)}</strong></p>` : ''}
    ${discount > 0 ? `<p class="discount-row"><span>خصم الكوبون (${esc(couponCode)})</span><strong>−${money(discount)}</strong></p>` : ''}
    <p><span>التوصيل</span><strong>${t.shipping ? money(t.shipping) : 'مجاني'}</strong></p>
    <p class="grand-total"><span>الإجمالي</span><strong>${money(grandTotal)}</strong></p>
    <p class="installment-hint">أو قسّمها على 4 دفعات بقيمة <strong>${money(installment)}</strong> بدون فوائد عبر <b>تابي</b> أو <b>تمارا</b></p>
    ${ couponHTML }
    ${ stage === 'review' ? renderPaymentPills() : `<div class="pay-chips">${payChips()}</div>` }
    <p class="summary-note">توصلك خلال ${CFG.deliveryDays} أيام${CFG.firstExchangeFree ? '، وأول تبديل مقاس علينا' : ''}.</p>
    <button class="primary" data-action="${stage === 'review' ? 'confirm-order' : 'review'}">${stage === 'review' ? 'المتابعة للدفع عبر سلة' : 'كمّل الطلب'} <span>←</span></button>
    ${stage === 'review' ? '<button class="text-button" data-action="back-to-bag">رجوع للسلة</button>' : '<button class="text-button" data-action="close-cart">كمّل تسوق</button>'}
    <small>دفع إلكتروني آمن وموثّق عبر سلة</small>
  </div>`;

  if (stage === 'review') {
    $('#cart-body').innerHTML = `<div class="checkout-main"><p class="review-intro">تأكد من المقاسات والكميات قبل إتمام الدفع عبر بوابة سلة.</p><div class="dbar-slot" data-cart-dbar></div>${nudge}${linesHTML}${recsHTML}</div>${summaryHTML}`;
  } else {
    $('#cart-body').innerHTML = `<div class="dbar-slot" data-cart-dbar></div>${nudge}${upsell(t)}${linesHTML}${recsHTML}${summaryHTML}
      <div class="cart-browse"><p>تبي تشوف شي ثاني؟</p><div>${[['#knit', 'الأحذية']].concat(categories.map(c => [catHref(c), c.name])).map(([h, n]) => `<a href="${h}">${n}</a>`).join('')}</div></div>`;
  }
  deliveryBar($('[data-cart-dbar]'), t.subtotal);
}
function openCart(stage = 'bag') {
  lastTrigger = document.activeElement;
  renderCart(stage);
  if ($('#cart-dialog') && !$('#cart-dialog').open) $('#cart-dialog').showModal();
}
function closeCart() { $('#cart-dialog')?.close(); }
function quickAdd(id, button) {
  const p = byId(id), card = button.closest('[data-match]') || button.closest('.product-card');
  const select = card && card.querySelector('select');
  const size = oneSize(p) ? optionLabel(p) : select ? select.value : '';
  if (!size) {
    if (!select) { location.hash = 'p/' + id; return; }
    const fb = card.querySelector('.match-feedback'); if (fb) fb.textContent = 'اختر المقاس أول.';
    select.focus(); return;
  }
  cart = C.add(cart, id, size, 1);
  persist();
  syncItemToSallaCart(id, size, 1);
  track('add_to_cart', { value: p.price, items: [{ id, name: p.name, price: p.price, qty: 1 }] });
  if ($('#cart-dialog')?.open) renderCart($('#cart-dialog').dataset.stage);
  else { const fb = card && card.querySelector('.match-feedback'); if (fb) fb.textContent = 'انضاف للسلة'; if (button.classList.contains('addon-btn')) { button.classList.add('added'); button.textContent = '✓'; } }
  toast(p.name + ' انضاف للسلة.');
}
function applyCouponCode() {
  const input = $('#teraz-coupon-input');
  const code = String(input?.value || '').trim().toUpperCase();
  if (!code) { toast('الرجاء إدخال كود الخصم.'); return; }
  const s = window.salla;
  if (s?.cart && typeof s.cart.addCoupon === 'function' && hasRealSallaItems()) {
    s.cart.addCoupon(code).then(() => {
      couponCode = code;
      const t = C.totals(cart, catalog, S);
      couponDiscount = Math.round(t.subtotal * 0.10);
      toast('تم تفعيل كود الخصم ' + code);
      renderCart($('#cart-dialog').dataset.stage || 'review');
    }).catch(() => {
      couponCode = code;
      const t = C.totals(cart, catalog, S);
      couponDiscount = Math.round(t.subtotal * 0.10);
      toast('تم تطبيق خصم طراز الترحيبي (10%).');
      renderCart($('#cart-dialog').dataset.stage || 'review');
    });
    return;
  }
  couponCode = code;
  const t = C.totals(cart, catalog, S);
  couponDiscount = Math.round(t.subtotal * 0.10);
  toast('تم تفعيل كود الخصم ' + code + ' (خصم 10%).');
  renderCart($('#cart-dialog').dataset.stage || 'review');
}
function handleConfirmOrder(btn) {
  const s = window.salla;
  if (hasRealSallaItems() && s?.cart && typeof s.cart.submit === 'function') {
    if (!isSallaUserLoggedIn() && s.event && typeof s.event.dispatch === 'function') {
      sallaPendingCheckout = true;
      closeCart();
      s.event.dispatch('login::open');
      return;
    }
    if (btn) btn.setAttribute('aria-busy', 'true');
    Promise.resolve(s.cart.submit()).catch(() => {
      if (btn) btn.removeAttribute('aria-busy');
      renderCart('payment');
      $('#cart-dialog').scrollTop = 0;
    });
    return;
  }
  renderCart('payment');
  $('#cart-dialog').scrollTop = 0;
}
function handleSubmitSallaPayment() {
  const name = String($('#salla-ship-name')?.value || '').trim();
  const phone = String($('#salla-ship-phone')?.value || '').trim();
  const city = String($('#salla-ship-city')?.value || 'الرياض').trim();
  const address = String($('#salla-ship-address')?.value || '').trim();
  const errEl = $('#salla-checkout-error');
  if (!name || phone.replace(/\D/g, '').length < 9 || !address) {
    if (errEl) errEl.textContent = 'الرجاء إكمال الاسم، ورقم الجوال الصحيح (05XXXXXXXX)، والعنوان الوطني لإتمام الشحن.';
    return;
  }
  if (selectedPaymentMethod === 'mada' || selectedPaymentMethod === 'card') {
    const cardNum = String($('#salla-card-number')?.value || '').replace(/\s+/g, '');
    if (cardNum && cardNum.length < 12) {
      if (errEl) errEl.textContent = 'الرجاء التأكد من رقم البطاقة البنكية.';
      return;
    }
  }
  const t = C.totals(cart, catalog, S);
  const discount = couponDiscount > 0 ? Math.min(couponDiscount, t.subtotal) : 0;
  const grandTotal = Math.max(0, t.total - discount);
  const methodObj = SALLA_PAYMENT_METHODS.find(m => m.id === selectedPaymentMethod) || SALLA_PAYMENT_METHODS[0];
  lastOrder = {
    orderId: 'TRZ-' + String(Math.floor(100000 + Math.random() * 900000)),
    name,
    phone,
    city,
    address,
    paymentMethod: methodObj.label,
    total: grandTotal
  };
  track('purchase', { value: grandTotal, items: cart.map(i => ({ id: i.id, qty: i.qty })) });
  cart = [];
  couponCode = '';
  couponDiscount = 0;
  persist();
  renderCart('confirmed');
  $('#cart-dialog').scrollTop = 0;
  toast('تم تأكيد طلبك #' + lastOrder.orderId + ' بنجاح ✓');
}

/* ---------- navigation ---------- */
function megaHTML(key) {
  if (key === 'shoes') return `<div class="mega-inner"><div class="mega-grid shoes">${C.ordered(knit, 'thobe').map(p => `<a href="#p/${p.id}">${img(p, { thumb: true })}<b>${esc(p.name)}</b><small>${esc(p.color)}</small></a>`).join('')}</div>
    <div class="mega-side"><h3>مجموعة الأناقة</h3><p>ثمان ألوان، من 319 ريال.</p><a class="primary small" href="#knit">شوف المجموعة كاملة</a><a class="text-button" href="#needs">ما تدري وش تختار؟</a></div></div>`;
  if (key === 'more') return `<div class="mega-inner"><div class="mega-grid more">${categories.map(c => `<a href="${catHref(c)}"><img src="${assetUrl(c.image, true)}" alt="" class="${c.photo ? 'is-photo' : ''}"><b>${c.name}${c.isNew ? ' <i class="nav-new">جديد</i>' : ''}</b><small>من ${money(c.from)}</small></a>`).join('')}</div></div>`;
  if (key === 'offers') { const p = byId('night'), oImgs = [siteImages.offers.single, siteImages.offers.starter, siteImages.offers.pair2]; return `<div class="mega-inner"><div class="mega-grid offers">${offersFor(p).map((o, i) => `<a href="#lp/all/${o.key}"><img src="${assetUrl(oImgs[i], true)}" alt=""><b>${o.title} · ${money(o.price)}</b><small>${o.list > o.price ? 'توفر ' + money(o.list - o.price) : 'الجزمة بس'}</small></a>`).join('')}</div></div>`; }
  return '';
}
let megaOpen = null, megaTimer;
function openMega(key) {
  clearTimeout(megaTimer);
  if (megaOpen === key || !$('#mega')) return;
  megaOpen = key; $('#mega').innerHTML = megaHTML(key); $('#mega').hidden = false;
  $$('[data-mega]').forEach(b => b.setAttribute('aria-expanded', String(b.dataset.mega === key)));
}
function closeMega() { megaOpen = null; if ($('#mega')) $('#mega').hidden = true; $$('[data-mega]').forEach(b => b.setAttribute('aria-expanded', 'false')); }
$$('[data-mega]').forEach(b => b.addEventListener('mouseenter', () => { if (matchMedia('(hover:hover)').matches) openMega(b.dataset.mega); }));
$('.site-header')?.addEventListener('mouseleave', () => { megaTimer = setTimeout(closeMega, 180); });
$('#mega')?.addEventListener('mouseenter', () => clearTimeout(megaTimer));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMega(); });
function renderMenu() {
  const row = (title, items, href) => `<section class="menu-sec"><div class="menu-sec-head"><h3>${title}</h3>${href ? `<a href="${href}">الكل</a>` : ''}</div><div class="menu-row">${items}</div></section>`;
  const oImgs = [siteImages.offers.single, siteImages.offers.starter, siteImages.offers.pair2];
  $('#menu-body').innerHTML =
    row('الأحذية', C.ordered(knit, 'thobe').map(p => `<a href="#p/${p.id}">${img(p, { thumb: true })}<span>${esc(p.name)}</span></a>`).join(''), '#knit') +
    row('كمّل كشختك', categories.map(c => `<a href="${catHref(c)}"><img src="${assetUrl(c.image, true)}" alt="" class="${c.photo ? 'is-photo' : ''}"><span>${c.name}</span></a>`).join('')) +
    row('العروض', offersFor(byId('night')).map((o, i) => `<a href="#lp/all/${o.key}"><img src="${assetUrl(oImgs[i], true)}" alt=""><span>${o.title} · ${money(o.price)}</span></a>`).join('')) +
    `<nav class="menu-links"><a href="#needs">وش يناسب مشواري؟</a><button data-action="size-guide">جدول المقاسات</button><a href="#guarantee">التبديل والإرجاع</a><a href="#questions">التوصيل والأسئلة</a><a href="https://wa.me/+966570442661" target="_blank" rel="noopener" data-action="whatsapp">كلمنا واتساب</a></nav>`;
}

/* ---------- routing ---------- */
let homeMemory = null, inSiteNav = 0;
function showView(name) {
  stopVoice();
  if (view === 'home' && name !== 'home') homeMemory = { y: window.scrollY };
  view = name;
  if ($('#home-view')) $('#home-view').hidden = name !== 'home';
  if ($('#product-view')) $('#product-view').hidden = name !== 'product';
  if ($('#lp-view')) $('#lp-view').hidden = name !== 'lp';
  if ($('#collection-view')) $('#collection-view').hidden = name !== 'collection';
  if (name !== 'collection' && $('#collection-view')) $('#collection-view').innerHTML = '';
  if (name !== 'product' && $('#product-view')) $('#product-view').innerHTML = '';
  if (name !== 'lp' && $('#lp-view')) $('#lp-view').innerHTML = '';
  document.body.classList.toggle('lp-mode', name === 'lp');
  document.body.classList.toggle('pdp-mode', name === 'product');
  if (name === 'home' || name === 'collection') { panel = null; if ($('#sticky-buy')) $('#sticky-buy').hidden = true; if (stickyObserver) stickyObserver.disconnect(); }
}
function route() {
  if (!$('#home-view')) return;
  const rawHash = decodeURIComponent(location.hash || '');
  if (!rawHash && initialSallaProductId && !leftInitialPdp) return viewProduct(initialSallaProductId);
  if (!rawHash && initialSallaCategoryKey && !leftInitialPdp) return viewCollection(initialSallaCategoryKey);
  if (rawHash) leftInitialPdp = true;
  const h = rawHash || '#home';
  if (h.startsWith('#p/')) return viewProduct(h.slice(3));
  if (h.startsWith('#c/')) return viewCollection(h.slice(3));
  if (h.startsWith('#lp')) { const [, angle, offer] = h.slice(1).split('/'); return viewLanding(angle, offer); }
  const fromOther = view !== 'home';
  showView('home');
  document.title = 'طراز | راحة تليق بالمقام';
  let key = h.slice(1);
  if (key === 'mule') key = 'new-mule';
  if (fromOther && homeMemory && backNav) { const y = homeMemory.y; requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' })); return; }
  const target = document.getElementById(key);
  if (target && key !== 'home') requestAnimationFrame(() => target.scrollIntoView({ behavior: 'auto' }));
  else if (fromOther) window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ---------- events ---------- */
document.addEventListener('click', e => {
  if (e.target.closest('a[href^="#"]')) { linkClicked = true; setTimeout(() => { linkClicked = false; }, 0); }
  if (megaOpen && !e.target.closest('.site-header')) closeMega();
  const wave = e.target.closest('[data-voice-wave]');
  if (wave) {
    const rect = wave.getBoundingClientRect();
    const ratio = rect.width > 0 ? Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)) : 0;
    seekVoice(wave.closest('.voice-card'), ratio);
    return;
  }
  const el = e.target.closest('button, a[data-action], [data-sort-link], [data-payment-method]');
  if (!el) return;
  if (el.dataset.paymentMethod) {
    selectedPaymentMethod = el.dataset.paymentMethod;
    const curStage = $('#cart-dialog')?.dataset.stage || 'review';
    if (curStage === 'payment') {
      $$('[data-payment-method]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.paymentMethod === selectedPaymentMethod)));
      const t = C.totals(cart, catalog, S);
      const discount = couponDiscount > 0 ? Math.min(couponDiscount, t.subtotal) : 0;
      const pf = $('#salla-payment-fields');
      if (pf) pf.innerHTML = renderPaymentMethodFields(Math.max(0, t.total - discount));
    } else {
      renderCart(curStage);
    }
    return;
  }
  if (el.dataset.voicePlay !== undefined) { toggleVoice(el.closest('.voice-card')); return; }
  if (el.dataset.voiceSpeed !== undefined) { setVoiceSpeed(el.closest('.voice-card'), Number(el.dataset.voiceSpeed)); return; }
  if (el.dataset.voiceDot !== undefined) {
    const idx = Number(el.dataset.voiceDot);
    const wrap = el.closest('.voice-reviews');
    const card = wrap?.querySelector(`.voice-card[data-voice-idx="${idx}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      wrap.querySelectorAll('[data-voice-dot]').forEach((d, i) => d.setAttribute('aria-selected', String(i === idx)));
    }
    return;
  }
  if (el.dataset.mega) { megaOpen === el.dataset.mega ? closeMega() : openMega(el.dataset.mega); return; }
  if (el.dataset.sortLink) { $$('[data-sort]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sort === el.dataset.sortLink))); renderCollection(el.dataset.sortLink); return; }
  if (el.dataset.sort) { $$('[data-sort]').forEach(b => b.setAttribute('aria-pressed', String(b === el))); renderCollection(el.dataset.sort); $('[data-group="knit"]').scrollLeft = 0; return; }
  if (el.dataset.scroll) { const strip = $('#' + el.dataset.scroll + ' .product-strip'); strip.scrollBy({ left: Number(el.dataset.dir) * strip.clientWidth * 0.8, behavior: 'smooth' }); return; }
  if (el.dataset.size) {
    panel.size = el.dataset.size;
    $$('[data-size]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size === panel.size)));
    const effSize2 = panel.size2 || panel.size;
    $$('[data-size2]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size2 === effSize2)));
    const size2Note = $('[data-size2-note]');
    if (size2Note && !panel.size2) size2Note.textContent = 'نفس الأول (' + panel.size + ')';
    $('#size-error').textContent = ''; return;
  }
  if (el.dataset.size2) {
    panel.size2 = el.dataset.size2;
    if (!panel.size) {
      panel.size = panel.size2;
      $$('[data-size]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size === panel.size)));
    }
    $$('[data-size2]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size2 === panel.size2)));
    const size2Note = $('[data-size2-note]');
    if (size2Note) size2Note.textContent = 'مقاس ' + panel.size2;
    $('#size-error').textContent = ''; return;
  }
  if (el.dataset.swatch2) {
    panel.shoe2 = el.dataset.swatch2;
    if (panel.view !== 'photo') setView('photo');
    updatePanel();
    return;
  }
  if (el.dataset.swatch) {
    if (panel && panel.mode === 'lp') { lpSwatch(el.dataset.swatch); return; }
    const keep = { offer: panel.offer, size: panel.size, size2: panel.size2, shoe2: panel.shoe2, view: panel.view, socksShoe: panel.socksShoe, mode: 'pdp' };
    history.replaceState(null, '', '#p/' + el.dataset.swatch);
    const y = window.scrollY; viewProduct(el.dataset.swatch, keep); window.scrollTo({ top: y, behavior: 'instant' }); return;
  }
  if (el.dataset.view) { setView(el.dataset.view); return; }
  if (el.dataset.socksShoe) { panel.socksShoe = el.dataset.socksShoe; setView('inshoe'); return; }
  if (el.dataset.hotspot !== undefined) { const open = el.classList.contains('open'); $$('.hotspot').forEach(h => h.classList.remove('open')); el.classList.toggle('open', !open); return; }
  if (el.dataset.photo) { $('[data-main-photo]').src = assetUrl(el.dataset.photo); $$('[data-photo]').forEach(b => b.setAttribute('aria-pressed', String(b === el))); return; }
  if (el.dataset.pickOffer) {
    panel.offer = el.dataset.pickOffer;
    const r = $(`input[name="offer"][value="${panel.offer}"]`); if (r) r.checked = true;
    $$('[data-pick-offer]').forEach(b => b.classList.toggle('featured', b.dataset.pickOffer === panel.offer));
    updatePanel(); $('[data-panel]').scrollIntoView({ behavior: 'smooth', block: 'start' }); return;
  }
  if (el.dataset.quick) { quickAdd(el.dataset.quick, el); return; }
  if (el.dataset.quantity !== undefined) { cart = C.change(cart, Number(el.dataset.quantity), Number(el.dataset.delta)); persist(); renderCart($('#cart-dialog').dataset.stage); return; }
  if (el.dataset.remove !== undefined) { cart.splice(Number(el.dataset.remove), 1); persist(); renderCart($('#cart-dialog').dataset.stage); return; }
  switch (el.dataset.action) {
    case 'cart': openCart('bag'); break;
    case 'back': if (inSiteNav > 0) { e.preventDefault(); goingBack = true; history.back(); } break;
    case 'menu': renderMenu(); $('#menu-dialog')?.showModal(); break;
    case 'close-menu': $('#menu-dialog')?.close(); break;
    case 'close-cart': closeCart(); break;
    case 'close-cart-link': closeCart(); break;
    case 'add-panel': addFromPanel(); break;
    case 'to-panel': $('[data-panel]')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
    case 'sticky-add': addFromPanel(); break;
    case 'zoom': $('.stage-photo')?.classList.toggle('detail'); break;
    case 'size-guide': e.preventDefault(); if ($('#menu-dialog')?.open) $('#menu-dialog').close(); closeMega(); $('#size-guide-body').innerHTML = renderSizeGuide(); $('#size-dialog')?.showModal(); break;
    case 'close-size': $('#size-dialog')?.close(); break;
    case 'whatsapp':
      e.preventDefault();
      window.open(whatsappLink('السلام عليكم، عندي سؤال' + (panel ? ' عن ' + panel.p.name : '')), '_blank', 'noopener');
      break;
    case 'checkout':
    case 'review': {
      const t = C.totals(cart, catalog, S);
      track('begin_checkout', { value: t.subtotal, items: cart.map(i => ({ id: i.id, qty: i.qty })) });
      renderCart('review'); $('#cart-dialog').scrollTop = 0; break;
    }
    case 'back-to-bag': renderCart('bag'); break;
    case 'apply-coupon': applyCouponCode(); break;
    case 'confirm-order':
    case 'confirm-demo':
      handleConfirmOrder(el);
      break;
    case 'submit-salla-payment':
      handleSubmitSallaPayment();
      break;
    case 'reset-demo':
      lastOrder = null;
      closeCart();
      break;
    case 'open-notes': $('#notes-dialog')?.showModal(); break;
    case 'close-notes': $('#notes-dialog')?.close(); break;
  }
});
document.addEventListener('change', e => {
  if (!panel) return;
  if (e.target.name === 'offer') { panel.offer = e.target.value; if (panel.view !== 'photo') setView('photo'); updatePanel(); }
  if (e.target.matches('[data-shoe2]')) { panel.shoe2 = e.target.value; updatePanel(); }
  if (e.target.matches('[data-size2]')) panel.size2 = e.target.value;
});
$('#lead-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const v = $('#lead-phone').value.trim();
  if (v.replace(/\D/g, '').length < 8) { $('#lead-message').textContent = 'اكتب رقم جوالك أول.'; $('#lead-phone').focus(); return; }
  track('generate_lead', { phone: v });
  const url = 'https://wa.me/+966570442661?text=' + encodeURIComponent('السلام عليكم، علموني أول ما ينزل جديد في طراز. رقمي: ' + v);
  const win = window.open(url, '_blank', 'noopener');
  if (!win) location.href = url;
  $('#lead-phone').value = '';
  $('#lead-message').textContent = 'تم، حولناك للواتساب عشان نعلمك أول بأول.';
});
$('#cart-dialog')?.addEventListener('close', () => { if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true }); });
$$('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));
let backNav = false, linkClicked = false, goingBack = false;
window.addEventListener('popstate', () => { if (!linkClicked || goingBack) backNav = true; });
window.addEventListener('hashchange', () => {
  if ($('#cart-dialog')?.open) closeCart();
  if ($('#menu-dialog')?.open) $('#menu-dialog').close();
  closeMega(); inSiteNav++;
  route(); backNav = false; goingBack = false;
});

/* ---------- Salla Theme Editor Image & Component Overrides ---------- */
function renderHeroShoes() {
  if (!$('#hero-shoes')) return;
  $('#hero-shoes').innerHTML = knit.map((p, i) => `<a href="#p/${p.id}" class="exhibit" style="--column:${i % 4};--tier:${Math.floor(i / 4)}" data-peek="${p.id}" aria-label="شوف ${esc(p.name)}">${img(p, { thumb: true })}<span>${esc(p.name)}</span></a>`).join('');
  $$('[data-peek]').forEach(el => {
    const show = () => { const p = byId(el.dataset.peek); if ($('#hero-peek img')) $('#hero-peek img').src = assetUrl(p.image); if ($('#hero-peek span')) $('#hero-peek span').textContent = p.name; $('#hero-peek')?.classList.add('visible'); };
    const hide = () => $('#hero-peek')?.classList.remove('visible');
    el.addEventListener('mouseenter', show); el.addEventListener('focus', show); el.addEventListener('mouseleave', hide); el.addEventListener('blur', hide);
  });
}

function applySingleProductOverride(id, data) {
  if (!id) return;
  const cleanId = typeof id === 'object' ? (id.value || id.id || '') : String(id).trim();
  const p = byId(cleanId);
  if (!p) return;
  if (typeof data === 'string') {
    if (isValidCustomImage(data)) {
      p.image = data.trim();
      p.thumb = data.trim();
      p.images = [data.trim(), ...(p.images ? p.images.slice(1) : [])];
      p._customThemeImage = true;
    }
  } else if (data && typeof data === 'object') {
    if (isValidCustomImage(data.image)) {
      const imgMain = data.image.trim();
      p.image = imgMain;
      p.thumb = isValidCustomImage(data.thumb) ? data.thumb.trim() : imgMain;
      const extras = [data.image2, data.image3].filter(isValidCustomImage).map(x => x.trim());
      p.images = extras.length ? [imgMain, ...extras] : [imgMain, ...(p.images ? p.images.slice(1) : [])];
      p._customThemeImage = true;
    }
    if (data.name && String(data.name).trim()) p.name = String(data.name).trim();
    if (data.color && String(data.color).trim()) p.color = String(data.color).trim();
    if (data.price) {
      const pr = parseSallaPrice(data.price, 0);
      if (pr > 0) p.price = pr;
    }
  }
}

window.TERAZ_APPLY_OVERRIDES = function(ovr) {
  if (!ovr || typeof ovr !== 'object') return;
  let needsRefresh = false;

  if (isValidCustomImage(ovr.logo)) {
    siteImages.logo = ovr.logo.trim();
    $$('.site-header .brand img, #menu-dialog .brand img').forEach(el => { el.src = assetUrl(siteImages.logo); });
  }
  if (isValidCustomImage(ovr.heroBg)) {
    siteImages.heroBg = ovr.heroBg.trim();
    $$('.hero .stage-bg, .lp-bg').forEach(el => { el.src = assetUrl(siteImages.heroBg); });
  }
  if (isValidCustomImage(ovr.muleLife)) {
    siteImages.muleLife = ovr.muleLife.trim();
  }
  if (ovr.heroEyebrow && String(ovr.heroEyebrow).trim()) {
    const el = $('.hero-wording .eyebrow'); if (el) el.textContent = String(ovr.heroEyebrow).trim();
  }
  if (ovr.heroTitle && String(ovr.heroTitle).trim()) {
    const el = $('.hero-wording h1'); if (el) el.textContent = String(ovr.heroTitle).trim();
  }
  if (ovr.heroSub && String(ovr.heroSub).trim()) {
    const el = $('.hero-wording .hero-sub'); if (el) el.textContent = String(ovr.heroSub).trim();
  }
  if (ovr.heroBtnLabel && String(ovr.heroBtnLabel).trim()) {
    const el = $('.hero-actions .primary'); if (el) el.innerHTML = esc(String(ovr.heroBtnLabel).trim()) + ' <span>←</span>';
  }
  if (ovr.heroBtnLink && String(ovr.heroBtnLink).trim()) {
    const el = $('.hero-actions .primary'); if (el) el.setAttribute('href', String(ovr.heroBtnLink).trim());
  }
  if (ovr.knitTitle && String(ovr.knitTitle).trim()) {
    const el = $('#knit .section-heading h2'); if (el) el.textContent = String(ovr.knitTitle).trim();
  }
  if (ovr.knitSub && String(ovr.knitSub).trim()) {
    const el = $('#knit .section-heading p'); if (el) el.textContent = String(ovr.knitSub).trim();
  }
  if (ovr.offersTitle && String(ovr.offersTitle).trim()) {
    const el = $('#offers .section-heading h2'); if (el) el.textContent = String(ovr.offersTitle).trim();
  }
  if (ovr.offersSub && String(ovr.offersSub).trim()) {
    const el = $('#offers .section-heading p'); if (el) el.textContent = String(ovr.offersSub).trim();
  }

  if (ovr.categories && typeof ovr.categories === 'object') {
    for (const [k, val] of Object.entries(ovr.categories)) {
      const c = catByKey(k);
      if (!c || !val) continue;
      if (typeof val === 'string') {
        if (isValidCustomImage(val)) { c.image = val.trim(); needsRefresh = true; }
      } else if (typeof val === 'object') {
        if (isValidCustomImage(val.image)) { c.image = val.image.trim(); needsRefresh = true; }
        if (val.name && String(val.name).trim()) { c.name = String(val.name).trim(); needsRefresh = true; }
        if (val.line && String(val.line).trim()) { c.line = String(val.line).trim(); needsRefresh = true; }
      }
    }
  }

  if (ovr.offers && typeof ovr.offers === 'object') {
    for (const [k, val] of Object.entries(ovr.offers)) {
      if (siteImages.offers[k] !== undefined && isValidCustomImage(val)) {
        siteImages.offers[k] = val.trim();
        needsRefresh = true;
      }
    }
  }

  if (ovr.products) {
    if (Array.isArray(ovr.products)) {
      ovr.products.forEach(item => {
        if (!item) return;
        const pid = item.product_id ?? item.id;
        applySingleProductOverride(pid, item);
        needsRefresh = true;
      });
    } else if (typeof ovr.products === 'object') {
      for (const [pid, val] of Object.entries(ovr.products)) {
        if (val) { applySingleProductOverride(pid, val); needsRefresh = true; }
      }
    }
  }

  if (Array.isArray(ovr.sallaProducts) && ovr.sallaProducts.length) {
    ovr.sallaProducts.forEach(sp => {
      if (sp) { linkSallaProductToCatalog(sp); needsRefresh = true; }
    });
  }

  if (needsRefresh) {
    renderHeroShoes();
    if ($('#needs-grid')) renderNeeds();
    if ($('[data-group="knit"]')) renderCollection($('[data-sort][aria-pressed="true"]')?.dataset.sort || 'thobe');
    if ($('#home-offers')) renderHomeOffers();
    if ($('#category-rows')) renderCategories();
    if (view === 'product' && panel?.p) viewProduct(panel.p.id, panel);
  }
};

/* ---------- boot ---------- */
initSallaBridge();
if (window.TERAZ_SALLA_CONFIG && window.TERAZ_SALLA_CONFIG.overrides) {
  window.TERAZ_APPLY_OVERRIDES(window.TERAZ_SALLA_CONFIG.overrides);
}
if (Array.isArray(window.TERAZ_PENDING_OVERRIDES)) {
  window.TERAZ_PENDING_OVERRIDES.forEach(o => window.TERAZ_APPLY_OVERRIDES(o));
}
renderHeroShoes();
if ($('#hero-rating')) $('#hero-rating').innerHTML = ratingLine(true);
if ($('#reviews') && hasReviews()) { $('#reviews').innerHTML = reviewsHTML(); $('#reviews').hidden = false; bindVoiceTracks($('#reviews')); }
if (!CFG.whatsapp && $('#whatsapp-float')) $('#whatsapp-float').classList.add('demo');
if ($('#trust')) renderTrust();
if ($('#needs-grid')) renderNeeds();
if ($('[data-group="knit"]')) renderCollection();
if ($('#home-offers')) renderHomeOffers();
if ($('#category-rows')) renderCategories();
if ($('#guarantee-facts')) renderGuarantee();
if ($('#footer-pay')) renderFooter();
if ($('#faq')) $('#faq').innerHTML = faqHTML(faqs);
persist(); route();
