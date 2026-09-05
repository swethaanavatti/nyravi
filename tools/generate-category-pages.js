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
const { CATEGORY_META } = sandbox.window;

const TEMPLATE = fs.readFileSync(path.join(__dirname, 'category-template.html'), 'utf8');

if (!CATEGORY_META) {
  console.error('Could not load CATEGORY_META');
  process.exit(1);
}

const generated = [];
Object.keys(CATEGORY_META).forEach((key) => {
  const info = CATEGORY_META[key];
  const page = TEMPLATE
    .replace(/{key}/g, key)
    .replace(/{title}/g, info.title)
    .replace(/{description}/g, info.description)
    .replace(/{image}/g, 'images/nyravi_logo.png');
  fs.writeFileSync(path.join(ROOT, `${key}.html`), page);
  generated.push(`${key}.html`);
});

console.log('Generated:', generated.join(', '));
