# MASTER PROMPTS — VUFIX Hostel Maintenance System

This file contains the complete master working prompts for both Web and Mobile Application development.

---

## 💻 1. Web Application Master Prompt

```markdown
Build a complete, responsive Single-Page Web Application (SPA) named "VUFIX" — a Hostel Maintenance & Complaint Management System.

### Technology Stack & Architecture
- Core: Vanilla HTML5, JavaScript (ES6+), Vanilla CSS3.
- Data & State: LocalStorage persistent reactive state store (`store.js`). Zero external framework dependencies.
- Design System: Custom CSS tokens, glassmorphism card elevation, curated dark indigo & HSL color palette, smooth micro-animations, and FontAwesome icons.

### Key Users & Default Profiles
1. Primary Student Profile:
   - Name: Aryaman Saboo
   - Roll No: ST20230042
   - Email: aryaman.saboo@vijaybhoomi.edu.in
   - Hostel & Room: Hostel A, Block B3, Room B3-304
   - Avatar: AS
2. Secondary Student Preset:
   - Name: Parth Pawar (ST20230088, parth.pawar@vijaybhoomi.edu.in, Room A1-101)
3. Hostel Warden / Admin Profile:
   - Name: Rinu Babu
   - Title: Hostel Warden
   - Admin ID: ADM-WARDEN-01
   - Email: rinu.babu@vijaybhoomi.edu.in
   - Avatar: RB

### Detailed Feature Requirements

1. Fretbox-Inspired Tabbed Login Screen:
   - 3 interactive tabs: "Student Login", "Student Sign Up", and "Warden / Admin Login".
   - Quick Fill Demo Preset Buttons:
     - ⚡ Quick Fill Student (Aryaman Saboo)
     - 🛡️ Quick Fill Hostel Warden (Rinu Babu)
     - 👤 Quick Fill Student (Parth Pawar)
   - Mock sign-up form allowing new student registration.

2. Student Maintenance Portal:
   - Header greeting: "Welcome back, Aryaman Saboo 👋" with roll, room, and email badges.
   - Summary stat cards: Active Requests, Resolved Issues, Escalated Tickets.
   - Guided 3-step complaint submission wizard (Select Category -> Enter Details -> Review & Submit).
   - "My Complaints" list with filter and status pills.
   - Live Stepper Timeline showing progress updates, assigned technician, and ETA.
   - "Escalate to Warden" button for delayed complaints with prompt modal.
   - Confirmation prompt when ticket is marked "Resolved" ("Yes, It's Fixed" / "No, Still Broken").

3. Hostel Warden Management Portal:
   - Admin overview dashboard displaying summary stats (Total, Pending, In Progress, Urgent Escalations, Resolved).
   - Urgent Escalation Banner highlighting student-escalated tickets with direct action buttons.
   - Filter bar with status buttons (All, Pending, In Progress, 🚨 Escalated, Resolved) and category dropdown.
   - Interactive Ticket Management Modal:
     - Update status (Submitted, Under Review, Assigned, In Progress, On Hold, Resolved, Closed, Escalated).
     - Assign staff technician from roster (Ramesh Kumar — Electrical, Suresh Sharma — Plumbing, Vikas Patil — IT, Sunita Devi — Housekeeping).
     - Set/extend resolution ETA date.
     - Add internal maintenance notes that automatically push to the student's live timeline.
```

---

## 📱 2. Mobile Web Application Prompt

```markdown
Design and build a Mobile-First Progressive Web Application (PWA) called "VUFIX Mobile" for Hostel Maintenance & Ticket Tracking.

### Mobile UX & UI Design Guidelines
- Device Target: Optimized for mobile viewports (375px–430px) with responsive scaling for tablet/desktop.
- Layout Architecture:
  - Sticky Top Bar: App logo ("VUFIX"), active role badge, user avatar, and notification bell.
  - Fixed Bottom Navigation Bar: Icons for [Home Dashboard], [Report Issue (+)], [Track Tickets], and [Profile].
  - Bottom Sheet Modals: Slide-up modal drawers for ticket management, status updates, and technician assignment.
- Visual Aesthetics: Dark mode accent background (#0f172a / #312e81), vibrant status badges, HSL surface colors, 48px+ touch targets, and smooth pull-to-refresh feel.

### Core Mobile Workflows

1. Authentication & Onboarding (Mobile Cards):
   - Segmented tab control for [Student Login], [Sign Up], and [Warden Login].
   - Quick-fill 1-tap preset chips for instant login as Aryaman Saboo (Student) or Rinu Babu (Warden).

2. Student Mobile Experience:
   - Floating Action Button (FAB) or bottom nav '+' button to trigger instant 3-step complaint wizard.
   - Touch-friendly category grid cards with icons (Electrical ⚡, Plumbing 🚰, Furniture 🪑, WiFi 📶).
   - Vertical Stepper Timeline with live progress status icons, assigned technician details, and call technician action button (`tel:` link).
   - 1-Tap "Escalate to Warden" button for overdue maintenance requests.

3. Warden Mobile Management Experience:
   - Mobile Warden Dashboard with horizontal stat carousel cards.
   - Slide-up Bottom Sheet for Ticket Management:
     - Status picker pill selector.
     - Technician assignment dropdown (Ramesh Kumar, Suresh Sharma, Vikas Patil, Sunita Devi).
     - Date picker for resolution ETA.
     - Quick notes text area.
   - Urgent Escalations Push Alert Banner on top of dashboard.

### PWA Capabilities
- Include manifest.json configuration for "Add to Home Screen" capability.
- Service worker caching for offline access to submitted ticket history.
- LocalStorage state persistence for seamless offline-to-online experience.
```
