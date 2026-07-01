/* =======================================================
   🛡️ نظام التوجيه البرمجي السري وعزل لوحة التحكم التام
   ======================================================= */
const mainView = document.getElementById('main-view');
const adminView = document.getElementById('admin-view');
const authBox = document.getElementById('auth-box');
const dashboardBox = document.getElementById('dashboard-box');
const authErrorLog = document.getElementById('auth-error-log');
const updatesContainer = document.getElementById('updates-container');
const adminTableBody = document.getElementById('admin-table-body');

// معرفات الدخول الصارمة
const SECURE_UID = "hachem";
const SECURE_PAS = "apex2026";

// متغيرات تتبع وضع التعديل (CRUD State)
let editModeId = null; 

function handleRouting() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('page') === 'admin' || window.location.hash === '#admin') {
        mainView.classList.add('hidden-view');
        navbar.classList.add('nav-hidden'); // إخفاء النافبار تماماً لمنع التشويش البصري
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
        navbar.classList.remove('nav-hidden'); // إعادة النافبار للمستخدم العادي
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
        localStorage.setItem('admin_session_active', 'true');
        authBox.classList.add('hidden-view');
        dashboardBox.classList.remove('hidden-view');
        authErrorLog.textContent = "";
        renderAdminTable();
    } else {
        authErrorLog.textContent = "Access Denied: Invalid Credentials.";
    }
});

// تدمير الجلسة والعودة للرئيسية
document.getElementById('auth-logout-btn').addEventListener('click', () => {
    localStorage.removeItem('admin_session_active');
    dashboardBox.classList.add('hidden-view');
    authBox.classList.remove('hidden-view');
    document.getElementById('auth-user').value = "";
    document.getElementById('auth-pass').value = "";
    exitEditMode();
    window.history.pushState({}, '', window.location.pathname);
    handleRouting();
});

/* =======================================================
   ⏳ محرك إدارة السحب، الرفع، التعديل والحذف (CRUD Engine)
   ======================================================= */
const fileDropZone = document.getElementById('file-drop-zone');
const binaryFileInput = document.getElementById('binary-file-input');
const uploadProgressWrapper = document.getElementById('upload-progress-wrapper');
const progressBarFill = document.getElementById('progress-bar-fill');
const uploadPercentage = document.getElementById('upload-percentage');
const dataPublishBtn = document.getElementById('data-publish-btn');
const cancelEditBtn = document.getElementById('data-cancel-edit-btn');
const formActionTitle = document.getElementById('form-action-title');

let attachedFile = null;

['dragenter', 'dragover'].forEach(eventName => {
    fileDropZone.addEventListener(eventName, (e) => { e.preventDefault(); fileDropZone.classList.add('drag-over'); }, false);
});
['dragleave', 'drop'].forEach(eventName => {
    fileDropZone.addEventListener(eventName, (e) => { e.preventDefault(); fileDropZone.classList.remove('drag-over'); }, false);
});

fileDropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if(dt.files.length) handleSelectedFile(dt.files[0]);
});

binaryFileInput.addEventListener('change', (e) => {
    if(e.target.files.length) handleSelectedFile(e.target.files[0]);
});

function handleSelectedFile(file) {
    attachedFile = file;
    fileDropZone.querySelector('.drop-zone-prompt').textContent = `Selected Asset: ${file.name}`;
}

// تنفيذ الرفع والنشر (أو التحديث بناءً على الوضع الحركي)
dataPublishBtn.addEventListener('click', () => {
    const title = document.getElementById('data-title').value;
    const desc = document.getElementById('data-desc').value;
    const type = document.getElementById('data-type').value;

    if (!title || !desc) {
        alert("System Architecture Violation: Fields cannot be empty.");
        return;
    }

    if (attachedFile) {
        uploadProgressWrapper.classList.remove('hidden-view');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            progressBarFill.style.width = progress + '%';
            uploadPercentage.textContent = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                finalizePublishOrUpdate(type, title, desc);
            }
        }, 100);
    } else {
        finalizePublishOrUpdate(type, title, desc);
    }
});

function finalizePublishOrUpdate(type, title, desc) {
    let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];

    if (editModeId !== null) {
        // 🖋️ وضع التعديل: تحديث السجل القائم بالمطابقة مع الـ ID
        currentData = currentData.map(item => {
            if (item.id === editModeId) {
                return {
                    ...item,
                    type: type,
                    title: title,
                    desc: desc,
                    fileAttached: attachedFile ? attachedFile.name : item.fileAttached // الحفاظ على الملف القديم إن لم يتم رفع جديد
                };
            }
            return item;
        });
        alert("Log Package Updated Successfully.");
        exitEditMode();
    } else {
        // ➕ وضع الإنشاء: إضافة سجل جديد بالكامل
        const newRecord = {
            id: Date.now(),
            type: type,
            title: title,
            desc: desc,
            fileAttached: attachedFile ? attachedFile.name : null
        };
        currentData.unshift(newRecord);
        alert("New Package Deployed and Sequenced.");
    }

    localStorage.setItem('ch_apex_db_prod', JSON.stringify(currentData));
    resetFormFields();
    renderContentFromDB();
    renderAdminTable();
}

// تشغيل وضع التعديل وجلب البيانات
window.startEditPost = function(id) {
    let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];
    const targetItem = currentData.find(item => item.id === id);
    
    if (targetItem) {
        editModeId = id;
        document.getElementById('data-title').value = targetItem.title;
        document.getElementById('data-desc').value = targetItem.desc;
        document.getElementById('data-type').value = targetItem.type;
        
        // تفعيل الإشارات والـ Inputs لتشعر بوجود النص (Floating Labels)
        document.getElementById('data-title').dispatchEvent(new Event('input'));
        document.getElementById('data-desc').dispatchEvent(new Event('input'));

        if (targetItem.fileAttached) {
            fileDropZone.querySelector('.drop-zone-prompt').textContent = `Current Asset: ${targetItem.fileAttached}`;
        }

        formActionTitle.textContent = "Modify Operational Package";
        dataPublishBtn.textContent = "Execute Update Sequence";
        cancelEditBtn.classList.remove('hidden-view');
        
        // صعود تلقائي ناعم لمنطقة النماذج لتعديلها
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// إلغاء وضع التعديل والعودة للوضع الطبيعي
cancelEditBtn.addEventListener('click', exitEditMode);

function exitEditMode() {
    editModeId = null;
    formActionTitle.textContent = "Deploy New Package";
    dataPublishBtn.textContent = "Execute Deployment";
    cancelEditBtn.classList.add('hidden-view');
    resetFormFields();
}

// حذف المنشور نهائياً (إعدام السجل من قاعدة البيانات)
window.deletePost = function(id) {
    if (confirm("Are you absolute sure you want to terminate this package deployment permanently?")) {
        let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];
        currentData = currentData.filter(item => item.id !== id);
        localStorage.setItem('ch_apex_db_prod', JSON.stringify(currentData));
        
        if (editModeId === id) exitEditMode();
        
        renderContentFromDB();
        renderAdminTable();
    }
};

function resetFormFields() {
    document.getElementById('data-title').value = "";
    document.getElementById('data-desc').value = "";
    fileDropZone.querySelector('.drop-zone-prompt').textContent = "Drag & Drop Application Binaries (.exe, .apk, .zip) or Click to Browse";
    uploadProgressWrapper.classList.add('hidden-view');
    progressBarFill.style.width = '0%';
    uploadPercentage.textContent = '0%';
    attachedFile = null;
}

// ضخ وعرض البيانات داخل جدول تحكم الإدارة السفلي
function renderAdminTable() {
    adminTableBody.innerHTML = "";
    let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];

    if(currentData.length === 0) {
        adminTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; opacity:0.4;">No logs sequenced in current cluster.</td></tr>`;
        return;
    }

    currentData.forEach(item => {
        adminTableBody.innerHTML += `
            <tr>
                <td><span class="table-badge">${item.type}</span></td>
                <td style="font-weight:600;">${item.title}</td>
                <td style="opacity:0.7; font-family:monospace;">${item.fileAttached ? item.fileAttached : 'None'}</td>
                <td>
                    <button class="btn-action-edit" onclick="startEditPost(${item.id})">Edit</button>
                    <button class="btn-action-delete" onclick="deletePost(${item.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ضخ البيانات للمستخدم في الصفحة الرئيسية
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
                <span class="cyber-badge" style="margin-bottom:10px; font-size:11px;">${item.type}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                ${item.fileAttached ? `<div class="nav-bubble-wrapper margin-top" style="font-size:11px; width:100%; cursor:default;">📦 Packaged Application: ${item.fileAttached}</div>` : ''}
            </div>
        `;
    });
}

// تحميل الواجهة للمرة الأولى
renderContentFromDB();
