#!/usr/bin/env python3
"""One-time generator that stamps category page shells from a template."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / "js" / "catalog.js"
TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Nyravi Boutique</title>
  <meta name="description" content="{description}">
  <link rel="icon" href="images/favicon.ico">
  <link rel="stylesheet" href="css/main.css">
</head>
<body data-page="{key}">
  <header id="site-header"></header>
  <main>
    <section class="page-hero">
      <div class="page-hero-bg" style="background-image:url('{image}')"></div>
      <div class="page-hero-content">
        <h1 id="category-title">{title}</h1>
        <p id="category-description">{description}</p>
      </div>
    </section>
    <section class="category-main">
      <div class="container">
        <div id="subcategory-grid" class="subcategory-grid"></div>
        <div class="category-intro">
          <h2>Choose your style</h2>
          <p>Browse our designs, pick your tier and order directly on WhatsApp.</p>
        </div>
        <div id="tier-tabs" class="tier-tabs"></div>
        <div id="product-grid" class="product-grid"></div>
      </div>
    </section>
  </main>
  <footer id="site-footer"></footer>
  <script src="js/config.js"></script>
  <script src="js/catalog.js"></script>
  <script src="js/components.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
"""

def parse_meta_js(path):
    """Very small parser: extracts CATEGORY_META object from the catalog file."""
    text = path.read_text()
    start = text.find("const CATEGORY_META = {")
    if start == -1:
        raise ValueError("CATEGORY_META not found")
    brace = start + len("const CATEGORY_META = ")
    end = text.find("};", brace)
    obj_text = text[brace:end + 1]
    # Replace placeholderImage(...) calls with a dummy URL string so JSON can parse
    import re
    obj_text = re.sub(r'placeholderImage\([^)]*\)', '""', obj_text)
    # Remove trailing commas that may precede closing braces/brackets
    obj_text = re.sub(r',(\s*[}\]])', r'\1', obj_text)
    return json.loads(obj_text)

if __name__ == "__main__":
    meta = parse_meta_js(CATALOG)
    generated = []
    for key, info in meta.items():
        image = "images/nyravi_logo.png"  # will be replaced by JS; keep fallback
        page = TEMPLATE.format(
            key=key,
            title=info.get("title", key),
            description=info.get("description", ""),
            image=image,
        )
        out = ROOT / f"{key}.html"
        out.write_text(page)
        generated.append(out.name)
    print("Generated:", generated)
