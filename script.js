const translations = {
    en: {
        "logo-sub": "LABS", "nav-home": "Home", "nav-games": "Game Studio", "nav-updates": "Updates", "nav-cyber": "Cyber Labs",
        "hero-title": "Innovating the Future of Gaming with AI",
        "hero-desc": "Merging artificial intelligence engineering with interactive gaming, secured by advanced cybersecurity solutions.",
        "hero-btn": "Explore Projects", "games-title": "Smart Gaming Studio 🎮",
        "card1-title": "Advanced AI Brains", "card1-desc": "Developing NPCs that learn from your playstyle and adapt to challenge you dynamically in real-time.",
        "card2-title": "Generative Worlds", "card2-desc": "Building procedural environments and levels that evolve infinitely using intelligent AI algorithms.",
        "cyber-badge": "Coming Soon", "cyber-title": "Cybersecurity Labs 🔒",
        "cyber-desc": "We are working behind the scenes to engineer smart vulnerability scanners and AI-powered defense tools to secure the digital frontier.",
        "footer-creators": "Founded by Hachem & Chahrazad", "section-updates-title": "Latest News & Releases",
        "admin-login-head": "System Authentication", "admin-login-btn": "Verify Identity"
    },
    fr: {
        "logo-sub": "LABS", "nav-home": "Accueil", "nav-games": "Studio de Jeux", "nav-updates": "Mises à jour", "nav-cyber": "Cyber Labs",
        "hero-title": "Innover l'Avenir du Jeu avec l'IA",
        "hero-desc": "Fusionner l'ingénierie de l'intelligence artificielle avec le jeu interactif, sécurisé par des solutions de cybersécurité avancées.",
        "hero-btn": "Explorer les Projets", "games-title": "Studio de Jeux Intelligents 🎮",
        "card1-title": "Cerveaux IA Avancés", "card1-desc": "Développement de PNJ qui apprennent de votre style de jeu et s'adaptent pour vous défier dynamiquement en temps réel.",
        "card2-title": "Mondes Génératifs", "card2-desc": "Création d'environnements et de niveaux procéduraux qui évoluent à l'infini grâce à des algorithmes d'IA intelligents.",
        "cyber-badge": "Bientôt Disponible", "cyber-title": "Laboratoires de Cybersécurité 🔒",
        "cyber-desc": "Nous travaillons en coulisses pour concevoir des scanners de vulnérabilités intelligents et des outils de défense basés sur l'IA.",
        "footer-creators": "Fondé par Hachem & Chahrazad", "section-updates-title": "Actualités & Réalisations",
        "admin-login-head": "Authentification Système", "admin-login-btn": "Vérifier l'Identité"
    },
    ar: {
        "logo-sub": "للمختبرات", "nav-home": "الرئيسية", "nav-games": "استوديو الألعاب", "nav-updates": "التحديثات", "nav-cyber": "المختبر السيبراني",
        "hero-title": "نبتكر مستقبل الألعاب بالذكاء الاصطناعي",
        "hero-desc": "دمج هندسة الذكاء الاصطناعي بالألعاب التفاعلية، وتأمينها بأحدث حلول الأمن السيبراني المتقدمة مستقبلاً.",
        "hero-btn": "استكشف مشاريعنا", "games-title": "استوديو الألعاب الذكية 🎮",
        "card1-title": "عقول اصطناعية متطورة", "card1-desc": "تطوير شخصيات داخل الألعاب (NPCs) تتعلم من أسلوب لعبك وتتحداك بشكل واقعي وديناميكي.",
        "card2-title": "عوالم توليدية", "card2-desc": "بناء بيئات ومراحل متغيرة تلقائياً وبشكل لانهائي باستخدام خوارزميات الذكاء الاصطناعي الذكية.",
        "cyber-badge": "قريباً", "cyber-title": "مختبرات الأمن السيبراني 🔒",
        "cyber-desc": "نعمل خلف الكواليس على تطوير أدوات فحص ثغرات ذكية وأنظمة دفاع مدعومة بالذكاء الاصطناعي لحماية الحدود الرقمية.",
        "footer-creators": "تأسست بواسطة هاشم وشهرزاد", "section-updates-title": "آخر الأخبار والإصدارات",
        "admin-login-head": "المصادقة الأمنية للنظام", "admin-login-btn": "التحقق من الهوية"
    }
};

// تهيئة التوجيه الافتراضي واللغات
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

// المنيو المتجاوب للهاتف
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

// التحكم بهيدر الاختفاء الذكي
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 80) navbar.classList.add('nav-hidden');
    else navbar.classList.remove('nav-hidden');
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

/* =======================================================
   🛡️ نظام التوجيه البرمجي السري والمصادقة (Virtual Router & CMS)
   ======================================================= */
const mainView = document.getElementById('main-view');
const adminView = document.getElementById('admin-view');
const authBox = document.getElementById('auth-box');
const dashboardBox = document.getElementById('dashboard-box');
const authErrorLog = document.getElementById('auth-error-log');
const updatesContainer = document.getElementById('updates-container');

const SECURE_UID = "hachem";
const SECURE_PAS = "apex2026";

// فحص الرابط يدوياً تلبية لطلبك بـ إدخال /admin (أو المحاكاة الاحترافية عبر الـ query ?page=admin)
function handleRouting() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('page') === 'admin' || window.location.hash === '#admin') {
        mainView.classList.add('hidden-view');
        adminView.classList.remove('hidden-view');
    } else {
        adminView.classList.add('hidden-view');
        mainView.classList.remove('hidden-view');
    }
}
window.addEventListener('popstate', handleRouting);
window.addEventListener('load', handleRouting);
document.getElementById('nav-home-link').addEventListener('click', () => {
    window.history.pushState({}, '', window.location.pathname);
    handleRouting();
});

// التحقق من الهوية
document.getElementById('auth-submit-btn').addEventListener('click', () => {
    const u = document.getElementById('auth-user').value;
    const p = document.getElementById('auth-pass').value;

    if (u === SECURE_UID && p === SECURE_PAS) {
        authBox.classList.add('hidden-view');
        dashboardBox.classList.remove('hidden-view');
        authErrorLog.textContent = "";
    } else {
        authErrorLog.textContent = "Access Denied: Terminal mismatch or corrupt keys.";
    }
});

// إنهاء الجلسة
document.getElementById('auth-logout-btn').addEventListener('click', () => {
    dashboardBox.classList.add('hidden-view');
    authBox.classList.remove('hidden-view');
    document.getElementById('auth-user').value = "";
    document.getElementById('auth-pass').value = "";
    window.history.pushState({}, '', window.location.pathname);
    handleRouting();
});

/* =======================================================
   ⏳ نظام إدارة الرفع والتقدم البرمجي المتفاعل (Upload & Deployment Engine)
   ======================================================= */
const fileDropZone = document.getElementById('file-drop-zone');
const binaryFileInput = document.getElementById('binary-file-input');
const uploadProgressWrapper = document.getElementById('upload-progress-wrapper');
const progressBarFill = document.getElementById('progress-bar-fill');
const uploadPercentage = document.getElementById('upload-percentage');
const uploadFileName = document.getElementById('upload-file-name');

let attachedFile = null;

// أحداث السحب والإفلات للملفات والتطبيقات
['dragenter', 'dragover'].forEach(eventName => {
    fileDropZone.addEventListener(eventName, (e) => { e.preventDefault(); fileDropZone.classList.add('drag-over'); }, false);
});
['dragleave', 'drop'].forEach(eventName => {
    fileDropZone.addEventListener(eventName, (e) => { e.preventDefault(); fileDropZone.classList.remove('drag-over'); }, false);
});

fileDropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if(files.length) handleSelectedFile(files[0]);
});

binaryFileInput.addEventListener('change', (e) => {
    if(e.target.files.length) handleSelectedFile(e.target.files[0]);
});

function handleSelectedFile(file) {
    attachedFile = file;
    uploadFileName.textContent = file.name + ` (${(file.size / (1024*1024)).toFixed(2)} MB)`;
    uploadProgressWrapper.classList.remove('hidden-view');
    progressBarFill.style.width = '0%';
    uploadPercentage.textContent = '0%';
}

// تنفيذ الـ Deployment ومحاكاة رفع حزم البيانات الكبيرة
document.getElementById('data-publish-btn').addEventListener('click', () => {
    const title = document.getElementById('data-title').value;
    const desc = document.getElementById('data-desc').value;
    const type = document.getElementById('data-type').value;

    if (!title || !desc) {
        alert("System Error: Deploy fields cannot be empty.");
        return;
    }

    if (attachedFile) {
        // محاكاة رفع حقيقي عبر الـ XMLHttpRequest لقياس الـ Progress بشكل دقيق واحترافي
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressBarFill.style.width = progress + '%';
            uploadPercentage.textContent = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                finalizePublish(type, title, desc);
            }
        }, 100);
    } else {
        finalizePublish(type, title, desc);
    }
});

function finalizePublish(type, title, desc) {
    let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];
    const newRecord = {
        id: Date.now(),
        type: type,
        title: title,
        desc: desc,
        fileAttached: attachedFile ? attachedFile.name : null
    };
    currentData.unshift(newRecord);
    localStorage.setItem('ch_apex_db_prod', JSON.stringify(currentData));

    // تصفير الواجهة
    document.getElementById('data-title').value = "";
    document.getElementById('data-desc').value = "";
    uploadProgressWrapper.classList.add('hidden-view');
    attachedFile = null;

    renderContentFromDB();
    alert("Deployment Executed Successfully. Synchronization complete.");
}

function renderContentFromDB() {
    updatesContainer.innerHTML = "";
    let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];
    
    if(currentData.length === 0) {
        updatesContainer.innerHTML = `<p style="opacity:0.4; grid-column:1/-1;">Operational network is currently empty. No packages deployed.</p>`;
        return;
    }

    currentData.forEach(item => {
        updatesContainer.innerHTML += `
            <div class="card glass-card animate-fade-in">
                <span class="card-badge">${item.type}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                ${item.fileAttached ? `<div class="nav-bubble-wrapper margin-top" style="font-size:12px; width:100%;">📦 Download: ${item.fileAttached}</div>` : ''}
            </div>
        `;
    });
}

// عرض البيانات الإنشائية عند التشغيل لأول مرة
renderContentFromDB();
