# BEHANCE CASE STUDY: MASTER BLUEPRINT & NARRATIVE

**Target Publishing Platform**: Behance Project Creator  
**Live URL**: [https://www.behance.net/gallery/256325853/UIUX-Project](https://www.behance.net/gallery/256325853/UIUX-Project)  
**Author**: Parth Pawar (2024VUGP0021 / 2024SEPVUGP0021)  
**Institution**: Vijaybhoomi University, School of Science & Technology  
**Course**: STET301 — Human Computer Interaction (End-Term Examination)  
**Format Target**: Behance Case Study Long-Form Publishing Narrative  
**Visual Companion**: [`showcase/behance_showcase_1400px.html`](../showcase/behance_showcase_1400px.html)  

---

## 🎨 Project Hero & Abstract

### Case Study Title
**VUFIX — Designing Frictionless Hostel Maintenance & Facilities Management**

### Headline
**A Dual-Role Progressive Web Ecosystem for Campus Facilities Management**  
*“How we transformed hostel maintenance from a paper-register system into a simple, transparent, and resilient digital system with an 89.0 SUS Usability Score and 96% Task Completion Rate at Vijaybhoomi University.”*

### Executive Impact Highlights
- **89.0 / 100 — System Usability Scale (SUS) Score**: Improved from a 64.5 baseline (Grade D to Grade A+ Superior).
- **96.0% — Task Completion Rate**: Based on 5 benchmark tasks with zero abandoned submissions.
- **38 Seconds — Average Complaint Filing Time**: Reduced from an average of 124 seconds (69% faster).
- **100% — Verified Resolution Closure Rate**: Students confirm whether the issue is actually fixed before the complaint is archived.

---

## 01 / The Context & Problem Discovery

At a residential university campus with more than 1,200 students across 4 hostel blocks, hostel maintenance problems are constant: leaking taps, broken ceiling fans, damaged chairs, blown electrical sockets, and unstable Wi-Fi.

Earlier, students mainly reported these problems through physical registers at the hostel security desk.

Our research identified three major systemic problems:

1. **The Communication Problem**: After writing a complaint in the register, students had no easy way to know what was happening. There were no digital updates or tracking. Students often had to visit the warden office or contact staff repeatedly.
2. **Wrong Technician Assignment**: Complaints were managed manually. An electrical issue could easily be sent to a plumber or a plumbing issue to an electrician, creating 48-hour resolution lags and immense administrative confusion.
3. **Phantom Resolutions**: Complaints were marked as completed by staff on paper without resident confirmation. Students returned from class only to find the problem still unresolved.

---

## 02 / Empathy Modeling & User Personas

We designed VUFIX by analyzing the needs of both students and hostel staff:

### Persona 1: The Student — Parth Pawar
- **Profile**: 3rd Year B.Tech CSE student and resident of Room A1-101 (Hostel A).
- **Mental Model**: Digital native comfortable with technology who prefers fast, minimal, and predictable interactions.
- **Key Pain Point**: Complete uncertainty regarding when staff will arrive at his room.
- **Core Need**: Submit a complaint in under 60 seconds, track live progress, and receive direct escalation options.

### Persona 2: The Warden — Rinu Babu
- **Profile**: Hostel Warden managing multiple residential blocks and facilities staff.
- **Mental Model**: High-volume administrator handling hundreds of daily tickets, staff schedules, and urgent escalations.
- **Key Pain Point**: Flooded by duplicate phone calls, WhatsApp pings, and missed emergencies.
- **Core Need**: High-density dashboard to view all tickets in one place, filter by urgency, and assign specialized technicians.

---

## 03 / The Solution: Core Interaction Mechanics

We designed VUFIX using clear interaction patterns based on Jakob Nielsen’s usability principles:

1. **Guided 3-Step Complaint Form (`Category` ➔ `Details` ➔ `Review & Confirm`)**: Instead of a long intimidating form, progressive disclosure breaks filing into three lightweight steps.
2. **Live Complaint Status (`Submitted` ➔ `Assigned` ➔ `In Progress` ➔ `Resolved`)**: Students can see the live milestone status of their complaint in real time.
3. **24h SLA Escalation**: If a complaint takes longer than the allowed time, the student can escalate the issue directly to the Warden. A 24-hour timer prevents premature triggers.
4. **Resolution Verification**: Students choose between **“Yes, It’s Fixed”** or **“No, Still Broken”**, ensuring mandatory resident sign-off before ticket archiving.

---

## 04 / Usability Testing & Heuristic Breakdown (25% Weightage)

We tested the interactive prototype using the Think-Aloud method with 5 campus stakeholders:
- **Aryan S.** — 3rd Year CS Hostelite
- **Ansh** — 2nd Year Design Hostelite
- **Anirudh** — 1st Year Hostelite
- **Anton Singh** — 4th Year B.Tech Hostelite
- **Mr. Dilip Rao** — Warden Office Assistant

### Heuristic Analysis & Refinements
- **Heuristic #2 (Match with Real World)**: Users were confused whether a desk lamp socket was Electrical or Furniture.  
  *Fix*: Added explicit micro-labels under category selector cards (*Electrical: Fan, Socket, Geyser; Furniture: Desk, Chair, Lock*).
- **Heuristic #5 (Error Prevention)**: Users tried to escalate complaints 10 minutes after submitting.  
  *Fix*: Added a 24-hour SLA countdown timer before escalation becomes active.
- **Heuristic #6 (Recognition Over Recall)**: Warden assistant struggled to identify technicians by name alone.  
  *Fix*: Added specialty badges (*Plumbing Specialist, Electrical Specialist, IT Helpdesk*) and automatic category skill matching.
- **Heuristic #3 (User Control & Freedom)**: Students feared clicking "Still Broken" would erase their ticket history.  
  *Fix*: Added an explanatory confirmation dialog stating that all ticket logs are preserved with high priority.

---

## 05 / Architectural Stress-Testing

- **Double Clicking**: Protected against race conditions and duplicate submissions via button debouncing and loading states.
- **Multiple Tabs**: Synchronized state across student and admin tabs via reactive `storage` events.
- **Unsafe Input**: Protected against script injections and extreme text lengths using safe text escaping and CSS word-break bounding.

---

## 06 / Peer Benchmarking & Discussion (25% Weightage)

### Direct Comparison: Aryaman Saboo — FretBox Complaint App (Same Domain)
- **Their Model**: Monolithic single-scroll form with external WhatsApp webhook link.
- **Why VUFIX Has a Superior USP & Better Model**:
  1. **69% Faster Filing (38s vs 124s)** via our 3-step progressive wizard vs their long form.
  2. **In-App Live Stepper** eliminates fragmented external WhatsApp redirects and preserves digital auditability.
  3. **Mandatory Two-Way Student Verification** ensures zero phantom closures.
- **Learnings Adopted**: Added a direct 1-tap `tel:` phone shortcut on technician profile cards for emergency calling.

### Comparison: Prasad Kakad — VU-ITDesk (Campus IT Helpdesk)
- **Their Model**: Complex 8-stage ITIL hierarchy with technical taxonomy.
- **VUFIX Model**: Simplified 5-milestone stepper tailored for dormitory life.
- **Learnings Adopted**: Added explicit Warden Resolution ETA timestamps.

### Comparison: Neermay — CampusServe (Facilities & Mess)
- **Their Model**: Door QR codes with 48h auto-closure policy without resident confirmation.
- **VUFIX Model**: Active two-way student verification dialog.
- **Learnings Adopted**: High-contrast status badges and clear step timestamps.

---

## 07 / Reflection on Creative Downtime

*“If you wanna take full advantage of the creative potential of downtime, you have to allow yourself the space and time to get bored... then your brain switches gears and it starts to wander and tell stories and paint pictures and suddenly, you might have an idea.”* — **Kyle T. Webster**

While working on VUFIX, we realized that hostel maintenance is not only about fixing broken hardware; it is about **reducing cognitive friction and psychological anxiety**. VUFIX transforms a stressful paper register chore into a seamless, transparent, and student-centered digital experience.
