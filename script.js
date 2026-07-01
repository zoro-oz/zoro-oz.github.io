const translations = {
    en: {
        "nav-home": "Home", "nav-games": "Game Studio", "nav-updates": "Updates", "nav-cyber": "Cyber Labs",
        "hero-title": "Innovating the Future of Gaming with AI",
        "hero-desc": "Merging artificial intelligence engineering with interactive gaming, secured by advanced cybersecurity solutions.",
        "hero-btn": "Explore Projects", "games-title": "Smart Gaming Studio 🎮",
        "card1-title": "Advanced AI Brains", "card1-desc": "Developing NPCs that learn from your playstyle and adapt to challenge you dynamically in real-time.",
        "card2-title": "Generative Worlds", "card2-desc": "Building procedural environments and levels that evolve infinitely using intelligent AI algorithms.",
        "cyber-badge": "Coming Soon", "cyber-title": "Cybersecurity Labs 🔒",
        "cyber-desc": "We are working behind the scenes to engineer smart vulnerability scanners and AI-powered defense tools to secure the digital frontier.",
        "footer-creators": "Founded by Hachem & Chahrazad", "section-updates-title": "Latest News & Releases"
    },
    fr: {
        "nav-home": "Accueil", "nav-games": "Studio de Jeux", "nav-updates": "Mises à jour", "nav-cyber": "Cyber Labs",
        "hero-title": "Innover l'Avenir du Jeu avec l'IA",
        "hero-desc": "Fusionner l'ingénierie de l'intelligence artificielle avec le jeu interactif, sécurisé par des solutions de cybersécurité avancées.",
        "hero-btn": "Explorer les Projets", "games-title": "Studio de Jeux Intelligents 🎮",
        "card1-title": "Cerveaux IA Avancés", "card1-desc": "Développement de PNJ qui apprennent de votre style de jeu et s'adaptent pour vous défier dynamiquement en temps réel.",
        "card2-title": "Mondes Génératifs", "card2-desc": "Création d'environnements et de niveaux procéduraux qui évoluent à l'infini grâce à des algorithmes d'IA intelligents.",
        "cyber-badge": "Bientôt Disponible", "cyber-title": "Laboratoires de Cybersécurité 🔒",
        "cyber-desc": "Nous travaillons en coulisses pour concevoir des scanners de vulnérabilités intelligents et des outils de défense basés sur l'IA.",
        "footer-creators": "Fondé par Hachem & Chahrazad", "section-updates-title": "Actualités & Réalisations"
    },
    ar: {
        "nav-home": "الرئيسية", "nav-games": "استوديو الألعاب", "nav-updates": "التحديثات", "nav-cyber": "المختبر السيبراني",
        "hero-title": "نبتكر مستقبل الألعاب بالذكاء الاصطناعي",
        "hero-desc": "دمج هندسة الذكاء الاصطناعي بالألعاب التفاعلية، وتأمينها بأحدث حلول الأمن السيبراني المتقدمة مستقبلاً.",
        "hero-btn": "استكشف مشاريعنا", "games-title": "استوديو الألعاب الذكية 🎮",
        "card1-title": "عقول اصطناعية متطورة", "card1-desc": "تطوير شخصيات داخل الألعاب (NPCs) تتعلم من أسلوب لعبك وتتحداك بشكل واقعي وديناميكي.",
        "card2-title": "عوالم توليدية", "card2-desc": "بناء بيئات ومراحل متغيرة تلقائياً وبشكل لانهائي باستخدام خوارزميات الذكاء الاصطناعي الذكية.",
        "cyber-badge": "قريباً", "cyber-title": "مختبرات الأمن السيبراني 🔒",
        "cyber-desc": "نعمل خلف الكواليس على تطوير أدوات فحص ثغرات ذكية وأنظمة دفاع مدعومة بالذكاء الاصطناعي لحماية الحدود الرقمية.",
        "footer-creators": "تأسست بواسطة هاشم وشهرزاد", "section-updates-title": "آخر الأخبار والإصدارات"
    }
};

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const currentLangLabel = document.getElementById('current-lang-label');
const langOptions = document.querySelectorAll('.lang-dropdown-menu li');
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const updatesContainer = document.getElementById('updates-container');

let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark-theme';

document.body.className = currentTheme;
applyLanguage(currentLang);

menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'));

themeToggleBtn.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
    document.body.className = nextTheme;
    localStorage.setItem('theme', nextTheme);
});

langOptions.forEach(option => {
    option.addEventListener('click', () => {
        currentLang = option.getAttribute('data-lang');
        localStorage.setItem('lang', currentLang);
        applyLanguage(currentLang);
    });
});

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    currentLangLabel.textContent = lang.toUpperCase();
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
}

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 80) navbar.classList.add('nav-hidden');
    else navbar.classList.remove('nav-hidden');
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

function renderContentFromDB() {
    updatesContainer.innerHTML = "";
    let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];
    if(!currentData.length) { 
        updatesContainer.innerHTML = `<p style="opacity:0.4; grid-column:1/-1;">No packages deployed yet.</p>`; 
        return; 
    }
    currentData.forEach(i => { 
        updatesContainer.innerHTML += `
            <div class="card glass-card animate-fade-in">
                <span class="cyber-badge" style="margin-bottom:10px; font-size:11px;">${i.type}</span>
                <h3>${i.title}</h3>
                <p>${i.desc}</p>
                ${i.fileAttached ? `<div class="nav-bubble-wrapper margin-top" style="font-size:11px; width:100%; cursor:default;">📦 Asset: ${i.fileAttached}</div>` : ''}
            </div>`; 
    });
}

renderContentFromDB();
