# VUFIX — Hostel Maintenance & Management Portal

**VUFIX** is a modern, responsive single-page web application (SPA) built with Vanilla JavaScript, HTML5, and CSS3 for managing hostel room maintenance complaints, technician assignment, status tracking, and student-warden communications.

---

## ⚡ Key Features

- **Dual Portal & Role-Based Management**:
  - **Student Portal (Aryaman Saboo)**: Report room complaints, track live stepper progress, confirm resolutions, or escalate delayed issues to the Warden.
  - **Hostel Warden Portal (Warden Rinu Babu)**: View overview statistics, urgent escalation banners, filter complaints by category/status, assign staff technicians, set resolution ETAs, and add live timeline notes.
- **Fretbox-Style Tabbed Login Screen**:
  - Student Login (prefilled for **Aryaman Saboo**)
  - Student Sign Up (Mock registration for new students)
  - Admin / Warden Login (prefilled for **Warden Rinu Babu**)
  - ⚡ Quick-fill demo presets for instant 1-click role switching.
- **Real-Time Timeline Stepper & Live Sync**:
  - Live progress stepper updates instantly across browser sessions via `localStorage`.

---

## 📂 Repository File Structure

```
Hostel_Maintenance_App/
├── index.html            # Main web application entrypoint
├── single_page_app.html   # Standalone all-in-one HTML bundle
├── css/
│   └── style.css         # Modern design tokens, glassmorphism, responsive styles
├── js/
│   ├── store.js          # Reactive state store, default identities & localStorage API
│   └── app.js            # UI rendering engine, Fretbox tabs, Warden modal & routing
└── README.md             # Repository documentation
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Opening
Simply open [`index.html`](file:///Users/aryamansaboo/Downloads/Hostel_Maintenance_App/index.html) or [`single_page_app.html`](file:///Users/aryamansaboo/Downloads/Hostel_Maintenance_App/single_page_app.html) directly in any browser (Chrome, Safari, Edge, Firefox).

### Option 2: Local HTTP Server
Run a simple HTTP server in the project directory:

```bash
# Using Python 3
python3 -m http.server 8080

# Using Node npx serve
npx serve .
```

Then visit:
- **Main App**: [http://localhost:8080/index.html](http://localhost:8080/index.html)
- **Standalone Version**: [http://localhost:8080/single_page_app.html](http://localhost:8080/single_page_app.html)

---

## 👤 Pre-Configured Demo Accounts

1. **Student Account (Primary)**:
   - **Name**: Aryaman Saboo
   - **Roll No**: `ST20230042`
   - **Email**: `aryaman.saboo@vijaybhoomi.edu.in`
   - **Room**: `B3-304` (`Hostel A`, `Block B3`)

2. **Hostel Warden / Admin Account**:
   - **Name**: Rinu Babu
   - **Title**: Hostel Warden
   - **Admin ID**: `ADM-WARDEN-01`
   - **Email**: `rinu.babu@vijaybhoomi.edu.in`

3. **Student Account (Secondary)**:
   - **Name**: Parth Pawar
   - **Roll No**: `ST20230088`
   - **Email**: `parth.pawar@vijaybhoomi.edu.in`
   - **Room**: `A1-101` (`Hostel A`, `Block A1`)
