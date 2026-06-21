const translations = {
    en: {
        "logo-sub": "LABS", "nav-home": "Home", "nav-games": "Game Studio", "nav-cyber": "Cyber Labs",
        "hero-title": "Innovating the Future of Gaming with AI",
        "hero-desc": "Merging artificial intelligence engineering with interactive gaming, secured by advanced cybersecurity solutions.",
        "hero-btn": "Explore Projects", "games-title": "Smart Gaming Studio 🎮",
        "card1-title": "Advanced AI Brains", "card1-desc": "Developing NPCs that learn from your playstyle and adapt to challenge you dynamically in real-time.",
        "card2-title": "Generative Worlds", "card2-desc": "Building procedural environments and levels that evolve infinitely using intelligent AI algorithms.",
        "cyber-badge": "Coming Soon", "cyber-title": "Cybersecurity Labs 🔒",
        "cyber-desc": "We are working behind the scenes to engineer smart vulnerability scanners and AI-powered defense tools to secure the digital frontier.",
        "footer-creators": "Founded by Hachem & Chahrazad"
    },
    fr: {
        "logo-sub": "LABS", "nav-home": "Accueil", "nav-games": "Studio de Jeux", "nav-cyber": "Cyber Labs",
        "hero-title": "Innover l'Avenir du Jeu avec l'IA",
        "hero-desc": "Fusionner l'ingénierie de l'intelligence artificielle avec le jeu interactif, sécurisé par des solutions de cybersécurité avancées.",
        "hero-btn": "Explorer les Projets", "games-title": "Studio de Jeux Intelligents 🎮",
        "card1-title": "Cerveaux IA Avancés", "card1-desc": "Développement de PNJ qui apprennent de votre style de jeu et s'adaptent pour vous défier dynamiquement en temps réel.",
        "card2-title": "Mondes Génératifs", "card2-desc": "Création d'environnements et de niveaux procéduraux qui évoluent à l'infini grâce à des algorithmes d'IA intelligents.",
        "cyber-badge": "Bientôt Disponible", "cyber-title": "Laboratoires de Cybersécurité 🔒",
        "cyber-desc": "Nous travaillons en coulisses pour concevoir des scanners de vulnérabilités intelligents et des outils de défense basés sur l'IA.",
        "footer-creators": "Fondé par Hachem & Chahrazad"
    },
    ar: {
        "logo-sub": "للمختبرات", "nav-home": "الرئيسية", "nav-games": "استوديو الألعاب", "nav-cyber": "المختبر السيبراني",
        "hero-title": "نبتكر مستقبل الألعاب بالذكاء الاصطناعي",
        "hero-desc": "دمج هندسة الذكاء الاصطناعي بالألعاب التفاعلية، وتأمينها بأحدث حلول الأمن السيبراني المتقدمة مستقبلاً.",
        "hero-btn": "استكشف مشاريعنا", "games-title": "استوديو الألعاب الذكية 🎮",
        "card1-title": "عقول اصطناعية متطورة", "card1-desc": "تطوير شخصيات داخل الألعاب (NPCs) تتعلم من أسلوب لعبك وتتحداك بشكل واقعي وديناميكي.",
        "card2-title": "عوالم توليدية", "card2-desc": "بناء بيئات ومراحل متغيرة تلقائياً وبشكل لانهائي باستخدام خوارزميات الذكاء الاصطناعي الذكية.",
        "cyber-badge": "قريباً", "cyber-title": "مختبرات الأمن السيبراني 🔒",
        "cyber-desc": "نعمل خلف الكواليس على تطوير أدوات فحص ثغرات ذكية وأنظمة دفاع مدعومة بالذكاء الاصطناعي لحماية الحدود الرقمية.",
        "footer-creators": "تأسست بواسطة هاشم وشهرزاد"
    }
};

// تحديد العناصر
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const currentLangLabel = document.getElementById('current-lang-label');
const langOptions = document.querySelectorAll('.lang-dropdown-menu li');
const navbar = document.getElementById('navbar');

let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark-theme';

// إعداد الحالة الأولية للموقع واختيارات المستخدم
document.body.className = currentTheme;
applyLanguage(currentLang);

// التبديل الفوري للثيم بالضغط
themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
        document.body.className = 'light-theme';
        localStorage.setItem('theme', 'light-theme');
    } else {
        document.body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme');
    }
});

// تفعيل الضغط الفوري لاختيارات قائمة اللغة
langOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedLang = option.getAttribute('data-lang');
        localStorage.setItem('lang', selectedLang);
        applyLanguage(selectedLang);
    });
});

// تطبيق اللغات والاتجاهات
function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    currentLangLabel.textContent = lang.toUpperCase();

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// الاختفاء والظهور التلقائي الذكي للشريط العلوي
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 80) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});