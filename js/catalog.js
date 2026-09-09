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
    seoTitle: "Custom Blouse Stitching in Bengaluru | Nyravi",
    seoDescription: "Explore custom blouse stitching in Bengaluru, from round, square and boat necks to high-neck, halter, dori and designer blouse styles made to measure.",
    seoImage: "images/catalog/blouses/round_d3.jpg",
    parent: null,
    image: placeholderImage(800, 600, "Blouses", "D9A6A6", "5E2A2F")
  },
  women: {
    title: "Women's Ethnic Wear",
    description: "A curated collection of blouses, lehengas, kurtis, anarkalis, saree services and more — stitched for you.",
    seoTitle: "Women's Indian Ethnic Wear Bengaluru | Nyravi",
    seoDescription: "Discover custom women's Indian ethnic wear in Bengaluru, including blouses, lehengas, kurtis, Anarkali suits, pre-stitched sarees, gowns and alterations.",
    seoImage: "images/catalog/women/anarkali.jpg",
    parent: null,
    aggregate: true,
    subcategories: ["blouses", "lehengas", "kurtis", "anarkali", "bottom-wear", "pre-stitched-sarees", "saree-petticoat-pico", "women-gown", "women-refit"],
    image: placeholderImage(800, 600, "Women", "F7F0E8", "5E2A2F")
  },
  lehengas: {
    title: "Lehengas",
    description: "Twirl-ready lehenga sets crafted for weddings, festivals and celebrations.",
    seoTitle: "Bridal & Festive Lehenga Stitching | Nyravi",
    seoDescription: "Choose custom lehenga stitching for weddings and festivals in Bengaluru, with traditional flared, A-line, panelled, mermaid, jacket and Indo-western designs.",
    seoImage: "images/catalog/lehengas/traditional_lehenga.jpg",
    parent: "women",
    image: placeholderImage(800, 600, "Lehengas", "D9A6A6", "5E2A2F")
  },
  kurtis: {
    title: "Kurtis",
    description: "Comfortable and chic kurtis for work, casual outings and festive wear.",
    seoTitle: "Custom Kurti Stitching in Bengaluru | Nyravi",
    seoDescription: "Shop custom-stitched kurtis in Bengaluru, including straight, A-line, Anarkali, high-low, front-slit and shirt-style designs for daily and festive wear.",
    seoImage: "images/catalog/kurtis/aline_kurti.jpg",
    parent: "women",
    image: placeholderImage(800, 600, "Kurtis", "F7F0E8", "5E2A2F")
  },
  anarkali: {
    title: "Anarkali",
    description: "Flowing anarkali suits with graceful silhouettes for every occasion.",
    seoTitle: "Custom Anarkali Suit Stitching | Nyravi",
    seoDescription: "Explore custom Anarkali suit stitching in Bengaluru with floor-length, layered, jacket-style and embroidered designs tailored for festive and special occasions.",
    seoImage: "images/catalog/anarkali/embroidered_anarkali.jpg",
    parent: "women",
    image: placeholderImage(800, 600, "Anarkali", "F7F0E8", "5E2A2F")
  },
  "bottom-wear": {
    title: "Bottom Wear",
    description: "Palazzos, salwars, churidars and more, tailored for the perfect fit.",
    seoTitle: "Ethnic Bottom Wear Stitching | Nyravi",
    seoDescription: "Get women's ethnic bottom wear tailored in Bengaluru, including palazzo pants, salwars, churidars, dhoti pants, shararas, straight pants and culottes.",
    seoImage: "images/catalog/pants/palazzo_pants.jpg",
    parent: "women",
    image: placeholderImage(800, 600, "Bottom Wear", "F7F0E8", "5E2A2F")
  },
  "pre-stitched-sarees": {
    title: "Pre-Stitched Sarees",
    description: "Ready-to-drape sarees that save time without compromising elegance.",
    seoTitle: "Pre-Stitched Sarees in Bengaluru | Nyravi",
    seoDescription: "Discover ready-to-wear pre-stitched sarees in Bengaluru, including elegant pleated and dhoti saree drapes custom-fitted for effortless festive dressing.",
    seoImage: "images/catalog/prestitched_sarees/pleated_saree.jpg",
    parent: "women",
    image: placeholderImage(800, 600, "Pre-Stitched Sarees", "F7F0E8", "5E2A2F")
  },
  "saree-petticoat-pico": {
    title: "Saree Petticoat, Fall & Pico",
    description: "Petticoats, saree fall attaching and pico/roll polishing for a neat finish.",
    seoTitle: "Saree Fall, Pico & Petticoat Stitching | Nyravi",
    seoDescription: "Book saree petticoat stitching, fall attaching, pico or roll polishing and complete saree finishing services from Nyravi in Bengaluru.",
    seoImage: "images/catalog/otherwork/full_saree_finishing.jpg",
    parent: "women",
    image: placeholderImage(800, 600, "Saree Services", "F7F0E8", "5E2A2F")
  },
  "women-gown": {
    title: "Women Dress & Gown Design",
    description: "Evening gowns, party dresses and Indo-western silhouettes designed to flatter.",
    seoTitle: "Women's Dresses & Gowns Bengaluru | Nyravi",
    seoDescription: "Explore custom women's dresses and gowns in Bengaluru, from evening and party gowns to ankle-length and Indo-western designs stitched to flatter your fit.",
    seoImage: "images/catalog/gown/indo_western_gown.jpg",
    parent: "women",
    image: placeholderImage(800, 600, "Gowns", "F7F0E8", "5E2A2F")
  },
  "women-refit": {
    title: "Refit & Alterations",
    description: "Quick and precise alterations and refits at your convenience.",
    seoTitle: "Women's Dress Alterations Bengaluru | Nyravi",
    seoDescription: "Get women's dress alterations and refitting in Bengaluru, including waist, length, sleeve and side-seam adjustments, overall refits and zipper replacement.",
    seoImage: "images/other/then_and_there.jpg",
    parent: "women",
    image: "images/catalog/women-refit/alterations-refit.svg"
  },
  kids: {
    title: "Kids Ethnic Wear",
    description: "Adorable ethnic wear for little ones — frocks, lehengas and skirts.",
    seoTitle: "Kids Ethnic Wear in Bengaluru | Nyravi",
    seoDescription: "Explore custom kids ethnic wear in Bengaluru, including A-line and party frocks, traditional and crop-top lehengas, and circular, pleated and tiered skirts.",
    seoImage: "images/catalog/kids_lehengas/crop_top_lehenga.jpeg",
    parent: null,
    aggregate: true,
    subcategories: ["kids-frocks", "kids-lehengas", "kids-skirts"],
    image: placeholderImage(800, 600, "Kids", "F7F0E8", "5E2A2F")
  },
  "kids-frocks": {
    title: "Kids Frocks",
    description: "Comfortable and pretty frocks for everyday sparkle and special occasions.",
    seoTitle: "Kids Frock Stitching in Bengaluru | Nyravi",
    seoDescription: "Choose custom kids frock stitching in Bengaluru with A-line, party, floral, tiered, Anarkali and high-low styles for celebrations and everyday wear.",
    seoImage: "images/catalog/kids_frocks/party_frock.jpeg",
    parent: "kids",
    image: placeholderImage(800, 600, "Kids Frocks", "F7F0E8", "5E2A2F")
  },
  "kids-lehengas": {
    title: "Kids Lehengas",
    description: "Mini lehengas for festivals, weddings and celebrations.",
    seoTitle: "Kids Lehenga Stitching in Bengaluru | Nyravi",
    seoDescription: "Explore custom kids lehengas in Bengaluru, including traditional, crop-top, jacket, floral and cape styles stitched for weddings, festivals and celebrations.",
    seoImage: "images/catalog/kids_lehengas/traditional_lehenga.jpeg",
    parent: "kids",
    image: placeholderImage(800, 600, "Kids Lehengas", "F7F0E8", "5E2A2F")
  },
  "kids-skirts": {
    title: "Kids Skirts",
    description: "Pleated, circular and tiered skirts made for active little ones.",
    seoTitle: "Kids Skirt Stitching in Bengaluru | Nyravi",
    seoDescription: "Find custom kids skirt stitching in Bengaluru with comfortable A-line, circular, pleated and tiered designs made for festive occasions and active little ones.",
    seoImage: "images/catalog/kids_skirt/pleated_skirt.jpeg",
    parent: "kids",
    image: placeholderImage(800, 600, "Kids Skirts", "F7F0E8", "5E2A2F")
  },
  men: {
    title: "Men's Tailoring",
    description: "Custom shirts, trousers and kurtas tailored for a sharp, comfortable fit.",
    seoTitle: "Men's Kurta Stitching in Bengaluru | Nyravi",
    seoDescription: "Explore men's custom kurta stitching in Bengaluru, including straight-cut, A-line, Pathani, Mandarin collar, festive, short kurta and kurta-dhoti styles.",
    seoImage: "images/catalog/men/festive_kurta.jpeg",
    parent: null,
    image: placeholderImage(800, 600, "Men's Tailoring", "F7F0E8", "5E2A2F")
  }
};

const BASE_DESIGNS = {
  blouses: [
    { name: "Classic Round Neck Blouse", basic: 850, styled: 1700, designer: 2800,
      images: [ "images/catalog/blouses/round_d3.jpg",
                "images/catalog/blouses/round_d1.jpg",
                "images/catalog/blouses/round_d2.jpg"
       ]
    },
    { name: "Square Neck Blouse", basic: 850, styled: 1700, designer: 2800,
      images: [ "images/catalog/blouses/square_d1.jpg",
                "images/catalog/blouses/square_d2.jpg"
       ]
     },
    { name: "V-Neck Blouse", basic: 850, styled: 1700, designer: 2800,
      images: ["images/catalog/blouses/vneck_d1.jpg"]
     },
    { name: "High Neck Blouse", styled: 1700, designer: 2800,
      images: [ "images/catalog/blouses/highneck_d1.jpg",
                "images/catalog/blouses/highneck_d2.jpg"
       ]
    },
    { name: "Halter Neck Blouse", styled: 1700, designer: 2800,
      images: [ "images/catalog/blouses/halterneck_d2.jpg",
                "images/catalog/blouses/halterneck_d2.jpg"
       ]
    },
    { name: "Boat Neck Blouse", styled: 1700, designer: 2800,
      images: [ "images/catalog/blouses/boat_d1.jpg",
                "images/catalog/blouses/boat_d2.jpg",
                "images/catalog/blouses/boat_d3.jpg"
       ]
    },
    {
      name: "Sweetheart Neck Blouse",
      styled: 1700,
      designer: 2800,
      images: [
        "images/catalog/blouses/sweetheart_d1.jpg",
        "images/catalog/blouses/sweetheart_d2.jpg"
      ]
    },
    { name: "Off-Shoulder Blouse", styled: 1700, designer: 2800,
      images: [ "images/catalog/blouses/off_shoulder_d1.jpg"
       ]
    },
    { name: "Full Sleeves Blouse", styled: 1700, designer: 2300,
      images: [ "images/catalog/blouses/fullsleeves_d1.jpg"
       ]
    },
    { name: "Back Open / Dori Blouse", styled: 1700, designer: 2800,
      images: [ "images/catalog/blouses_back_design/d2.jpg",
                "images/catalog/blouses_back_design/d7.jpg",
                "images/catalog/blouses_back_design/d6.jpg"
       ]
    },
    { name: "Front Open Shirt-Style Blouse", designer: 3100,
      images :[
        "images/catalog/blouses/front_openshirt.jpg"
      ]
     }
  ],
  lehengas: [
    { name: "Traditional Flared Lehenga", basic: 2000, styled: 3300, designer: 5500,
      images: ["images/catalog/lehengas/traditional_lehenga.jpg"]
    },
    { name: "A-Line Lehenga", basic: 2000, styled: 3300, designer: 5500,
      images: ["images/catalog/lehengas/a_line_lehenga.jpg"]
    },
    { name: "Panelled Lehenga", basic: 2000, styled: 3300, designer: 5500,
      images: ["images/catalog/lehengas/panelled_lehenga.jpg"]
    },
    { name: "Mermaid / Fishtail Lehenga", designer: 6600,
      images: ["images/catalog/lehengas/mermaid_lehenga.jpg"]
    },
    { name: "Circular Lehenga", styled: 4180, designer: 5500,
      images: ["images/catalog/lehengas/circular_lehenga.jpg"]
    },
    { name: "Jacket Style Lehenga", designer: 8300,
      images: ["images/catalog/lehengas/jacket_lehenga.jpg"]
    },
    { name: "Indo-Western Lehenga", designer: 5500,
      images: ["images/catalog/lehengas/indo_western_lehenga.jpg"]
    },
    { name: "Embroidered Lehenga", designer: 5500,
      images: ["images/catalog/lehengas/embroidary_lehenga.jpg"]
    }
  ],
  kurtis: [
    { name: "Straight Kurti", basic: 1400, designer: 2000, images: ["images/catalog/kurtis/straight_kurti.jpg"] },
    { name: "A-Line Kurti", basic: 1400, designer: 2000, images: ["images/catalog/kurtis/aline_kurti.jpg"] },
    { name: "Anarkali Style Kurti", basic: 1400, designer: 2000, images: ["images/catalog/kurtis/anarkali_kurti.jpg"] },
    { name: "High-Low Kurti", designer: 2800, images: ["images/catalog/kurtis/highlow_kurti.jpg"] },
    { name: "Front Slit Kurti", basic: 1400, designer: 2300, images: ["images/catalog/kurtis/front_slit_kurti.jpg"] },
    { name: "Shirt Style Kurti", basic: 2000, images: ["images/catalog/kurtis/shirt_style_kurti.jpg"] }
  ],
  anarkali: [
    { name: "Floor-Length Anarkali", designer: 2800, images: ["images/catalog/anarkali/floor_length_anarkali.jpg"] },
    { name: "Layered Anarkali", designer: 2800, images: ["images/catalog/anarkali/layered_anarkali.jpg"] },
    { name: "Jacket Style Anarkali", designer: 3300, images: ["images/catalog/anarkali/jacket_anarkali.jpg"] },
    { name: "Embroidered Anarkali", designer: 11000, images: ["images/catalog/anarkali/embroidered_anarkali.jpg"] }
  ],
  "bottom-wear": [
    { name: "Palazzo Pants", basic: 700, styled: 1300, images: ["images/catalog/pants/palazzo_pants.jpg"] },
    { name: "Straight Pants", basic: 700, images: ["images/catalog/pants/straight_pants.jpg"] },
    { name: "Salwar", basic: 700, images: ["images/catalog/pants/salwar.jpg"] },
    { name: "Dhoti Pants", basic: 1050, images: ["images/catalog/pants/dhoti_pants.jpg"] },
    { name: "Churidar", basic: 700, images: ["images/catalog/pants/churidar.jpg"] },
    { name: "Sharara", basic: 1300, images: ["images/catalog/pants/sharara_pants.jpg"] },
    { name: "Culottes", basic: 1300, images: ["images/catalog/pants/culottes.jpg"] }
  ],
  "pre-stitched-sarees": [
    { name: "Pre-Stitched Pleated Saree", basic: 1050, images: ["images/catalog/prestitched_sarees/pleated_saree.jpg"] },
    { name: "Pre-Stitched Dhoti Saree", basic: 1700, images: ["images/catalog/prestitched_sarees/dhoti_saree.jpg"] }
  ],

  "saree-petticoat-pico": [
    { name: "Saree Petticoat", basic: 950, styled: 1300, images: ["images/catalog/otherwork/petticoat.jpg"] },
    { name: "Saree Fall Attaching", basic: 250, images: ["images/catalog/otherwork/sareefall.jpg"] },
    { name: "Saree Pico / Roll Polishing", basic: 200, images: ["images/catalog/otherwork/roll_polishing.jpeg"] },
    { name: "Full Saree Finishing Service", basic: 300, images: ["images/catalog/otherwork/full_saree_finishing.jpg"] }
  ],
  "women-gown": [
    { name: "Evening Gown", basic: 2800, styled: 3800, images: ["images/catalog/gown/evening_gown.jpg"] },
    { name: "Party Dress", styled: 5500, images: ["images/catalog/gown/party_dress.jpg"] },
    { name: "Ankle-Length Gown", styled: 3800, images: ["images/catalog/gown/ankle_length_gown.jpg"] },
    { name: "Indo-Western Gown", styled: 5500, images: ["images/catalog/gown/indo_western_gown.jpg"] }
  ],

  "women-refit": [
    { name: "Waist Adjustment", basic: 150, images: ["images/catalog/women-refit/alterations-refit.svg"] },
    { name: "Length Adjustment", basic: 200, images: ["images/catalog/women-refit/alterations-refit.svg"] },
    { name: "Sleeve Adjustment", basic: 200, images: ["images/catalog/women-refit/alterations-refit.svg"] },
    { name: "Side Seam Adjustment", basic: 200, images: ["images/catalog/women-refit/alterations-refit.svg"] },
    { name: "Overall Refitting", basic: 400, images: ["images/catalog/women-refit/alterations-refit.svg"] },
    { name: "Zipper Replacement", basic: 200, images: ["images/catalog/women-refit/alterations-refit.svg"] }
  ],

  "kids-frocks": [
    { name: "A-Line Frock", basic: 900, designer: 2000, images: ["images/catalog/kids_frocks/a_line_frock.jpeg"] },
    { name: "Party Frock", designer: 2300, images: ["images/catalog/kids_frocks/party_frock.jpeg"] },
    { name: "Floral Frock", designer: 1700, images: ["images/catalog/kids_frocks/floral_frock.jpeg"] },
    { name: "Tiered Frock", designer: 2000, images: ["images/catalog/kids_frocks/tiered_frock.jpeg"] },
    { name: "Anarkali Frock", designer: 2000, images: ["images/catalog/kids_frocks/anarkali_frock.jpeg"] },
    { name: "High-Low Frock", designer: 1400, images: ["images/catalog/kids_frocks/high_low_frock.jpeg"] }
  ],

  "kids-lehengas": [
    { name: "Traditional Lehenga", designer: 1700, images: ["images/catalog/kids_lehengas/traditional_lehenga.jpeg"] },
    { name: "Crop Top Lehenga", designer: 1700, images: ["images/catalog/kids_lehengas/crop_top_lehenga.jpeg"] },
    { name: "Jacket Lehenga", designer: 2000, images: ["images/catalog/kids_lehengas/jacket_lehenga.jpeg"] },
    { name: "Floral Lehenga", designer: 2300, images: ["images/catalog/kids_lehengas/floral_lehenga.jpeg"] },
    { name: "Cape Lehenga", designer: 2800, images: ["images/catalog/kids_lehengas/cape_lehenga.jpeg"] }
  ],

  "kids-skirts": [
    { name: "A-Line Skirt", designer: 2000, images: ["images/catalog/kids_skirt/a_line_skirt.jpeg"] },
    { name: "Circular Skirt", designer: 2000, images: ["images/catalog/kids_skirt/circular_skirt.jpeg"] },
    { name: "Pleated Skirt", designer: 2000, images: ["images/catalog/kids_skirt/pleated_skirt.jpeg"] },
    { name: "Tiered Skirt", designer: 2800, images: ["images/catalog/kids_skirt/tiered_skirt.jpeg"] }
  ],
  men: [
    { name: "Straight Cut Kurta", basic: 3800, designer: 5500, images: ["images/catalog/men/straight_cut_kurta.jpeg"] },
    { name: "A-Line Kurta", basic: 3800, designer: 5500, images: ["images/catalog/men/a_line_kurta.jpeg"] },
    { name: "Pathani Kurta", basic: 3800, designer: 5500, images: ["images/catalog/men/pathani_kurta.jpeg"] },
    { name: "Mandarin Collar Kurta", basic: 3800, designer: 5500, images: ["images/catalog/men/mandarin_collar_kurta.jpeg"] },
    { name: "Festive Kurta", designer: 5500, images: ["images/catalog/men/festive_kurta.jpeg"] },
    { name: "Short Kurta", basic: 3800, designer: 5500, images: ["images/catalog/men/short_kurta.jpeg"] },
    { name: "Kurta Dhoti Set", basic: 4400, designer: 5500, images: ["images/catalog/men/kurta_dhoti_set.jpeg"] }
  ]
};

const GALLERY_IMAGES = Array.from(new Map(
  Object.values(BASE_DESIGNS)
    .flatMap((designs) => designs.flatMap((design) =>
      (design.images || []).map((src) => [src, { src, alt: design.name }])
    ))
    .filter(([src]) => src.startsWith("images/catalog/"))
).values());

function solidColorPlaceholder(color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="#${color}"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function getDesignImages(design, index) {
  if (Array.isArray(design.images) && design.images.length) return design.images;
  if (design.image) return [design.image];
  const colors = ["F7F0E8", "D9A6A6", "C9A24B", "E9D7C3"];
  return [solidColorPlaceholder(colors[index % colors.length])];
}

function expandDesigns(categoryKey) {
  return (BASE_DESIGNS[categoryKey] || []).map((design, index) => {
    const images = getDesignImages(design, index);
    const priceOptions = [
      { label: "Basic", value: design.basic },
      { label: "Styled", value: design.styled },
      { label: "Designer", value: design.designer }
    ].filter((option) => option.value != null);
    const firstPrice = priceOptions[0];
    return {
      id: `${categoryKey}-${index}`,
      category: categoryKey,
      name: design.name,
      price: firstPrice.value,
      priceTier: firstPrice.label,
      priceOptions,
      priceLabel: priceOptions.map((option) => `${option.label}: ${formatPrice(option.value)}`).join(", "),
      images: images,
      image: images[0]
    };
  });
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

if (typeof window !== "undefined") {
  window.CATEGORY_META = CATEGORY_META;
  window.BASE_DESIGNS = BASE_DESIGNS;
  window.GALLERY_IMAGES = GALLERY_IMAGES;
  window.getProducts = getProducts;
  window.getDesignImages = getDesignImages;
  window.placeholderImage = placeholderImage;
}
