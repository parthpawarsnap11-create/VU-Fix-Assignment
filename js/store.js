// Mock Database & State Management — VUFIX

const defaultData = {
    users: {
        student: { 
            id: '2024VUGP0021', 
            name: 'Parth Pawar', 
            role: 'student', 
            hostel: 'Hostel A', 
            block: 'A1', 
            room: 'A1-101', 
            email: 'parth.pawar@vijaybhoomi.edu.in', 
            avatar: 'PP' 
        },
        student2: { 
            id: '2024VUGP0055', 
            name: 'Ananya Sharma', 
            role: 'student', 
            hostel: 'Hostel B', 
            block: 'B2', 
            room: 'B2-205', 
            email: 'ananya.sharma@vijaybhoomi.edu.in', 
            avatar: 'AS' 
        },
        staff: { 
            id: 'T2001', 
            name: 'Ramesh Kumar', 
            role: 'staff', 
            skills: ['Electrical', 'Plumbing'] 
        },
        admin: { 
            id: 'ADM-WARDEN-01', 
            name: 'Rinu Babu', 
            role: 'admin', 
            title: 'Hostel Warden', 
            email: 'rinu.babu@vijaybhoomi.edu.in',
            avatar: 'RB'
        }
    },
    technicians: [
        { id: 'TECH-01', name: 'Ramesh Kumar', category: 'Electrical', phone: '+91 98765 43210' },
        { id: 'TECH-02', name: 'Suresh Sharma', category: 'Plumbing', phone: '+91 98765 43211' },
        { id: 'TECH-03', name: 'Vikas Patil', category: 'IT / Internet', phone: '+91 98765 43212' },
        { id: 'TECH-04', name: 'Sunita Devi', category: 'Housekeeping / Furniture', phone: '+91 98765 43213' }
    ],
    complaints: [
        {
            id: 'CF-099',
            title: 'Study Chair Leg Broken',
            description: 'Study chair leg broke while working. Needs urgent replacement or welding.',
            category: 'Furniture',
            subcategory: 'Chair Replacement',
            location: { hostel: 'Hostel A', block: 'B3', floor: 'Floor 3', room: 'B3-304' },
            priority: 'High',
            status: 'Escalated',
            escalatedReason: 'Delay of over 48 hours without technician visit.',
            expectedResolution: '2026-09-22',
            assignedTo: 'Sunita Devi',
            studentId: '2024VUGP0021',
            studentName: 'Parth Pawar',
            createdAt: '2026-09-18T09:30:00',
            updatedAt: '2026-09-20T14:10:00',
            timeline: [
                { status: 'Submitted', desc: 'Complaint submitted by Parth Pawar', time: '2026-09-18T09:30:00' },
                { status: 'Under Review', desc: 'Reviewed by Warden Rinu Babu', time: '2026-09-18T11:00:00' },
                { status: 'Escalated', desc: 'Escalated by Student: Delay of over 48 hours without technician visit.', time: '2026-09-20T14:10:00' }
            ]
        },
        {
            id: 'MC-10245',
            title: 'Bathroom Tap Water Leakage',
            description: 'Water is continuously leaking from the bathroom tap in B3-304.',
            category: 'Plumbing',
            subcategory: 'Water Leakage',
            location: { hostel: 'Hostel A', block: 'B3', floor: 'Floor 3', room: 'B3-304' },
            priority: 'High',
            status: 'In Progress',
            expectedResolution: '2026-09-21',
            assignedTo: 'Suresh Sharma',
            studentId: '2024VUGP0021',
            studentName: 'Parth Pawar',
            createdAt: '2026-09-19T10:30:00',
            updatedAt: '2026-09-20T13:15:00',
            timeline: [
                { status: 'Submitted', desc: 'Complaint submitted by Parth Pawar', time: '2026-09-19T10:30:00' },
                { status: 'Under Review', desc: 'Complaint reviewed by Warden Rinu Babu', time: '2026-09-19T11:05:00' },
                { status: 'Assigned', desc: 'Assigned to Suresh Sharma (Plumbing Specialist)', time: '2026-09-19T11:20:00' },
                { status: 'In Progress', desc: 'Technician Suresh Sharma replacement washer procurement in progress', time: '2026-09-20T13:15:00' }
            ]
        },
        {
            id: 'MC-10246',
            title: 'Ceiling Fan Making High Noise',
            description: 'Ceiling fan is making rattling noise and not spinning at full speed.',
            category: 'Electrical',
            subcategory: 'Fan Issue',
            location: { hostel: 'Hostel A', block: 'B3', floor: 'Floor 3', room: 'B3-304' },
            priority: 'Medium',
            status: 'Assigned',
            expectedResolution: '2026-09-22',
            assignedTo: 'Ramesh Kumar',
            studentId: '2024VUGP0021',
            studentName: 'Parth Pawar',
            createdAt: '2026-09-20T08:00:00',
            updatedAt: '2026-09-20T09:00:00',
            timeline: [
                { status: 'Submitted', desc: 'Complaint submitted by Parth Pawar', time: '2026-09-20T08:00:00' },
                { status: 'Assigned', desc: 'Assigned to Ramesh Kumar by Warden Rinu Babu', time: '2026-09-20T09:00:00' }
            ]
        },
        {
            id: 'MC-10231',
            title: 'WiFi Connection Intermittent',
            description: 'Hostel B3 floor router disconnecting repeatedly in evening hours.',
            category: 'Internet',
            subcategory: 'WiFi Disconnect',
            location: { hostel: 'Hostel A', block: 'B3', floor: 'Floor 3', room: 'B3-304' },
            priority: 'Low',
            status: 'Resolved',
            expectedResolution: '2026-09-17',
            assignedTo: 'Vikas Patil',
            studentId: '2024VUGP0021',
            studentName: 'Parth Pawar',
            createdAt: '2026-09-15T10:00:00',
            updatedAt: '2026-09-17T14:00:00',
            timeline: [
                { status: 'Submitted', desc: 'Complaint submitted by Parth Pawar', time: '2026-09-15T10:00:00' },
                { status: 'Assigned', desc: 'Assigned to Vikas Patil', time: '2026-09-15T11:00:00' },
                { status: 'Resolved', desc: 'Router access point restarted and firmware updated.', time: '2026-09-17T14:00:00' }
            ]
        },
        {
            id: 'MC-10198',
            title: 'Door Lock Jamming',
            description: 'Key insertion is sticky and lock latch jams frequently.',
            category: 'Security',
            subcategory: 'Door / Lock',
            location: { hostel: 'Hostel A', block: 'A1', floor: 'Floor 1', room: 'A1-101' },
            priority: 'Medium',
            status: 'Closed',
            expectedResolution: '2026-09-10',
            assignedTo: 'Ramesh Kumar',
            studentId: '2024VUGP0021',
            studentName: 'Parth Pawar',
            createdAt: '2026-09-09T09:00:00',
            updatedAt: '2026-09-10T11:00:00',
            timeline: [
                { status: 'Submitted', desc: 'Complaint submitted by Parth Pawar', time: '2026-09-09T09:00:00' },
                { status: 'Resolved', desc: 'Lock lubricated and latch aligned.', time: '2026-09-10T10:00:00' },
                { status: 'Closed', desc: 'Student confirmed resolution.', time: '2026-09-10T11:00:00' }
            ]
        }
    ],
    currentUser: null
};

// Initialize Store with current schema
function initStore() {
    const existing = localStorage.getItem('hostel_data');
    if (!existing) {
        localStorage.setItem('hostel_data', JSON.stringify(defaultData));
    } else {
        try {
            const parsed = JSON.parse(existing);
            // Upgrade mock schema if missing technicians, student is not Parth Pawar, or ID is outdated
            if (!parsed.technicians || !parsed.users.student || parsed.users.student.name !== 'Parth Pawar' || parsed.users.student.id !== '2024VUGP0021') {
                localStorage.setItem('hostel_data', JSON.stringify(defaultData));
            }
        } catch (e) {
            localStorage.setItem('hostel_data', JSON.stringify(defaultData));
        }
    }
}

// Get Data
function getData() {
    return JSON.parse(localStorage.getItem('hostel_data'));
}

// Save Data
function saveData(data) {
    localStorage.setItem('hostel_data', JSON.stringify(data));
}

// Store API
const Store = {
    login(roleOrKey, customUser = null) {
        const data = getData();
        if (customUser) {
            data.currentUser = customUser;
        } else if (data.users[roleOrKey]) {
            data.currentUser = data.users[roleOrKey];
        } else {
            data.currentUser = data.users['student'];
        }
        saveData(data);
        return data.currentUser;
    },

    registerStudent(studentInfo) {
        const data = getData();
        const newId = 'ST' + Math.floor(100000 + Math.random() * 900000);
        const nameParts = studentInfo.name.split(' ');
        const avatar = nameParts.length > 1 ? (nameParts[0][0] + nameParts[1][0]).toUpperCase() : nameParts[0].substring(0, 2).toUpperCase();

        const newUser = {
            id: newId,
            name: studentInfo.name,
            role: 'student',
            hostel: studentInfo.hostel || 'Hostel A',
            block: studentInfo.block || 'B3',
            room: studentInfo.room || 'B3-304',
            email: studentInfo.email,
            avatar: avatar
        };
        data.users[newId] = newUser;
        data.currentUser = newUser;
        saveData(data);
        return newUser;
    },

    logout() {
        const data = getData();
        data.currentUser = null;
        saveData(data);
    },

    getCurrentUser() {
        return getData().currentUser;
    },

    getComplaints() {
        return getData().complaints;
    },

    getTechnicians() {
        return getData().technicians || defaultData.technicians;
    },

    getComplaint(id) {
        return getData().complaints.find(c => c.id === id);
    },

    addComplaint(complaintData) {
        const data = getData();
        const newId = 'CF-' + (100 + Math.floor(Math.random() * 900));
        const now = new Date().toISOString();
        const currentUser = data.currentUser || data.users.student;
        
        const newComplaint = {
            id: newId,
            title: complaintData.title,
            description: complaintData.description,
            category: complaintData.category,
            subcategory: complaintData.subcategory || 'General',
            location: complaintData.location || { hostel: currentUser.hostel, block: currentUser.block, room: currentUser.room },
            priority: complaintData.priority || 'Medium',
            status: 'Submitted',
            expectedResolution: 'Pending Assignment',
            assignedTo: 'Unassigned',
            studentId: currentUser.id,
            studentName: currentUser.name,
            createdAt: now,
            updatedAt: now,
            timeline: [
                { status: 'Submitted', desc: `Complaint submitted by ${currentUser.name}`, time: now }
            ]
        };
        
        data.complaints.unshift(newComplaint);
        saveData(data);
        return newId;
    },

    updateComplaintStatus(id, newStatus, desc) {
        const data = getData();
        const complaint = data.complaints.find(c => c.id === id);
        if (complaint) {
            const now = new Date().toISOString();
            complaint.status = newStatus;
            complaint.updatedAt = now;
            complaint.timeline.unshift({
                status: newStatus,
                desc: desc,
                time: now
            });
            saveData(data);
        }
    },

    updateComplaintStatusByAdmin(id, newStatus, assignedTo, expectedResolution, adminNote) {
        const data = getData();
        const complaint = data.complaints.find(c => c.id === id);
        if (complaint) {
            const now = new Date().toISOString();
            const adminUser = data.currentUser && data.currentUser.role === 'admin' ? data.currentUser.name : 'Warden Rinu Babu';
            
            if (newStatus) complaint.status = newStatus;
            if (assignedTo) complaint.assignedTo = assignedTo;
            if (expectedResolution) complaint.expectedResolution = expectedResolution;
            complaint.updatedAt = now;

            let logDesc = `Updated by Warden ${adminUser}: Status set to '${newStatus || complaint.status}'`;
            if (assignedTo && assignedTo !== 'Unassigned') logDesc += `, assigned to ${assignedTo}`;
            if (adminNote) logDesc += `. Note: "${adminNote}"`;

            complaint.timeline.unshift({
                status: newStatus || complaint.status,
                desc: logDesc,
                time: now
            });
            saveData(data);
        }
    },

    escalateComplaint(id, reason) {
        const data = getData();
        const complaint = data.complaints.find(c => c.id === id);
        if (complaint) {
            const now = new Date().toISOString();
            const currentUser = data.currentUser || data.users.student;
            complaint.status = 'Escalated';
            complaint.priority = 'High';
            complaint.escalatedReason = reason || 'Escalated by student due to resolution delay.';
            complaint.updatedAt = now;
            complaint.timeline.unshift({
                status: 'Escalated',
                desc: `ESCALATED by ${currentUser.name}: ${reason || 'Urgent escalation requested.'}`,
                time: now
            });
            saveData(data);
        }
    },

    resetToDefaults() {
        localStorage.setItem('hostel_data', JSON.stringify(defaultData));
    }
};

initStore();
