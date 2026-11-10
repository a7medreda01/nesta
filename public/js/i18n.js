/**
 * Nesta Spaces (نيستا) - Bilingual Translations Dictionary (i18n)
 * Arabic (Default, RTL) and English (LTR) with instant direction and font switching.
 */
const I18N = {
  ar: {
    dir: "rtl",
    lang: "ar",
    brandName: "نيستا",
    brandSub: "مساحات سكنية دافئة",

    // Navigation
    nav: {
      home: "الرئيسية",
      enterRoom: "تجربة الدخول",
      units: "وحداتنا",
      vibe: "اختر طابعك",
      whyNesta: "لماذا نيستا",
      howItWorks: "كيف يعمل",
      locations: "المدن",
      gallery: "أجواء نيستا",
      faq: "الأسئلة الشائعة",
      contact: "تواصل معنا",
      bookWhatsApp: "احجز عبر واتساب",
      compare: "مقارنة الوحدات",
      langToggle: "English"
    },

    // Hero Section
    hero: {
      badge: "ضيافة بوتيكية فاخرة · المنطقة الشرقية",
      headline: "مساحتك الدافئة… أينما كنت",
      subheadline: "وحدات سكنية مفروشة بإقامة تليق بك في الخبر · الدمام · الأحساء",
      ctaBrowse: "تصفح الوحدات",
      ctaWhatsApp: "تواصل واتساب",
      scrollHint: "مرر لاكتشاف غرفتك"
    },

    // Quick Search Bar
    search: {
      cityLabel: "المدينة",
      cityAll: "جميع المدن (الخبر، الدمام، الأحساء)",
      guestsLabel: "الضيوف",
      guestsAny: "أي عدد ضيوف",
      guestsCount: "ضيوف أو أكثر",
      typeLabel: "نوع الوحدة",
      typeAll: "جميع الأنواع (شقة، جناح، استوديو)",
      typeApartment: "شقة سكنية",
      typeSuite: "جناح فندقي",
      typeStudio: "استوديو دافئ",
      styleLabel: "الطابع اللوني",
      styleAll: "جميع الطوابع",
      styleSand: "طابع ساند (بيج وخشبي)",
      styleSage: "طابع سيج (أخضر هادئ)",
      styleBlush: "طابع بلش (تراكوتا ووردي)",
      btnSearch: "بحث وتصفية",
      clearFilter: "إعادة تعيين"
    },

    // Enter Room Scroll Experience (#enter-nesta)
    enterRoom: {
      step0: "كل رحلة تبدأ بباب…",
      step0Sub: "مرر للأسفل وافتح باب إقامتك القادمة مع نيستا",
      step1: "نيستا… بيتك الثاني",
      step1Sub: "أجواء استرخاء مصممة بعناية فائقة لتشعرك وكأنك في منزلك",
      step2: "تفاصيل دافئة تنتظرك",
      step2Sub: "إضاءة ناعمة، أسرّة فندقية وثيره، وركن قهوة يرحب بصباحك",
      step3: "جاهز لتجربة الاسترخاء؟",
      step3Sub: "اختر وحدتك المفضلة الآن واستمتع بإقامة هادئة",
      chipComfort: "راحة فندقية",
      chipCoffee: "ركن قهوة فاخر",
      chipWifi: "فايبر سريع",
      btnExplore: "تصفح الوحدات",
      btnBookNow: "احجز عبر واتساب",
      loadingFrames: "جاري تحضير تجربة الدخول السينمائية…"
    },

    // Stats Strip
    stats: {
      units: "+12 وحدة جاهزة",
      unitsSub: "مفروشة بالكامل ومجهزة",
      cities: "3 مدن رئيسية",
      citiesSub: "الخبر · الدمام · الأحساء",
      support: "دعم 24/7",
      supportSub: "خدمة ضيوف فورية عبر واتساب",
      clean: "100% نظافة فندقية",
      cleanSub: "تعقيم شامل وبياضات قطنية"
    },

    // Units Grid Section (#units)
    unitsSection: {
      title: "وحداتنا المختارة بعناية",
      subtitle: "كل وحدة في نيستا تحكي قصة من الراحة والجمال، صُممت بعناية لتكون ملاذك الآمن.",
      filterAll: "الكل",
      filterKhobar: "الخبر",
      filterDammam: "الدمام",
      filterAhsa: "الأحساء",
      filterApartment: "شقق",
      filterSuite: "أجنحة",
      filterStudio: "استوديوهات",
      perNight: "ريال / الليلة",
      from: "ابتداءً من",
      viewDetails: "تفاصيل الوحدة",
      bookViaWa: "حجز سريع",
      noUnits: "لا توجد وحدات مطابقة لمعايير البحث الحالية.",
      resetFilters: "عرض جميع الوحدات",
      compareAdd: "+ مقارنة",
      compareAdded: "مضافة للمقارنة"
    },

    // Unit Card Badges & Specs
    unitCard: {
      guests: "ضيوف",
      bedrooms: "غرف",
      beds: "أسرّة",
      baths: "حمامات",
      area: "م²",
      styleSand: "طابع ساند",
      styleSage: "طابع سيج",
      styleBlush: "طابع بلش"
    },

    // Unit Details View (#/unit/id)
    unitDetails: {
      backToUnits: "العودة للوحدات",
      breadcrumbHome: "الرئيسية",
      breadcrumbUnits: "الوحدات",
      showAllPhotos: "عرض كل الصور (5)",
      shareUnit: "مشاركة الوحدة",
      linkCopied: "تم نسخ رابط الوحدة بنجاح!",
      cozyLightingToggle: "وضع الإضاءة الدافئة",
      daylightToggle: "إضاءة نهارية",
      overview: "نظرة عامة على الوحدة",
      amenitiesTitle: "وسائل الراحة والمرافق",
      catEssentials: "الأساسيات والدخول",
      catComfort: "الراحة والمعيشة",
      catKitchen: "القهوة والمطبخ",
      catEntertainment: "الترفيه والعمل",
      sleepingTitle: "ترتيبات النوم والراحة",
      rulesTitle: "تعليمات وسياسة الإقامة",
      checkInTime: "تسجيل الدخول",
      checkOutTime: "تسجيل المغادرة",
      noSmoking: "ممنوع التدخين داخل الوحدة",
      noParties: "ممنوع الحفلات والتجمعات الصاخبة",
      familiesPolicy: "مخصصة للعائلات والمهنيين فقط",
      nearbyTitle: "المعالم والأماكن القريبة",
      locationTitle: "موقع الوحدة والوصول",
      openInMaps: "فتح في خرائط Google",
      bookingCardTitle: "احجز إقامتك في نيستا",
      bookingCardSub: "تأكيد فوري عبر واتساب وبدون رسوم إضافية",
      primaryWaBtn: "احجز عبر واتساب مباشرة",
      airbnbBtn: "احجز عبر Airbnb",
      bookingComBtn: "احجز عبر Booking.com",
      callUs: "اتصال هاتفي للاستفسار",
      directBookingFuture: "قريباً: الحجز المباشر بالدفع الإلكتروني وتقويم التوافر",
      similarTitle: "وحدات أخرى قد تعجبك",
      stickyMobileBook: "احجز الآن عبر واتساب"
    },

    // Vibe Picker Section
    vibe: {
      title: "اختر طابعك المفضل",
      subtitle: "كل تصميم يعكس حالة شعورية مختلفة، اختر الأجواء التي تناسب ذوقك لنعرض لك وحداتها.",
      sandTitle: "طابع ساند (Nesta Sand)",
      sandDesc: "درجات البيج الدافئة وخشب البلوط الطبيعي مع لمسات البوتوس المورقة.",
      sageTitle: "طابع سيج (Nesta Sage)",
      sageDesc: "درجات الأخضر المهدئ للأعصاب، نباتات حية، ونيش مقوس بإضاءة دافئة مريحة.",
      blushTitle: "طابع بلش (Nesta Blush)",
      blushDesc: "ألوان التراكوتا والوردي الترابي مع بوف بوكليه وزوايا فنية حميمة.",
      btnFilterByVibe: "عرض وحدات هذا الطابع"
    },

    // Why Nesta (Value Props)
    why: {
      title: "لماذا تختار نيستا؟",
      subtitle: "معايير ضيافة استثنائية تُشعرك بالألفة والراحة من أول لحظة.",
      prop1Title: "مفروشة بالكامل وبأعلى جودة",
      prop1Desc: "أثاث مدروس بعناية، أقمشة طبيعية مريحة، وأجهزة منزلية متكاملة تضمن إقامة سهلة وممتعة.",
      prop2Title: "نظافة وتعقيم فندقي صارم",
      prop2Desc: "فريق نظافة محترف يقوم بالتعقيم العميق وتبديل البياضات والمناشف بقطن 100% قبل كل ضيف.",
      prop3Title: "دخول ذاتي ذكي وسلس",
      prop3Desc: "لا داعي للانتظار لتسليم المفاتيح؛ استلم رمز الدخول السري عبر واتساب وادخل في أي وقت.",
      prop4Title: "مواقع استراتيجية مميزة",
      prop4Desc: "في أرقى أحياء الخبر والدمام والأحساء، بالقرب من البحر، أرقى المجمعات، ومراكز الأعمال.",
      prop5Title: "دعم فوري على مدار 24/7",
      prop5Desc: "فريق خدمة الضيوف في خدمتك طوال فترة إقامتك عبر واتساب للرد على أي طلب خلال دقائق.",
      prop6Title: "دفء المنزل برقي الفندق",
      prop6Desc: "إضاءات دافئة خافتة، رفوف خشبية مزينة بالنباتات واللوحات، وزاوية قهوة خاصة بكل وحدة."
    },

    // How It Works
    how: {
      title: "كيف تحجز إقامتك؟",
      subtitle: "ثلاث خطوات بسيطة فقط تفصلك عن مساحتك الدافئة.",
      step1Num: "01",
      step1Title: "اختر وحدتك المناسبة",
      step1Desc: "تصفح وحداتنا في الخبر والدمام والأحساء واختر الطابع والمساحة التي تلائمك.",
      step2Num: "02",
      step2Title: "تواصل معنا عبر واتساب",
      step2Desc: "اضغط زر الحجز وسيتجهز نص تلقائي يحتوي على اسم الوحدة وتواريخك لتأكيد التوافر فوراً.",
      step3Num: "03",
      step3Title: "استلم الرمز واستمتع بإقامتك",
      step3Desc: "يصلك رقم الدخول السري وتفاصيل الموقع؛ افتح الباب واستمتع بدفء نيستا."
    },

    // Locations
    locations: {
      title: "مدننا في المنطقة الشرقية",
      subtitle: "نستقبلك في ثلاث من أجمل مدن المملكة بكل حفاوة.",
      khobarTitle: "الخبر",
      khobarDesc: "عاصمة الهدوء البحري والمقاهي الراقية وكورنيش الخليج العربي الفاتن.",
      dammamTitle: "الدمام",
      dammamDesc: "الواجهة البحرية النابضة، مراكز الأعمال، والحدائق الخضراء الواسعة.",
      ahsaTitle: "الأحساء",
      ahsaDesc: "واحة النخيل الغناء، التاريخ العريق، والأسواق التراثية الأصيلة.",
      viewUnitsInCity: "تصفح وحدات"
    },

    // Gallery / Guest Moments
    gallery: {
      title: "أجواء وتفاصيل من قلب نيستا",
      subtitle: "لقطات واقعية من ديكورات وحداتنا، زوايا القهوة، والإضاءة الدافئة التي تصنع الفرق.",
      momentCoffee: "ركن القهوة الصباحي",
      momentNiche: "النيش المقوس بإضاءته الدافئة",
      momentBed: "أسرّة فندقية بلمسات كتان طبيعية",
      momentDetails: "رفوف خشبية ونباتات حية تبهج النفس"
    },

    // Testimonials
    reviews: {
      title: "ماذا يقول ضيوفنا؟",
      subtitle: "تجارب حقيقية تعكس اهتمامنا بأدق التفاصيل وراحة ضيوف نيستا.",
      rev1Name: "م. فيصل الشمري",
      rev1City: "الرياض · إقامة عمل في الخبر",
      rev1Text: "أفضل تجربة شقة مفروشة خضتها بالمنطقة الشرقية. النظافة 10/10، الإضاءة الدافئة مريحة جداً بعد يوم عمل طويل، والدخول الذاتي بدون تعقيد.",
      rev2Name: "سارة القحطاني",
      rev2City: "جدة · إجازة عائلية في الدمام",
      rev2Text: "طابع سيج الأخضر مريح جداً للنفس، وزاوية القهوة جميلة وتفتح النفس في الصباح. التعامل عبر واتساب سريع وقمة في الذوق والأمانة.",
      rev3Name: "عبدالله الدوسري",
      rev3City: "الدمام · زيارة عائلية في الأحساء",
      rev3Text: "شقة نيستا بلش في الأحساء كانت تحفة! الألوان ترابية دافئة والتفاصيل مدروسة كأنها في منتجع فاخر. أكيد سأكرر التجربة في كل زيارة."
    },

    // FAQ
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "إجابات واضحة لكل ما قد تتساءل عنه قبل إقامتك.",
      q1: "ما هي أوقات تسجيل الدخول والمغادرة؟",
      a1: "يبدأ تسجيل الدخول من الساعة 3:00 مساءً، ويكون تسجيل المغادرة حتى الساعة 12:00 ظهراً. في حال رغبت بتسجيل مبكر أو متأخر، نسعد بالتنسيق معك مسبقاً عبر واتساب حسب التوافر.",
      q2: "كيف تتم آلية استلام الشقة والدخول؟",
      a2: "جميع وحداتنا تعمل بنظام الدخول الذاتي الذكي. بعد تأكيد الحجز، سنرسل لك عبر واتساب رمز القفل الرقمي وموقع الوحدة بدقة، لتتمكن من الدخول مباشرة وبكل خصوصية دون الحاجة لمقابلة أحد.",
      q3: "هل الحجز متاح للعائلات فقط أم للأفراد أيضاً؟",
      a3: "نرحب بالعائلات الكريمة ورجال وسيدات الأعمال والمهنيين الباحثين عن إقامة هادئة وراقية. نشترط الالتزام التام بالهدوء والحفاظ على خصوصية الجيران في المبنى.",
      q4: "ما هي سياسة الإلغاء وتعديل الحجز؟",
      a4: "يمكن الإلغاء أو التعديل مجاناً قبل 48 ساعة من موعد تسجيل الدخول. للإلغاءات خلال أقل من 48 ساعة، يرجى التواصل مع فريق خدمة الضيوف عبر واتساب للنظر في الحالة وتسهيل الإجراءات.",
      q5: "هل توجد مواقف سيارات مخصصة؟",
      a5: "نعم، كل وحدة في نيستا يتوفر لها موقف سيارات خاص ومظلل مخصص لضيوفنا ومسجل باسم الوحدة لضمان راحتك وسهولة وصولك.",
      q6: "هل تتوفر باقات وخصومات للإقامات الطويلة؟",
      a6: "بالتأكيد! نوفر أسعاراً تفضيلية مخصصة للإقامات الأسبوعية والشهرية وللشركات والموظفين المنتدبين. تواصل معنا عبر واتساب للحصول على عرض أسعار فوري ومخصص."
    },

    // CTA Banner
    ctaBanner: {
      headline: "جاهز لإقامتك القادمة؟",
      sub: "اختر وحدتك الآن ودعنا نتكفل بجعل زيارتك للخبر أو الدمام أو الأحساء ذكرى لا تُنسى.",
      btnWhatsApp: "تواصل معنا عبر واتساب",
      btnInstagram: "تابعنا على إنستغرام"
    },

    // Footer
    footer: {
      aboutText: "نيستا سبيسز (Nesta Spaces) مساحات سكنية مفروشة بوتيكية في المنطقة الشرقية (الخبر، الدمام، الأحساء)، تمنحك دفء المنزل وفخامة الإقامة الفندقية.",
      quickLinks: "روابط سريعة",
      citiesCol: "مدننا",
      contactCol: "تواصل معنا",
      copyright: "جميع الحقوق محفوظة © Nesta Spaces (نيستا) 2026",
      designedWith: "صُممت بكل دفء لراحتك"
    },

    // Compare Modal
    compare: {
      title: "مقارنة الوحدات المختارة",
      empty: "لم تقم باختيار أي وحدات للمقارنة بعد. اضغط على زر (+ مقارنة) في أي وحدة لإضافتها.",
      btnRemove: "إزالة",
      btnClearAll: "مسح الكل",
      metricPrice: "السعر ابتداءً من",
      metricCity: "المدينة والحي",
      metricType: "نوع الوحدة",
      metricGuests: "سعة الضيوف",
      metricBedrooms: "الغرف والأسرة",
      metricBaths: "الحمامات",
      metricArea: "المساحة الإجمالية",
      metricAmenities: "أبرز المرافق",
      metricCheckIn: "الدخول والمغادرة",
      btnBook: "احجز عبر واتساب"
    },

    // Smart WhatsApp Generator
    smartWa: {
      modalTitle: "تأكيد الحجز والاستفسار الفوري عبر واتساب",
      unitLabel: "الوحدة المختارة:",
      datesPrompt: "تاريخ الوصول والمغادرة المتوقع (اختياري):",
      datesPlaceholder: "مثال: من 15 نوفمبر إلى 18 نوفمبر",
      guestsPrompt: "عدد الضيوف:",
      msgPreviewLabel: "نص الرسالة التي ستُرسل إلى نيستا:",
      btnSendWa: "فتح واتساب الآن",
      btnCopyText: "نسخ نص الرسالة",
      copyToast: "تم نسخ رسالة واتساب إلى الحافظة بنجاح!"
    }
  },

  en: {
    dir: "ltr",
    lang: "en",
    brandName: "Nesta Spaces",
    brandSub: "Warm Residential Boutique Stays",

    // Navigation
    nav: {
      home: "Home",
      enterRoom: "Enter Room",
      units: "Our Units",
      vibe: "Pick Your Vibe",
      whyNesta: "Why Nesta",
      howItWorks: "How It Works",
      locations: "Locations",
      gallery: "Atmosphere",
      faq: "FAQ",
      contact: "Contact",
      bookWhatsApp: "Book via WhatsApp",
      compare: "Compare Units",
      langToggle: "العربية"
    },

    // Hero Section
    hero: {
      badge: "Boutique Hospitality · Eastern Province, Saudi Arabia",
      headline: "Your warm space, wherever you are",
      subheadline: "Thoughtfully furnished residential apartments in Khobar · Dammam · Al-Ahsa",
      ctaBrowse: "Explore Units",
      ctaWhatsApp: "WhatsApp Us",
      scrollHint: "Scroll to step inside"
    },

    // Quick Search Bar
    search: {
      cityLabel: "City",
      cityAll: "All Cities (Khobar, Dammam, Al-Ahsa)",
      guestsLabel: "Guests",
      guestsAny: "Any number of guests",
      guestsCount: "guests or more",
      typeLabel: "Unit Type",
      typeAll: "All Types (Apartments, Suites, Studios)",
      typeApartment: "Residential Apartment",
      typeSuite: "Boutique Suite",
      typeStudio: "Cozy Studio",
      styleLabel: "Interior Vibe",
      styleAll: "All Styles",
      styleSand: "Sand Style (Beige & Warm Oak)",
      styleSage: "Sage Style (Calming Botanical)",
      styleBlush: "Blush Style (Warm Terracotta)",
      btnSearch: "Search & Filter",
      clearFilter: "Reset All"
    },

    // Enter Room Scroll Experience (#enter-nesta)
    enterRoom: {
      step0: "Every stay begins with a door…",
      step0Sub: "Scroll down to gently push open your next sanctuary at Nesta",
      step1: "Nesta… your second home",
      step1Sub: "Curated calmness designed to embrace you the moment you arrive",
      step2: "Warm details await you",
      step2Sub: "Gentle layered lighting, hotel-grade beds, and an artisanal coffee bar",
      step3: "Ready to unwind?",
      step3Sub: "Pick your favorite space and enjoy quiet boutique hospitality",
      chipComfort: "Hotel-grade Comfort",
      chipCoffee: "Artisan Coffee Corner",
      chipWifi: "Fiber Wi-Fi",
      btnExplore: "Explore Our Units",
      btnBookNow: "Reserve via WhatsApp",
      loadingFrames: "Loading cinematic entrance sequence…"
    },

    // Stats Strip
    stats: {
      units: "+12 Ready Spaces",
      unitsSub: "Fully furnished & curated",
      cities: "3 Prime Cities",
      citiesSub: "Khobar · Dammam · Al-Ahsa",
      support: "24/7 Concierge",
      supportSub: "Instant guest care on WhatsApp",
      clean: "100% Hotel Standard",
      cleanSub: "Deep sanitization & pure cotton"
    },

    // Units Grid Section (#units)
    unitsSection: {
      title: "Curated Boutique Residences",
      subtitle: "Every space at Nesta tells a story of warmth and understated luxury, tailored to be your comforting haven.",
      filterAll: "All",
      filterKhobar: "Khobar",
      filterDammam: "Dammam",
      filterAhsa: "Al-Ahsa",
      filterApartment: "Apartments",
      filterSuite: "Suites",
      filterStudio: "Studios",
      perNight: "SAR / night",
      from: "from",
      viewDetails: "View Details",
      bookViaWa: "Quick Book",
      noUnits: "No units found matching your current filter criteria.",
      resetFilters: "Show All Units",
      compareAdd: "+ Compare",
      compareAdded: "In Comparison"
    },

    // Unit Card Badges & Specs
    unitCard: {
      guests: "Guests",
      bedrooms: "Beds",
      beds: "Sleeping Beds",
      baths: "Baths",
      area: "m²",
      styleSand: "Sand Vibe",
      styleSage: "Sage Vibe",
      styleBlush: "Blush Vibe"
    },

    // Unit Details View (#/unit/id)
    unitDetails: {
      backToUnits: "Back to Units",
      breadcrumbHome: "Home",
      breadcrumbUnits: "Units",
      showAllPhotos: "View All Photos (5)",
      shareUnit: "Share Space",
      linkCopied: "Unit link copied to clipboard!",
      cozyLightingToggle: "Cozy Evening Lighting",
      daylightToggle: "Daylight Mode",
      overview: "Space Overview",
      amenitiesTitle: "Amenities & Comforts",
      catEssentials: "Essentials & Access",
      catComfort: "Comfort & Living",
      catKitchen: "Kitchen & Coffee Bar",
      catEntertainment: "Entertainment & Work",
      sleepingTitle: "Sleeping Arrangements",
      rulesTitle: "House Guidelines & Policies",
      checkInTime: "Check-in Time",
      checkOutTime: "Check-out Time",
      noSmoking: "Strictly Non-Smoking",
      noParties: "No Parties or Disruptive Events",
      familiesPolicy: "Families & Professionals Only",
      nearbyTitle: "Neighborhood & Landmarks",
      locationTitle: "Location & Directions",
      openInMaps: "Open in Google Maps",
      bookingCardTitle: "Book Your Stay at Nesta",
      bookingCardSub: "Instant WhatsApp confirmation with zero extra booking fees",
      primaryWaBtn: "Book Directly via WhatsApp",
      airbnbBtn: "Book via Airbnb",
      bookingComBtn: "Book via Booking.com",
      callUs: "Call Concierge",
      directBookingFuture: "Coming Soon: Direct booking engine & calendar",
      similarTitle: "Similar Spaces You Might Love",
      stickyMobileBook: "Book via WhatsApp"
    },

    // Vibe Picker Section
    vibe: {
      title: "Pick Your Aesthetic Vibe",
      subtitle: "Each palette evokes a unique mood. Select your style to filter spaces with that exact color harmony.",
      sandTitle: "Nesta Sand",
      sandDesc: "Warm beige tones, natural oak shelving, and lush cascading pothos leaves.",
      sageTitle: "Nesta Sage",
      sageDesc: "Calming botanical greens, live olive branches, and an illuminated arched display niche.",
      blushTitle: "Nesta Blush",
      blushDesc: "Earthy terracotta warmth, soft apricot hues, bouclé vanity, and botanical art.",
      btnFilterByVibe: "Explore this Vibe"
    },

    // Why Nesta (Value Props)
    why: {
      title: "Why Stay with Nesta?",
      subtitle: "Exceptional hospitality standards that welcome you with comfort from the very first minute.",
      prop1Title: "Fully Furnished & Curated",
      prop1Desc: "Thoughtfully selected furniture, comfortable organic fabrics, and modern home essentials.",
      prop2Title: "Hotel-Grade Cleanliness",
      prop2Desc: "Deep sanitization before every guest, paired with fresh 100% Egyptian cotton linens and towels.",
      prop3Title: "Effortless Smart Self Check-in",
      prop3Desc: "No waiting for key handoffs. Receive your digital door code via WhatsApp and enter on your schedule.",
      prop4Title: "Prime Eastern Province Locations",
      prop4Desc: "Nestled in Khobar, Dammam, and Al-Ahsa's finest neighborhoods near corniche promenades and business hubs.",
      prop5Title: "Instant 24/7 Guest Care",
      prop5Desc: "Our guest concierge team is always available on WhatsApp to assist you within minutes.",
      prop6Title: "Home Warmth, Boutique Luxury",
      prop6Desc: "Soft ambient lamps, floating wooden shelves, curated art, and your own cozy coffee corner."
    },

    // How It Works
    how: {
      title: "How It Works",
      subtitle: "Three simple steps to settle into your warm sanctuary.",
      step1Num: "01",
      step1Title: "Select Your Space",
      step1Desc: "Browse our apartments across Khobar, Dammam, and Al-Ahsa to find your preferred size and vibe.",
      step2Num: "02",
      step2Title: "Connect on WhatsApp",
      step2Desc: "Click to chat with our team; a pre-filled message with your unit name and dates will be ready.",
      step3Num: "03",
      step3Title: "Receive Code & Enjoy",
      step3Desc: "Get your digital door code and arrival guide, step inside, and feel immediately at home."
    },

    // Locations
    locations: {
      title: "Our Cities in the Eastern Province",
      subtitle: "Warm hospitality welcoming you across three vibrant destinations in Saudi Arabia.",
      khobarTitle: "Khobar",
      khobarDesc: "Coastal tranquility, artisan cafes, upscale dining, and the glittering Arabian Gulf promenade.",
      dammamTitle: "Dammam",
      dammamDesc: "Vibrant seafront walkways, prominent business centers, and expansive green parks.",
      ahsaTitle: "Al-Ahsa",
      ahsaDesc: "The lush palm oasis, rich heritage monuments, and historic Qaisariya souqs.",
      viewUnitsInCity: "Explore Spaces in"
    },

    // Gallery / Guest Moments
    gallery: {
      title: "Atmosphere & Moments at Nesta",
      subtitle: "Unretouched real vignettes from our interiors: morning coffee, arched niches, and soft warm lighting.",
      momentCoffee: "Morning Coffee Nook",
      momentNiche: "Arched Backlit Niche",
      momentBed: "Plush Beds with Natural Linens",
      momentDetails: "Floating Wood Shelves & Live Plants"
    },

    // Testimonials
    reviews: {
      title: "Guest Impressions",
      subtitle: "Genuine feedback from guests who made Nesta their warm home away from home.",
      rev1Name: "Eng. Faisal Al-Shammari",
      rev1City: "Riyadh · Business Trip in Khobar",
      rev1Text: "Hands down the best furnished stay I've experienced in the Eastern Province. Flawless 10/10 cleanliness, relaxing warm lighting, and seamless self check-in.",
      rev2Name: "Sarah Al-Qahtani",
      rev2City: "Jeddah · Family Vacation in Dammam",
      rev2Text: "The Sage botanical suite was pure tranquility. The wooden coffee corner made every morning a delight, and the WhatsApp host was wonderful and responsive.",
      rev3Name: "Abdullah Al-Dossary",
      rev3City: "Dammam · Weekend Trip to Al-Ahsa",
      rev3Text: "Nesta Blush in Al-Ahsa was stunning. The terracotta accents and thoughtful lighting felt like a private boutique retreat. Definitely my go-to choice."
    },

    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Clear answers to everything you need to know before your stay.",
      q1: "What are check-in and check-out times?",
      a1: "Standard check-in begins at 3:00 PM, and check-out is by 12:00 PM (noon). Early check-in or late check-out can gladly be arranged in advance via WhatsApp subject to availability.",
      q2: "How does the check-in process work?",
      a2: "Every unit features a smart keyless digital lock. Upon booking confirmation, we send your personal access code and precise location link via WhatsApp for private, independent entry.",
      q3: "Is booking open to families and individuals?",
      a3: "We warmly welcome families, business executives, and professionals looking for peaceful, high-standard lodging. We maintain a strict quiet-hours policy respecting neighbors.",
      q4: "What is your cancellation and modification policy?",
      a4: "Free cancellations or date changes are accepted up to 48 hours prior to your scheduled check-in time. For shorter notices, please contact us on WhatsApp to discuss options.",
      q5: "Is dedicated parking available?",
      a5: "Yes, every Nesta residence includes a reserved, shaded parking bay designated for our guests with direct building access.",
      q6: "Do you offer discounts for weekly or monthly stays?",
      a6: "Yes! We offer attractive corporate and extended-stay rates for weekly and monthly bookings. Contact our WhatsApp concierge for a personalized quotation."
    },

    // CTA Banner
    ctaBanner: {
      headline: "Ready for your next stay?",
      sub: "Choose your space today and let us make your time in Khobar, Dammam, or Al-Ahsa truly memorable.",
      btnWhatsApp: "Chat with Us on WhatsApp",
      btnInstagram: "Follow on Instagram"
    },

    // Footer
    footer: {
      aboutText: "Nesta Spaces offers boutique furnished apartments across Saudi Arabia's Eastern Province (Khobar, Dammam, Al-Ahsa), combining home intimacy with high-standard hospitality.",
      quickLinks: "Quick Links",
      citiesCol: "Destinations",
      contactCol: "Contact Us",
      copyright: "All Rights Reserved © Nesta Spaces 2026",
      designedWith: "Crafted with warmth for your peace of mind"
    },

    // Compare Modal
    compare: {
      title: "Compare Selected Spaces",
      empty: "You haven't selected any spaces for comparison yet. Click (+ Compare) on any unit card to add up to 3 spaces.",
      btnRemove: "Remove",
      btnClearAll: "Clear All",
      metricPrice: "Price from",
      metricCity: "City & District",
      metricType: "Unit Type",
      metricGuests: "Guest Capacity",
      metricBedrooms: "Bedrooms & Beds",
      metricBaths: "Bathrooms",
      metricArea: "Floor Area",
      metricAmenities: "Key Amenities",
      metricCheckIn: "Check-in / Check-out",
      btnBook: "Book via WhatsApp"
    },

    // Smart WhatsApp Generator
    smartWa: {
      modalTitle: "Direct WhatsApp Booking & Inquiry",
      unitLabel: "Selected Space:",
      datesPrompt: "Expected Arrival & Departure Dates (Optional):",
      datesPlaceholder: "e.g., Nov 15 to Nov 18",
      guestsPrompt: "Number of Guests:",
      msgPreviewLabel: "Generated WhatsApp Message Preview:",
      btnSendWa: "Launch WhatsApp Now",
      btnCopyText: "Copy Message Text",
      copyToast: "WhatsApp message copied to clipboard!"
    }
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.I18N = I18N;
}
