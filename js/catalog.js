function formatPrice(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function placeholderImage(width, height, text, bg, fg) {
  bg = bg || "F7F0E8";
  fg = fg || "5E2A2F";
  return `https://placehold.co/${width}x${height}/${bg}/${fg}?text=${encodeURIComponent(text)}`;
}

const CATEGORY_META = {
  blouses: {
    title: "Blouses",
    description: "Elegant, everyday and occasion-ready blouses stitched to your measurements.",
    parent: null,
    image: placeholderImage(800, 600, "Blouses", "D9A6A6", "5E2A2F")
  },
  women: {
    title: "Women's Ethnic Wear",
    description: "A curated collection of blouses, lehengas, kurtis, anarkalis, saree services and more — stitched for you.",
    parent: null,
    aggregate: true,
    subcategories: ["blouses", "lehengas", "kurtis", "anarkali", "bottom-wear", "pre-stitched-sarees", "saree-petticoat-pico", "women-gown", "women-refit"],
    image: placeholderImage(800, 600, "Women", "F7F0E8", "5E2A2F")
  },
  lehengas: {
    title: "Lehengas",
    description: "Twirl-ready lehenga sets crafted for weddings, festivals and celebrations.",
    parent: "women",
    image: placeholderImage(800, 600, "Lehengas", "D9A6A6", "5E2A2F")
  },
  kurtis: {
    title: "Kurtis",
    description: "Comfortable and chic kurtis for work, casual outings and festive wear.",
    parent: "women",
    image: placeholderImage(800, 600, "Kurtis", "F7F0E8", "5E2A2F")
  },
  anarkali: {
    title: "Anarkali",
    description: "Flowing anarkali suits with graceful silhouettes for every occasion.",
    parent: "women",
    image: placeholderImage(800, 600, "Anarkali", "F7F0E8", "5E2A2F")
  },
  "bottom-wear": {
    title: "Bottom Wear",
    description: "Palazzos, salwars, churidars and more, tailored for the perfect fit.",
    parent: "women",
    image: placeholderImage(800, 600, "Bottom Wear", "F7F0E8", "5E2A2F")
  },
  "pre-stitched-sarees": {
    title: "Pre-Stitched Sarees",
    description: "Ready-to-drape sarees that save time without compromising elegance.",
    parent: "women",
    image: placeholderImage(800, 600, "Pre-Stitched Sarees", "F7F0E8", "5E2A2F")
  },
  "saree-petticoat-pico": {
    title: "Saree Petticoat, Fall & Pico",
    description: "Petticoats, saree fall attaching and pico/roll polishing for a neat finish.",
    parent: "women",
    image: placeholderImage(800, 600, "Saree Services", "F7F0E8", "5E2A2F")
  },
  "women-gown": {
    title: "Women Dress & Gown Design",
    description: "Evening gowns, party dresses and Indo-western silhouettes designed to flatter.",
    parent: "women",
    image: placeholderImage(800, 600, "Gowns", "F7F0E8", "5E2A2F")
  },
  "women-refit": {
    title: "Refit & Alterations",
    description: "Quick and precise alterations and refits at your convenience.",
    parent: "women",
    image: placeholderImage(800, 600, "Alterations", "F7F0E8", "5E2A2F")
  },
  kids: {
    title: "Kids Ethnic Wear",
    description: "Adorable ethnic wear for little ones — frocks, lehengas and skirts.",
    parent: null,
    aggregate: true,
    subcategories: ["kids-frocks", "kids-lehengas", "kids-skirts"],
    image: placeholderImage(800, 600, "Kids", "F7F0E8", "5E2A2F")
  },
  "kids-frocks": {
    title: "Kids Frocks",
    description: "Comfortable and pretty frocks for everyday sparkle and special occasions.",
    parent: "kids",
    image: placeholderImage(800, 600, "Kids Frocks", "F7F0E8", "5E2A2F")
  },
  "kids-lehengas": {
    title: "Kids Lehengas",
    description: "Mini lehengas for festivals, weddings and celebrations.",
    parent: "kids",
    image: placeholderImage(800, 600, "Kids Lehengas", "F7F0E8", "5E2A2F")
  },
  "kids-skirts": {
    title: "Kids Skirts",
    description: "Pleated, circular and tiered skirts made for active little ones.",
    parent: "kids",
    image: placeholderImage(800, 600, "Kids Skirts", "F7F0E8", "5E2A2F")
  }
};

const BASE_DESIGNS = {
  blouses: [
    { name: "Classic Round Neck Blouse", base: 800 },
    { name: "Square Neck Blouse", base: 850 },
    { name: "V-Neck Blouse", base: 800 },
    { name: "High Neck Blouse", base: 900 },
    { name: "Halter Neck Blouse", base: 950 },
    { name: "Boat Neck Blouse", base: 850 },
    { name: "Off-Shoulder Blouse", base: 1000 },
    { name: "Full Sleeves Blouse", base: 950 },
    { name: "Back Open / Dori Blouse", base: 1000 },
    { name: "Front Open Shirt-Style Blouse", base: 1050 }
  ],
  lehengas: [
    { name: "Traditional Flared Lehenga", base: 2800 },
    { name: "A-Line Lehenga", base: 2600 },
    { name: "Panelled Lehenga", base: 3000 },
    { name: "Mermaid / Fishtail Lehenga", base: 3200 },
    { name: "Circular Lehenga", base: 2700 },
    { name: "Jacket Style Lehenga", base: 3500 },
    { name: "Indo-Western Lehenga", base: 3300 },
    { name: "Embroidered Lehenga", base: 3800 }
  ],
  kurtis: [
    { name: "Straight Kurti", base: 1100 },
    { name: "A-Line Kurti", base: 1200 },
    { name: "Anarkali Style Kurti", base: 1400 },
    { name: "High-Low Kurti", base: 1300 },
    { name: "Front Slit Kurti", base: 1350 },
    { name: "Shirt Style Kurti", base: 1250 },
    { name: "Floor Length Kurti", base: 1600 }
  ],
  anarkali: [
    { name: "Floor-Length Anarkali", base: 1900 },
    { name: "Layered Anarkali", base: 2100 },
    { name: "Jacket Style Anarkali", base: 2300 },
    { name: "Kalidar Anarkali", base: 2200 },
    { name: "Pakistani Anarkali", base: 2000 },
    { name: "Embroidered Anarkali", base: 2600 }
  ],
  "bottom-wear": [
    { name: "Palazzo Pants", base: 800 },
    { name: "Straight Pants", base: 700 },
    { name: "Salwar", base: 650 },
    { name: "Dhoti Pants", base: 900 },
    { name: "Churidar", base: 600 },
    { name: "Sharara", base: 1100 },
    { name: "Culottes", base: 850 }
  ],
  "pre-stitched-sarees": [
    { name: "Pre-Stitched Pleated Saree", base: 1600 },
    { name: "Pre-Stitched Dhoti Saree", base: 1800 },
    { name: "Pre-Stitched Lehenga Saree", base: 2200 },
    { name: "Ready-to-Wear Saree", base: 1700 }
  ],
  "saree-petticoat-pico": [
    { name: "Saree Petticoat", base: 500 },
    { name: "Saree Fall Attaching", base: 250 },
    { name: "Saree Pico / Roll Polishing", base: 200 },
    { name: "Full Saree Finishing Service", base: 700 }
  ],
  "women-gown": [
    { name: "Evening Gown", base: 2400 },
    { name: "Party Dress", base: 2200 },
    { name: "Ankle-Length Gown", base: 2600 },
    { name: "Indo-Western Gown", base: 2800 }
  ],
  "women-refit": [
    { name: "Waist Adjustment", base: 250 },
    { name: "Length Adjustment", base: 200 },
    { name: "Sleeve Adjustment", base: 200 },
    { name: "Side Seam Adjustment", base: 250 },
    { name: "Overall Refitting", base: 500 },
    { name: "Zipper Replacement", base: 150 }
  ],
  "kids-frocks": [
    { name: "A-Line Frock", base: 700 },
    { name: "Party Frock", base: 900 },
    { name: "Floral Frock", base: 750 },
    { name: "Tiered Frock", base: 850 },
    { name: "Anarkali Frock", base: 950 },
    { name: "High-Low Frock", base: 800 }
  ],
  "kids-lehengas": [
    { name: "Traditional Lehenga", base: 1300 },
    { name: "Crop Top Lehenga", base: 1200 },
    { name: "Jacket Lehenga", base: 1500 },
    { name: "Floral Lehenga", base: 1250 },
    { name: "Cape Lehenga", base: 1400 }
  ],
  "kids-skirts": [
    { name: "Pleated Skirt", base: 600 },
    { name: "Circular Skirt", base: 650 },
    { name: "A-Line Skirt", base: 600 },
    { name: "Tiered Skirt", base: 700 },
    { name: "Printed Skirt", base: 650 }
  ]
};

const TIERS = ["Basic", "Stylized", "Designer"];

function tierPrice(base, tier) {
  let multiplier = 1;
  if (tier === "Stylized") multiplier = 1.5;
  if (tier === "Designer") multiplier = 2.5;
  return Math.round((base * multiplier) / 10) * 10;
}

function getProductImage(category, designName, width, height) {
  return "images/hero-placeholder.svg";
}

function expandDesigns(categoryKey) {
  const designs = BASE_DESIGNS[categoryKey] || [];
  const products = [];
  designs.forEach((design, idx) => {
    TIERS.forEach((tier) => {
      const price = tierPrice(design.base, tier);
      products.push({
        id: `${categoryKey}-${idx}-${tier.toLowerCase()}`,
        category: categoryKey,
        name: `${design.name}`,
        tier: tier,
        price: price,
        priceLabel: `From ${formatPrice(price)}`,
        image: getProductImage(categoryKey, design.name)
      });
    });
  });
  return products;
}

function getProducts(pageKey) {
  const meta = CATEGORY_META[pageKey];
  if (!meta) return [];
  if (meta.aggregate && meta.subcategories) {
    const list = [];
    meta.subcategories.forEach((key) => {
      list.push(...expandDesigns(key));
    });
    return list;
  }
  return expandDesigns(pageKey);
}

function getSubcategories(pageKey) {
  const meta = CATEGORY_META[pageKey];
  if (!meta || !meta.subcategories) return [];
  return meta.subcategories.map((key) => ({
    key,
    ...CATEGORY_META[key]
  }));
}

if (typeof window !== "undefined") {
  window.CATEGORY_META = CATEGORY_META;
  window.BASE_DESIGNS = BASE_DESIGNS;
  window.getProducts = getProducts;
  window.getSubcategories = getSubcategories;
  window.TIERS = TIERS;
  window.placeholderImage = placeholderImage;
}
