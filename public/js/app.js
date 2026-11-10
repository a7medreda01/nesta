/**
 * Nesta Spaces (نيستا) - Main Application Controller
 * Premium Boutique Hospitality Web Application
 */

(function () {
  'use strict';

  // Application Global State
  const AppState = {
    lang: localStorage.getItem('nesta_lang') || (window.CONFIG ? window.CONFIG.defaultLang : 'ar'),
    currentView: 'home', // 'home' or 'unit'
    currentUnitId: null,
    selectedVibe: 'all',
    selectedCity: 'all',
    selectedType: 'all',
    selectedGuests: 0,
    cozyLighting: false,
    compareList: JSON.parse(sessionStorage.getItem('nesta_compare') || '[]'),
    imagesCache: [],
    currentFrameIndex: 0,
    targetFrameIndex: 0,
    canvasContext: null,
    canvasElement: null,
    isSequenceReady: false,
    usePlaceholder: window.CONFIG ? window.CONFIG.frames.usePlaceholderSequence : false,
    scrollTriggerInstance: null
  };

  /* ==========================================================================
     1. INITIALIZATION & DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage(AppState.lang);
    initCursor();
    initNavbarScroll();
    initFloatingLeaves();
    initHeroSwiper();
    initRouter();
    initEnterRoomCanvas();
    renderUnitsGrid();
    renderVibeSection();
    renderLocations();
    renderReviews();
    renderCompareTray();
    bindGlobalEvents();

    // Hide Splash Screen after brief smooth delay
    window.setTimeout(() => {
      const splash = document.getElementById('splash-screen');
      if (splash) {
        splash.classList.add('fade-out');
        window.setTimeout(() => splash.remove(), 800);
      }
      if (window.AOS) {
        window.AOS.init({
          duration: 800,
          once: true,
          easing: 'ease-out-cubic'
        });
      }
    }, 1200);
  });

  /* ==========================================================================
     2. ROUTER & VIEW MANAGEMENT (#/, #/units, #/unit/ID)
     ========================================================================== */
  function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  function handleRoute() {
    const hash = window.location.hash || '#/';
    const mainView = document.getElementById('main-homepage-view');
    const detailsView = document.getElementById('view-unit-details');

    if (hash.startsWith('#/unit/')) {
      const unitId = hash.replace('#/unit/', '').trim();
      const unit = window.UNITS.find(u => u.id === unitId || u.slug === unitId);
      if (unit) {
        AppState.currentView = 'unit';
        AppState.currentUnitId = unit.id;
        document.body.classList.add('unit-view-active');
        if (mainView) mainView.style.display = 'none';
        if (detailsView) {
          detailsView.style.display = 'block';
          renderUnitDetails(unit);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    // Default to Home View
    AppState.currentView = 'home';
    AppState.currentUnitId = null;
    document.body.classList.remove('unit-view-active');
    if (mainView) mainView.style.display = 'block';
    if (detailsView) detailsView.style.display = 'none';

    if (hash === '#/units') {
      const unitsSec = document.getElementById('units');
      if (unitsSec) unitsSec.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /* ==========================================================================
     3. I18N & BILINGUAL ENGINE (AR / EN)
     ========================================================================== */
  function initLanguage(lang) {
    AppState.lang = lang;
    localStorage.setItem('nesta_lang', lang);

    const t = window.I18N[lang];
    if (!t) return;

    // Set document direction and language attributes
    document.documentElement.lang = t.lang;
    document.documentElement.dir = t.dir;

    // Toggle Bootstrap stylesheet between RTL and LTR
    const bsLink = document.getElementById('bootstrap-css');
    if (bsLink) {
      if (t.dir === 'rtl') {
        bsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css';
      } else {
        bsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
      }
    }

    // Translate all static nodes with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const keyPath = el.getAttribute('data-i18n');
      const val = getNestedTranslation(t, keyPath);
      if (val !== undefined) {
        el.textContent = val;
      }
    });

    // Translate attributes like placeholder or title
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const spec = el.getAttribute('data-i18n-attr'); // e.g. "placeholder:search.datesPlaceholder"
      const parts = spec.split(':');
      if (parts.length === 2) {
        const attr = parts[0];
        const val = getNestedTranslation(t, parts[1]);
        if (val !== undefined) {
          el.setAttribute(attr, val);
        }
      }
    });

    // Re-render dynamic components
    if (AppState.currentView === 'unit' && AppState.currentUnitId) {
      const unit = window.UNITS.find(u => u.id === AppState.currentUnitId);
      if (unit) renderUnitDetails(unit);
    } else {
      renderUnitsGrid();
      renderVibeSection();
      renderLocations();
      renderReviews();
    }

    renderCompareTray();
  }

  function getNestedTranslation(obj, path) {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  }

  function toggleLanguage() {
    const nextLang = AppState.lang === 'ar' ? 'en' : 'ar';
    initLanguage(nextLang);
  }

  /* ==========================================================================
     4. SIGNATURE FEATURE: "ENTER THE ROOM" CANVAS SCROLL SEQUENCE
     ========================================================================== */
  function initEnterRoomCanvas() {
    const canvas = document.getElementById('enter-room-canvas');
    if (!canvas) return;

    AppState.canvasElement = canvas;
    AppState.canvasContext = canvas.getContext('2d');

    const isMobile = window.innerWidth < 768;
    const cfg = window.CONFIG.frames;
    const totalFrames = isMobile ? cfg.frameCountMobile : cfg.frameCountDesktop;
    const baseUrl = isMobile ? cfg.baseUrlMobile : cfg.baseUrlDesktop;

    // Resize canvas with devicePixelRatio
    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      if (AppState.canvasContext) {
        AppState.canvasContext.imageSmoothingEnabled = true;
        AppState.canvasContext.imageSmoothingQuality = 'high';
      }
      if (AppState.imagesCache[AppState.currentFrameIndex]) {
        drawFrameToCanvas(AppState.imagesCache[AppState.currentFrameIndex]);
      }
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Start progressive loading
    preloadFrames(totalFrames, baseUrl, () => {
      setupScrollTrigger(totalFrames);
    });
  }

  function preloadFrames(totalFrames, baseUrl, onReady) {
    const preloadBar = document.querySelector('.enter-preload-bar');
    let loadedCount = 0;
    const cfg = window.CONFIG.frames;

    // Load first frame immediately
    const firstImg = new Image();
    const firstUrl = `${baseUrl}/${cfg.prefix}${String(1).padStart(cfg.padDigits, '0')}${cfg.ext}`;
    firstImg.src = firstUrl;

    firstImg.onload = () => {
      AppState.imagesCache[0] = firstImg;
      drawFrameToCanvas(firstImg);
      AppState.isSequenceReady = true;
      if (onReady) onReady();

      // Progressive loading of the remaining frames in background
      for (let i = 1; i < totalFrames; i++) {
        const img = new Image();
        const frameIndex = i + 1;
        img.src = `${baseUrl}/${cfg.prefix}${String(frameIndex).padStart(cfg.padDigits, '0')}${cfg.ext}`;
        img.onload = () => {
          AppState.imagesCache[i] = img;
          loadedCount++;
          if (preloadBar) {
            preloadBar.style.width = `${Math.round((loadedCount / totalFrames) * 100)}%`;
            if (loadedCount >= totalFrames - 2) {
              setTimeout(() => { preloadBar.style.opacity = '0'; }, 500);
            }
          }
        };
        img.onerror = () => {
          // If frames are missing, switch to procedural fallback
          AppState.usePlaceholder = true;
        };
      }
    };

    firstImg.onerror = () => {
      // Automatic fallback mode
      AppState.usePlaceholder = true;
      AppState.isSequenceReady = true;
      if (onReady) onReady();
    };
  }

  function setupScrollTrigger(totalFrames) {
    if (!window.gsap || !window.ScrollTrigger) return;
    window.gsap.registerPlugin(window.ScrollTrigger);

    const pinSection = document.getElementById('enter-nesta');
    if (!pinSection) return;

    AppState.scrollTriggerInstance = window.ScrollTrigger.create({
      trigger: pinSection,
      start: 'top top',
      end: `+=${window.innerHeight * 4}`, // 400vh pinning
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;

        // Calculate Target Frame Index
        const maxIndex = totalFrames - 1;
        const targetIdx = Math.min(Math.round(progress * maxIndex), maxIndex);
        AppState.targetFrameIndex = targetIdx;

        // Smooth frame animation via requestAnimationFrame
        requestAnimationFrame(() => {
          if (AppState.targetFrameIndex !== AppState.currentFrameIndex) {
            AppState.currentFrameIndex = AppState.targetFrameIndex;
            renderFrame(AppState.currentFrameIndex, progress);
          }
        });

        // Update progress line & dot
        const dot = document.querySelector('.enter-scroll-progress-dot');
        if (dot) dot.style.height = `${progress * 100}%`;

        // Update light leak and vignette based on room entry
        const lightLeak = document.querySelector('.enter-light-leak');
        if (lightLeak) {
          if (progress > 0.35) {
            const leakProgress = Math.min((progress - 0.35) / 0.5, 1);
            lightLeak.style.opacity = (leakProgress * 0.7).toFixed(2);
          } else {
            lightLeak.style.opacity = '0';
          }
        }

        // Update Story Overlays (0-15%, 15-45%, 45-75%, 75-100%)
        updateStorySteps(progress);
      }
    });
  }

  function renderFrame(index, progress) {
    if (AppState.usePlaceholder || !AppState.imagesCache[index]) {
      drawProceduralFallback(progress);
      return;
    }
    drawFrameToCanvas(AppState.imagesCache[index]);
  }

  function drawFrameToCanvas(img) {
    const canvas = AppState.canvasElement;
    const ctx = AppState.canvasContext;
    if (!canvas || !ctx || !img) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Object-fit: cover algorithm
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;

    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
    );
  }

  // Procedural Canvas Sequence Fallback (Door opens and camera pushes in)
  function drawProceduralFallback(progress) {
    const canvas = AppState.canvasElement;
    const ctx = AppState.canvasContext;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Base background: warm bedroom atmosphere
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#1E2B2D');
    grad.addColorStop(0.5, '#0E6770');
    grad.addColorStop(1, '#C49A6C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stylized teal door swinging open with perspective
    const doorProgress = Math.min(progress / 0.45, 1);
    const doorOpenWidth = canvas.width * 0.45 * (1 - doorProgress * 0.85);

    ctx.fillStyle = '#0E6770';
    ctx.fillRect(canvas.width * 0.27, canvas.height * 0.15, doorOpenWidth, canvas.height * 0.7);

    // Door inner frame border
    ctx.strokeStyle = '#0A4A51';
    ctx.lineWidth = 4;
    ctx.strokeRect(canvas.width * 0.27, canvas.height * 0.15, doorOpenWidth, canvas.height * 0.7);

    // Centered White Nesta Logo on door (visible during first 0-25%)
    if (doorProgress < 0.6) {
      ctx.save();
      ctx.globalAlpha = 1 - (doorProgress / 0.6);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Cormorant Garamond", serif';
      ctx.textAlign = 'center';
      ctx.fillText('NESTA', canvas.width * 0.42, canvas.height * 0.45);
      ctx.font = '20px "Reem Kufi", sans-serif';
      ctx.fillText('نيستا', canvas.width * 0.42, canvas.height * 0.49);
      ctx.restore();
    }
  }

  function updateStorySteps(progress) {
    const step0 = document.getElementById('step-0');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');

    // 0–15%: Step 0
    if (step0) step0.classList.toggle('active', progress >= 0.01 && progress < 0.18);
    // 15–45%: Step 1
    if (step1) step1.classList.toggle('active', progress >= 0.18 && progress < 0.46);
    // 45–75%: Step 2
    if (step2) step2.classList.toggle('active', progress >= 0.46 && progress < 0.74);
    // 75–100%: Step 3
    if (step3) step3.classList.toggle('active', progress >= 0.74);
  }

  /* ==========================================================================
     5. UNITS RENDERING & FILTERING
     ========================================================================== */
  function renderUnitsGrid() {
    const grid = document.getElementById('units-grid');
    if (!grid) return;

    const t = window.I18N[AppState.lang];
    const isAr = AppState.lang === 'ar';

    // Filter units
    const filtered = window.UNITS.filter(u => {
      const matchCity = AppState.selectedCity === 'all' || u.cityId === AppState.selectedCity;
      const matchType = AppState.selectedType === 'all' || u.type === AppState.selectedType;
      const matchVibe = AppState.selectedVibe === 'all' || u.style === AppState.selectedVibe;
      const matchGuests = AppState.selectedGuests === 0 || u.guests >= AppState.selectedGuests;
      return matchCity && matchType && matchVibe && matchGuests;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="nesta-icon-badge nesta-icon-badge-lg mx-auto mb-3">
            <i class="bi bi-search"></i>
          </div>
          <h4 class="fw-bold mb-2">${t.unitsSection.noUnits}</h4>
          <button id="btn-reset-filters" class="btn btn-nesta-teal mt-2">
            ${t.unitsSection.resetFilters}
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          AppState.selectedCity = 'all';
          AppState.selectedType = 'all';
          AppState.selectedVibe = 'all';
          AppState.selectedGuests = 0;
          updateFilterTabsUI();
          renderUnitsGrid();
        });
      }
      return;
    }

    grid.innerHTML = filtered.map(u => {
      const title = isAr ? u.title.ar : u.title.en;
      const district = isAr ? u.district.ar : u.district.en;
      const city = isAr ? u.city.ar : u.city.en;
      const tagline = isAr ? u.tagline.ar : u.tagline.en;
      const styleName = t.unitCard[`style${capitalize(u.style)}`] || u.style;
      const inCompare = AppState.compareList.includes(u.id);

      const priceHtml = (window.CONFIG.showPrices && u.priceFrom) ? `
        <div class="unit-price-box">
          <span class="unit-price-from">${t.unitsSection.from}</span>
          <span class="unit-price-val">${u.priceFrom} <small style="font-size:0.75rem">${u.currency}</small></span>
        </div>
      ` : `<div></div>`;

      // Auto-filled WhatsApp message
      const waMsg = encodeURIComponent(
        isAr ? `مرحباً نيستا، أود الاستفسار عن حجز (${u.title.ar}) في ${u.city.ar}. الرابط: ${window.location.origin}/#/unit/${u.id}`
             : `Hello Nesta Spaces, I would like to inquire about booking (${u.title.en}) in ${u.city.en}. Link: ${window.location.origin}/#/unit/${u.id}`
      );
      const waUrl = `https://wa.me/${window.CONFIG.contact.whatsappNumber}?text=${waMsg}`;

      return `
        <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up">
          <div class="unit-card" data-unit-id="${u.id}">
            <div class="unit-card-media" role="button" tabindex="0" onclick="if(!event.target.closest('.unit-card-photos-badge')) window.location.hash='#/unit/${u.id}'" title="${t.unitsSection.viewDetails}">
              <img src="${u.images[0]}" alt="${title}" class="unit-card-img" loading="lazy" />
              <span class="unit-card-city-badge"><i class="bi bi-geo-alt-fill me-1"></i>${city}</span>
              <span class="unit-card-style-badge">${styleName}</span>
              <button type="button" class="unit-card-photos-badge" data-gallery-target="gallery-${u.id}" title="${t.unitDetails.showAllPhotos}">
                <i class="bi bi-images"></i>
                <span>${u.images.length} ${isAr ? 'صور' : 'photos'}</span>
              </button>
            </div>

            <!-- Hidden gallery anchors for GLightbox card gallery -->
            <div class="d-none">
              ${u.images.map((img, idx) => `
                <a href="${img}" class="glightbox" data-gallery="gallery-${u.id}" data-title="${title} (${idx + 1}/${u.images.length})"></a>
              `).join('')}
            </div>

            <div class="unit-card-body">
              <h3 class="unit-card-title">
                <a href="#/unit/${u.id}" class="text-decoration-none text-reset">${title}</a>
              </h3>
              <div class="unit-card-location">
                <i class="bi bi-geo-alt"></i>
                <span>${district} · ${city}</span>
              </div>
              <p class="unit-card-tagline">${tagline}</p>
              
              <div class="unit-card-specs">
                <div class="spec-item" title="${t.unitCard.guests}">
                  <i class="bi bi-people"></i>
                  <span>${u.guests} ${t.unitCard.guests}</span>
                </div>
                <div class="spec-item" title="${t.unitCard.bedrooms}">
                  <i class="bi bi-door-closed"></i>
                  <span>${u.bedrooms} ${t.unitCard.bedrooms}</span>
                </div>
                <div class="spec-item" title="${t.unitCard.baths}">
                  <i class="bi bi-droplet-half"></i>
                  <span>${u.bathrooms} ${t.unitCard.baths}</span>
                </div>
                <div class="spec-item" title="${t.unitCard.area}">
                  <i class="bi bi-aspect-ratio"></i>
                  <span>${u.area} ${t.unitCard.area}</span>
                </div>
              </div>

              <div class="unit-card-footer">
                ${priceHtml}
                <div class="unit-card-actions">
                  <button class="btn-unit-compare btn-compare-toggle ${inCompare ? 'active' : ''}" 
                          data-unit-id="${u.id}" 
                          title="${inCompare ? t.unitsSection.compareAdded : t.unitsSection.compareAdd}">
                    <i class="bi ${inCompare ? 'bi-check-lg' : 'bi-plus-lg'}"></i>
                  </button>
                  <a href="#/unit/${u.id}" class="btn-unit-details">
                    <span>${t.unitsSection.viewDetails}</span>
                    <i class="bi ${isAr ? 'bi-arrow-left' : 'bi-arrow-right'}"></i>
                  </a>
                  <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-unit-wa" title="${t.unitsSection.bookViaWa}">
                    <i class="bi bi-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach compare buttons handlers
    grid.querySelectorAll('.btn-compare-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-unit-id');
        toggleCompareUnit(id);
      });
    });

    // Attach card photo badge gallery triggers
    grid.querySelectorAll('.unit-card-photos-badge').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const galleryTarget = btn.getAttribute('data-gallery-target');
        const firstLink = document.querySelector(`a.glightbox[data-gallery="${galleryTarget}"]`);
        if (firstLink) firstLink.click();
      });
    });

    if (window.GLightbox) {
      window.GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true
      });
    }
  }

  /* ==========================================================================
     6. UNIT DETAILS VIEW (#/unit/id)
     ========================================================================== */
  function renderUnitDetails(unit) {
    const container = document.getElementById('view-unit-details');
    if (!container) return;

    const t = window.I18N[AppState.lang];
    const isAr = AppState.lang === 'ar';

    const title = isAr ? unit.title.ar : unit.title.en;
    const district = isAr ? unit.district.ar : unit.district.en;
    const city = isAr ? unit.city.ar : unit.city.en;
    const desc = isAr ? unit.description.ar : unit.description.en;
    const styleName = t.unitCard[`style${capitalize(unit.style)}`];

    // WhatsApp Direct Link with smart prefill
    const waText = encodeURIComponent(
      isAr ? `مرحباً نيستا، أرغب بحجز (${unit.title.ar}) في ${unit.city.ar}. هل الوحدة متاحة؟ الرابط: ${window.location.href}`
           : `Hello Nesta Spaces, I'd like to book (${unit.title.en}) in ${unit.city.en}. Is it available? Link: ${window.location.href}`
    );
    const waUrl = `https://wa.me/${window.CONFIG.contact.whatsappNumber}?text=${waText}`;

    // External booking links (Airbnb, Booking.com)
    const externalLinksHtml = (unit.externalLinks && unit.externalLinks.length > 0) ? unit.externalLinks.map(ext => {
      const isAbnb = ext.platform === 'airbnb';
      return `
        <a href="${ext.url}" target="_blank" rel="noopener noreferrer" class="btn-nesta-pill-subtle w-100 mb-2 justify-content-center py-2">
          <i class="bi ${isAbnb ? 'bi-house-heart' : 'bi-box-arrow-up-right'}"></i>
          <span>${isAbnb ? t.unitDetails.airbnbBtn : t.unitDetails.bookingComBtn}</span>
        </a>
      `;
    }).join('') : '';

    // Amenities categorized
    const amenitiesHtml = unit.amenities.map(aKey => {
      const item = window.AMENITIES_CATALOG[aKey];
      if (!item) return '';
      const name = isAr ? item.nameAr : item.nameEn;
      return `
        <div class="col-md-6 mb-2">
          <div class="amenity-row">
            <span class="nesta-icon-badge nesta-icon-badge-sm">
              <i class="bi ${item.icon}"></i>
            </span>
            <span class="fw-semibold text-dark">${name}</span>
          </div>
        </div>
      `;
    }).join('');

    // Sleeping arrangements
    const sleepingHtml = unit.sleepingArrangements.map(s => {
      const rName = isAr ? s.roomAr : s.roomEn;
      const bName = isAr ? s.bedAr : s.bedEn;
      return `
        <div class="col-md-6 mb-3">
          <div class="sleeping-card">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="nesta-icon-badge nesta-icon-badge-sm"><i class="bi ${s.icon}"></i></span>
              <h6 class="fw-bold mb-0">${rName}</h6>
            </div>
            <p class="text-muted small mb-0">${bName}</p>
          </div>
        </div>
      `;
    }).join('');

    // Nearby places
    const nearby = isAr ? unit.nearbyPlaces.ar : unit.nearbyPlaces.en;
    const nearbyHtml = nearby.map(nb => `
      <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
        <span class="text-dark"><i class="bi bi-geo-alt text-teal me-2"></i>${nb.name}</span>
        <span class="badge bg-light text-dark border">${nb.time}</span>
      </li>
    `).join('');

    // Similar units (same city or style, excluding current)
    const similarUnits = window.UNITS.filter(u => u.id !== unit.id).slice(0, 3);
    const similarHtml = similarUnits.map(u => {
      const sTitle = isAr ? u.title.ar : u.title.en;
      return `
        <div class="col-md-4 mb-3">
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <img src="${u.images[0]}" class="card-img-top" style="height:170px; object-fit:cover;" alt="${sTitle}">
            <div class="card-body p-3">
              <h6 class="fw-bold mb-1">${sTitle}</h6>
              <p class="text-muted small mb-2">${isAr ? u.district.ar : u.district.en}</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold text-teal">${u.priceFrom || ''} ${u.currency}</span>
                <a href="#/unit/${u.id}" class="btn btn-sm btn-nesta-outline text-teal border-teal">${t.unitsSection.viewDetails}</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="container">
        <!-- Breadcrumbs -->
        <div class="unit-breadcrumbs">
          <a href="#/">${t.unitDetails.breadcrumbHome}</a>
          <span>/</span>
          <a href="#/units">${t.unitDetails.breadcrumbUnits}</a>
          <span>/</span>
          <span>${title}</span>
        </div>

        <!-- Title & Location Bar -->
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <h1 class="serif-heading mb-1 display-5 fw-bold text-dark">${title}</h1>
            <p class="text-muted mb-0">
              <i class="bi bi-geo-alt-fill text-teal me-1"></i>
              ${district} · ${city} · <span class="badge bg-nesta-teal-light text-teal border">${styleName}</span>
            </p>
          </div>
          <div class="d-flex align-items-center gap-2">
            <!-- Cozy Lighting Toggle -->
            <button id="btn-toggle-cozy" class="btn-nesta-pill-subtle btn-sm">
              <i class="bi bi-lamp"></i>
              <span>${AppState.cozyLighting ? t.unitDetails.daylightToggle : t.unitDetails.cozyLightingToggle}</span>
            </button>
            <!-- Share Button -->
            <button id="btn-share-unit" class="btn-nesta-pill-subtle btn-sm">
              <i class="bi bi-share"></i>
              <span>${t.unitDetails.shareUnit}</span>
            </button>
          </div>
        </div>

        <!-- Desktop Bento Photo Gallery (>= 768px) -->
        <div class="bento-gallery desktop-unit-gallery">
          <div class="bento-item bento-item-large">
            <a href="${unit.images[0]}" class="glightbox" data-gallery="unit-gallery" data-title="${title} (1/${unit.images.length})">
              <img src="${unit.images[0]}" alt="${title}" class="bento-img" />
            </a>
          </div>
          <div class="bento-item">
            <a href="${unit.images[1] || unit.images[0]}" class="glightbox" data-gallery="unit-gallery" data-title="${title} (2/${unit.images.length})">
              <img src="${unit.images[1] || unit.images[0]}" alt="${title}" class="bento-img" />
            </a>
          </div>
          <div class="bento-item">
            <a href="${unit.images[2] || unit.images[0]}" class="glightbox" data-gallery="unit-gallery" data-title="${title} (3/${unit.images.length})">
              <img src="${unit.images[2] || unit.images[0]}" alt="${title}" class="bento-img" />
            </a>
          </div>
          <div class="bento-item">
            <a href="${unit.images[3] || unit.images[0]}" class="glightbox" data-gallery="unit-gallery" data-title="${title} (4/${unit.images.length})">
              <img src="${unit.images[3] || unit.images[0]}" alt="${title}" class="bento-img" />
            </a>
          </div>
          <div class="bento-item position-relative">
            <a href="${unit.images[4] || unit.images[0]}" class="glightbox" data-gallery="unit-gallery" data-title="${title} (5/${unit.images.length})">
              <img src="${unit.images[4] || unit.images[0]}" alt="${title}" class="bento-img" />
            </a>
            <button class="btn-show-all-photos" onclick="document.querySelector('.desktop-unit-gallery .glightbox').click()">
              <i class="bi bi-grid-3x3-gap"></i>
              <span>${t.unitDetails.showAllPhotos}</span>
            </button>
          </div>
        </div>

        <!-- Mobile Interactive Photo Gallery (< 768px) -->
        <div class="mobile-unit-gallery">
          <div class="mobile-gallery-stage">
            <a href="${unit.images[0]}" class="glightbox d-block w-100 h-100" id="mobile-gallery-link" data-gallery="unit-gallery-mobile">
              <img src="${unit.images[0]}" alt="${title}" class="mobile-gallery-img" id="mobile-gallery-main-img" />
            </a>
            <span class="mobile-gallery-badge">
              <i class="bi bi-camera"></i>
              <span id="mobile-gallery-counter">1 / ${unit.images.length}</span>
            </span>
            <button type="button" class="mobile-gallery-btn-prev" id="btn-mobile-prev" aria-label="Previous image">
              <i class="bi ${isAr ? 'bi-chevron-right' : 'bi-chevron-left'}"></i>
            </button>
            <button type="button" class="mobile-gallery-btn-next" id="btn-mobile-next" aria-label="Next image">
              <i class="bi ${isAr ? 'bi-chevron-left' : 'bi-chevron-right'}"></i>
            </button>
            <button class="btn-show-all-photos" onclick="document.querySelector('#mobile-gallery-link').click()">
              <i class="bi bi-arrows-fullscreen"></i>
              <span>${t.unitDetails.showAllPhotos}</span>
            </button>
          </div>

          <!-- Thumbnails Row -->
          <div class="mobile-gallery-thumbs" id="mobile-gallery-thumbs">
            ${unit.images.map((img, idx) => `
              <img src="${img}" class="mobile-gallery-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}" alt="${title} ${idx + 1}" />
            `).join('')}
          </div>

          <!-- Hidden anchors for full mobile gallery -->
          <div class="d-none" id="mobile-gallery-hidden-links">
            ${unit.images.slice(1).map((img, idx) => `
              <a href="${img}" class="glightbox" data-gallery="unit-gallery-mobile" data-title="${title} (${idx + 2}/${unit.images.length})"></a>
            `).join('')}
          </div>
        </div>

        <!-- Two Column Layout: Left Details / Right Sticky Booking -->
        <div class="row g-5">
          <!-- Left Column -->
          <div class="col-lg-8">
            <!-- Overview -->
            <div class="mb-5">
              <h4 class="fw-bold mb-3">${t.unitDetails.overview}</h4>
              <p class="lead text-secondary" style="font-size:1.1rem; line-height:1.8">${desc}</p>
              
              <!-- Quick Stats Grid -->
              <div class="quick-stats-grid">
                <div class="detail-stat-box">
                  <div class="detail-stat-icon"><i class="bi bi-people"></i></div>
                  <div class="detail-stat-value">${unit.guests}</div>
                  <div class="detail-stat-label">${t.unitCard.guests}</div>
                </div>
                <div class="detail-stat-box">
                  <div class="detail-stat-icon"><i class="bi bi-door-closed"></i></div>
                  <div class="detail-stat-value">${unit.bedrooms}</div>
                  <div class="detail-stat-label">${t.unitCard.bedrooms}</div>
                </div>
                <div class="detail-stat-box">
                  <div class="detail-stat-icon"><i class="bi bi-droplet-half"></i></div>
                  <div class="detail-stat-value">${unit.bathrooms}</div>
                  <div class="detail-stat-label">${t.unitCard.baths}</div>
                </div>
                <div class="detail-stat-box">
                  <div class="detail-stat-icon"><i class="bi bi-aspect-ratio"></i></div>
                  <div class="detail-stat-value">${unit.area}</div>
                  <div class="detail-stat-label">${t.unitCard.area}</div>
                </div>
              </div>
            </div>

            <!-- Sleeping Arrangements -->
            <div class="mb-5">
              <h4 class="fw-bold mb-3">${t.unitDetails.sleepingTitle}</h4>
              <div class="row">${sleepingHtml}</div>
            </div>

            <!-- Amenities Grid -->
            <div class="mb-5">
              <h4 class="fw-bold mb-3">${t.unitDetails.amenitiesTitle}</h4>
              <div class="amenities-container">
                <div class="row">${amenitiesHtml}</div>
              </div>
            </div>

            <!-- House Rules -->
            <div class="mb-5">
              <h4 class="fw-bold mb-3">${t.unitDetails.rulesTitle}</h4>
              <div class="p-4 bg-white rounded-4 border">
                <div class="row g-3">
                  <div class="col-md-6 d-flex align-items-center gap-3">
                    <span class="nesta-icon-badge nesta-icon-badge-sm"><i class="bi bi-clock"></i></span>
                    <div>
                      <div class="fw-bold">${t.unitDetails.checkInTime}</div>
                      <div class="text-muted small">${unit.rules.checkIn}</div>
                    </div>
                  </div>
                  <div class="col-md-6 d-flex align-items-center gap-3">
                    <span class="nesta-icon-badge nesta-icon-badge-sm"><i class="bi bi-clock-history"></i></span>
                    <div>
                      <div class="fw-bold">${t.unitDetails.checkOutTime}</div>
                      <div class="text-muted small">${unit.rules.checkOut}</div>
                    </div>
                  </div>
                  <div class="col-md-6 d-flex align-items-center gap-3">
                    <span class="nesta-icon-badge nesta-icon-badge-sm"><i class="bi bi-slash-circle"></i></span>
                    <div>
                      <div class="fw-bold">${t.unitDetails.noSmoking}</div>
                    </div>
                  </div>
                  <div class="col-md-6 d-flex align-items-center gap-3">
                    <span class="nesta-icon-badge nesta-icon-badge-sm"><i class="bi bi-house-heart"></i></span>
                    <div>
                      <div class="fw-bold">${t.unitDetails.familiesPolicy}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Nearby Landmarks -->
            <div class="mb-5">
              <h4 class="fw-bold mb-3">${t.unitDetails.nearbyTitle}</h4>
              <div class="p-4 bg-white rounded-4 border">
                <ul class="list-unstyled mb-0">${nearbyHtml}</ul>
              </div>
            </div>

            <!-- Location & Maps -->
            <div class="mb-5">
              <h4 class="fw-bold mb-3">${t.unitDetails.locationTitle}</h4>
              <div class="rounded-4 overflow-hidden border mb-3" style="height:320px;">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameborder="0" 
                  style="border:0;" 
                  src="https://maps.google.com/maps?q=${unit.location.lat},${unit.location.lng}&hl=${AppState.lang}&z=14&output=embed" 
                  allowfullscreen>
                </iframe>
              </div>
              <a href="${unit.location.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary rounded-pill btn-sm">
                <i class="bi bi-geo-alt me-1"></i>${t.unitDetails.openInMaps}
              </a>
            </div>
          </div>

          <!-- Right Column: Sticky Booking Card -->
          <div class="col-lg-4">
            <div class="sticky-booking-card">
              <div class="d-flex justify-content-between align-items-baseline mb-3">
                <h4 class="fw-bold mb-0 text-dark">${t.unitDetails.bookingCardTitle}</h4>
                ${unit.priceFrom ? `
                  <div class="text-end">
                    <span class="fs-3 fw-bold text-teal">${unit.priceFrom}</span>
                    <span class="text-muted small">${unit.currency}/${isAr ? 'ليلة' : 'night'}</span>
                  </div>
                ` : ''}
              </div>
              
              <p class="text-muted small mb-4">${t.unitDetails.bookingCardSub}</p>

              <!-- Primary WhatsApp Button -->
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-wa-pill w-100 py-3 mb-3 fs-6 justify-content-center">
                <i class="bi bi-whatsapp fs-5"></i>
                <span>${t.unitDetails.primaryWaBtn}</span>
              </a>

              <!-- Smart Template Modal Trigger -->
              <button id="btn-open-smart-wa" class="btn-nesta-pill-subtle w-100 py-2 mb-3 small justify-content-center">
                <i class="bi bi-chat-left-dots"></i>
                <span>${t.smartWa.modalTitle}</span>
              </button>

              <!-- External Platform Links (Airbnb, Booking.com) -->
              ${externalLinksHtml}

              <!-- Phone Call -->
              <a href="tel:${window.CONFIG.contact.phoneTel}" class="btn btn-link text-decoration-none text-muted w-100 text-center small mt-2">
                <i class="bi bi-telephone me-1"></i>
                ${t.unitDetails.callUs}: ${window.CONFIG.contact.phoneDisplay}
              </a>

              <!-- Direct Booking & Calendar Note -->
              <!-- FUTURE: Availability calendar & direct booking widget -->
              <div class="mt-4 pt-3 border-top text-center text-muted small" style="font-size:0.8rem">
                <i class="bi bi-shield-check text-teal me-1"></i>
                ${t.unitDetails.directBookingFuture}
              </div>
            </div>
          </div>
        </div>

        <!-- Similar Units Section -->
        <div class="mt-5 pt-5 border-top">
          <h4 class="fw-bold mb-4">${t.unitDetails.similarTitle}</h4>
          <div class="row">${similarHtml}</div>
        </div>

        <!-- Mobile Sticky Bottom Bar -->
        <div class="mobile-sticky-book-bar">
          <div>
            ${unit.priceFrom ? `
              <span class="fw-bold text-teal fs-5">${unit.priceFrom} ${unit.currency}</span>
              <span class="text-muted small">/${isAr ? 'ليلة' : 'night'}</span>
            ` : `<span class="fw-bold text-teal">${title}</span>`}
          </div>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-wa-pill py-2 px-3">
            <i class="bi bi-whatsapp"></i>
            <span>${t.unitDetails.stickyMobileBook}</span>
          </a>
        </div>
      </div>
    `;

    // Initialize GLightbox on unit photos
    if (window.GLightbox) {
      window.GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true
      });
    }

    // Mobile interactive gallery controller
    let currentMobilePhotoIdx = 0;
    const mobileImg = document.getElementById('mobile-gallery-main-img');
    const mobileLink = document.getElementById('mobile-gallery-link');
    const mobileCounter = document.getElementById('mobile-gallery-counter');
    const thumbs = document.querySelectorAll('.mobile-gallery-thumb');

    function setMobilePhoto(idx) {
      if (!unit.images || unit.images.length === 0) return;
      if (idx < 0) idx = unit.images.length - 1;
      if (idx >= unit.images.length) idx = 0;
      currentMobilePhotoIdx = idx;
      if (mobileImg) mobileImg.src = unit.images[currentMobilePhotoIdx];
      if (mobileLink) mobileLink.href = unit.images[currentMobilePhotoIdx];
      if (mobileCounter) mobileCounter.textContent = `${currentMobilePhotoIdx + 1} / ${unit.images.length}`;
      thumbs.forEach((th, i) => {
        th.classList.toggle('active', i === currentMobilePhotoIdx);
      });
    }

    const prevBtn = document.getElementById('btn-mobile-prev');
    const nextBtn = document.getElementById('btn-mobile-next');
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); setMobilePhoto(currentMobilePhotoIdx - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); setMobilePhoto(currentMobilePhotoIdx + 1); });

    thumbs.forEach(th => {
      th.addEventListener('click', () => {
        const idx = parseInt(th.getAttribute('data-index'), 10);
        if (!isNaN(idx)) setMobilePhoto(idx);
      });
    });

    // Attach cozy lighting toggle
    const cozyBtn = document.getElementById('btn-toggle-cozy');
    if (cozyBtn) {
      cozyBtn.addEventListener('click', () => {
        AppState.cozyLighting = !AppState.cozyLighting;
        document.body.classList.toggle('cozy-lighting-active', AppState.cozyLighting);
        cozyBtn.querySelector('span').textContent = AppState.cozyLighting 
          ? t.unitDetails.daylightToggle 
          : t.unitDetails.cozyLightingToggle;
      });
    }

    // Attach share unit button
    const shareBtn = document.getElementById('btn-share-unit');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href).then(() => {
            showToast(t.unitDetails.linkCopied);
          });
        }
      });
    }

    // Attach smart WA template modal
    const smartWaBtn = document.getElementById('btn-open-smart-wa');
    if (smartWaBtn) {
      smartWaBtn.addEventListener('click', () => {
        openSmartWaModal(unit);
      });
    }
  }

  /* ==========================================================================
     7. VIBE PICKER INTERACTIVE SECTION
     ========================================================================== */
  function renderVibeSection() {
    const wrap = document.getElementById('vibe-cards-wrap');
    if (!wrap) return;

    const t = window.I18N[AppState.lang];

    const vibes = [
      {
        id: 'sand',
        title: t.vibe.sandTitle,
        desc: t.vibe.sandDesc,
        img: 'assets/units/sand-1.png',
        cardClass: 'vibe-card-sand'
      },
      {
        id: 'sage',
        title: t.vibe.sageTitle,
        desc: t.vibe.sageDesc,
        img: 'assets/units/sage-2.png',
        cardClass: 'vibe-card-sage'
      },
      {
        id: 'blush',
        title: t.vibe.blushTitle,
        desc: t.vibe.blushDesc,
        img: 'assets/units/blush-1.png',
        cardClass: 'vibe-card-blush'
      }
    ];

    wrap.innerHTML = vibes.map(v => `
      <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up">
        <div class="vibe-card ${v.cardClass} ${AppState.selectedVibe === v.id ? 'active' : ''}" data-vibe-id="${v.id}">
          <div class="vibe-card-img-wrap">
            <img src="${v.img}" alt="${v.title}" class="vibe-card-img" />
            <span class="vibe-badge-tag">${v.title}</span>
          </div>
          <div class="vibe-card-body">
            <h4 class="fw-bold mb-2">${v.title}</h4>
            <p class="text-muted small mb-4 flex-grow-1">${v.desc}</p>
            <button class="btn btn-nesta-teal w-100 rounded-pill btn-vibe-select" data-vibe-id="${v.id}">
              ${t.vibe.btnFilterByVibe}
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click events
    wrap.querySelectorAll('[data-vibe-id]').forEach(el => {
      el.addEventListener('click', () => {
        const vibeId = el.getAttribute('data-vibe-id');
        setVibe(vibeId);
      });
    });
  }

  function setVibe(vibeId) {
    AppState.selectedVibe = vibeId;

    // Remove existing vibe classes and add selected
    document.body.classList.remove('vibe-sand', 'vibe-sage', 'vibe-blush');
    if (vibeId !== 'all') {
      document.body.classList.add(`vibe-${vibeId}`);
    }

    renderVibeSection();
    renderUnitsGrid();

    // Scroll down to units section
    const unitsSection = document.getElementById('units');
    if (unitsSection) {
      unitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /* ==========================================================================
     8. LOCATIONS SECTION
     ========================================================================== */
  function renderLocations() {
    const wrap = document.getElementById('locations-wrap');
    if (!wrap) return;

    const t = window.I18N[AppState.lang];

    const cities = [
      {
        id: 'khobar',
        title: t.locations.khobarTitle,
        desc: t.locations.khobarDesc,
        img: 'assets/units/sand-1.png'
      },
      {
        id: 'dammam',
        title: t.locations.dammamTitle,
        desc: t.locations.dammamDesc,
        img: 'assets/units/sage-1.png'
      },
      {
        id: 'ahsa',
        title: t.locations.ahsaTitle,
        desc: t.locations.ahsaDesc,
        img: 'assets/units/blush-1.png'
      }
    ];

    wrap.innerHTML = cities.map(c => `
      <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up">
        <div class="location-card" data-city-id="${c.id}">
          <img src="${c.img}" alt="${c.title}" class="location-card-img" />
          <div class="location-card-overlay">
            <h3 class="fw-bold mb-1 serif-heading">${c.title}</h3>
            <p class="small text-white-50 mb-3">${c.desc}</p>
            <span class="btn btn-sm btn-nesta-outline text-white align-self-start">
              ${t.locations.viewUnitsInCity} ${c.title} <i class="bi ${AppState.lang === 'ar' ? 'bi-arrow-left-short' : 'bi-arrow-right-short'}"></i>
            </span>
          </div>
        </div>
      </div>
    `).join('');

    wrap.querySelectorAll('[data-city-id]').forEach(card => {
      card.addEventListener('click', () => {
        const cityId = card.getAttribute('data-city-id');
        AppState.selectedCity = cityId;
        updateFilterTabsUI();
        renderUnitsGrid();
        const unitsSec = document.getElementById('units');
        if (unitsSec) unitsSec.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ==========================================================================
     9. TESTIMONIALS / REVIEWS
     ========================================================================== */
  function renderReviews() {
    const wrap = document.getElementById('reviews-swiper-wrapper');
    if (!wrap) return;

    const t = window.I18N[AppState.lang];

    const reviews = [
      { name: t.reviews.rev1Name, city: t.reviews.rev1City, text: t.reviews.rev1Text },
      { name: t.reviews.rev2Name, city: t.reviews.rev2City, text: t.reviews.rev2Text },
      { name: t.reviews.rev3Name, city: t.reviews.rev3City, text: t.reviews.rev3Text }
    ];

    wrap.innerHTML = reviews.map(r => `
      <div class="swiper-slide">
        <div class="review-card">
          <div class="review-stars">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
          </div>
          <p class="review-text">"${r.text}"</p>
          <div>
            <div class="review-author">${r.name}</div>
            <div class="review-location">${r.city}</div>
          </div>
        </div>
      </div>
    `).join('');

    if (window.Swiper) {
      new window.Swiper('#reviews-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        pagination: { el: '.reviews-pagination', clickable: true },
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });
    }
  }

  /* ==========================================================================
     10. COMPARE UNITS ENGINE (Max 3 units)
     ========================================================================== */
  function toggleCompareUnit(unitId) {
    const idx = AppState.compareList.indexOf(unitId);
    if (idx > -1) {
      AppState.compareList.splice(idx, 1);
    } else {
      if (AppState.compareList.length >= 3) {
        showToast(AppState.lang === 'ar' ? 'يمكنك مقارنة 3 وحدات كحد أقصى' : 'You can compare up to 3 units');
        return;
      }
      AppState.compareList.push(unitId);
    }
    sessionStorage.setItem('nesta_compare', JSON.stringify(AppState.compareList));
    renderUnitsGrid();
    renderCompareTray();
  }

  function renderCompareTray() {
    const tray = document.getElementById('compare-tray');
    if (!tray) return;

    const t = window.I18N[AppState.lang];
    const count = AppState.compareList.length;

    if (count === 0) {
      tray.classList.remove('visible');
      return;
    }

    tray.classList.add('visible');
    tray.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <span class="badge bg-nesta-teal rounded-pill px-3 py-2">
          ${count} ${AppState.lang === 'ar' ? 'وحدات مختارة' : 'units selected'}
        </span>
        <button id="btn-open-compare-modal" class="btn btn-sm btn-nesta-teal">
          ${t.nav.compare}
        </button>
        <button id="btn-clear-compare" class="btn btn-sm btn-link text-muted p-0 text-decoration-none">
          <i class="bi bi-x-circle fs-5"></i>
        </button>
      </div>
    `;

    const openBtn = document.getElementById('btn-open-compare-modal');
    if (openBtn) {
      openBtn.addEventListener('click', openCompareModal);
    }

    const clearBtn = document.getElementById('btn-clear-compare');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        AppState.compareList = [];
        sessionStorage.setItem('nesta_compare', '[]');
        renderUnitsGrid();
        renderCompareTray();
      });
    }
  }

  function openCompareModal() {
    const modalEl = document.getElementById('compareModal');
    if (!modalEl || !window.bootstrap) return;

    const t = window.I18N[AppState.lang];
    const isAr = AppState.lang === 'ar';
    const units = AppState.compareList.map(id => window.UNITS.find(u => u.id === id)).filter(Boolean);

    const body = modalEl.querySelector('.modal-body');
    if (units.length === 0) {
      body.innerHTML = `<p class="text-center text-muted py-4">${t.compare.empty}</p>`;
    } else {
      body.innerHTML = `
        <div class="table-responsive">
          <table class="table table-bordered text-center align-middle">
            <thead class="table-light">
              <tr>
                <th style="width:200px">${t.compare.metricType}</th>
                ${units.map(u => `
                  <th>
                    <img src="${u.images[0]}" class="rounded-3 mb-2" style="width:100%; height:110px; object-fit:cover" />
                    <div class="fw-bold">${isAr ? u.title.ar : u.title.en}</div>
                    <button class="btn btn-sm btn-link text-danger text-decoration-none remove-comp-btn" data-id="${u.id}">
                      ${t.compare.btnRemove}
                    </button>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="fw-semibold text-start">${t.compare.metricPrice}</td>
                ${units.map(u => `<td class="fw-bold text-teal">${u.priceFrom || '-'} ${u.currency}</td>`).join('')}
              </tr>
              <tr>
                <td class="fw-semibold text-start">${t.compare.metricCity}</td>
                ${units.map(u => `<td>${isAr ? u.city.ar : u.city.en} - ${isAr ? u.district.ar : u.district.en}</td>`).join('')}
              </tr>
              <tr>
                <td class="fw-semibold text-start">${t.compare.metricGuests}</td>
                ${units.map(u => `<td>${u.guests} ${t.unitCard.guests}</td>`).join('')}
              </tr>
              <tr>
                <td class="fw-semibold text-start">${t.compare.metricBedrooms}</td>
                ${units.map(u => `<td>${u.bedrooms} ${t.unitCard.bedrooms} (${u.beds} ${t.unitCard.beds})</td>`).join('')}
              </tr>
              <tr>
                <td class="fw-semibold text-start">${t.compare.metricArea}</td>
                ${units.map(u => `<td>${u.area} ${t.unitCard.area}</td>`).join('')}
              </tr>
              <tr>
                <td class="fw-semibold text-start">${t.compare.metricCheckIn}</td>
                ${units.map(u => `<td>${u.rules.checkIn} / ${u.rules.checkOut}</td>`).join('')}
              </tr>
              <tr>
                <td></td>
                ${units.map(u => `
                  <td>
                    <a href="#/unit/${u.id}" class="btn btn-sm btn-nesta-teal w-100" data-bs-dismiss="modal">
                      ${t.unitsSection.viewDetails}
                    </a>
                  </td>
                `).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      `;

      body.querySelectorAll('.remove-comp-btn').forEach(b => {
        b.addEventListener('click', () => {
          const id = b.getAttribute('data-id');
          toggleCompareUnit(id);
          openCompareModal();
        });
      });
    }

    const modal = new window.bootstrap.Modal(modalEl);
    modal.show();
  }

  /* ==========================================================================
     11. SMART WHATSAPP MESSAGE GENERATOR MODAL
     ========================================================================== */
  function openSmartWaModal(unit) {
    const modalEl = document.getElementById('smartWaModal');
    if (!modalEl || !window.bootstrap) return;

    const t = window.I18N[AppState.lang];
    const isAr = AppState.lang === 'ar';
    const unitTitle = isAr ? unit.title.ar : unit.title.en;

    const unitNameEl = document.getElementById('smart-wa-unit-name');
    const datesInput = document.getElementById('smart-wa-dates');
    const guestsInput = document.getElementById('smart-wa-guests');
    const previewEl = document.getElementById('smart-wa-preview');
    const launchBtn = document.getElementById('btn-launch-smart-wa');
    const copyBtn = document.getElementById('btn-copy-smart-wa');

    if (unitNameEl) unitNameEl.textContent = `${unitTitle} (${isAr ? unit.city.ar : unit.city.en})`;

    function buildMessage() {
      const dates = datesInput ? datesInput.value.trim() : '';
      const guests = guestsInput ? guestsInput.value.trim() : '';
      const link = `${window.location.origin}/#/unit/${unit.id}`;

      let msg = '';
      if (isAr) {
        msg = `السلام عليكم ورحمة الله،\nأود الاستفسار عن حجز وحدة (${unitTitle}) في ${unit.city.ar}.\n`;
        if (dates) msg += `التاريخ المتوقع: ${dates}\n`;
        if (guests) msg += `عدد الضيوف: ${guests}\n`;
        msg += `رابط الوحدة: ${link}\nشكراً لكم.`;
      } else {
        msg = `Hello Nesta Spaces,\nI would like to inquire about booking (${unitTitle}) in ${unit.city.en}.\n`;
        if (dates) msg += `Expected Dates: ${dates}\n`;
        if (guests) msg += `Guests Count: ${guests}\n`;
        msg += `Space Link: ${link}\nThank you.`;
      }
      return msg;
    }

    function updatePreview() {
      const msg = buildMessage();
      if (previewEl) previewEl.textContent = msg;
      if (launchBtn) {
        launchBtn.href = `https://wa.me/${window.CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      }
    }

    if (datesInput) datesInput.oninput = updatePreview;
    if (guestsInput) guestsInput.oninput = updatePreview;
    updatePreview();

    if (copyBtn) {
      copyBtn.onclick = () => {
        const msg = buildMessage();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(msg).then(() => {
            showToast(t.smartWa.copyToast);
          });
        }
      };
    }

    const modal = new window.bootstrap.Modal(modalEl);
    modal.show();
  }

  /* ==========================================================================
     12. UI MICRO-INTERACTIONS & HELPERS
     ========================================================================== */
  function initNavbarScroll() {
    const navbar = document.querySelector('.nesta-navbar');
    const scrollProg = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Scroll progress
      if (scrollProg && docHeight > 0) {
        const pct = (scrollY / docHeight) * 100;
        scrollProg.style.width = `${pct}%`;
      }

      // Navbar background blur
      if (navbar) {
        if (scrollY > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      // Back to top button
      if (backToTop) {
        if (scrollY > 400) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    }, { passive: true });

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function initHeroSwiper() {
    if (window.Swiper) {
      new window.Swiper('#hero-swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: { delay: 6000, disableOnInteraction: false },
        loop: true,
        speed: 1600
      });
    }
  }

  function initFloatingLeaves() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    // Generate 6 delicate drifting leaf SVGs
    for (let i = 0; i < 6; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'floating-leaf';
      leaf.style.left = `${Math.random() * 90 + 5}%`;
      leaf.style.animationDuration = `${Math.random() * 8 + 12}s`;
      leaf.style.animationDelay = `${Math.random() * 5}s`;

      leaf.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 7 21 12 22C17 21 22 17.5 22 12C22 6.5 17.5 2 12 2Z" fill="#F5EDE0" opacity="0.8"/>
          <path d="M12 2C12 12 22 12 22 12" stroke="#0E6770" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      `;
      hero.appendChild(leaf);
    }
  }

  function initCursor() {
    if (window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 992) {
      const dot = document.querySelector('.cursor-dot');
      const trail = document.querySelector('.cursor-trail');
      if (!dot || !trail) return;

      let mouseX = -100, mouseY = -100;
      let trailX = -100, trailY = -100;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      });

      function renderTrail() {
        trailX += (mouseX - trailX) * 0.18;
        trailY += (mouseY - trailY) * 0.18;
        trail.style.transform = `translate(${trailX}px, ${trailY}px)`;
        requestAnimationFrame(renderTrail);
      }
      renderTrail();

      document.querySelectorAll('a, button, .unit-card, .vibe-card, .location-card').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
    }
  }

  function bindGlobalEvents() {
    // Language Toggle Button in Navbar
    const langBtn = document.getElementById('btn-lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', toggleLanguage);
    }

    // Filter Buttons in Units Section
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (['khobar', 'dammam', 'ahsa', 'all'].includes(filter)) {
          AppState.selectedCity = filter;
        } else if (['apartment', 'suite', 'studio'].includes(filter)) {
          AppState.selectedType = filter;
        }

        renderUnitsGrid();
      });
    });

    // Quick Search Form Handlers
    const searchForm = document.getElementById('quick-search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const citySelect = document.getElementById('search-city');
        const typeSelect = document.getElementById('search-type');
        const styleSelect = document.getElementById('search-style');
        const guestsSelect = document.getElementById('search-guests');

        if (citySelect) AppState.selectedCity = citySelect.value;
        if (typeSelect) AppState.selectedType = typeSelect.value;
        if (styleSelect) AppState.selectedVibe = styleSelect.value;
        if (guestsSelect) AppState.selectedGuests = parseInt(guestsSelect.value) || 0;

        renderUnitsGrid();
        const unitsSec = document.getElementById('units');
        if (unitsSec) unitsSec.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function updateFilterTabsUI() {
    document.querySelectorAll('.filter-btn[data-filter]').forEach(b => {
      const f = b.getAttribute('data-filter');
      if (f === AppState.selectedCity || (AppState.selectedCity === 'all' && f === 'all')) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'nesta-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2.5rem;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background-color: var(--nesta-ink);
      color: #ffffff;
      padding: 0.8rem 1.6rem;
      border-radius: var(--radius-pill);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      font-size: 0.95rem;
      font-weight: 500;
      z-index: 10005;
      opacity: 0;
      transition: all 0.3s ease;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Export functions to window if needed
  window.NestaApp = {
    AppState,
    toggleLanguage,
    setVibe,
    toggleCompareUnit,
    openSmartWaModal
  };

})();
