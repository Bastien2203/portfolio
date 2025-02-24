const diceIcon = document.getElementById('dice-icon');
const savedColor = localStorage.getItem('accent-color');

if (savedColor) {
    document.documentElement.style.setProperty('--accent-color', savedColor);
}

const colors = [
    '#FF6B6B', '#4ECDC4', '#FFE66D', 
    '#8A2BE2', '#00FF88', '#FF007F',
    '#2A9D8F', '#FF4500', '#FFD700',
    '#FF6347', '#FF69B4', '#FF1493',
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

diceIcon.addEventListener('click', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    const randomColor = getRandomColor();
    document.documentElement.style.setProperty('--accent-color', randomColor);
    localStorage.setItem('accent-color', randomColor);
    
    // Add animation effect
    diceIcon.style.transform = 'rotate(360deg) scale(1.2)';
    setTimeout(() => {
        diceIcon.style.transform = '';
    }, 500);
});