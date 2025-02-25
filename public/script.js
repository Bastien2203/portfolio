const diceIcon = document.getElementById('dice-icon');
const savedColor = localStorage.getItem('accent-color');

if (savedColor) {
    document.documentElement.style.setProperty('--accent-color', savedColor);
}

const colors = [
    '#ef4444', // Red-500
    '#f97316', // Orange-500
    '#f59e0b', // Amber-500
    '#eab308', // Yellow-500
    '#84cc16', // Lime-500
    '#22c55e', // Green-500
    '#10b981', // Emerald-500
    '#14b8a6', // Teal-500
    '#06b6d4', // Cyan-500
    '#0ea5e9', // Sky-500
    '#3b82f6', // Blue-500
    '#6366f1', // Indigo-500
    '#8b5cf6', // Violet-500
    '#a855f7', // Purple-500
    '#d946ef', // Fuchsia-500
    '#ec4899', // Pink-500
    '#f43f5e', // Rose-500
    '#64748b', // Slate-500
    '#6b7280', // Gray-500
    '#71717a'  // Zinc-500
];


function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

async function loadLanguage(lang) {
    const response = await fetch(`/lang/${lang}.json`);
    const translations = await response.json();
    
    document.documentElement.lang = lang;
    document.title = translations.meta.title;
    document.querySelector('meta[name="description"]').setAttribute('content', translations.meta.description);
    document.querySelector('meta[property="og:title"]').setAttribute('content', translations.meta.title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', translations.meta.description);
    document.querySelector('meta[property="og:locale"]').setAttribute('content', `${lang}_${lang.toUpperCase()}`);


    document.querySelectorAll('[data-translate]').forEach(el => {
        const keys = el.dataset.translate.split('.');
        let value = translations;
        keys.forEach(key => value = value[key]);
        el.textContent = value;
      });
  
    localStorage.setItem('lang', lang);
    document.querySelectorAll('.language-switcher button').forEach(btn => {
        btn.classList.toggle('current', btn.dataset.lang === lang);
    });
  }
  

document.querySelectorAll('.language-switcher button').forEach(btn => {
    btn.addEventListener('click', () => loadLanguage(btn.dataset.lang));
});

diceIcon.addEventListener('click', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    const randomColor = getRandomColor();
    document.documentElement.style.setProperty('--accent-color', randomColor);
    // in nav>ul shuffle li
    const navItems = document.querySelector("nav ul").children;
    const navItemsArray = Array.from(navItems);
    navItemsArray.sort(() => Math.random() - 0.5);
    navItemsArray.forEach((item) => {
        document.querySelector("nav ul").appendChild(item);
    });

    // in section>p shuffle span
    const sectionItems = document.querySelector("section p").children;
    const sectionItemsArray = Array.from(sectionItems);
    sectionItemsArray.sort(() => Math.random() - 0.5);
    sectionItemsArray.forEach((item) => {
        document.querySelector("section p").appendChild(item);
    });

    
    localStorage.setItem('accent-color', randomColor);
    
    // Add animation effect
    diceIcon.style.transform = 'rotate(360deg) scale(1.2)';
    setTimeout(() => {
        diceIcon.style.transform = '';
    }, 500);
});

const availableLangs = ['en', 'fr'];
const currentLang = localStorage.getItem('lang') || navigator.language.slice(0,2) || 'en';
if(availableLangs.includes(currentLang)){
    loadLanguage(currentLang);
} else {
    loadLanguage('en');
}
