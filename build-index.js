const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const lang = process.argv[2] || 'en'; 
const translationFile = path.join(__dirname, 'lang', `${lang}.json`);
const templateFile = path.join(__dirname, 'dist', lang, 'index.html'); // fichier généré par Vite
const outputFile = templateFile;

const translations = JSON.parse(fs.readFileSync(translationFile, 'utf8'));
const html = fs.readFileSync(templateFile, 'utf8');
const dom = new JSDOM(html);
const { document } = dom.window;

document.documentElement.lang = lang;
document.title = translations.meta.title;
document.querySelector('meta[name="description"]').setAttribute('content', translations.meta.description);
document.querySelector('meta[name="keywords"]').setAttribute('content', translations.meta.keywords);
document.querySelector('meta[property="og:title"]').setAttribute('content', translations.meta.title);
document.querySelector('meta[property="og:description"]').setAttribute('content', translations.meta.description);
document.querySelector('meta[property="og:locale"]').setAttribute('content', lang);


document.querySelectorAll('[data-translate]').forEach(el => {
    const keys = el.dataset.translate.split('.');
    let value = translations;
    keys.forEach(key => value = value[key]);
    el.textContent = value;
});

fs.writeFileSync(outputFile, dom.serialize());
