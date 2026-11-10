/**
 * Nesta Spaces (نيستا) - Application Configuration
 * Centralized settings for brand info, contact channels, feature toggles, and frame animations.
 */
const CONFIG = {
  // Brand identity
  brand: {
    nameEn: "Nesta Spaces",
    nameAr: "نيستا",
    taglineEn: "Your warm space, wherever you are",
    taglineAr: "مساحتك الدافئة… أينما كنت",
    subtaglineEn: "Furnished boutique residential spaces in Khobar, Dammam, and Al-Ahsa",
    subtaglineAr: "وحدات سكنية مفروشة بإقامة تليق بك في الخبر · الدمام · الأحساء",
    logoPath: "assets/logo.png"
  },

  // Contact & Channels
  contact: {
    whatsappNumber: "966570262130", // International format without '+'
    phoneDisplay: "0570262130",
    phoneTel: "+966570262130",
    instagramHandle: "@nesta.spaces",
    instagramUrl: "https://www.instagram.com/nesta.spaces",
    supportHoursAr: "دعم على مدار الساعة 24/7",
    supportHoursEn: "24/7 Guest Care"
  },

  // Operating Cities
  cities: [
    { id: "khobar", nameAr: "الخبر", nameEn: "Khobar", count: 3 },
    { id: "dammam", nameAr: "الدمام", nameEn: "Dammam", count: 2 },
    { id: "ahsa", nameAr: "الأحساء", nameEn: "Al-Ahsa", count: 1 }
  ],

  // System Settings & Feature Toggles
  defaultLang: "ar", // "ar" (RTL) or "en" (LTR)
  showPrices: true,  // Toggle to show/hide "from SAR/night" rates
  enableBookingEngine: false, // Flag for future online direct booking engine
  enableCalendar: false,      // Flag for future iCal/availability calendar

  // Scroll "Enter The Room" Frame Sequence Configuration
  frames: {
    frameCountDesktop: 119,
    frameCountMobile: 79,
    baseUrlDesktop: "assets/frames",
    baseUrlMobile: "assets/frames-mobile",
    prefix: "frame_",
    ext: ".webp",
    padDigits: 4,
    usePlaceholderSequence: false, // Verified real frames are extracted and ready
    pinDurationVh: 400, // Section height in vh for the scroll scrub
    scrubSmooth: 0.5    // GSAP ScrollTrigger scrub smoothing
  }
};

// Export to window for global access
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
