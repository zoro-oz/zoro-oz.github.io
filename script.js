const translations = {
    en: {
        "logo-sub": "LABS", "nav-home": "Home", "nav-games": "Game Studio", "nav-cyber": "Cyber Labs", "nav-updates": "Updates",
        "hero-title": "Innovating the Future of Gaming with AI",
        "hero-desc": "Merging artificial intelligence engineering with interactive gaming, secured by advanced cybersecurity solutions.",
        "hero-btn": "Explore Projects", "games-title": "Smart Gaming Studio 🎮",
        "card1-title": "Advanced AI Brains", "card1-desc": "Developing NPCs that learn from your playstyle and adapt to challenge you dynamically in real-time.",
        "card2-title": "Generative Worlds", "card2-desc": "Building procedural environments and levels that evolve infinitely using intelligent AI algorithms.",
        "cyber-badge": "Coming Soon", "cyber-title": "Cybersecurity Labs 🔒",
        "cyber-desc": "We are working behind the scenes to engineer smart vulnerability scanners and AI-powered defense tools to secure the digital frontier.",
        "footer-creators": "Founded by Hachem & Chahrazad", "section-updates-title": "Latest News & Achievements",
        "admin-title": "Control Center", "admin-login-head": "Secure Admin Access", "admin-login-btn": "Login", "admin-panel-head": "Publish New Content"
    },
    fr: {
        "logo-sub": "LABS", "nav-home": "Accueil", "nav-games": "Studio de Jeux", "nav-cyber": "Cyber Labs", "nav-updates": "Mises à jour",
        "hero-title": "Innover l'Avenir du Jeu avec l'IA",
        "hero-desc": "Fusionner l'ingénierie de l'intelligence artificielle avec le jeu interactif, sécurisé par des solutions de cybersécurité avancées.",
        "hero-btn": "Explorer les Projets", "games-title": "Studio de Jeux Intelligents 🎮",
        "card1-title": "Cerveaux IA Avancés", "card1-desc": "Développement de PNJ qui apprennent de votre style de jeu et s'adaptent pour vous défier dynamiquement en temps réel.",
        "card2-title": "Mondes Génératifs", "card2-desc": "Création d'environnements et de niveaux procéduraux qui évoluent à l'infini grâce à des algorithmes d'IA intelligents.",
        "cyber-badge": "Bientôt Disponible", "cyber-title": "Laboratoires de Cybersécurité 🔒",
        "cyber-desc": "Nous travaillons en coulisses pour concevoir des scanners de vulnérabilités intelligents et des outils de défense basés sur l'IA.",
        "footer-creators": "Fondé par Hachem & Chahrazad", "section-updates-title": "Actualités & Réalisations",
        "admin-title": "Centre de Contrôle", "admin-login-head": "Accès Administrateur Sécurisé", "admin-login-btn": "Connexion", "admin-panel-head": "Publier un Nouveau Contenu"
    },
    ar: {
        "logo-sub": "للمختبرات", "nav-home": "الرئيسية", "nav-games": "استوديو الألعاب", "nav-cyber": "المختبر السيبراني", "nav-updates": "آخر التحديثات",
        "hero-title": "نبتكر مستقبل الألعاب بالذكاء الاصطناعي",
        "hero-desc": "دمج هندسة الذكاء الاصطناعي بالألعاب التفاعلية، وتأمينها بأحدث حلول الأمن السيبراني المتقدمة مستقبلاً.",
        "hero-btn": "استكشف مشاريعنا", "games-title": "استوديو الألعاب الذكية 🎮",
        "card1-title": "عقول اصطناعية متطورة", "card1-desc": "تطوير شخصيات داخل الألعاب (NPCs) تتعلم من أسلوب لعبك وتتحداك بشكل واقعي وديناميكي.",
        "card2-title": "عوالم توليدية", "card2-desc": "بناء بيئات ومراحل متغيرة تلقائياً وبشكل لانهائي باستخدام خوارزميات الذكاء الاصطناعي الذكية.",
        "cyber-badge": "قريباً", "cyber-title": "مختبرات الأمن السيبراني 🔒",
        "cyber-desc": "نعمل خلف الكواليس على تطوير أدوات فحص ثغرات ذكية وأنظمة دفاع مدعومة بالذكاء الاصطناعي لحماية الحدود الرقمية.",
        "footer-creators": "تأسست بواسطة هاشم وشهرزاد", "section-updates-title": "آخر الأخبار والإنجازات",
        "admin-title": "مركز التحكم", "admin-login-head": "دخول آمن للمشرفين", "admin-login-btn": "تسجيل الدخول", "admin-panel-head": "نشر محتوى جديد"
    }
};

// إدارة عناصر واجهة المستخدم وشريط التنقل والتجاوب
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const currentLangLabel = document.getElementById('current-lang-label');
const langOptions = document.querySelectorAll('.lang-dropdown-menu li');
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark-theme';

document.body.className = currentTheme;
applyLanguage(currentLang);

// فتح وإغلاق قائمة الهاتف
menuToggle.addEventListener('click', () => { navMenu.classList.toggle('open'); });
navMenu.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { navMenu.classList.remove('open'); }); });

// تبديل الثيم السريع بالضغط
themeToggleBtn.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
    document.body.className = nextTheme;
    localStorage.setItem('theme', nextTheme);
});

// تبديل اللغة الفوري بالضغط
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

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) element.textContent = translations[lang][key];
    });
}

// اختفاء الهيدر الذكي عند النزول
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 80) navbar.classList.add('nav-hidden');
    else navbar.classList.remove('nav-hidden');
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

/* =======================================================
   منظومة لوحة التحكم الذكية وحفظ البيانات (Control Center CMS)
   ======================================================= */
const adminLoginBox = document.getElementById('admin-login-box');
const adminPanel = document.getElementById('admin-panel');
const loginError = document.getElementById('login-error');
const updatesContainer = document.getElementById('updates-container');

// بيانات الدخول الإفتراضية (يمكنك تعديلها هنا)
const ADMIN_USER = "hachem";
const ADMIN_PASS = "1324";

// مصفوفة حفظ البيانات المنشورة
let dynamicContentList = JSON.parse(localStorage.getItem('ch_apex_content')) || [];

// تشغيل جلب وعرض البيانات عند فتح الموقع
renderDynamicContent();

// حدث تسجيل الدخول للوحة التحكم
document.getElementById('btn-login').addEventListener('click', () => {
    const u = document.getElementById('admin-username').value;
    const p = document.getElementById('admin-password').value;

    if (u === ADMIN_USER && p === ADMIN_PASS) {
        adminLoginBox.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        loginError.textContent = "";
    } else {
        loginError.textContent = currentLang === 'ar' ? "خطأ في اسم المستخدم أو كلمة المرور!" : "Invalid Credentials!";
    }
});

// تسجيل الخروج
document.getElementById('btn-logout').addEventListener('click', () => {
    adminPanel.classList.add('hidden');
    adminLoginBox.classList.remove('hidden');
    document.getElementById('admin-username').value = "";
    document.getElementById('admin-password').value = "";
});

// نشر محتوى جديد عبر لوحة التحكم وحفظه
document.getElementById('btn-publish').addEventListener('click', () => {
    const type = document.getElementById('content-type').value;
    const title = document.getElementById('content-title').value;
    const image = document.getElementById('content-image').value || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500'; // صورة افتراضية في حال لم تضف رابطاً
    const desc = document.getElementById('content-desc').value;

    if (!title || !desc) {
        alert(currentLang === 'ar' ? "يرجى ملء الحقول الأساسية" : "Please fill in title and content");
        return;
    }

    const newContent = { id: Date.now(), type, title, image, desc };
    dynamicContentList.unshift(newContent); // إضافة العنصر في البداية ليكون أول من يظهر
    localStorage.setItem('ch_apex_content', JSON.stringify(dynamicContentList));

    // تنظيف الحقول بعد النشر
    document.getElementById('content-title').value = "";
    document.getElementById('content-image').value = "";
    document.getElementById('content-desc').value = "";

    renderDynamicContent();
    alert(currentLang === 'ar' ? "تم النشر بنجاح وحفظ التحديثات!" : "Published and saved successfully!");
});

// دالة توليد وعرض الكروت المضافة ديناميكياً في الموقع
function renderDynamicContent() {
    updatesContainer.innerHTML = "";
    
    if (dynamicContentList.length === 0) {
        updatesContainer.innerHTML = `<p style="opacity:0.5; grid-column: 1/-1;">No updates published yet.</p>`;
        return;
    }

    dynamicContentList.forEach(item => {
        const cardHtml = `
            <div class="card">
                <img src="${item.image}" alt="${item.title}">
                <span class="card-badge">${item.type}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `;
        updatesContainer.innerHTML += cardHtml;
    });
}
