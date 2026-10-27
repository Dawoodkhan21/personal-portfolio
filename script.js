/*
  PERSONAL WEBSITE CONTENT
  Edit the arrays below to update your skills, projects, education, and contact links.
  Replace placeholder links and check every detail before publishing.
*/
const profile = {
  skills: [
    { title: "Engineering & Embedded", items: ["Electrical Engineering", "Microcontrollers", "Embedded Systems", "IoT", "Circuit Design"] },
    { title: "Programming & Tools", items: ["Python", "C++", "MATLAB", "Git & GitHub", "Linux"] },
    { title: "Cloud & DevOps — Learning", items: ["AWS", "Docker", "Jenkins", "CI/CD", "Cloud Infrastructure"] }
  ],
  projects: [
    { title: "Cloud Deployment Pipeline", status: "Ongoing", symbol: "↗", description: "A learning project focused on deploying an application on an Ubuntu server with Docker and Jenkins. Add the real architecture, progress, and repository link here.", tech: ["AWS EC2", "Docker", "Jenkins"], link: "https://github.com/", linkLabel: "GitHub ↗" },
    { title: "Embedded / IoT Project", status: "Ongoing", symbol: "⌁", description: "Document a current embedded or IoT project here: the problem, hardware, software, your contribution, and what you learned.", tech: ["Microcontrollers", "C/C++", "Electronics"], link: "https://github.com/", linkLabel: "GitHub ↗" },
    { title: "Signal Processing Lab Work", status: "Completed", symbol: "∿", description: "Add a completed signal-processing project or lab. Include its objective, tools used, results, and screenshots where appropriate.", tech: ["MATLAB", "DSP", "Analysis"], link: "https://github.com/", linkLabel: "Details ↗" },
    { title: "Digital Systems / FPGA", status: "Completed", symbol: "▦", description: "Describe a digital design, FPGA, or Verilog/Vivado project you actually completed. Replace this sample with your own work.", tech: ["Digital Logic", "FPGA", "Vivado"], link: "https://github.com/", linkLabel: "Details ↗" }
  ],
  timeline: [
    { date: "IN PROGRESS", title: "Electrical Engineering", place: "University of Engineering and Technology, Lahore", description: "Undergraduate studies. Add your accurate enrollment dates, expected graduation date, relevant coursework, and academic achievements." },
    { date: "CURRENT FOCUS", title: "Cloud & DevOps learning", place: "Independent learning and hands-on practice", description: "Building practical experience with Linux, Git, cloud infrastructure, containers, and CI/CD. Add real course names and certifications only when earned." },
    { date: "ADD EXPERIENCE", title: "Work, internship, or certification", place: "Add organization or course provider", description: "Use this entry for verified work experience, internships, certifications, volunteering, or other milestones. Delete it if not applicable." }
  ],
  contacts: [
    { label: "GitHub", detail: "Projects & code", url: "https://github.com/", symbol: "↗" },
    { label: "LinkedIn", detail: "Professional profile", url: "https://www.linkedin.com/", symbol: "↗" },
    { label: "Email", detail: "Start a conversation", url: "mailto:YOUR_EMAIL@example.com", symbol: "↗" }
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function renderSkills() {
  $("#skillGroups").innerHTML = profile.skills.map(group => `
    <article class="skill-card reveal">
      <h3>${escapeHTML(group.title)}</h3>
      <div class="skill-tags">${group.items.map(item => `<span class="skill-tag">${escapeHTML(item)}</span>`).join("")}</div>
    </article>`).join("");
}
function renderProjects(filter = "All") {
  const projects = profile.projects.filter(project => filter === "All" || project.status === filter);
  $("#projectGrid").innerHTML = projects.length ? projects.map((project, index) => `
    <article class="project-card reveal" style="--glow:${index % 2 ? "rgba(180,154,255,.15)" : "rgba(120,240,208,.13)"}">
      <div class="project-top"><span class="project-symbol">${escapeHTML(project.symbol || "◇")}</span><span class="project-status">${escapeHTML(project.status)}</span></div>
      <h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.description)}</p>
      <div class="project-bottom"><div class="project-tech">${project.tech.map(tag => `<span>${escapeHTML(tag)}</span>`).join("<span>·</span>")}</div>
      <a class="project-link" href="${safeURL(project.link)}" target="_blank" rel="noopener">${escapeHTML(project.linkLabel || "Explore ↗")}</a></div>
    </article>`).join("") : `<div class="empty-state">No projects in this category yet. Add one in script.js.</div>`;
  observeReveals();
}
function renderTimeline() {
  $("#timeline").innerHTML = profile.timeline.map(item => `
    <article class="timeline-item reveal"><div class="timeline-date">${escapeHTML(item.date)}</div>
    <div class="timeline-content"><h3>${escapeHTML(item.title)}</h3><span class="timeline-place">${escapeHTML(item.place)}</span><p>${escapeHTML(item.description)}</p></div></article>`).join("");
}
function renderContacts() {
  $("#contactLinks").innerHTML = profile.contacts.map(contact => `
    <a class="contact-card" href="${safeURL(contact.url)}" target="${contact.url.startsWith("mailto:") ? "_self" : "_blank"}" rel="noopener">
      <span>${escapeHTML(contact.label)}<small>${escapeHTML(contact.detail)}</small></span><b>${escapeHTML(contact.symbol || "↗")}</b>
    </a>`).join("");
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function safeURL(value) {
  const raw = String(value || "#");
  if (raw.startsWith("mailto:")) return raw.replace(/[\r\n]/g, "");
  try { const url = new URL(raw, window.location.href); return ["http:", "https:"].includes(url.protocol) ? url.href : "#"; }
  catch { return "#"; }
}
let revealObserver;
function observeReveals() {
  if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(el => el.classList.add("visible")); return; }
  if (!revealObserver) revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
  }), { threshold: .12 });
  $$(".reveal:not(.visible)").forEach(el => revealObserver.observe(el));
}
renderSkills(); renderProjects(); renderTimeline(); renderContacts();
$("#year").textContent = new Date().getFullYear();
observeReveals();

$("#projectFilters").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  $$(".filter").forEach(item => item.classList.toggle("active", item === button));
  renderProjects(button.dataset.filter);
});
const menuToggle = $("#menuToggle");
menuToggle.addEventListener("click", () => {
  const open = $("#nav").classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
$$("nav a").forEach(link => link.addEventListener("click", () => {
  $("#nav").classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  $("#progress").style.width = `${scrollable > 0 ? window.scrollY / scrollable * 100 : 0}%`;
}, { passive: true });
