// Application Logic & UI Rendering — VUFIX (Hostel Maintenance Portal)

const appDiv = document.getElementById('app');

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 3200);
    }, 3200);
}

function formatDate(dateStr) {
    if (!dateStr || dateStr === 'Pending' || dateStr === 'Pending Assignment' || dateStr === 'Today') return dateStr || 'Pending';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return dateStr;
    }
}

function getStatusBadge(status) {
    const slug = (status || 'submitted').toLowerCase().replace(/\s+/g, '-');
    return `<span class="badge status-${slug}">${status}</span>`;
}

function getPriorityBadge(priority) {
    const slug = (priority || 'medium').toLowerCase();
    return `<span class="priority-${slug}">${priority}</span>`;
}

function renderApp() {
    const user = Store.getCurrentUser();
    if (!user) {
        renderLogin();
    } else {
        renderLayout(user);
    }
}

// ---------------- 1. LOGIN & AUTH (VUFIX Tabbed Login System) ----------------
let currentLoginTab = 'student';

function renderLogin() {
    appDiv.innerHTML = `
        <div class="login-container">
            <div class="card login-card">
                <div class="text-center mb-6">
                    <div style="width: 54px; height: 54px; background: var(--primary-light); color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem; font-size: 1.625rem;">
                        <i class="fa-solid fa-building-circle-check"></i>
                    </div>
                    <h2 class="page-title text-primary" style="font-size: 1.75rem; font-weight: 800; letter-spacing: -0.03em;">VUFIX</h2>
                    <p class="text-muted text-sm mt-1">Hostel Maintenance & Complaint Management System</p>
                </div>

                <!-- STET301 Exam Deliverables Bar -->
                <div style="background: linear-gradient(135deg, rgba(79, 70, 229, 0.08), rgba(6, 182, 212, 0.08)); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 10px; padding: 0.75rem 1rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
                    <div style="font-weight: 700; font-size: 0.8rem; color: #4338ca;">
                        <i class="fa-solid fa-graduation-cap"></i> STET301 Exam Deliverables
                    </div>
                    <div class="flex gap-2" style="flex-wrap: wrap;">
                        <button type="button" class="btn btn-sm" onclick="openProfessorChecklistModal()" style="font-size: 0.75rem; padding: 0.25rem 0.65rem; background: #f59e0b; color: #1e1b4b; font-weight: 700; border: none;">
                            <i class="fa-solid fa-list-check"></i> Professor's Checklist
                        </button>
                        <a href="presentation/presentation_deck.html" target="_blank" class="btn btn-primary btn-sm" style="font-size: 0.75rem; padding: 0.25rem 0.65rem;">
                            <i class="fa-solid fa-layer-group"></i> 5-Min Deck
                        </a>
                        <a href="showcase/behance_showcase_1400px.html" target="_blank" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; padding: 0.25rem 0.65rem; color: #0057ff; border-color: rgba(0, 87, 255, 0.3);">
                            <i class="fa-brands fa-behance"></i> Behance Board
                        </a>
                    </div>
                </div>

                <!-- Tab Switcher -->
                <div class="login-tabs">
                    <button class="login-tab-btn ${currentLoginTab === 'student' ? 'active' : ''}" onclick="switchLoginTab('student')">
                        <i class="fa-solid fa-graduation-cap"></i> Student Login
                    </button>
                    <button class="login-tab-btn ${currentLoginTab === 'signup' ? 'active' : ''}" onclick="switchLoginTab('signup')">
                        <i class="fa-solid fa-user-plus"></i> Sign Up
                    </button>
                    <button class="login-tab-btn ${currentLoginTab === 'admin' ? 'active' : ''}" onclick="switchLoginTab('admin')">
                        <i class="fa-solid fa-user-shield"></i> Warden / Admin
                    </button>
                </div>

                <!-- Tab 1: Student Login -->
                <div id="tab-student" class="${currentLoginTab === 'student' ? '' : 'hidden'}">
                    <form onsubmit="handleLoginSubmit(event, 'student')">
                        <div class="form-group">
                            <label class="form-label">Email or Registration No.</label>
                            <input type="email" id="student-email" class="form-control" value="aryaman.saboo@vijaybhoomi.edu.in" placeholder="Enter student email" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" value="••••••••" placeholder="Enter password" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block mt-4" style="padding: 0.75rem;">
                            <i class="fa-solid fa-right-to-bracket"></i> Login as Student (Aryaman Saboo)
                        </button>
                    </form>
                </div>

                <!-- Tab 2: Student Sign Up -->
                <div id="tab-signup" class="${currentLoginTab === 'signup' ? '' : 'hidden'}">
                    <form onsubmit="handleStudentRegister(event)">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" id="reg-name" class="form-control" placeholder="E.g., Aryaman Saboo" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Hostel & Room No.</label>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="text" id="reg-hostel" class="form-control" value="Hostel A" placeholder="Hostel" required>
                                <input type="text" id="reg-room" class="form-control" placeholder="Room (e.g. B3-304)" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email Address</label>
                            <input type="email" id="reg-email" class="form-control" placeholder="student@vijaybhoomi.edu.in" required>
                        </div>
                        <button type="submit" class="btn btn-success btn-block mt-4" style="padding: 0.75rem;">
                            <i class="fa-solid fa-user-check"></i> Register & Enter VUFIX Portal
                        </button>
                    </form>
                </div>

                <!-- Tab 3: Admin / Warden Login -->
                <div id="tab-admin" class="${currentLoginTab === 'admin' ? '' : 'hidden'}">
                    <form onsubmit="handleLoginSubmit(event, 'admin')">
                        <div class="form-group">
                            <label class="form-label">Warden Admin Email / ID</label>
                            <input type="email" id="admin-email" class="form-control" value="rinu.babu@vijaybhoomi.edu.in" placeholder="rinu.babu@vijaybhoomi.edu.in" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Admin Security Code</label>
                            <input type="password" class="form-control" value="••••••••" placeholder="Security Password" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block mt-4" style="padding: 0.75rem; background-color: #312e81;">
                            <i class="fa-solid fa-shield-halved"></i> Access Warden Portal (Rinu Babu)
                        </button>
                    </form>
                </div>

                <!-- Quick Fill Preset Buttons -->
                <div class="quick-fill-box">
                    <div class="quick-fill-label">
                        <i class="fa-solid fa-bolt text-warning"></i> Quick Demo Access Presets
                    </div>
                    <button type="button" class="quick-fill-btn" onclick="quickLogin('student')">
                        <span>⚡ <strong>Student Login</strong> (Aryaman Saboo)</span>
                        <span class="text-xs text-muted">2024VUGP0039</span>
                    </button>
                    <button type="button" class="quick-fill-btn" onclick="quickLogin('admin')">
                        <span>🛡️ <strong>Hostel Warden Login</strong> (Rinu Babu)</span>
                        <span class="text-xs text-muted">Hostel Admin</span>
                    </button>
                    <button type="button" class="quick-fill-btn" onclick="quickLogin('student2')">
                        <span>👤 <strong>Student Login</strong> (Parth Pawar)</span>
                        <span class="text-xs text-muted">2024VUGP0021</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.switchLoginTab = function(tab) {
    currentLoginTab = tab;
    document.querySelectorAll('.login-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('[id^="tab-"]').forEach(div => div.classList.add('hidden'));
    
    const targetTabBtn = Array.from(document.querySelectorAll('.login-tab-btn')).find(b => b.getAttribute('onclick').includes(tab));
    if (targetTabBtn) targetTabBtn.classList.add('active');
    
    const targetDiv = document.getElementById(`tab-${tab}`);
    if (targetDiv) targetDiv.classList.remove('hidden');
};

window.handleLoginSubmit = function(e, role) {
    e.preventDefault();
    Store.login(role);
    renderApp();
    showToast(`Welcome back! Logged in as ${role === 'admin' ? 'Hostel Warden Rinu Babu' : 'Student Aryaman Saboo'}`);
};

window.handleStudentRegister = function(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const hostel = document.getElementById('reg-hostel').value;
    const room = document.getElementById('reg-room').value;
    const email = document.getElementById('reg-email').value;

    const newUser = Store.registerStudent({ name, hostel, room, email });
    renderApp();
    showToast(`Account created for ${newUser.name}! Welcome to VUFIX.`);
};

window.quickLogin = function(roleKey) {
    const user = Store.login(roleKey);
    renderApp();
    showToast(`Quick Fill: Logged in as ${user.name} (${user.role === 'admin' ? 'Warden' : 'Student'})`);
};

window.handleLogout = function() {
    Store.logout();
    renderApp();
    showToast('Logged out safely.');
};

// ---------------- 2. LAYOUT & NAVIGATION ----------------
function renderLayout(user) {
    appDiv.innerHTML = `
        <div class="app-layout">
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <div class="sidebar-logo">
                        <i class="fa-solid fa-building-circle-check"></i> VUFIX
                    </div>
                    <div class="text-xs text-muted mt-1">Hostel Maintenance Portal</div>
                </div>
                <nav class="sidebar-nav">
                    ${getNavItems(user.role)}
                </nav>
                <div style="padding: 1.25rem; border-top: 1px solid var(--border-color); background: #f8fafc;">
                    <div class="text-xs font-semibold text-muted mb-1">LOGGED IN ROLE</div>
                    <div class="flex items-center justify-between">
                        <span class="badge ${user.role === 'admin' ? 'status-in-progress' : 'status-assigned'}">
                            ${user.role === 'admin' ? 'Hostel Warden' : 'Student'}
                        </span>
                        <button class="btn btn-secondary btn-sm" onclick="handleLogout()" title="Logout">
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                </div>
            </aside>
            <main class="main-content">
                <header class="topbar">
                    <div class="flex items-center gap-3">
                        <button class="btn btn-secondary btn-sm" style="display: none;" id="menu-toggle"><i class="fa-solid fa-bars"></i></button>
                        <div class="font-bold text-lg hidden-mobile text-primary">
                            ${user.role === 'admin' ? '🛡️ VUFIX — Warden Management Portal' : '🏫 VUFIX — Student Maintenance Service'}
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="btn btn-sm" onclick="openProfessorChecklistModal()" style="font-weight: 700; font-size: 0.8rem; background: #fef3c7; color: #b45309; border: 1px solid #fde68a;">
                            <i class="fa-solid fa-list-check"></i> <span class="hidden-mobile">Professor's</span> Checklist
                        </button>
                        <a href="presentation/presentation_deck.html" target="_blank" class="btn btn-secondary btn-sm" style="font-weight: 600; border-color: #6366f1; color: #4f46e5; text-decoration: none;">
                            <i class="fa-solid fa-layer-group"></i> <span class="hidden-mobile">5-Min</span> Deck
                        </a>
                        <a href="showcase/behance_showcase_1400px.html" target="_blank" class="btn btn-secondary btn-sm" style="font-weight: 600; border-color: #0057ff; color: #0057ff; text-decoration: none;">
                            <i class="fa-brands fa-behance"></i> <span class="hidden-mobile">Behance</span> Board
                        </a>
                    </div>
                    <div class="user-menu">
                        <div class="text-right hidden-mobile">
                            <div class="font-bold text-sm">${user.name}</div>
                            <div class="text-xs text-muted">${user.email || user.id}</div>
                        </div>
                        <div class="avatar">${user.avatar || user.name.substring(0,2).toUpperCase()}</div>
                        <button class="btn btn-secondary btn-sm" onclick="handleLogout()" title="Logout">
                            <i class="fa-solid fa-power-off text-danger"></i>
                        </button>
                    </div>
                </header>
                <div class="page-content" id="page-content">
                    <!-- Dynamic Page Views -->
                </div>
            </main>
        </div>
        <div id="modal-container"></div>
    `;

    if (window.innerWidth <= 768) {
        const toggleBtn = document.getElementById('menu-toggle');
        if (toggleBtn) {
            toggleBtn.style.display = 'inline-flex';
            toggleBtn.onclick = () => document.getElementById('sidebar').classList.toggle('mobile-open');
        }
    }

    if (user.role === 'admin') {
        navigateTo('admin-dashboard');
    } else {
        navigateTo('student-dashboard');
    }
}

function getNavItems(role) {
    if (role === 'admin') {
        return `
            <a href="#" class="nav-item active" data-target="admin-dashboard" onclick="navigateTo('admin-dashboard', event)">
                <i class="fa-solid fa-chart-pie"></i> Admin Dashboard
            </a>
            <a href="#" class="nav-item" data-target="admin-escalations" onclick="navigateTo('admin-dashboard', event, 'Escalated')">
                <i class="fa-solid fa-triangle-exclamation text-danger"></i> Urgent Escalations
            </a>
            <a href="#" class="nav-item" onclick="alert('Staff Roster: Ramesh Kumar (Electrical), Suresh Sharma (Plumbing), Vikas Patil (IT), Sunita Devi (Housekeeping)')">
                <i class="fa-solid fa-users-gear"></i> Staff Roster
            </a>
        `;
    } else {
        return `
            <a href="#" class="nav-item active" data-target="student-dashboard" onclick="navigateTo('student-dashboard', event)">
                <i class="fa-solid fa-house"></i> Overview Dashboard
            </a>
            <a href="#" class="nav-item" data-target="report-complaint" onclick="navigateTo('report-complaint', event)">
                <i class="fa-solid fa-plus-circle"></i> Report Maintenance
            </a>
            <a href="#" class="nav-item" data-target="my-complaints" onclick="navigateTo('my-complaints', event)">
                <i class="fa-solid fa-list-check"></i> Track My Complaints
            </a>
            <a href="#" class="nav-item" onclick="showProfileInfo()">
                <i class="fa-solid fa-id-card"></i> Student Profile
            </a>
        `;
    }
}

window.navigateTo = function(page, event, filterStatus = null) {
    if (event) event.preventDefault();

    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const targetEl = document.querySelector(`.nav-item[data-target="${page}"]`);
    if (targetEl) targetEl.classList.add('active');

    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('mobile-open');

    const content = document.getElementById('page-content');

    if (page === 'student-dashboard') renderStudentDashboard(content);
    else if (page === 'report-complaint') renderReportComplaint(content);
    else if (page === 'my-complaints') renderMyComplaints(content);
    else if (page === 'admin-dashboard') renderAdminDashboard(content, filterStatus);
    else if (page.startsWith('complaint-detail:')) {
        const id = page.split(':')[1];
        renderComplaintDetail(content, id);
    }
};

window.showProfileInfo = function() {
    const user = Store.getCurrentUser();
    alert(`🎓 Student Profile Identity:\n\nName: ${user.name}\nRoll No: ${user.id}\nRoom: ${user.room} (${user.hostel})\nEmail: ${user.email}`);
};

// ---------------- 3. STUDENT DASHBOARD & COMPLAINT VIEWS ----------------
function renderComplaintCard(c) {
    return `
        <div class="card" style="cursor: pointer; position: relative;" onclick="navigateTo('complaint-detail:${c.id}')">
            <div class="card-header">
                <div>
                    <div class="text-xs font-bold text-primary" style="letter-spacing: 0.05em;">#${c.id}</div>
                    <div class="card-title mt-1">${c.title}</div>
                </div>
                ${getStatusBadge(c.status)}
            </div>
            <p class="text-sm text-muted mb-4" style="line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;">
                ${c.description}
            </p>
            <div class="text-xs text-muted mb-3 flex items-center gap-2">
                <i class="fa-solid fa-location-dot text-primary"></i> ${c.location.block} · ${c.location.room}
                <span style="margin: 0 4px;">•</span>
                <i class="fa-solid fa-folder text-muted"></i> ${c.category}
            </div>
            <div class="flex justify-between items-center pt-3" style="border-top: 1px solid var(--border-color)">
                <div class="text-xs">
                    <span class="text-muted">Expected:</span>
                    <strong class="text-main">${formatDate(c.expectedResolution)}</strong>
                </div>
                ${getPriorityBadge(c.priority)}
            </div>
        </div>
    `;
}

function renderStudentDashboard(container) {
    const user = Store.getCurrentUser();
    const complaints = Store.getComplaints().filter(c => c.studentId === user.id || c.studentName === user.name);
    const active = complaints.filter(c => ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'On Hold', 'Escalated'].includes(c.status));
    const resolved = complaints.filter(c => ['Resolved', 'Closed'].includes(c.status));

    container.innerHTML = `
        <div class="page-header">
            <div>
                <h1 class="page-title">Welcome back, ${user.name} 👋</h1>
                <div class="flex items-center gap-3 mt-2">
                    <span class="badge status-in-progress"><i class="fa-solid fa-id-badge"></i> Roll: ${user.id}</span>
                    <span class="badge status-assigned"><i class="fa-solid fa-door-closed"></i> ${user.room} (${user.hostel})</span>
                    <span class="text-xs text-muted"><i class="fa-solid fa-envelope"></i> ${user.email}</span>
                </div>
            </div>
            <button class="btn btn-primary" onclick="navigateTo('report-complaint')">
                <i class="fa-solid fa-plus-circle"></i> Report Maintenance Issue
            </button>
        </div>

        <div class="grid grid-cols-3 gap-6 mb-6">
            <div class="stat-card">
                <div class="stat-icon"><i class="fa-solid fa-clipboard-list"></i></div>
                <div class="stat-content">
                    <h4>Active Requests</h4>
                    <div class="stat-value">${active.length}</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="color: var(--success); background: var(--success-light);"><i class="fa-solid fa-circle-check"></i></div>
                <div class="stat-content">
                    <h4>Resolved Issues</h4>
                    <div class="stat-value">${resolved.length}</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="color: var(--danger); background: var(--danger-light);"><i class="fa-solid fa-triangle-exclamation"></i></div>
                <div class="stat-content">
                    <h4>Escalated Tickets</h4>
                    <div class="stat-value">${complaints.filter(c => c.status === 'Escalated').length}</div>
                </div>
            </div>
        </div>

        <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-lg">Active Hostel Complaints</h3>
            <button class="btn btn-secondary btn-sm" onclick="navigateTo('my-complaints')">View All (${complaints.length})</button>
        </div>

        <div class="grid grid-cols-2 gap-6 mb-6">
            ${active.length ? active.map(c => renderComplaintCard(c)).join('') : `
                <div class="card" style="grid-column: span 2; text-align: center; padding: 3rem;">
                    <i class="fa-solid fa-circle-check text-success" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3 class="font-bold">No Active Maintenance Complaints</h3>
                    <p class="text-muted text-sm mt-1">All your room maintenance requests have been resolved by hostel staff.</p>
                </div>
            `}
        </div>
    `;
}

function renderMyComplaints(container) {
    const user = Store.getCurrentUser();
    const complaints = Store.getComplaints().filter(c => c.studentId === user.id || c.studentName === user.name);

    container.innerHTML = `
        <div class="page-header">
            <div>
                <h1 class="page-title">My Maintenance Requests</h1>
                <p class="text-muted text-sm mt-1">Full history of room complaints and resolution statuses for ${user.name}</p>
            </div>
            <button class="btn btn-primary" onclick="navigateTo('report-complaint')">
                <i class="fa-solid fa-plus-circle"></i> New Complaint
            </button>
        </div>
        <div class="grid grid-cols-2 gap-6">
            ${complaints.length ? complaints.map(c => renderComplaintCard(c)).join('') : '<p class="text-muted">No complaints found.</p>'}
        </div>
    `;
}

// ---------------- 4. REPORT COMPLAINT WIZARD ----------------
let newComplaintState = { category: '', title: '', description: '', priority: 'Medium', subcategory: '' };

function renderReportComplaint(container) {
    const user = Store.getCurrentUser();
    container.innerHTML = `
        <div class="page-header">
            <div>
                <button class="btn btn-secondary btn-sm mb-3" onclick="navigateTo('student-dashboard')">
                    <i class="fa-solid fa-arrow-left"></i> Back to Dashboard
                </button>
                <h1 class="page-title">Report Maintenance Issue</h1>
            </div>
        </div>
        
        <div class="card" style="max-width: 760px; margin: 0 auto;">
            <div class="steps">
                <div class="step active"><div class="step-circle">1</div><div class="step-label">Category</div></div>
                <div class="step"><div class="step-circle">2</div><div class="step-label">Details</div></div>
                <div class="step"><div class="step-circle">3</div><div class="step-label">Submit</div></div>
            </div>
            
            <div id="step-content">
                <h3 class="font-bold text-lg mb-2">Select Issue Category</h3>
                <p class="text-muted text-sm mb-4">Choose the type of maintenance required in Room ${user.room}:</p>

                <div class="category-grid mb-6">
                    <div class="category-card ${newComplaintState.category === 'Electrical' ? 'selected' : ''}" onclick="selectCategory(this, 'Electrical')">
                        <i class="fa-solid fa-bolt"></i>
                        <div class="font-semibold text-sm">Electrical</div>
                        <div class="text-xs text-muted">Fan, Light, Socket</div>
                    </div>
                    <div class="category-card ${newComplaintState.category === 'Plumbing' ? 'selected' : ''}" onclick="selectCategory(this, 'Plumbing')">
                        <i class="fa-solid fa-faucet-drip"></i>
                        <div class="font-semibold text-sm">Plumbing</div>
                        <div class="text-xs text-muted">Tap, Leakage, Flush</div>
                    </div>
                    <div class="category-card ${newComplaintState.category === 'Furniture' ? 'selected' : ''}" onclick="selectCategory(this, 'Furniture')">
                        <i class="fa-solid fa-chair"></i>
                        <div class="font-semibold text-sm">Furniture</div>
                        <div class="text-xs text-muted">Bed, Table, Chair, Lock</div>
                    </div>
                    <div class="category-card ${newComplaintState.category === 'Internet' ? 'selected' : ''}" onclick="selectCategory(this, 'Internet')">
                        <i class="fa-solid fa-wifi"></i>
                        <div class="font-semibold text-sm">Internet / WiFi</div>
                        <div class="text-xs text-muted">Router, LAN Port</div>
                    </div>
                    <div class="category-card ${newComplaintState.category === 'Housekeeping' ? 'selected' : ''}" onclick="selectCategory(this, 'Housekeeping')">
                        <i class="fa-solid fa-broom"></i>
                        <div class="font-semibold text-sm">Housekeeping</div>
                        <div class="text-xs text-muted">Cleaning, Trash</div>
                    </div>
                </div>

                <div class="flex justify-between items-center">
                    <div></div>
                    <button class="btn btn-primary" onclick="goToStep2()">
                        Continue to Details <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.selectCategory = function(el, category) {
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    newComplaintState.category = category;
};

window.goToStep2 = function() {
    if (!newComplaintState.category) return showToast('Please select a maintenance category first', 'error');
    
    document.getElementById('step-content').innerHTML = `
        <h3 class="font-bold text-lg mb-4">Provide Issue Details</h3>
        <div class="form-group">
            <label class="form-label">Title / Summary</label>
            <input type="text" id="c-title" class="form-control" value="${newComplaintState.title}" placeholder="E.g., Bathroom tap leaking continuously" required>
        </div>
        <div class="form-group">
            <label class="form-label">Detailed Description</label>
            <textarea id="c-desc" class="form-control" placeholder="Describe the problem, location inside room, and any urgency details...">${newComplaintState.description}</textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
                <label class="form-label">Priority Level</label>
                <select id="c-priority" class="form-control">
                    <option value="Low" ${newComplaintState.priority === 'Low' ? 'selected' : ''}>Low — Normal queue</option>
                    <option value="Medium" ${newComplaintState.priority === 'Medium' ? 'selected' : ''}>Medium — Required today</option>
                    <option value="High" ${newComplaintState.priority === 'High' ? 'selected' : ''}>High — Urgent attention</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Subcategory / Item</label>
                <input type="text" id="c-subcat" class="form-control" value="${newComplaintState.subcategory}" placeholder="E.g., Tap Washer, Ceiling Fan">
            </div>
        </div>
        <div class="flex justify-between mt-4">
            <button class="btn btn-secondary" onclick="renderReportComplaint(document.getElementById('page-content'))">Back</button>
            <button class="btn btn-primary" onclick="goToStep3()">
                Review & Confirm <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    const steps = document.querySelectorAll('.step');
    steps[0].classList.add('completed');
    steps[1].classList.add('active');
};

window.goToStep3 = function() {
    const title = document.getElementById('c-title').value.trim();
    const desc = document.getElementById('c-desc').value.trim();
    const priority = document.getElementById('c-priority').value;
    const subcat = document.getElementById('c-subcat').value.trim() || 'General';

    if (!title) return showToast('Please provide a complaint title', 'error');

    newComplaintState.title = title;
    newComplaintState.description = desc;
    newComplaintState.priority = priority;
    newComplaintState.subcategory = subcat;

    const user = Store.getCurrentUser();

    document.getElementById('step-content').innerHTML = `
        <h3 class="font-bold text-lg mb-4">Review Complaint Summary</h3>
        <div class="card mb-6" style="background: #f8fafc; border-color: var(--border-color);">
            <div class="grid grid-cols-2 gap-4">
                <div><div class="text-xs text-muted">Category</div><div class="font-semibold">${newComplaintState.category} (${newComplaintState.subcategory})</div></div>
                <div><div class="text-xs text-muted">Priority</div><div>${getPriorityBadge(newComplaintState.priority)}</div></div>
                <div style="grid-column: span 2;"><div class="text-xs text-muted">Title</div><div class="font-bold text-main">${newComplaintState.title}</div></div>
                <div style="grid-column: span 2;"><div class="text-xs text-muted">Description</div><div class="text-sm">${newComplaintState.description || 'No additional details provided.'}</div></div>
                <div style="grid-column: span 2;"><div class="text-xs text-muted">Room & Student</div><div class="font-semibold">${user.name} (${user.id}) — ${user.room}, ${user.hostel}</div></div>
            </div>
        </div>
        <div class="flex justify-between">
            <button class="btn btn-secondary" onclick="goToStep2()">Edit Details</button>
            <button class="btn btn-success" style="padding: 0.75rem 1.5rem;" onclick="submitComplaint()">
                <i class="fa-solid fa-paper-plane"></i> Submit Complaint
            </button>
        </div>
    `;

    const steps = document.querySelectorAll('.step');
    steps[1].classList.add('completed');
    steps[2].classList.add('active');
};

window.submitComplaint = function() {
    const id = Store.addComplaint(newComplaintState);
    showToast(`Complaint #${id} submitted! Warden Rinu Babu notified.`);
    newComplaintState = { category: '', title: '', description: '', priority: 'Medium', subcategory: '' };
    navigateTo(`complaint-detail:${id}`);
};

// ---------------- 5. COMPLAINT DETAILS & TIMELINE SYNC ----------------
function renderComplaintDetail(container, id) {
    const complaint = Store.getComplaint(id);
    const user = Store.getCurrentUser();

    if (!complaint) {
        return container.innerHTML = `
            <div class="card text-center" style="padding: 3rem;">
                <h3>Complaint #${id} not found</h3>
                <button class="btn btn-primary mt-4" onclick="navigateTo('${user.role}-dashboard')">Back</button>
            </div>
        `;
    }

    let actionButtons = '';

    // Admin Action Buttons
    if (user.role === 'admin') {
        actionButtons = `
            <div class="card mb-6" style="background: var(--primary-light); border-color: var(--primary);">
                <div class="flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-primary"><i class="fa-solid fa-shield-halved"></i> Warden Action Controls</h4>
                        <p class="text-xs text-muted">Update status, assign staff technician, update ETA, or add warden notes.</p>
                    </div>
                    <button class="btn btn-primary" onclick="openAdminManageModal('${complaint.id}')">
                        <i class="fa-solid fa-pen-to-square"></i> Manage Ticket #${complaint.id}
                    </button>
                </div>
            </div>
        `;
    }

    // Student Action Buttons (Escalate / Confirm Resolution)
    if (user.role === 'student') {
        if (complaint.status === 'Resolved') {
            actionButtons = `
                <div class="card mb-6" style="background: var(--success-light); border-color: var(--success);">
                    <h4 class="font-bold text-success-dark mb-2"><i class="fa-solid fa-circle-question"></i> Is your maintenance issue resolved?</h4>
                    <p class="text-xs text-muted mb-4">Please confirm if technician ${complaint.assignedTo} has successfully fixed the problem.</p>
                    <div class="flex gap-4">
                        <button class="btn btn-success" onclick="updateStatus('${id}', 'Closed', 'Student confirmed issue is fixed.')">
                            <i class="fa-solid fa-check"></i> Yes, It's Fixed
                        </button>
                        <button class="btn btn-danger" onclick="updateStatus('${id}', 'Reopened', 'Student reported issue persists.')">
                            <i class="fa-solid fa-xmark"></i> No, Still Broken
                        </button>
                    </div>
                </div>
            `;
        } else if (['Submitted', 'Under Review', 'Assigned', 'In Progress'].includes(complaint.status)) {
            actionButtons = `
                <div class="card mb-6" style="border-left: 4px solid var(--warning);">
                    <div class="flex justify-between items-center">
                        <div>
                            <h4 class="font-semibold"><i class="fa-solid fa-clock-rotate-left text-warning"></i> Need Urgent Resolution?</h4>
                            <p class="text-xs text-muted">If your complaint is delayed or requires urgent warden review, you can escalate it.</p>
                        </div>
                        <button class="btn btn-danger btn-sm" onclick="promptEscalation('${complaint.id}')">
                            <i class="fa-solid fa-triangle-exclamation"></i> Escalate to Warden
                        </button>
                    </div>
                </div>
            `;
        }
    }

    container.innerHTML = `
        <div class="page-header mb-4">
            <div>
                <button class="btn btn-secondary btn-sm mb-3" onclick="navigateTo('${user.role}-dashboard')">
                    <i class="fa-solid fa-arrow-left"></i> Back to Dashboard
                </button>
                <div class="flex items-center gap-3 mb-2">
                    <h1 class="page-title">Complaint #${complaint.id}</h1>
                    ${getStatusBadge(complaint.status)}
                    ${getPriorityBadge(complaint.priority)}
                </div>
                <div class="text-lg font-bold text-main">${complaint.title}</div>
            </div>
        </div>

        ${actionButtons}

        <div class="grid grid-cols-3 gap-6">
            <div style="grid-column: span 2;">
                <div class="card mb-6">
                    <h3 class="card-title mb-4"><i class="fa-solid fa-circle-info text-primary"></i> Complaint Details</h3>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div><div class="text-xs text-muted">Category</div><div class="font-semibold">${complaint.category} (${complaint.subcategory || 'General'})</div></div>
                        <div><div class="text-xs text-muted">Hostel Location</div><div class="font-semibold">${complaint.location.block} · Room ${complaint.location.room} (${complaint.location.hostel})</div></div>
                        <div><div class="text-xs text-muted">Student Name</div><div class="font-semibold">${complaint.studentName || 'Aryaman Saboo'}</div></div>
                        <div><div class="text-xs text-muted">Created At</div><div class="font-semibold">${formatDate(complaint.createdAt)}</div></div>
                    </div>
                    <div class="text-xs text-muted mb-1">Description</div>
                    <p class="text-sm bg-main p-3 rounded border">${complaint.description}</p>

                    ${complaint.escalatedReason ? `
                        <div class="mt-4 p-3 rounded" style="background: #fee2e2; border: 1px solid #fca5a5;">
                            <div class="text-xs font-bold text-danger"><i class="fa-solid fa-triangle-exclamation"></i> ESCALATION REASON:</div>
                            <div class="text-sm text-danger mt-1">${complaint.escalatedReason}</div>
                        </div>
                    ` : ''}
                </div>

                <div class="card">
                    <h3 class="card-title mb-4"><i class="fa-solid fa-timeline text-primary"></i> Live Progress Stepper Timeline</h3>
                    <div class="timeline">
                        ${(complaint.timeline || []).map((t, idx) => `
                            <div class="timeline-item">
                                <div class="timeline-icon ${idx === 0 ? 'completed' : 'completed'}" style="${idx === 0 ? 'background: var(--primary);' : 'background: #94a3b8;'}">
                                    <i class="fa-solid fa-check"></i>
                                </div>
                                <div class="timeline-content">
                                    <div class="timeline-date">${formatDate(t.time)}</div>
                                    <div class="timeline-title">${t.status}</div>
                                    <div class="timeline-desc">${t.desc}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div>
                <div class="card mb-6">
                    <h3 class="card-title mb-4"><i class="fa-solid fa-sliders text-primary"></i> Current Status</h3>
                    <div class="text-xl font-bold mb-1">${complaint.status}</div>
                    <p class="text-xs text-muted mb-4">
                        ${complaint.status === 'In Progress' ? 'Assigned technician is working on resolution.' : 
                          complaint.status === 'Escalated' ? 'Escalated to Hostel Warden Rinu Babu.' : 
                          complaint.status === 'Submitted' ? 'Received in VUFIX portal.' : 'Active ticket state.'}
                    </p>
                    <div style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
                        <div class="text-xs text-muted">Expected Resolution (ETA)</div>
                        <div class="font-bold text-main mb-4">${formatDate(complaint.expectedResolution)}</div>
                        
                        <div class="text-xs text-muted mb-1">Assigned Maintenance Staff</div>
                        <div class="flex items-center gap-2">
                            <div class="avatar" style="width: 28px; height: 28px; font-size: 11px;">
                                ${complaint.assignedTo && complaint.assignedTo !== 'Unassigned' ? complaint.assignedTo.charAt(0) : '?'}
                            </div>
                            <div class="font-semibold text-sm">${complaint.assignedTo || 'Unassigned'}</div>
                        </div>
                    </div>
                </div>

                ${user.role === 'admin' ? `
                    <button class="btn btn-primary btn-block" onclick="openAdminManageModal('${complaint.id}')">
                        <i class="fa-solid fa-gear"></i> Update Ticket Status & Staff
                    </button>
                ` : ''}
            </div>
        </div>
    `;
}

window.updateStatus = function(id, status, desc) {
    Store.updateComplaintStatus(id, status, desc);
    showToast(`Status updated to ${status}`);
    renderComplaintDetail(document.getElementById('page-content'), id);
};

window.promptEscalation = function(id) {
    const reason = prompt("Why are you escalating this complaint to Warden Rinu Babu?", "Resolution delayed past estimated timeline.");
    if (reason !== null) {
        Store.escalateComplaint(id, reason);
        showToast(`Complaint #${id} ESCALATED to Warden!`, 'error');
        renderComplaintDetail(document.getElementById('page-content'), id);
    }
};

// ---------------- 6. ADMIN / HOSTEL WARDEN PORTAL ----------------
let adminFilterStatus = 'All';
let adminFilterCategory = 'All';

function renderAdminDashboard(container, forceFilter = null) {
    if (forceFilter) adminFilterStatus = forceFilter;

    const complaints = Store.getComplaints();
    const technicians = Store.getTechnicians();

    // Overview Stats
    const totalCount = complaints.length;
    const pendingCount = complaints.filter(c => ['Submitted', 'Under Review'].includes(c.status)).length;
    const inProgressCount = complaints.filter(c => ['Assigned', 'In Progress', 'On Hold'].includes(c.status)).length;
    const escalatedCount = complaints.filter(c => c.status === 'Escalated').length;
    const resolvedCount = complaints.filter(c => ['Resolved', 'Closed'].includes(c.status)).length;

    // Filtered Complaints
    let filtered = complaints;
    if (adminFilterStatus !== 'All') {
        filtered = filtered.filter(c => c.status === adminFilterStatus);
    }
    if (adminFilterCategory !== 'All') {
        filtered = filtered.filter(c => c.category === adminFilterCategory);
    }

    const escalatedTickets = complaints.filter(c => c.status === 'Escalated');

    container.innerHTML = `
        <div class="page-header">
            <div>
                <h1 class="page-title">Hostel Warden Management Portal 🛡️</h1>
                <p class="text-muted text-sm mt-1">Logged in as Warden <strong>Rinu Babu</strong> (Admin ID: ADM-WARDEN-01)</p>
            </div>
            <div class="flex gap-2">
                <button class="btn btn-secondary btn-sm" onclick="Store.resetToDefaults(); renderApp(); showToast('Demo data reset successfully');">
                    <i class="fa-solid fa-rotate-left"></i> Reset Demo Data
                </button>
            </div>
        </div>

        <!-- Overview Stat Cards -->
        <div class="grid grid-cols-5 gap-4 mb-6">
            <div class="stat-card" onclick="setAdminFilter('All')" style="cursor: pointer;">
                <div class="stat-icon"><i class="fa-solid fa-list-ul"></i></div>
                <div class="stat-content">
                    <h4>Total Tickets</h4>
                    <div class="stat-value">${totalCount}</div>
                </div>
            </div>
            <div class="stat-card" onclick="setAdminFilter('Submitted')" style="cursor: pointer;">
                <div class="stat-icon" style="color: var(--warning); background: var(--warning-light);"><i class="fa-solid fa-clock"></i></div>
                <div class="stat-content">
                    <h4>Pending Review</h4>
                    <div class="stat-value">${pendingCount}</div>
                </div>
            </div>
            <div class="stat-card" onclick="setAdminFilter('In Progress')" style="cursor: pointer;">
                <div class="stat-icon" style="color: var(--primary); background: var(--primary-light);"><i class="fa-solid fa-screws-tilted"></i></div>
                <div class="stat-content">
                    <h4>In Progress</h4>
                    <div class="stat-value">${inProgressCount}</div>
                </div>
            </div>
            <div class="stat-card" onclick="setAdminFilter('Escalated')" style="cursor: pointer; ${escalatedCount > 0 ? 'border-color: #fca5a5; background: #fff5f5;' : ''}">
                <div class="stat-icon" style="color: var(--danger); background: var(--danger-light);"><i class="fa-solid fa-triangle-exclamation"></i></div>
                <div class="stat-content">
                    <h4>Escalated</h4>
                    <div class="stat-value text-danger">${escalatedCount}</div>
                </div>
            </div>
            <div class="stat-card" onclick="setAdminFilter('Resolved')" style="cursor: pointer;">
                <div class="stat-icon" style="color: var(--success); background: var(--success-light);"><i class="fa-solid fa-circle-check"></i></div>
                <div class="stat-content">
                    <h4>Resolved</h4>
                    <div class="stat-value">${resolvedCount}</div>
                </div>
            </div>
        </div>

        <!-- Urgent Escalation Banner -->
        ${escalatedTickets.length > 0 ? `
            <div class="alert-urgent">
                <div class="flex items-center gap-4">
                    <div class="alert-urgent-icon">
                        <i class="fa-solid fa-bell text-white"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-danger"><i class="fa-solid fa-circle-exclamation"></i> ${escalatedTickets.length} Urgent Escalated Ticket(s) Require Warden Attention!</h4>
                        <p class="text-xs text-muted">Students have flagged high priority delays. Review and reassign technicians immediately.</p>
                    </div>
                </div>
                <button class="btn btn-danger btn-sm" onclick="setAdminFilter('Escalated')">
                    View Escalations (${escalatedTickets.length})
                </button>
            </div>
        ` : ''}

        <!-- Filter Bar -->
        <div class="card mb-6">
            <div class="filter-bar">
                <div class="filter-tabs">
                    <button class="filter-tab ${adminFilterStatus === 'All' ? 'active' : ''}" onclick="setAdminFilter('All')">All</button>
                    <button class="filter-tab ${adminFilterStatus === 'Submitted' ? 'active' : ''}" onclick="setAdminFilter('Submitted')">Pending</button>
                    <button class="filter-tab ${adminFilterStatus === 'In Progress' ? 'active' : ''}" onclick="setAdminFilter('In Progress')">In Progress</button>
                    <button class="filter-tab ${adminFilterStatus === 'Escalated' ? 'active' : ''}" onclick="setAdminFilter('Escalated')">🚨 Escalated</button>
                    <button class="filter-tab ${adminFilterStatus === 'Resolved' ? 'active' : ''}" onclick="setAdminFilter('Resolved')">Resolved</button>
                </div>

                <div class="flex items-center gap-2">
                    <label class="text-xs font-semibold text-muted">Category:</label>
                    <select class="form-control" style="width: auto; padding: 0.35rem 0.75rem;" onchange="setAdminCategoryFilter(this.value)">
                        <option value="All" ${adminFilterCategory === 'All' ? 'selected' : ''}>All Categories</option>
                        <option value="Electrical" ${adminFilterCategory === 'Electrical' ? 'selected' : ''}>Electrical</option>
                        <option value="Plumbing" ${adminFilterCategory === 'Plumbing' ? 'selected' : ''}>Plumbing</option>
                        <option value="Furniture" ${adminFilterCategory === 'Furniture' ? 'selected' : ''}>Furniture</option>
                        <option value="Internet" ${adminFilterCategory === 'Internet' ? 'selected' : ''}>Internet</option>
                    </select>
                </div>
            </div>

            <!-- Complaints Table -->
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student & Room</th>
                            <th>Title & Category</th>
                            <th>Priority</th>
                            <th>Assigned Staff</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filtered.length ? filtered.map(c => `
                            <tr style="${c.status === 'Escalated' ? 'background: #fff5f5;' : ''}">
                                <td class="font-bold text-primary">#${c.id}</td>
                                <td>
                                    <div class="font-semibold text-main">${c.studentName || 'Aryaman Saboo'}</div>
                                    <div class="text-xs text-muted">${c.location.block} · Room ${c.location.room}</div>
                                </td>
                                <td>
                                    <div class="font-semibold text-main">${c.title}</div>
                                    <div class="text-xs text-muted"><i class="fa-solid fa-tag"></i> ${c.category}</div>
                                </td>
                                <td>${getPriorityBadge(c.priority)}</td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <div class="avatar" style="width: 24px; height: 24px; font-size: 10px;">
                                            ${c.assignedTo !== 'Unassigned' ? c.assignedTo.charAt(0) : '?'}
                                        </div>
                                        <span class="text-xs font-semibold">${c.assignedTo || 'Unassigned'}</span>
                                    </div>
                                </td>
                                <td>${getStatusBadge(c.status)}</td>
                                <td>
                                    <div class="flex gap-2">
                                        <button class="btn btn-primary btn-sm" onclick="openAdminManageModal('${c.id}')">
                                            <i class="fa-solid fa-pen-to-square"></i> Manage
                                        </button>
                                        <button class="btn btn-secondary btn-sm" onclick="navigateTo('complaint-detail:${c.id}')">
                                            <i class="fa-solid fa-eye"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="7" class="text-center py-6 text-muted">No complaints matching the selected filter.</td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

window.setAdminFilter = function(status) {
    adminFilterStatus = status;
    renderAdminDashboard(document.getElementById('page-content'));
};

window.setAdminCategoryFilter = function(category) {
    adminFilterCategory = category;
    renderAdminDashboard(document.getElementById('page-content'));
};

// ---------------- 7. ADMIN COMPLAINT MANAGEMENT MODAL ----------------
window.openAdminManageModal = function(id) {
    const complaint = Store.getComplaint(id);
    const technicians = Store.getTechnicians();
    const modalContainer = document.getElementById('modal-container');

    if (!complaint || !modalContainer) return;

    modalContainer.innerHTML = `
        <div class="modal-backdrop" onclick="closeAdminManageModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <div>
                        <h3 class="font-bold text-lg">Manage Ticket #${complaint.id}</h3>
                        <p class="text-xs text-muted">${complaint.studentName} — Room ${complaint.location.room} (${complaint.location.block})</p>
                    </div>
                    <button class="modal-close-btn" onclick="closeAdminManageModal()"><i class="fa-solid fa-xmark"></i></button>
                </div>

                <form onsubmit="saveAdminTicketChanges(event, '${complaint.id}')">
                    <div class="form-group mb-4">
                        <label class="form-label">Update Ticket Status</label>
                        <select id="modal-status" class="form-control">
                            <option value="Submitted" ${complaint.status === 'Submitted' ? 'selected' : ''}>Submitted — Pending Review</option>
                            <option value="Under Review" ${complaint.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
                            <option value="Assigned" ${complaint.status === 'Assigned' ? 'selected' : ''}>Assigned to Technician</option>
                            <option value="In Progress" ${complaint.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option value="On Hold" ${complaint.status === 'On Hold' ? 'selected' : ''}>On Hold (Parts Required)</option>
                            <option value="Resolved" ${complaint.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                            <option value="Closed" ${complaint.status === 'Closed' ? 'selected' : ''}>Closed</option>
                            <option value="Escalated" ${complaint.status === 'Escalated' ? 'selected' : ''}>Escalated (Urgent)</option>
                        </select>
                    </div>

                    <div class="form-group mb-4">
                        <label class="form-label">Assign Staff Technician</label>
                        <select id="modal-technician" class="form-control">
                            <option value="Unassigned">Unassigned</option>
                            ${technicians.map(t => `
                                <option value="${t.name}" ${complaint.assignedTo === t.name ? 'selected' : ''}>
                                    ${t.name} — ${t.category} (${t.phone})
                                </option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="form-group mb-4">
                        <label class="form-label">Estimated Resolution Date (ETA)</label>
                        <input type="text" id="modal-eta" class="form-control" value="${complaint.expectedResolution || '2026-09-22'}" placeholder="YYYY-MM-DD">
                    </div>

                    <div class="form-group mb-4">
                        <label class="form-label">Internal Warden / Maintenance Note</label>
                        <textarea id="modal-note" class="form-control" placeholder="Add update notes visible in student timeline (e.g. Technician dispatched with replacement parts)..."></textarea>
                    </div>

                    <div class="flex justify-between items-center mt-6 pt-4" style="border-top: 1px solid var(--border-color)">
                        <button type="button" class="btn btn-secondary" onclick="closeAdminManageModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary" style="padding: 0.65rem 1.25rem;">
                            <i class="fa-solid fa-floppy-disk"></i> Save & Push Live Updates
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
};

window.closeAdminManageModal = function(e) {
    if (e && e.target !== e.currentTarget) return;
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) modalContainer.innerHTML = '';
};

window.saveAdminTicketChanges = function(e, id) {
    e.preventDefault();
    const newStatus = document.getElementById('modal-status').value;
    const assignedTo = document.getElementById('modal-technician').value;
    const eta = document.getElementById('modal-eta').value;
    const note = document.getElementById('modal-note').value.trim();

    Store.updateComplaintStatusByAdmin(id, newStatus, assignedTo, eta, note);
    closeAdminManageModal();
    showToast(`Ticket #${id} updated! Live sync pushed to student timeline.`);
    
    // Refresh current view
    const user = Store.getCurrentUser();
    if (user.role === 'admin') {
        renderAdminDashboard(document.getElementById('page-content'));
    } else {
        renderComplaintDetail(document.getElementById('page-content'), id);
    }
// ---------------- PROFESSOR'S DELIVERABLES CHECKLIST MODAL ----------------
window.openProfessorChecklistModal = function() {
    const modalContainer = document.getElementById('modal-container') || document.body;
    let target = document.getElementById('modal-container');
    if (!target) {
        target = document.createElement('div');
        target.id = 'modal-container';
        document.body.appendChild(target);
    }

    target.innerHTML = `
        <div class="modal-overlay" onclick="closeProfessorChecklistModal(event)">
            <div class="modal-card" style="max-width: 900px; width: 95%; max-height: 90vh; overflow-y: auto;" onclick="event.stopPropagation()">
                <div class="modal-header" style="background: linear-gradient(135deg, #1e1b4b, #312e81); color: white; padding: 1.25rem 1.5rem; border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
                    <div>
                        <div class="text-xs" style="color: #a5b4fc; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">
                            <i class="fa-solid fa-graduation-cap"></i> STET301 End-Term Examination
                        </div>
                        <h3 style="color: white; font-weight: 800; font-size: 1.25rem; margin-top: 0.25rem;">
                            Quick Deliverable Navigation (Professor's Checklist)
                        </h3>
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="closeProfessorChecklistModal()" style="background: rgba(255,255,255,0.15); border: none; color: white;">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                
                <div style="padding: 1.5rem;">
                    <p class="text-muted text-sm mb-4">
                        All examination requirements have been prepared according to the STET301 prompt and rubrics (40 Marks). Click any direct link below to launch or view:
                    </p>

                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                            <thead>
                                <tr style="background: #f1f5f9; border-bottom: 2px solid #e2e8f0; text-align: left;">
                                    <th style="padding: 0.75rem 1rem;">Deliverable</th>
                                    <th style="padding: 0.75rem 1rem;">Description</th>
                                    <th style="padding: 0.75rem 1rem; text-align: right;">Direct Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 0.75rem 1rem; font-weight: 700; color: #1e1b4b;">📱 Live Production Web App</td>
                                    <td style="padding: 0.75rem 1rem; color: #64748b;">Fully interactive hostel maintenance portal with 3-step wizard, status tracking, filters, and role switcher.</td>
                                    <td style="padding: 0.75rem 1rem; text-align: right;">
                                        <button class="btn btn-primary btn-sm" onclick="closeProfessorChecklistModal(); renderApp();" style="font-size: 0.75rem;">Launch VUFIX App</button>
                                    </td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; background: #fafafa;">
                                    <td style="padding: 0.75rem 1rem; font-weight: 700; color: #4338ca;">📊 5-Minute Presentation Deck</td>
                                    <td style="padding: 0.75rem 1rem; color: #64748b;">7-slide 16:9 presentation deck pre-formatted with pitch cues, timer, and 1-click PDF export.</td>
                                    <td style="padding: 0.75rem 1rem; text-align: right;">
                                        <a href="presentation/presentation_deck.html" target="_blank" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; text-decoration: none; border-color: #6366f1; color: #4f46e5;">Open Presentation Deck</a>
                                    </td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; background: #eff6ff;">
                                    <td style="padding: 0.75rem 1rem; font-weight: 700; color: #1d4ed8;">🌐 Live Behance Case Study (URL)</td>
                                    <td style="padding: 0.75rem 1rem; color: #1e40af;">Official published project URL for STET301 Examination Submission.</td>
                                    <td style="padding: 0.75rem 1rem; text-align: right;">
                                        <a href="https://www.behance.net/gallery/256325853/UIUX-Project" target="_blank" class="btn btn-primary btn-sm" style="font-size: 0.75rem; text-decoration: none; background: #0057ff;">View on Behance ↗</a>
                                    </td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 0.75rem 1rem; font-weight: 700; color: #0057ff;">🎨 Behance 1400px Showcase Board</td>
                                    <td style="padding: 0.75rem 1rem; color: #64748b;">Full visual presentation board formatted to Behance dimensions with embedded screenshots, metrics, and quotes.</td>
                                    <td style="padding: 0.75rem 1rem; text-align: right;">
                                        <a href="showcase/behance_showcase_1400px.html" target="_blank" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; text-decoration: none; border-color: #0057ff; color: #0057ff;">Open Behance Showcase</a>
                                    </td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; background: #fafafa;">
                                    <td style="padding: 0.75rem 1rem; font-weight: 700; color: #0f172a;">📝 Behance Markdown Blueprint</td>
                                    <td style="padding: 0.75rem 1rem; color: #64748b;">Exhaustive case study narrative formatted for Behance project publication.</td>
                                    <td style="padding: 0.75rem 1rem; text-align: right;">
                                        <a href="docs/BEHANCE_BLUEPRINT.md" target="_blank" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; text-decoration: none;">Read Behance Blueprint</a>
                                    </td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 0.75rem 1rem; font-weight: 700; color: #0f172a;">📋 Behance Metadata & Tags</td>
                                    <td style="padding: 0.75rem 1rem; color: #64748b;">Copy-paste project title, summary, creative fields, tags, and publishing steps.</td>
                                    <td style="padding: 0.75rem 1rem; text-align: right;">
                                        <a href="docs/BEHANCE_METADATA.md" target="_blank" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; text-decoration: none;">Read Behance Metadata</a>
                                    </td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; background: #fafafa;">
                                    <td style="padding: 0.75rem 1rem; font-weight: 700; color: #059669;">🧪 Usability Testing Report (25%)</td>
                                    <td style="padding: 0.75rem 1rem; color: #64748b;">Think-aloud testing logs across 5 campus stakeholders and 10 Nielsen Heuristics evaluation.</td>
                                    <td style="padding: 0.75rem 1rem; text-align: right;">
                                        <a href="docs/USABILITY_TESTING_REPORT.md" target="_blank" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; text-decoration: none; border-color: #10b981; color: #059669;">Read Usability Report</a>
                                    </td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 0.75rem 1rem; font-weight: 700; color: #d97706;">👥 Peer Benchmarking Report (25%)</td>
                                    <td style="padding: 0.75rem 1rem; color: #64748b;">Comparative analysis against 3 classmates (Kunal/Ganesh, Prasad, Neermay).</td>
                                    <td style="padding: 0.75rem 1rem; text-align: right;">
                                        <a href="docs/PEER_BENCHMARKING_REPORT.md" target="_blank" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; text-decoration: none; border-color: #f59e0b; color: #d97706;">Read Peer Benchmarking</a>
                                    </td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0; background: #fafafa;">
                                    <td style="padding: 0.75rem 1rem; font-weight: 700; color: #7c3aed;">📑 Mid-Term Research Case Study</td>
                                    <td style="padding: 0.75rem 1rem; color: #64748b;">Original academic paper covering Personas, Empathy Map, Card Sort, and IA Trees V1/V2.</td>
                                    <td style="padding: 0.75rem 1rem; text-align: right;">
                                        <a href="docs/MIDTERM_RESEARCH_CASE_STUDY.md" target="_blank" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; text-decoration: none; border-color: #8b5cf6; color: #7c3aed;">Read Research Paper</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0.75rem 1rem; font-weight: 700; color: #475569;">📐 Figma Design Source</td>
                                    <td style="padding: 0.75rem 1rem; color: #64748b;">Original UI wireframes and interactive flows documented with full visual tokens.</td>
                                    <td style="padding: 0.75rem 1rem; text-align: right;">
                                        <a href="docs/MIDTERM_RESEARCH_CASE_STUDY.md#5-information-architecture-evolution-from-v1-to-v2" target="_blank" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; text-decoration: none;">View Figma Specs</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="mt-4 pt-3 text-right" style="border-top: 1px solid #e2e8f0;">
                        <button class="btn btn-secondary" onclick="closeProfessorChecklistModal()">Close Modal</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

window.closeProfessorChecklistModal = function(e) {
    if (e && e.target !== e.currentTarget) return;
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) modalContainer.innerHTML = '';
};

// ---------------- INIT APP ----------------
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});
