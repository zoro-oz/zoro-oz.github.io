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

/* =======================================================
   🛡️ نظام الـ CRUD وعزل لوحة التحكم التام عن واجهة زوار موقعك
   ======================================================= */
const mainView = document.getElementById('main-view');
const adminView = document.getElementById('admin-view');
const authBox = document.getElementById('auth-box');
const dashboardBox = document.getElementById('dashboard-box');
const authErrorLog = document.getElementById('auth-error-log');
const updatesContainer = document.getElementById('updates-container');
const adminTableBody = document.getElementById('admin-table-body');

const SECURE_UID = "hachem";
const SECURE_PAS = "apex2026";
let editModeId = null; 

function handleRouting() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('page') === 'admin' || window.location.hash === '#admin') {
        mainView.classList.add('hidden-view');
        navbar.classList.add('hidden-view'); // حظر النافبار تماماً من الشاشة لإنهاء أي تداخل
        adminView.classList.remove('hidden-view');
        
        if (localStorage.getItem('admin_session_active') === 'true') {
            authBox.classList.add('hidden-view');
            dashboardBox.classList.remove('hidden-view');
            renderAdminTable();
        } else {
            authBox.classList.remove('hidden-view');
            dashboardBox.classList.add('hidden-view');
        }
    } else {
        adminView.classList.add('hidden-view');
        navbar.classList.remove('hidden-view'); // إعادة تفعيل النافبار ومكونات الواجهة للزوار
        mainView.classList.remove('hidden-view');
    }
}
window.addEventListener('popstate', handleRouting);
window.addEventListener('load', handleRouting);

document.getElementById('auth-submit-btn').addEventListener('click', () => {
    const u = document.getElementById('auth-user').value;
    const p = document.getElementById('auth-pass').value;

    if (u === SECURE_UID && p === SECURE_PAS) {
        localStorage.setItem('admin_session_active', 'true');
        authBox.classList.add('hidden-view');
        dashboardBox.classList.remove('hidden-view');
        authErrorLog.textContent = "";
        renderAdminTable();
    } else {
        authErrorLog.textContent = "Access Denied.";
    }
});

document.getElementById('auth-logout-btn').addEventListener('click', () => {
    localStorage.removeItem('admin_session_active');
    dashboardBox.classList.add('hidden-view');
    authBox.classList.remove('hidden-view');
    exitEditMode();
    window.history.pushState({}, '', window.location.pathname);
    handleRouting();
});

// محرك CRUD والرفع
const fileDropZone = document.getElementById('file-drop-zone');
const binaryFileInput = document.getElementById('binary-file-input');
const uploadProgressWrapper = document.getElementById('upload-progress-wrapper');
const progressBarFill = document.getElementById('progress-bar-fill');
const uploadPercentage = document.getElementById('upload-percentage');
const dataPublishBtn = document.getElementById('data-publish-btn');
const cancelEditBtn = document.getElementById('data-cancel-edit-btn');
const formActionTitle = document.getElementById('form-action-title');

let attachedFile = null;

fileDropZone.addEventListener('dragover', (e) => { e.preventDefault(); fileDropZone.classList.add('drag-over'); });
fileDropZone.addEventListener('dragleave', () => fileDropZone.classList.remove('drag-over'));
fileDropZone.addEventListener('drop', (e) => { e.preventDefault(); fileDropZone.classList.remove('drag-over'); if(e.dataTransfer.files.length) handleSelectedFile(e.dataTransfer.files[0]); });
binaryFileInput.addEventListener('change', (e) => { if(e.target.files.length) handleSelectedFile(e.target.files[0]); });

function handleSelectedFile(file) { attachedFile = file; fileDropZone.querySelector('.drop-zone-prompt').textContent = `Asset: ${file.name}`; }

dataPublishBtn.addEventListener('click', () => {
    const title = document.getElementById('data-title').value;
    const desc = document.getElementById('data-desc').value;
    const type = document.getElementById('data-type').value;

    if (!title || !desc) { alert("Fields cannot be empty."); return; }

    if (attachedFile) {
        uploadProgressWrapper.classList.remove('hidden-view');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 25;
            progressBarFill.style.width = progress + '%';
            uploadPercentage.textContent = progress + '%';
            if (progress >= 100) { clearInterval(interval); finalizePublishOrUpdate(type, title, desc); }
        }, 100);
    } else { finalizePublishOrUpdate(type, title, desc); }
});

function finalizePublishOrUpdate(type, title, desc) {
    let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];

    if (editModeId !== null) {
        currentData = currentData.map(item => item.id === editModeId ? { ...item, type, title, desc, fileAttached: attachedFile ? attachedFile.name : item.fileAttached } : item);
        exitEditMode();
    } else {
        currentData.unshift({ id: Date.now(), type, title, desc, fileAttached: attachedFile ? attachedFile.name : null });
    }

    localStorage.setItem('ch_apex_db_prod', JSON.stringify(currentData));
    resetFormFields();
    renderContentFromDB();
    renderAdminTable();
}

window.startEditPost = function(id) {
    let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];
    const item = currentData.find(i => i.id === id);
    if (item) {
        editModeId = id;
        document.getElementById('data-title').value = item.title;
        document.getElementById('data-desc').value = item.desc;
        document.getElementById('data-type').value = item.type;
        document.getElementById('data-title').dispatchEvent(new Event('input'));
        document.getElementById('data-desc').dispatchEvent(new Event('input'));
        formActionTitle.textContent = "Modify Operational Package";
        dataPublishBtn.textContent = "Execute Update Sequence";
        cancelEditBtn.classList.remove('hidden-view');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

cancelEditBtn.addEventListener('click', exitEditMode);
function exitEditMode() { editModeId = null; formActionTitle.textContent = "Deploy New Package"; dataPublishBtn.textContent = "Execute Deployment"; cancelEditBtn.classList.add('hidden-view'); resetFormFields(); }

window.deletePost = function(id) {
    if (confirm("Are you sure?")) {
        let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];
        localStorage.setItem('ch_apex_db_prod', JSON.stringify(currentData.filter(i => i.id !== id)));
        if (editModeId === id) exitEditMode();
        renderContentFromDB();
        renderAdminTable();
    }
};

function resetFormFields() { document.getElementById('data-title').value = ""; document.getElementById('data-desc').value = ""; fileDropZone.querySelector('.drop-zone-prompt').textContent = "Drag & Drop Binaries or Click to Browse"; uploadProgressWrapper.classList.add('hidden-view'); attachedFile = null; }

function renderAdminTable() {
    adminTableBody.innerHTML = "";
    let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];
    if(!currentData.length) { adminTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; opacity:0.4;">No logs sequenced.</td></tr>`; return; }
    currentData.forEach(i => { adminTableBody.innerHTML += `<tr><td><span class="table-badge">${i.type}</span></td><td>${i.title}</td><td>${i.fileAttached || 'None'}</td><td><button class="btn-action-edit" onclick="startEditPost(${i.id})">Edit</button><button class="btn-action-delete" onclick="deletePost(${i.id})">Delete</button></td></tr>`; });
}

function renderContentFromDB() {
    updatesContainer.innerHTML = "";
    let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];
    if(!currentData.length) { updatesContainer.innerHTML = `<p style="opacity:0.4; grid-column:1/-1;">No packages deployed.</p>`; return; }
    currentData.forEach(i => { updatesContainer.innerHTML += `<div class="card glass-card animate-fade-in"><span class="cyber-badge" style="margin-bottom:10px; font-size:11px;">${i.type}</span><h3>${i.title}</h3><p>${i.desc}</p>${i.fileAttached ? `<div class="nav-bubble-wrapper margin-top" style="font-size:11px; width:100%; cursor:default;">📦 Asset: ${i.fileAttached}</div>` : ''}</div>`; });
}

renderContentFromDB();
