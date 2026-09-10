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
  a.innerHTML = `<svg class="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
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
