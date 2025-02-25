const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const lang = process.argv[2] || 'en';
const translations = JSON.parse(fs.readFileSync(path.join(__dirname, 'lang', `${lang}.json`), 'utf8'));
const templateFile = path.join(__dirname, 'dist', lang, 'index.html');
const outputFile = templateFile;

const html = fs.readFileSync(templateFile, 'utf8');
const dom = new JSDOM(html);
const { document } = dom.window;

// Mise à jour des métadonnées
document.documentElement.lang = lang;
document.title = translations.meta.title;
document.querySelector('meta[name="description"]').setAttribute('content', translations.meta.description);
document.querySelector('meta[property="og:url"]').setAttribute('content', `https://bastiengrisvard.com/${lang}`);
document.querySelector('meta[property="og:locale"]').setAttribute('content', lang === 'fr' ? 'fr_FR' : 'en_US');

// if a.hreflang = fr then a.class = current
document.querySelectorAll('a[hreflang]').forEach(a => {
  if (a.hreflang === lang) a.classList.add('current');
});

document.querySelectorAll('link[href], script[src], img[src]').forEach(el => {
  const attr = el.href ? 'href' : 'src';
  const value = el[attr];
  if (!value.startsWith('http') && !value.startsWith('/')) {
    el[attr] = `/${lang}/${value}`;
  }
});

document.querySelectorAll('[data-translate]').forEach(el => {
  const keys = el.dataset.translate.split('.');
  let value = translations;
  keys.forEach(key => value = value?.[key]);
  if (value) el.textContent = value;
});

fs.writeFileSync(outputFile, dom.serialize());