/**
 * Nesta Spaces (نيستا) - Units Data Store
 * All units are centralized in this array. Adding a new unit is as simple as adding one object.
 * Ready for future API integration (Supabase, Firebase, or headless CMS).
 */
const UNITS = [
  {
    id: "nesta-sand-khobar",
    slug: "nesta-sand-khobar-yarmouk",
    featured: true,
    style: "sand", // sand, sage, blush
    type: "apartment", // apartment, studio, suite
    cityId: "khobar",
    city: { ar: "الخبر", en: "Khobar" },
    district: { ar: "حي اليرموك", en: "Al Yarmouk District" },
    title: { ar: "نيستا ساند · شقة هادئة بإطلالة دافئة", en: "Nesta Sand · Warm View Residence" },
    tagline: {
      ar: "مزيج فاخر من خشب البلوط، درجات البيج الرملي، وزاوية قهوة منعزلة للاسترخاء.",
      en: "A serene blend of natural oak, sandy beige tones, and a secluded coffee nook."
    },
    description: {
      ar: "استمتع بإقامة هادئة في نيستا ساند بحي اليرموك الراقي بالخبر. تتميز هذه الوحدة بديكور دافئ مستوحى من ألوان الطبيعة الرملية، وظهر سرير منجد منحني ومريح، ورفوف خشبية عائمة مزينة بنباتات البوتوس الخضراء، وزاوية قهوة خشبية قابلة للطي تحاكي ركنك المفضل في المقهى. قريبة من كورنيش الخبر وأفضل المطاعم والمقاهي العصرية.",
      en: "Enjoy a tranquil stay at Nesta Sand in the prestigious Al Yarmouk district of Khobar. Features a warm aesthetic inspired by desert sands, an upholstered rounded headboard, floating oak shelves adorned with lush pothos vines, and a handcrafted wooden coffee corner mimicking your favorite cafe. Just minutes from Khobar Corniche and premier dining."
    },
    guests: 4,
    bedrooms: 2,
    beds: 2, // 1 King + 1 Queen
    bathrooms: 2,
    area: 95, // m²
    priceFrom: 520, // SAR/night
    currency: "SAR",
    images: [
      "assets/units/sand-1.png",
      "assets/units/sand-2.png",
      "assets/units/sand-3.png",
      "assets/units/sand-4.png",
      "assets/units/sand-5.png"
    ],
    amenities: [
      "wifi", "ac", "parking", "selfCheckIn", "coffeeCorner", "kitchen",
      "tv", "washer", "linens", "toiletries", "workspace", "familyFriendly"
    ],
    sleepingArrangements: [
      {
        roomAr: "غرفة النوم الرئيسية",
        roomEn: "Master Bedroom",
        bedAr: "1 سرير كينج فندقي فائق الراحة",
        bedEn: "1 Hotel-grade King Bed",
        icon: "bi-lamp"
      },
      {
        roomAr: "غرفة النوم الثانية",
        roomEn: "Second Bedroom",
        bedAr: "1 سرير كوين مع رفوف خشبية وإضاءة دافئة",
        bedEn: "1 Queen Bed with warm ambient lights",
        icon: "bi-moon-stars"
      }
    ],
    rules: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      noSmoking: true,
      noParties: true,
      familiesAndProfessionals: true
    },
    nearbyPlaces: {
      ar: [
        { name: "كورنيش الخبر الجنوبي", time: "5 دقائق" },
        { name: "مجمع الراشد مول", time: "8 دقائق" },
        { name: "أجدان ووك (Ajdan Walk)", time: "6 دقائق" },
        { name: "سوبرماركت التميمي والصيدلية", time: "دقيقتان سيراً" }
      ],
      en: [
        { name: "Khobar South Corniche", time: "5 mins" },
        { name: "Al Rashid Mall", time: "8 mins" },
        { name: "Ajdan Walk", time: "6 mins" },
        { name: "Tamimi Markets & Pharmacy", time: "2 mins walk" }
      ]
    },
    location: {
      lat: 26.2869,
      lng: 50.2104,
      mapsUrl: "https://maps.google.com/?q=26.2869,50.2104"
    },
    externalLinks: [
      { platform: "airbnb", label: "Airbnb", url: "https://www.airbnb.com" },
      { platform: "booking", label: "Booking.com", url: "https://www.booking.com" }
    ],
    whatsapp: "966570262130"
  },
  {
    id: "nesta-sage-dammam",
    slug: "nesta-sage-dammam-shati",
    featured: true,
    style: "sage",
    type: "suite",
    cityId: "dammam",
    city: { ar: "الدمام", en: "Dammam" },
    district: { ar: "حي الشاطئ الغربي", en: "West Al-Shati District" },
    title: { ar: "نيستا سيج · جناح فندقي بطابع أخضر هادئ", en: "Nesta Sage · Calming Botanical Suite" },
    tagline: {
      ar: "لمسات خضراء ناعمة، نيش مقوس بإضاءة دافئة، وأجواء تبعث على السكينة المطلقة.",
      en: "Soft sage accents, an illuminated arched niche, and undisturbed serenity."
    },
    description: {
      ar: "جناح نيستا سيج في الشاطئ الغربي بالدمام صُمم خصيصاً لمن يبحث عن نقاهة حقيقية. يتميز بالجدارية المقوسة ذات الخلفية المضيئة المليئة بالنباتات والشموع العطرية، وسرير واسع بأغطية كتان قطنية مريحة باللون الأخضر المهدئ للأعصاب، وزاوية قهوة متكاملة تبدأ بها صباحك بانتعاش.",
      en: "Designed for mindful relaxation, Nesta Sage in Dammam's West Al-Shati neighborhood features an illuminated arched display niche with fragrant candles and plants, a plush bed adorned in restorative sage green linens, and an organic wooden coffee station for peaceful mornings."
    },
    guests: 3,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: 72,
    priceFrom: 460,
    currency: "SAR",
    images: [
      "assets/units/sage-1.png",
      "assets/units/sage-2.png",
      "assets/units/sage-3.png",
      "assets/units/sand-3.png"
    ],
    amenities: [
      "wifi", "ac", "parking", "selfCheckIn", "coffeeCorner",
      "tv", "washer", "linens", "toiletries", "workspace", "security"
    ],
    sleepingArrangements: [
      {
        roomAr: "جناح النوم الهادئ",
        roomEn: "Master Suite",
        bedAr: "1 سرير كينج فسيح مع وسائد ريش ناعمة",
        bedEn: "1 King Bed with plush feather pillows",
        icon: "bi-lamp"
      }
    ],
    rules: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      noSmoking: true,
      noParties: true,
      familiesAndProfessionals: true
    },
    nearbyPlaces: {
      ar: [
        { name: "واجهة الدمام البحرية", time: "4 دقائق" },
        { name: "مارينا مول الدمام", time: "7 دقائق" },
        { name: "طريق الخليج العربي", time: "3 دقائق" }
      ],
      en: [
        { name: "Dammam Seafront Promenade", time: "4 mins" },
        { name: "Marina Mall Dammam", time: "7 mins" },
        { name: "Arabian Gulf Road", time: "3 mins" }
      ]
    },
    location: {
      lat: 26.4529,
      lng: 50.1189,
      mapsUrl: "https://maps.google.com/?q=26.4529,50.1189"
    },
    externalLinks: [
      { platform: "airbnb", label: "Airbnb", url: "https://www.airbnb.com" }
    ],
    whatsapp: "966570262130"
  },
  {
    id: "nesta-blush-ahsa",
    slug: "nesta-blush-ahsa-hofuf",
    featured: true,
    style: "blush",
    type: "studio",
    cityId: "ahsa",
    city: { ar: "الأحساء", en: "Al-Ahsa" },
    district: { ar: "الهفوف · حي الجامعة", en: "Al Hofuf · University District" },
    title: { ar: "نيستا بلش · استوديو دافئ بنفحات ترابية", en: "Nesta Blush · Warm Terracotta Studio" },
    tagline: {
      ar: "ألوان طينية دافئة ودرجات المشمش الناعمة مع بوف بوكليه وزاوية قهوة أنيقة.",
      en: "Earthy terracotta warmth, soft blush tones, bouclé vanity, and artisanal coffee nook."
    },
    description: {
      ar: "ملاذك الحميم في قلب الأحساء التاريخية. استوديو نيستا بلش يجمع بين الدفء العصري واللمسات الحرفية التراثية الرقيقة. يضم رفوفاً خشبية مع لوحات نباتية هادئة، وسريراً بدرجات التراكوتا والوردي المغبر، وركن مكياج وقهوة في نيش مقوس مضاء مع كرسي بوكليه مريح.",
      en: "Your cozy haven in historic Al-Ahsa. Nesta Blush balances contemporary warmth with delicate artisanal touches. Features floating wooden shelves with botanical prints, a terracotta-accented bed, and an illuminated arched coffee & vanity alcove with a plush bouclé ottoman."
    },
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: 58,
    priceFrom: 380,
    currency: "SAR",
    images: [
      "assets/units/blush-1.png",
      "assets/units/blush-2.png",
      "assets/units/blush-3.png",
      "assets/units/sand-1.png"
    ],
    amenities: [
      "wifi", "ac", "parking", "selfCheckIn", "coffeeCorner",
      "tv", "linens", "toiletries", "workspace"
    ],
    sleepingArrangements: [
      {
        roomAr: "استوديو الراحة",
        roomEn: "Studio Sleeping Area",
        bedAr: "1 سرير كوين مريح مع بطانية تراكوتا صوفية",
        bedEn: "1 Queen Bed with terracotta wool throw",
        icon: "bi-moon-stars"
      }
    ],
    rules: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      noSmoking: true,
      noParties: true,
      familiesAndProfessionals: true
    },
    nearbyPlaces: {
      ar: [
        { name: "سوق القيصرية التاريخي", time: "10 دقائق" },
        { name: "جبل القارة ومغاراته", time: "15 دقيقة" },
        { name: "جامعة الملك فيصل", time: "6 دقائق" }
      ],
      en: [
        { name: "Historic Qaisariya Souq", time: "10 mins" },
        { name: "Al-Qarah Caves", time: "15 mins" },
        { name: "King Faisal University", time: "6 mins" }
      ]
    },
    location: {
      lat: 25.3619,
      lng: 49.5891,
      mapsUrl: "https://maps.google.com/?q=25.3619,49.5891"
    },
    externalLinks: [
      { platform: "booking", label: "Booking.com", url: "https://www.booking.com" }
    ],
    whatsapp: "966570262130"
  },
  {
    id: "nesta-sand-suite-khobar",
    slug: "nesta-sand-suite-khobar-hizam",
    featured: false,
    style: "sand",
    type: "suite",
    cityId: "khobar",
    city: { ar: "الخبر", en: "Khobar" },
    district: { ar: "حي الحزام الذهبي", en: "Golden Belt District" },
    title: { ar: "نيستا ساند سويت · رحابة الهدوء والأناقة", en: "Nesta Sand Suite · Golden Belt Haven" },
    tagline: {
      ar: "شرفة مشمسة ومساحة معيشة مفتوحة مع إضاءات دافئة مدروسة بعناية.",
      en: "Sunlit terrace, expansive open living space, and curated warm illumination."
    },
    description: {
      ar: "يقع هذا الجناح في أرقى أحياء الخبر الهادئة. تم تصميمه ليلائم رحلات العمل أو الإقامات الطويلة، مع طاولة عمل مريحة، ركن قهوة إيطالية، سرير فندقي وثير، وإضاءات سقفية وجانبية تعزز الشعور بالدفء والمنزلية.",
      en: "Nestled in Khobar's most serene and upscale neighborhood. Tailored for executive travelers and extended stays, offering an ergonomic workspace, artisanal coffee amenities, a luxurious bed, and layered warm lighting."
    },
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: 68,
    priceFrom: 490,
    currency: "SAR",
    images: [
      "assets/units/sand-2.png",
      "assets/units/sand-1.png",
      "assets/units/sand-3.png",
      "assets/units/sand-4.png"
    ],
    amenities: [
      "wifi", "ac", "parking", "selfCheckIn", "coffeeCorner", "kitchen",
      "tv", "washer", "linens", "toiletries", "workspace", "balcony"
    ],
    sleepingArrangements: [
      {
        roomAr: "غرفة النوم",
        roomEn: "Bedroom",
        bedAr: "1 سرير كينج طبي فائق الراحة",
        bedEn: "1 Orthopedic King Bed",
        icon: "bi-lamp"
      }
    ],
    rules: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      noSmoking: true,
      noParties: true,
      familiesAndProfessionals: true
    },
    nearbyPlaces: {
      ar: [
        { name: "مركز إثراء الثقافي العالمي", time: "12 دقيقة" },
        { name: "الظهران مول", time: "8 دقائق" },
        { name: "حي العليا التجاري", time: "5 دقائق" }
      ],
      en: [
        { name: "Ithra Cultural Center", time: "12 mins" },
        { name: "Dhahran Mall", time: "8 mins" },
        { name: "Olaya Business District", time: "5 mins" }
      ]
    },
    location: {
      lat: 26.3012,
      lng: 50.1982,
      mapsUrl: "https://maps.google.com/?q=26.3012,50.1982"
    },
    externalLinks: [
      { platform: "airbnb", label: "Airbnb", url: "https://www.airbnb.com" },
      { platform: "booking", label: "Booking.com", url: "https://www.booking.com" }
    ],
    whatsapp: "966570262130"
  },
  {
    id: "nesta-sage-apartment-dammam",
    slug: "nesta-sage-apartment-dammam-fursan",
    featured: false,
    style: "sage",
    type: "apartment",
    cityId: "dammam",
    city: { ar: "الدمام", en: "Dammam" },
    district: { ar: "حي الفرسان", en: "Al Fursan District" },
    title: { ar: "نيستا سيج أبارتمنت · شقة عائلية متكاملة", en: "Nesta Sage Apartment · Family Retreat" },
    tagline: {
      ar: "شقة عائلية واسعة بغرفتي نوم ومطبخ متكامل وإحساس بالطبيعة الغنّاء.",
      en: "Spacious 2-bedroom family sanctuary with full kitchen and botanical calm."
    },
    description: {
      ar: "شقة واسعة ومجهزة بالكامل للعائلات والزيارات الطويلة بالدمام. تتميز بتناسق لوني مريح بين الأخضر الميرمية والخشب الدافئ، وغرفتي نوم مستقلتين، ومطبخ عصري مجهز بأحدث الأجهزة، ونظام دخول ذاتي ذكي وسريع.",
      en: "A spacious, fully equipped 2-bedroom residence ideal for families and longer visits in Dammam. Blends soothing sage tones with warm timber, featuring a modern kitchen, fast smart check-in, and quiet residential neighborhood surroundings."
    },
    guests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    area: 110,
    priceFrom: 580,
    currency: "SAR",
    images: [
      "assets/units/sage-2.png",
      "assets/units/sage-1.png",
      "assets/units/sand-1.png",
      "assets/units/sage-3.png"
    ],
    amenities: [
      "wifi", "ac", "parking", "selfCheckIn", "coffeeCorner", "kitchen",
      "tv", "washer", "linens", "toiletries", "workspace", "familyFriendly", "elevator"
    ],
    sleepingArrangements: [
      {
        roomAr: "غرفة الماستر",
        roomEn: "Master Bedroom",
        bedAr: "1 سرير كينج فسيح",
        bedEn: "1 King Bed",
        icon: "bi-lamp"
      },
      {
        roomAr: "غرفة العائلة",
        roomEn: "Family Bedroom",
        bedAr: "2 سرير مفرد واسع",
        bedEn: "2 Single Beds",
        icon: "bi-moon-stars"
      }
    ],
    rules: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      noSmoking: true,
      noParties: true,
      familiesAndProfessionals: true
    },
    nearbyPlaces: {
      ar: [
        { name: "مطار الملك فهد الدولي", time: "18 دقيقة" },
        { name: "محطة قطار الدمام (سار)", time: "12 دقيقة" },
        { name: "النخيل مول الدمام", time: "10 دقائق" }
      ],
      en: [
        { name: "King Fahd International Airport", time: "18 mins" },
        { name: "SAR Dammam Train Station", time: "12 mins" },
        { name: "Al Nakheel Mall Dammam", time: "10 mins" }
      ]
    },
    location: {
      lat: 26.4101,
      lng: 50.0812,
      mapsUrl: "https://maps.google.com/?q=26.4101,50.0812"
    },
    externalLinks: [
      { platform: "airbnb", label: "Airbnb", url: "https://www.airbnb.com" }
    ],
    whatsapp: "966570262130"
  },
  {
    id: "nesta-blush-khobar",
    slug: "nesta-blush-khobar-rawdah",
    featured: false,
    style: "blush",
    type: "apartment",
    cityId: "khobar",
    city: { ar: "الخبر", en: "Khobar" },
    district: { ar: "حي الروضة", en: "Al Rawdah District" },
    title: { ar: "نيستا بلش ريزيدنس · فخامة بوتيكية دافئة", en: "Nesta Blush Residence · Boutique Comfort" },
    tagline: {
      ar: "مساحة تجمع بين الدفء الحميم والموقع الاستراتيجي بالقرب من بحر الخبر.",
      en: "Warm intimate comfort meets an enviable location near Khobar's coast."
    },
    description: {
      ar: "في قلب الخبر النابض، يقدم نيستا بلش تجربة إقامة بوتيكية استثنائية. تتألق تفاصيله بالخشب الطبيعي، والستائر الكتان المنسدلة، والإضاءة الدافئة التي تمنحك إحساساً فورياً بالاسترخاء فور دخولك من الباب.",
      en: "In the beating heart of Khobar, Nesta Blush delivers a distinctive boutique hospitality stay. Adorned with natural wood shelves, draping linen curtains, and layered warm lighting that puts you at ease the moment you cross the threshold."
    },
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    area: 75,
    priceFrom: 470,
    currency: "SAR",
    images: [
      "assets/units/blush-2.png",
      "assets/units/blush-1.png",
      "assets/units/blush-3.png",
      "assets/units/sand-4.png"
    ],
    amenities: [
      "wifi", "ac", "parking", "selfCheckIn", "coffeeCorner", "kitchen",
      "tv", "washer", "linens", "toiletries", "workspace", "security"
    ],
    sleepingArrangements: [
      {
        roomAr: "جناح النوم",
        roomEn: "Master Suite",
        bedAr: "1 سرير كينج + أريكة نوم مريحة",
        bedEn: "1 King Bed + 1 Comfort Daybed",
        icon: "bi-lamp"
      }
    ],
    rules: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      noSmoking: true,
      noParties: true,
      familiesAndProfessionals: true
    },
    nearbyPlaces: {
      ar: [
        { name: "فؤاد سنتر والمطاعم البحرية", time: "5 دقائق" },
        { name: "برج الحقيقة (كافيهات الخبر)", time: "4 دقائق" },
        { name: "جسر الملك فهد (البحرين)", time: "15 دقيقة" }
      ],
      en: [
        { name: "Fouad Center & Seafood Cafes", time: "5 mins" },
        { name: "Al Khobar Artisan Cafes", time: "4 mins" },
        { name: "King Fahd Causeway (Bahrain)", time: "15 mins" }
      ]
    },
    location: {
      lat: 26.2944,
      lng: 50.2198,
      mapsUrl: "https://maps.google.com/?q=26.2944,50.2198"
    },
    externalLinks: [
      { platform: "airbnb", label: "Airbnb", url: "https://www.airbnb.com" },
      { platform: "booking", label: "Booking.com", url: "https://www.booking.com" }
    ],
    whatsapp: "966570262130"
  }
];

// Amenities definitions with icons and bilingual labels
const AMENITIES_CATALOG = {
  wifi: {
    icon: "bi-wifi",
    category: "essentials",
    nameAr: "إنترنت عالي السرعة (فايبر)",
    nameEn: "High-Speed Fiber Wi-Fi"
  },
  ac: {
    icon: "bi-snow2",
    category: "comfort",
    nameAr: "تكييف هواء فائق الهدوء",
    nameEn: "Silent Air Conditioning"
  },
  parking: {
    icon: "bi-p-square",
    category: "essentials",
    nameAr: "موقف سيارات خاص ومظلل",
    nameEn: "Dedicated Private Parking"
  },
  selfCheckIn: {
    icon: "bi-key",
    category: "essentials",
    nameAr: "دخول ذاتي ذكي برقم سري",
    nameEn: "Smart Keyless Self Check-in"
  },
  coffeeCorner: {
    icon: "bi-cup-straw",
    category: "kitchen",
    nameAr: "ركن قهوة مجهز بالكامل",
    nameEn: "Curated Artisan Coffee Nook"
  },
  kitchen: {
    icon: "bi-cup-hot",
    category: "kitchen",
    nameAr: "مطبخ مجهز بأدوات الطهي",
    nameEn: "Equipped Kitchenette & Cookware"
  },
  tv: {
    icon: "bi-tv",
    category: "entertainment",
    nameAr: "شاشة ذكية 4K مع نتفلكس",
    nameEn: "4K Smart TV with Netflix"
  },
  washer: {
    icon: "bi-droplet-half",
    category: "comfort",
    nameAr: "غسالة ملابس ومكواة بخار",
    nameEn: "Washing Machine & Steamer"
  },
  linens: {
    icon: "bi-moon-stars",
    category: "comfort",
    nameAr: "بياضات وألحفة فندقية 100% قطن",
    nameEn: "100% Cotton Hotel Linens"
  },
  toiletries: {
    icon: "bi-stars",
    category: "comfort",
    nameAr: "مستلزمات عناية شخصية فاخرة",
    nameEn: "Boutique Natural Toiletries"
  },
  workspace: {
    icon: "bi-laptop",
    category: "comfort",
    nameAr: "مساحة عمل هادئة ومريحة",
    nameEn: "Ergonomic Dedicated Workspace"
  },
  familyFriendly: {
    icon: "bi-house-heart",
    category: "comfort",
    nameAr: "مناسبة ومجهزة للعائلات",
    nameEn: "Family & Children Friendly"
  },
  security: {
    icon: "bi-shield-check",
    category: "essentials",
    nameAr: "كاميرات أمنية للمداخل ودعم 24/7",
    nameEn: "24/7 Building Security & Care"
  },
  balcony: {
    icon: "bi-sun",
    category: "comfort",
    nameAr: "شرفة بإطلالة هادئة",
    nameEn: "Private Sunlit Balcony"
  },
  elevator: {
    icon: "bi-arrow-up-square",
    category: "essentials",
    nameAr: "مصعد كهربائي حديث",
    nameEn: "Modern High-Speed Elevator"
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.UNITS = UNITS;
  window.AMENITIES_CATALOG = AMENITIES_CATALOG;
}
