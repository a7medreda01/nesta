# Nesta Spaces (نيستا) - Premium Residential Demo

A boutique hospitality and short/long-term residential apartment rental website for **Nesta Spaces** (نيستا), operating in **Khobar**, **Dammam**, and **Al-Ahsa** (Saudi Arabia).

---

## 🎨 Brand Identity & Colors
- **Deep Teal (Primary)**: `#0E6770`
- **Dark Teal**: `#0A4A51`
- **Light Teal**: `#E6F2F3`
- **Warm Sand (Beige)**: `#F5EDE0`
- **Cream (Canvas)**: `#FBF8F3`
- **Natural Wood (Accent)**: `#C49A6C`
- **Sage Green (Plants & Accents)**: `#A8B89A`
- **Charcoal Ink**: `#1E2B2D`

---

## 🚪 Signature Feature: Scroll-Controlled "Enter The Room" Canvas
Located right after the hero section (`#enter-nesta`), this section pins the viewport (`400vh` duration) and scrubs through high-resolution WebP frames on an HTML5 `<canvas>` via **GSAP ScrollTrigger**:
1. **0% – 15%**: Closed teal door with Nesta logo centered. Headline: *"Every stay begins with a door…"* (positioned so the door logo remains clearly legible).
2. **15% – 45%**: Door opens, camera glides into the room. Headline: *"Nesta… your second home"*.
3. **45% – 75%**: Camera pushes through the bedroom. Headline: *"Warm details await you"* with 3 floating amenity badges (Comfort, Coffee, Wi-Fi).
4. **75% – 100%**: Slow push-in finishing on the bed and illuminated arched niche. CTAs appear: *"Explore Spaces"* and *"Book via WhatsApp"*.

### How to Replace or Update Sequence Frames
All frame sequence settings are managed in `js/config.js` under `CONFIG.frames`:
```javascript
frames: {
  frameCountDesktop: 119,       // Total frames for desktop
  frameCountMobile: 79,          // Total frames for mobile (<768px)
  baseUrlDesktop: "assets/frames",        // Can be a local path or CDN URL
  baseUrlMobile: "assets/frames-mobile",  // Can be a local path or CDN URL
  prefix: "frame_",
  ext: ".webp",
  padDigits: 4,                  // frame_0001.webp … frame_0119.webp
  usePlaceholderSequence: false, // Set to true for procedural fallback if frames are absent
  pinDurationVh: 400,            // Scroll scrub duration (in vh)
  scrubSmooth: 0.5               // GSAP smooth scrub easing
}
```

#### Generating Frames from a New Video:
If you have a new MP4 video (`my_video.mp4`, 1080p, ~8s):
```bash
# 1. Desktop Frames (1600x900 WebP)
ffmpeg -i my_video.mp4 -vf "fps=119/8.0,scale=1600:900" -vframes 119 -c:v libwebp -q:v 70 -f image2 public/assets/frames/frame_%04d.webp

# 2. Mobile Frames (800x450 WebP)
ffmpeg -i my_video.mp4 -vf "fps=79/8.0,scale=800:450" -vframes 79 -c:v libwebp -q:v 65 -f image2 public/assets/frames-mobile/frame_%04d.webp
```

---

## 🗂️ Project Structure
```
├── index.html            # Main single-page application & templates
├── css/
│   └── style.css         # Complete brand styling & animations
├── js/
│   ├── config.js         # Brand settings, phone, WhatsApp, and frame config
│   ├── units.js          # Centralized JSON array for all residential units
│   ├── i18n.js           # Full Arabic (RTL) & English (LTR) translations
│   └── app.js            # Router, Canvas controller, Swiper, GLightbox, and filters
└── assets/
    ├── logo.png          # Nesta brand logo (nest bowl + leaves + wordmark)
    ├── door.png          # Teal door with centered Nesta logo
    ├── units/            # High-res interior photography (Sand, Sage, Blush)
    ├── frames/           # 119 desktop WebP sequence frames (1600x900)
    └── frames-mobile/    # 79 mobile WebP sequence frames (800x450)
```

---

## 🛋️ Adding a New Unit
Open `js/units.js` and append an object to `UNITS`:
```javascript
{
  id: "nesta-unit-id",
  slug: "nesta-unit-slug",
  style: "sand", // "sand" | "sage" | "blush"
  type: "apartment", // "apartment" | "suite" | "studio"
  cityId: "khobar", // "khobar" | "dammam" | "ahsa"
  city: { ar: "الخبر", en: "Khobar" },
  district: { ar: "حي اليرموك", en: "Al Yarmouk District" },
  title: { ar: "اسم الوحدة", en: "Unit Title" },
  tagline: { ar: "وصف موجز", en: "Short Tagline" },
  description: { ar: "الوصف التفصيلي", en: "Detailed Description" },
  guests: 4,
  bedrooms: 2,
  beds: 2,
  bathrooms: 2,
  area: 95,
  priceFrom: 520,
  currency: "SAR",
  images: [ "assets/units/sand-1.png", ... ],
  amenities: [ "wifi", "ac", "parking", "selfCheckIn", "coffeeCorner", ... ],
  rules: { checkIn: "3:00 PM", checkOut: "12:00 PM" },
  location: { lat: 26.2869, lng: 50.2104, mapsUrl: "https://..." },
  externalLinks: [
    { platform: "airbnb", label: "Airbnb", url: "https://airbnb.com/..." },
    { platform: "booking", label: "Booking.com", url: "https://booking.com/..." }
  ],
  whatsapp: "966570262130"
}
```

---

## 🚀 Future Integrations
- **Direct Online Booking Engine**: Replace the WhatsApp booking card with an API call (e.g., Supabase / Firebase / Stripe / Tap Payments / Moyasar).
- **Calendar & iCal Synchronization**: Plug in an iCal sync parser to sync reservation calendars with Airbnb & Booking.com channel managers.
