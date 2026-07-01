const authBox = document.getElementById('auth-box');
const dashboardBox = document.getElementById('dashboard-box');
const authErrorLog = document.getElementById('auth-error-log');
const adminTableBody = document.getElementById('admin-table-body');

const SECURE_UID = "hachem";
const SECURE_PAS = "apex2026";
let editModeId = null; 

// فحص حالة الجلسة الفورية
if (localStorage.getItem('admin_session_active') === 'true') {
    authBox.classList.add('hidden-view');
    dashboardBox.classList.remove('hidden-view');
    renderAdminTable();
}

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
    window.location.href = "index.html"; // إعادة التوجيه الفوري للصفحة الرئيسية
});

// محرك السحب والرفع والتعديل والحذف
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
    renderAdminTable();
    alert("Operation Completed Successfully.");
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
        formActionTitle.textContent = "Modify Package";
        dataPublishBtn.textContent = "Update Package";
        cancelEditBtn.classList.remove('hidden-view');
    }
};

cancelEditBtn.addEventListener('click', exitEditMode);
function exitEditMode() { editModeId = null; formActionTitle.textContent = "Deploy New Package"; dataPublishBtn.textContent = "Execute Deployment"; cancelEditBtn.classList.add('hidden-view'); resetFormFields(); }

window.deletePost = function(id) {
    if (confirm("Delete this package permanently?")) {
        let currentData = JSON.parse(localStorage.getItem('ch_apex_db_prod')) || [];
        localStorage.setItem('ch_apex_db_prod', JSON.stringify(currentData.filter(i => i.id !== id)));
        if (editModeId === id) exitEditMode();
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