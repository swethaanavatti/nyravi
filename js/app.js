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
  const text = `${window.SITE_CONFIG.whatsappOrderPrefix}\n\nProduct: ${product.name}\nCategory: ${CATEGORY_META[product.category].title}\nTier: ${product.tier}\nStarting Price: ${product.priceLabel}`;
  window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
}

function productCard(p) {
  return `
    <article class="product-card" data-tier="${p.tier}">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name} ${p.tier}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category-label">${CATEGORY_META[p.category].title}</span>
        <h3 class="product-name">${p.name}</h3>
        <span class="product-tier tier-${p.tier}">${p.tier}</span>
        <div class="product-price">${p.priceLabel}</div>
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

function renderSubcategories(subcategories, container, pageKey) {
  if (!container) return;
  container.innerHTML = subcategories.map((sub) => `
    <a href="${sub.key}.html" class="subcategory-card">
      <img src="${sub.image}" alt="${sub.title}" loading="lazy">
      <span class="subcategory-title">${sub.title}</span>
    </a>
  `).join("");
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
  if (hero) {
    hero.style.backgroundImage = `url('${meta.image}')`;
    document.title = `${meta.title} | ${window.SITE_CONFIG.brand}`;
  }

  const subcategoryGrid = document.getElementById("subcategory-grid");
  const productGrid = document.getElementById("product-grid");
  const tabs = document.getElementById("tier-tabs");

  if (meta.aggregate && meta.subcategories && subcategoryGrid) {
    const subs = getSubcategories(pageKey);
    renderSubcategories(subs, subcategoryGrid, pageKey);
  }

  if (productGrid) {
    if (meta.aggregate && meta.subcategories) {
      // Show one featured product from each subcategory
      if (tabs) tabs.style.display = "none";
      const featured = meta.subcategories
        .map((key) => getProducts(key)[0])
        .filter(Boolean);
      if (featured.length) {
        const intro = document.querySelector(".category-intro h2");
        if (intro) intro.textContent = "Featured designs from each category";
        renderProductGrid(featured, productGrid);
      } else {
        productGrid.innerHTML = "";
      }
    } else {
      if (tabs) tabs.style.display = "flex";
      const allProducts = getProducts(pageKey);
      renderProductGrid(allProducts, productGrid);

      if (tabs) {
        tabs.innerHTML = `<button class="tier-tab active" data-tier="all">All</button>` +
          window.TIERS.map((t) => `<button class="tier-tab" data-tier="${t}">${t}</button>`).join("");

        tabs.querySelectorAll(".tier-tab").forEach((tab) => {
          tab.addEventListener("click", () => {
            tabs.querySelectorAll(".tier-tab").forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            const tier = tab.dataset.tier;
            const filtered = tier === "all" ? allProducts : allProducts.filter((p) => p.tier === tier);
            renderProductGrid(filtered, productGrid);
          });
        });
      }
    }
  }
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
    const card = carousel.closest(".carousel-card");
    card?.addEventListener("focusin", stop);
    card?.addEventListener("focusout", start);
  });
}

function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  const images = Array.from({ length: 12 }, (_, i) =>
    window.placeholderImage(600, 600, `Gallery ${i + 1}`, i % 2 === 0 ? "D9A6A6" : "F7F0E8", "5E2A2F")
  );
  grid.innerHTML = images.map((src, i) => `
    <div class="gallery-item ${i % 3 === 0 ? 'tall' : ''}">
      <img src="${src}" alt="Gallery image ${i + 1}" loading="lazy">
    </div>
  `).join("");
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
    el.href = `tel:${cfg.phoneDisplay.replace(/\s/g, "")}`;
  });
  document.querySelectorAll(".whatsapp-link").forEach((el) => {
    const href = el.getAttribute("href")?.split("?")[0] || `https://wa.me/${cfg.phone}`;
    el.href = `${href}?text=${encodeURIComponent(cfg.whatsappMessage)}`;
  });
  document.querySelectorAll(".service-areas-text").forEach((el) => {
    el.textContent = cfg.serviceAreas.join(", ");
  });
}

function initApp() {
  initTheme();
  window.renderSharedComponents?.();
  updateThemeIcon();
  initThemeToggle();
  initNavigation();
  initHeaderScroll();
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
