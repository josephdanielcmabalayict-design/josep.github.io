// ═══════════════════════════════════════
//   SkillBridge · Shared JS Utilities
// ═══════════════════════════════════════

// ── AUTH GUARD ──
function requireAuth() {
  const email = localStorage.getItem('sb_email');
  if (!email) { window.location.href = 'index.html'; return null; }
  return email;
}
function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

// ── SHOW LOGGED IN USER ──
function showUser(elId) {
  const el = document.getElementById(elId);
  if (el) el.textContent = localStorage.getItem('sb_email') || '';
}

// ── NOTIFICATIONS ──
function toggleNotif(id) {
  const dd = document.getElementById(id);
  const was = dd.classList.contains('open');
  document.querySelectorAll('.notif-dropdown').forEach(d => d.classList.remove('open'));
  if (!was) dd.classList.add('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.notif-wrap'))
    document.querySelectorAll('.notif-dropdown').forEach(d => d.classList.remove('open'));
});
function clearNotifs(listId, ddId, dotId, countId) {
  const list = document.getElementById(listId);
  if (list) list.innerHTML = '<div class="notif-empty">No notifications yet.</div>';
  if (dotId) { const d = document.getElementById(dotId); if (d) d.style.display = 'none'; }
  if (countId) { const c = document.getElementById(countId); if (c) { c.classList.remove('show'); c.textContent = '0'; } }
}
function pushNotif(listId, dotId, countId, iconClass, icon, title, msg) {
  const list = document.getElementById(listId);
  if (!list) return;
  const empty = list.querySelector('.notif-empty');
  if (empty) list.innerHTML = '';
  const item = document.createElement('div');
  item.className = 'notif-item unread';
  const now = new Date();
  item.innerHTML = `<div class="ni-icon ${iconClass}">${icon}</div>
    <div class="ni-txt"><h4>${title}</h4><p>${msg}</p>
    <time>Just now · ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time></div>`;
  list.insertBefore(item, list.firstChild);
  if (dotId) { const d = document.getElementById(dotId); if (d) d.style.display = 'block'; }
  if (countId) {
    const c = document.getElementById(countId);
    if (c) { const n = parseInt(c.textContent || 0) + 1; c.textContent = n; c.classList.add('show'); }
  }
}

// ── CHIPS & DAYS ──
function getSelChips(wrapId) {
  return [...document.querySelectorAll(`#${wrapId} .chip.sel`)].map(c => c.dataset.val);
}
function getSelDays(rowId) {
  return [...document.querySelectorAll(`#${rowId} .day-btn.sel`)].map(d => d.textContent);
}

// ── TIME SLOT ──
function pickTime(el, who) {
  document.querySelectorAll(`#${who}-time-presets .time-preset`).forEach(t => t.classList.remove('sel'));
  el.classList.add('sel');
  const cr = document.getElementById(`${who}-custom-time`);
  if (cr) cr.classList.remove('open');
}
function toggleCustom(who) {
  const cr = document.getElementById(`${who}-custom-time`);
  if (!cr) return;
  const open = cr.classList.contains('open');
  cr.classList.toggle('open');
  if (!open) document.querySelectorAll(`#${who}-time-presets .time-preset`).forEach(t => t.classList.remove('sel'));
}
function getTimeStr(who) {
  const cr = document.getElementById(`${who}-custom-time`);
  if (cr && cr.classList.contains('open')) {
    const f = document.getElementById(`${who}-from`);
    const t = document.getElementById(`${who}-to`);
    return `Custom: ${fmt12(f ? f.value : '')} – ${fmt12(t ? t.value : '')}`;
  }
  const sel = document.querySelector(`#${who}-time-presets .time-preset.sel`);
  return sel ? sel.textContent.replace(/\s+/g, ' ').trim() : 'Flexible';
}
function fmt12(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

// ── SUBJECTS CURRICULUM ──
const BSCS = [
  { year: '1st Year', icon: '📖', subjects: ['Introduction to Computing (CC 100)', 'Computer Programming (CC 101)', 'Advanced Computer Programming (CC 102)', 'Data Structures & Algorithms (CC 103)', 'Differential Calculus (MATH 101)', 'Integral Calculus (MATH 102)', 'Mathematics in the Modern World', 'Understanding the Self (GEd 101)'] },
  { year: '2nd Year', icon: '📗', subjects: ['Information Management (CC 104)', 'Object-Oriented Programming (OOP 101)', 'Adv. Object-Oriented Programming (OOP 102)', 'Linear Algebra for AI (AI 101)', 'Discrete Mathematics (CpE 405)', 'Design & Analysis of Algorithms (AL 101)', 'Computer Networking (NET 101)', 'Computer Architecture & Organization (AR 101)', 'Probability & Statistics for AI (AI 102)', 'General Physics 1 (PHYS 111)', 'General Physics 2 (PHYS 112)'] },
  { year: '3rd Year', icon: '📘', subjects: ['Automata Theory & Formal Languages (AL 102)', 'Secure Computing (SC 101)', 'Adv. Computer Networking (NET 102)', 'Artificial Intelligence (CSAI 100)', 'Data Science (DS 101)', 'Programming Languages (PL 101)', 'Machine Learning & Neural Networks (AI 103)', 'Software Engineering (SE 101)', 'Human-Computer Interaction (HCI 101)', 'Web Systems & Technologies (WS 101)', 'Apps Development & Emerging Tech (CC 105)', 'Quantitative Methods (QM 101)', 'Professional Elective 1 (CS ELEC 1)', 'Professional Elective 2 (CS ELEC 2)'] },
  { year: '4th Year', icon: '🎓', subjects: ['CS Thesis 1 (THS 101)', 'CS Thesis 2 (THS 102)', 'Advanced Software Engineering (SE 102)', 'Principles of Operating System (OS 101)', 'Parallel & Distributed Computing (PD 101)', 'Social Issues & Professional Practice (SIP 101)', 'Technopreneurship (ENGG 105)', 'Professional Elective 3 (CS ELEC 3)'] },
];
const BSIT = [
  { year: '1st Year', icon: '📖', subjects: ['Introduction to Computing (CC 100)', 'Computer Programming (CC 101)', 'Advanced Computer Programming (CC 102)', 'Data Structures & Algorithms (CC 103)', 'Differential Calculus (MATH 101)', 'Integral Calculus (MATH 102)', 'Discrete Mathematics (CpE 405)'] },
  { year: '2nd Year', icon: '📗', subjects: ['Information Management (CC 104)', 'Object-Oriented Programming (OOP 101)', 'Platform Technologies (PT 101)', 'Computer Networking (NET 101)', 'General Physics 1 (PHYS 111)', 'General Physics 2 (PHYS 112)', 'Linear Algebra for AI (AI 101)', 'Database Management System (DB 101)', 'Adv. Computer Networking (NET 102)', 'System Administration & Maintenance (SAM 101)', 'Probability & Statistics for AI (AI 102)', 'Artificial Intelligence (CSAI 100)', 'Quantitative Methods (QM 101)'] },
  { year: '3rd Year', icon: '📘', subjects: ['Adv. Database Management (DB 102)', 'Information Assurance & Security (IAS 101)', 'System Integration & Architecture (SIA 101)', 'Systems Analysis & Design (SAD 101)', 'Human-Computer Interaction (HCI 101)', 'Machine Learning & Neural Networks (AI 103)', 'Adv. Info Assurance & Security (IAS 102)', 'Adv. System Integration (SIA 102)', 'Integrative Programming & Tech (IPT 101)', 'Web Systems & Technologies (WS 101)', 'IT Project Management (ITPM 101)', 'System Quality Assurance (SQA 101)', 'Professional Elective 1 (ELEC 101)'] },
  { year: '4th Year', icon: '🎓', subjects: ['Capstone Project 1 (CP 101)', 'Capstone Project 2 (CP 102)', 'Apps Development & Emerging Tech (CC 105)', 'Social Issues & Professional Practice (SIP 101)', 'Technopreneurship (ENGG 105)', 'Professional Elective 2 (ELEC 102)', 'Professional Elective 3 (ELEC 103)'] },
];
const TUTORS = [
  { id: 1, name: 'Alex Reyes', initials: 'AR', color: '#1A56DB', prog: 'BSCS', year: '4th Year', phone: '09171234567', email: 'alexreyes@gmail.com', subjects: ['Data Structures & Algorithms (CC 103)', 'Design & Analysis of Algorithms (AL 101)', 'Discrete Mathematics (CpE 405)'], rating: 4.9, sessions: 48, match: 98, days: ['Mon', 'Wed', 'Fri'], mode: 'Online' },
  { id: 2, name: 'Bea Santos', initials: 'BS', color: '#0EA5E9', prog: 'BSIT', year: '3rd Year', phone: '09281239876', email: 'beasantos@gmail.com', subjects: ['Systems Analysis & Design (SAD 101)', 'Database Management System (DB 101)', 'Information Management (CC 104)'], rating: 4.8, sessions: 35, match: 94, days: ['Tue', 'Thu', 'Sat'], mode: 'Both' },
  { id: 3, name: 'Carlo Mendoza', initials: 'CM', color: '#0F3C9E', prog: 'BSCS', year: '4th Year', phone: '09054567890', email: 'carlomendoza@gmail.com', subjects: ['Object-Oriented Programming (OOP 101)', 'Software Engineering (SE 101)', 'Web Systems & Technologies (WS 101)'], rating: 4.7, sessions: 60, match: 90, days: ['Mon', 'Sat', 'Sun'], mode: 'Online' },
  { id: 4, name: 'Diana Lim', initials: 'DL', color: '#38BDF8', prog: 'BSIT', year: '4th Year', phone: '09351119999', email: 'dianalim@gmail.com', subjects: ['Computer Networking (NET 101)', 'System Administration & Maintenance (SAM 101)', 'Information Assurance & Security (IAS 101)'], rating: 4.6, sessions: 29, match: 85, days: ['Wed', 'Fri'], mode: 'In-Person' },
  { id: 5, name: 'Enrique Tan', initials: 'ET', color: '#1D4ED8', prog: 'BSCS', year: '3rd Year', phone: '09209998765', email: 'eqtan@gmail.com', subjects: ['Artificial Intelligence (CSAI 100)', 'Machine Learning & Neural Networks (AI 103)', 'Probability & Statistics for AI (AI 102)'], rating: 4.9, sessions: 72, match: 80, days: ['Mon', 'Tue', 'Thu'], mode: 'Both' },
];

// ── BUILD YEAR CHIPS ──
function buildYearChips(wrapId, curriculum) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  wrap.innerHTML = curriculum.map(yr => `
    <div class="subj-year-group">
      <div class="year-badge">${yr.icon} ${yr.year}</div>
      <div class="chip-wrap">${yr.subjects.map(s =>
    `<span class="chip" data-val="${s}" onclick="this.classList.toggle('sel')">${s}</span>`
  ).join('')}</div>
    </div>`).join('');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── NAV BELL TEMPLATE ──
function navBellHTML(ddId, listId) {
  return `
  <div class="notif-wrap">
    <div class="notif-bell" onclick="toggleNotif('${ddId}')" title="Notifications">
      <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    </div>
    <div class="notif-dropdown" id="${ddId}">
      <div class="notif-header"><strong>🔔 Notifications</strong>
        <span class="notif-clear" onclick="clearNotifs('${listId}','${ddId}')">Clear all</span></div>
      <div class="notif-list" id="${listId}"><div class="notif-empty">No notifications yet.</div></div>
    </div>
  </div>`;
}