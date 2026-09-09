#!/usr/bin/env node
// One-time generator that stamps category page shells from a template.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CATALOG = path.join(ROOT, 'js', 'catalog.js');
const CONFIG = path.join(ROOT, 'js', 'config.js');

// Make catalog.js attach to a global window object
const sandbox = { window: {} };
const vm = require('vm');
const ctx = vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(CONFIG, 'utf8'), ctx);
vm.runInContext(fs.readFileSync(CATALOG, 'utf8'), ctx);
const { CATEGORY_META, BASE_DESIGNS, SITE_CONFIG } = sandbox.window;

const TEMPLATE = fs.readFileSync(path.join(__dirname, 'category-template.html'), 'utf8');

if (!CATEGORY_META || !BASE_DESIGNS || !SITE_CONFIG) {
  console.error('Could not load category or site metadata');
  process.exit(1);
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function categoryDesigns(key, info) {
  const keys = info.aggregate ? info.subcategories : [key];
  return keys.flatMap((category) => (BASE_DESIGNS[category] || []).map((design) => design.name));
}

function structuredData(key, info, canonical, seoImage) {
  const breadcrumbItems = [{ name: 'Home', item: `${SITE_CONFIG.siteUrl}/` }];
  if (info.parent) {
    breadcrumbItems.push({
      name: CATEGORY_META[info.parent].title,
      item: `${SITE_CONFIG.siteUrl}/${info.parent}.html`
    });
  }
  breadcrumbItems.push({ name: info.title, item: canonical });
  const designs = categoryDesigns(key, info);
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: info.seoTitle,
        description: info.seoDescription,
        isPartOf: { '@id': `${SITE_CONFIG.siteUrl}/#website` },
        primaryImageOfPage: { '@type': 'ImageObject', url: seoImage },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
        mainEntity: { '@id': `${canonical}#catalog` }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: breadcrumbItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.item
        }))
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#catalog`,
        name: `${info.title} designs`,
        numberOfItems: designs.length,
        itemListElement: designs.map((name, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: name
        }))
      }
    ]
  }).replaceAll('<', '\\u003c');
}

const generated = [];
Object.keys(CATEGORY_META).forEach((key) => {
  const info = CATEGORY_META[key];
  const canonical = `${SITE_CONFIG.siteUrl}/${key}.html`;
  const seoImage = `${SITE_CONFIG.siteUrl}/${info.seoImage}`;
  const replacements = {
    key,
    title: info.title,
    description: info.description,
    image: 'images/nyravi_logo.png',
    seoTitle: info.seoTitle,
    seoDescription: info.seoDescription,
    canonical,
    seoImage,
    structuredData: structuredData(key, info, canonical, seoImage)
  };
  const page = Object.entries(replacements).reduce(
    (output, [name, value]) => output.replaceAll(`{${name}}`, name === 'structuredData' ? value : escapeHtml(value)),
    TEMPLATE
  );
  fs.writeFileSync(path.join(ROOT, `${key}.html`), page);
  generated.push(`${key}.html`);
});

console.log('Generated:', generated.join(', '));
