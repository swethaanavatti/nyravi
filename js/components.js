function getPageKey() {
  return document.body.dataset.navPage || document.body.dataset.page ||
    window.location.pathname.split("/").pop().replace(/\.html$/, "") ||
    "index";
}

function navLink(href, label, pageKey) {
  const file = href.replace(/\.html$/, "");
  const active = pageKey === file ? " class=\"active\"" : "";
  return `<li><a href="${href}"${active}>${label}</a></li>`;
}

function dropdownItem(href, label, pageKey) {
  const file = href.replace(/\.html$/, "");
  const active = pageKey === file ? " class=\"active\"" : "";
  return `<li><a href="${href}"${active}>${label}</a></li>`;
}

function renderHeader() {
  const cfg = window.SITE_CONFIG;
  const page = getPageKey();
  const kidsActive = page === "kids" || page.startsWith("kids-");
  const header = document.getElementById("site-header");
  if (!header) return;
  const logoLight = cfg.logoLight || "images/nyravi_logo.png";
  const logoDark = cfg.logoDark || logoLight;
  const darkLogoFallback = cfg.logoDark ? "" : " logo-image-dark-fallback";

  const html = `
    <div class="container header-inner">
      <a class="logo" href="index.html" aria-label="${cfg.brand} home">
        <img class="logo-image logo-image-light" src="${logoLight}" alt="${cfg.brand}">
        <img class="logo-image logo-image-dark${darkLogoFallback}" src="${logoDark}" alt="">
        <span>${cfg.brandShort}</span>
      </a>
      <div class="header-actions">
        <a class="header-contact${page === "contact" ? " active" : ""}" href="contact.html">Contact</a>
        <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav">
          <span class="hamburger"></span>
        </button>
      </div>
      <nav id="main-nav" class="main-nav" aria-label="Main navigation">
        <ul class="nav-list">
          ${navLink("index.html", "Home", page)}
          <li class="has-dropdown">
            <a href="women.html" class="drop-toggle${page === "women" ? " active" : ""}">Women <span class="caret" aria-hidden="true">▾</span></a>
            <ul class="dropdown">
              ${dropdownItem("blouses.html", "Blouses", page)}
              ${dropdownItem("lehengas.html", "Lehengas", page)}
              ${dropdownItem("kurtis.html", "Kurtis", page)}
              ${dropdownItem("anarkali.html", "Anarkali", page)}
              ${dropdownItem("bottom-wear.html", "Bottom Wear", page)}
              ${dropdownItem("pre-stitched-sarees.html", "Pre-Stitched Sarees", page)}
              ${dropdownItem("saree-petticoat-pico.html", "Saree Petticoat & Pico", page)}
              ${dropdownItem("women-gown.html", "Dress & Gown", page)}
              ${dropdownItem("women-refit.html", "Refit & Alterations", page)}
            </ul>
          </li>
          ${navLink("men.html", "Men", page)}
          <li class="has-dropdown">
            <a href="kids.html" class="drop-toggle${kidsActive ? " active" : ""}">Kids <span class="caret" aria-hidden="true">▾</span></a>
            <ul class="dropdown">
              ${dropdownItem("kids-frocks.html", "Frocks", page)}
              ${dropdownItem("kids-lehengas.html", "Lehengas", page)}
              ${dropdownItem("kids-skirts.html", "Skirts", page)}
            </ul>
          </li>
          ${navLink("how-it-works.html", "How It Works", page)}
          ${navLink("why-us.html", "Why Us", page)}
          ${navLink("blogs.html", "Blogs", page)}
          ${navLink("contact.html", "Contact", page)}
        </ul>
        <button class="theme-toggle" id="theme-toggle" aria-label="Switch to dark theme" title="Switch to dark theme">
          <svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8Z"></path>
          </svg>
          <svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path>
          </svg>
        </button>
      </nav>
    </div>
  `;
  header.innerHTML = html;
}

function socialLinksMarkup(cfg, showLabels = false) {
  const links = [
    ["Pinterest", cfg.pinterest, "fa-brands fa-pinterest-p"],
    ["Instagram", cfg.instagram, "fa-brands fa-instagram"],
    ["YouTube", cfg.youtube, "fa-brands fa-youtube"],
    ["Gmail", `mailto:${cfg.gmail}`, "fa-solid fa-envelope"]
  ];

  return links.map(([label, value, icon]) => {
    const href = value.startsWith("mailto:") || /^https?:\/\//i.test(value) ? value : `https://${value}`;
    const external = !href.startsWith("mailto:") ? ' target="_blank" rel="noopener"' : "";
    return `<a class="social-link" href="${href}" aria-label="${label}" title="${label}"${external}><i class="${icon}" aria-hidden="true"></i>${showLabels ? `<span>${label}</span>` : ""}</a>`;
  }).join("");
}

function renderFooter() {
  const cfg = window.SITE_CONFIG;
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  const html = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>${cfg.brand}</h3>
          <p>${cfg.tagline}</p>
          <p>${cfg.address}</p>
          <p><a href="tel:${cfg.phoneDisplay.replace(/\s/g, "")}">${cfg.phoneDisplay}</a></p>
          <div class="footer-social">
            <h4>Connect With Us</h4>
            <div class="social-links">${socialLinksMarkup(cfg)}</div>
          </div>
        </div>
        <div class="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="women.html">Women</a></li>
            <li><a href="men.html">Men</a></li>
            <li><a href="kids.html">Kids</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="blogs.html">Blogs</a></li>
          </ul>
        </div>
        <div class="footer-services">
          <h4>Services</h4>
          <ul>
            <li><a href="how-it-works.html">How It Works</a></li>
            <li><a href="why-us.html">Why Us</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-areas">
          <h4>Service Areas</h4>
          <p>${cfg.serviceAreas.join(", ")}</p>
          <a class="btn btn-primary" href="https://wa.me/${cfg.phone}?text=${encodeURIComponent(cfg.whatsappMessage)}" target="_blank" rel="noopener">Chat on WhatsApp</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; <span class="year"></span> ${cfg.brand}. All rights reserved.</p>
      </div>
    </div>
  `;
  footer.innerHTML = html;
}

function renderWhatsAppFloat() {
  const cfg = window.SITE_CONFIG;
  const existing = document.querySelector(".whatsapp-float");
  if (existing) return;
  const a = document.createElement("a");
  a.className = "whatsapp-float";
  a.href = `https://wa.me/${cfg.phone}?text=${encodeURIComponent(cfg.whatsappMessage)}`;
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", "Chat on WhatsApp");
  a.innerHTML = `<svg class="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.3-4.3a8.5 8.5 0 1 1 15.7-4.5Z"></path><path d="M8.3 7.6c.2-.4.4-.4.7-.4h.4c.1 0 .3 0 .4.3l.8 1.9c.1.2 0 .4-.1.6l-.6.7c-.2.2-.1.4 0 .6.7 1.2 1.6 2.1 2.8 2.8.2.1.4.2.6 0l.9-1c.2-.2.4-.2.6-.1l1.9.9c.2.1.3.3.3.5 0 .5-.2 1.5-1 2.1-.7.6-1.6.8-2.6.5-1.2-.4-2.7-1-4.2-2.4-1.2-1.2-2.1-2.6-2.6-3.8-.5-1.2-.1-2.5.4-3.2.4-.4.8-.6 1.3-.6Z"></path></svg>`;
  document.body.appendChild(a);
}

function renderSharedComponents() {
  renderHeader();
  renderFooter();
  renderWhatsAppFloat();
}

if (typeof window !== "undefined") {
  window.renderSharedComponents = renderSharedComponents;
  window.socialLinksMarkup = socialLinksMarkup;
  window.getPageKey = getPageKey;
}
