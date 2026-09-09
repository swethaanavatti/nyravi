function initTheme() {
  const html = document.documentElement;
  const stored = localStorage.getItem("nyravi-theme");
  if (stored) {
    html.dataset.theme = stored;
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    html.dataset.theme = "dark";
  } else {
    html.dataset.theme = "light";
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const isDark = document.documentElement.dataset.theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";
  btn.setAttribute("aria-label", label);
  btn.setAttribute("title", label);
}

function toggleTheme() {
  const html = document.documentElement;
  const next = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = next;
  localStorage.setItem("nyravi-theme", next);
  updateThemeIcon();
}

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Close mobile nav when a normal link is clicked
  nav?.querySelectorAll(".nav-list > li:not(.has-dropdown) > a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Dropdown toggles for mobile (caret click only)
  document.querySelectorAll(".drop-toggle .caret").forEach((caret) => {
    caret.parentElement.addEventListener("click", (e) => {
      if (e.target === caret) {
        e.preventDefault();
        e.stopPropagation();
        caret.closest(".has-dropdown").classList.toggle("open");
      }
    });
  });
}

function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;
  function update() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function setYear() {
  document.querySelectorAll(".year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function initThemeToggle() {
  document.body.addEventListener("click", (e) => {
    if (e.target.closest("#theme-toggle")) {
      toggleTheme();
    }
  });
}

function whatsappUrl(text) {
  return `https://wa.me/${window.SITE_CONFIG.phone}?text=${encodeURIComponent(text)}`;
}

function orderOnWhatsApp(product) {
  const text = `${window.SITE_CONFIG.whatsappOrderPrefix}\n\nProduct: ${product.name}\nCategory: ${CATEGORY_META[product.category].title}\nPrice: ${product.priceLabel}`;
  window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
}

function productImageMarkup(product) {
  const images = product.images?.length ? product.images : [product.image];
  if (images.length === 1) {
    return `<div class="product-image"><img src="${images[0]}" alt="${product.name}" loading="lazy"></div>`;
  }
  return `
    <div class="product-image product-carousel" data-carousel>
      ${images.map((image, index) => `<img class="carousel-slide${index === 0 ? " active" : ""}" src="${image}" alt="${product.name} view ${index + 1}" loading="lazy">`).join("")}
    </div>
  `;
}

function priceMarkup(product) {
  const [firstPrice, ...additionalPrices] = product.priceOptions;
  const additionalMarkup = additionalPrices.length ? `
    <details class="price-details">
      <summary aria-label="View all price options"><span aria-hidden="true">i</span></summary>
      <div class="price-popover">
        <strong>Prices start from</strong>
        ${product.priceOptions.map((option) => `<div><span>${option.label}</span><span>${formatPrice(option.value)}</span></div>`).join("")}
      </div>
    </details>
  ` : "";
  return `<span class="price-tier">Starts from</span><span class="price-value">${formatPrice(firstPrice.value)}</span>${additionalMarkup}`;
}

function productCard(p) {
  return `
    <article class="product-card">
      ${productImageMarkup(p)}
      <div class="product-info">
        <span class="product-category-label">${CATEGORY_META[p.category].title}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price">${priceMarkup(p)}</div>
        <div class="product-actions">
          <button class="btn btn-primary order-btn" data-id="${p.id}">Order on WhatsApp</button>
        </div>
      </div>
    </article>
  `;
}

function renderProductGrid(products, container) {
  if (!container) return;
  container.innerHTML = products.map(productCard).join("");
  container.querySelectorAll(".order-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const p = products.find((x) => x.id === id);
      if (p) orderOnWhatsApp(p);
    });
  });
}

function mergeCategoryIntro(meta) {
  const heroSection = document.querySelector("main > .page-hero");
  const intro = document.querySelector(".category-intro");
  if (!heroSection || !intro) return;

  const instructionText = intro.querySelector("p:last-of-type")?.textContent;
  const description = document.createElement("p");
  description.className = "category-page-description";
  description.textContent = meta.description;
  const instruction = document.createElement("p");
  instruction.className = "category-page-instruction";
  instruction.textContent = instructionText || "Choose a design to continue.";

  intro.replaceChildren(description, instruction);
  heroSection.remove();
  document.body.classList.add("category-page-no-hero");
}

function renderCategoryPage() {
  const pageKey = document.body.dataset.page;
  if (!pageKey || !window.CATEGORY_META) return;

  const meta = CATEGORY_META[pageKey];
  if (!meta) return;
  const titleEl = document.getElementById("category-title");
  const descEl = document.getElementById("category-description");
  const hero = document.querySelector(".page-hero-bg");

  if (titleEl) titleEl.textContent = meta.title;
  if (descEl) descEl.textContent = meta.description;
  if (hero) hero.style.backgroundImage = `url('${meta.image}')`;

  const productGrid = document.getElementById("product-grid");
  const tabs = document.getElementById("category-tabs");

  if (productGrid) {
    const allProducts = getProducts(pageKey);
    if (meta.aggregate && meta.subcategories) {
      // Show all products with subcategory filters
      const introText = document.querySelector(".category-intro p:last-of-type");
      if (introText) introText.textContent = "Browse all products or filter by category.";
      renderProductGrid(allProducts, productGrid);

      if (tabs) {
        tabs.style.display = "flex";
        tabs.innerHTML = `<button class="category-tab active" data-category="all">All</button>` +
          meta.subcategories.map((key) => `<button class="category-tab" data-category="${key}">${CATEGORY_META[key].title}</button>`).join("");

        tabs.querySelectorAll(".category-tab").forEach((tab) => {
          tab.addEventListener("click", () => {
            tabs.querySelectorAll(".category-tab").forEach((item) => item.classList.remove("active"));
            tab.classList.add("active");
            const category = tab.dataset.category;
            const filtered = category === "all" ? allProducts : allProducts.filter((product) => product.category === category);
            renderProductGrid(filtered, productGrid);
          });
        });
      }
    } else {
      if (tabs) tabs.style.display = "none";
      const introText = document.querySelector(".category-intro p:last-of-type");
      const isMenCategory = pageKey === "men";
      const isTypeCategory = pageKey.startsWith("kids-") || isMenCategory;
      const isServiceCategory = pageKey === "saree-petticoat-pico" || pageKey === "women-refit";
      const itemType = isTypeCategory ? "type" : isServiceCategory ? "service" : "design";
      if (introText) introText.textContent = isMenCategory
        ? "Choose a type and order directly on WhatsApp. Prices are indicative stitching charges and may vary with fabric and detailing."
        : `Choose a ${itemType} and order directly on WhatsApp.`;
      renderProductGrid(allProducts, productGrid);
    }
  }

  mergeCategoryIntro(meta);
}

function initCardCarousels() {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-carousel]").forEach((carousel, carouselIndex) => {
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    if (slides.length < 2) return;
    let current = 0;
    let timer;

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle("active", active);
      slide.classList.remove("previous");
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    });

    const showSlide = (index) => {
      const outgoing = slides[current];
      const incoming = slides[index];
      outgoing.classList.remove("active");
      outgoing.classList.add("previous");
      incoming.classList.remove("previous");
      incoming.classList.add("active");
      outgoing.setAttribute("aria-hidden", "true");
      incoming.setAttribute("aria-hidden", "false");
      current = index;
      window.setTimeout(() => outgoing.classList.remove("previous"), 750);
    };
    const stop = () => window.clearInterval(timer);
    const start = () => {
      if (reduceMotion) return;
      stop();
      timer = window.setInterval(() => {
        showSlide((current + 1) % slides.length);
      }, 3200 + carouselIndex * 350);
    };

    start();
    const card = carousel.closest(".carousel-card, .product-card");
    card?.addEventListener("focusin", stop);
    card?.addEventListener("focusout", start);
  });
}

function renderGalleryItems(grid, images) {
  const itemClasses = ["tall", "", "tall", "", ""];
  grid.innerHTML = images.map((image, index) => `
    <div class="gallery-item ${itemClasses[index % itemClasses.length]}">
      <img src="${image.src}" alt="${image.alt}" loading="lazy">
    </div>
  `).join("");
}

function renderGallery() {
  const images = window.GALLERY_IMAGES || [];
  const galleryGrid = document.getElementById("gallery-grid");
  const homeGallery = document.getElementById("home-gallery");
  if (galleryGrid) renderGalleryItems(galleryGrid, images);
  if (!homeGallery) return;

  const shuffledImages = [...images];
  for (let index = shuffledImages.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledImages[index], shuffledImages[randomIndex]] = [shuffledImages[randomIndex], shuffledImages[index]];
  }
  const imageCount = Math.min(shuffledImages.length, 4 + Math.floor(Math.random() * 2));
  renderGalleryItems(homeGallery, shuffledImages.slice(0, imageCount));
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("[name='name']")?.value.trim() || "";
    const message = form.querySelector("[name='message']")?.value.trim() || "";
    const text = `Hi ${window.SITE_CONFIG.brand}, my name is ${name}. ${message}`;
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  });
}

function initDynamicWhatsAppLinks() {
  document.querySelectorAll(".dynamic-whatsapp").forEach((el) => {
    el.href = `https://wa.me/${window.SITE_CONFIG.phone}?text=${encodeURIComponent(window.SITE_CONFIG.whatsappMessage)}`;
  });
}

function initContactPage() {
  const cfg = window.SITE_CONFIG;
  document.querySelectorAll(".address-text").forEach((el) => el.textContent = cfg.address);
  document.querySelectorAll(".phone-link").forEach((el) => {
    el.textContent = cfg.phoneDisplay;
    el.href = `tel:+${cfg.phone}`;
  });
  document.querySelectorAll(".whatsapp-link").forEach((el) => {
    el.href = `https://wa.me/${cfg.phone}?text=${encodeURIComponent(cfg.whatsappMessage)}`;
  });
  document.querySelectorAll(".service-areas-text").forEach((el) => {
    el.textContent = cfg.serviceAreas.join(", ");
  });
  const socialLinks = document.getElementById("contact-social-links");
  if (socialLinks) socialLinks.innerHTML = window.socialLinksMarkup?.(cfg, true) || "";
}

function initHeroVideo() {
  const video = document.querySelector(".hero-bg video[data-desktop-src]");
  if (!video) return;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const hasFastConnection = connection?.effectiveType === "4g" && !connection.saveData;
  video.src = isMobile
    ? hasFastConnection ? video.dataset.mobileSrc : video.dataset.lowSrc
    : video.dataset.desktopSrc;
  video.load();
  video.play().catch(() => {});
}

function initApp() {
  initTheme();
  window.renderSharedComponents?.();
  updateThemeIcon();
  initThemeToggle();
  initNavigation();
  initHeaderScroll();
  initHeroVideo();
  setYear();
  renderCategoryPage();
  renderGallery();
  initCardCarousels();
  initContactForm();
  initContactPage();
  initDynamicWhatsAppLinks();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
