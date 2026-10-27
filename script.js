/*
  DAWOOD KHAN — PERSONAL PORTFOLIO
  Customized Profile, Interactive Effects, Typewriter & Particles
*/

const profile = {
  skills: [
    { 
      title: "Core Engineering & Embedded", 
      items: ["Electrical Engineering", "ESP32", "Microcontrollers", "MPU6050 IMU", "TB6612 Drivers", "Circuit Design"] 
    },
    { 
      title: "Programming & Computer Science", 
      items: ["Python", "C++", "MySQL", "RISC-V Custom Libraries", "Linux (Ubuntu)", "Git & GitHub"] 
    },
    { 
      title: "DevOps & Cloud Systems", 
      items: ["Docker", "CI/CD Pipelines", "System Software", "Computer Networking", "AWS", "Hardware Dashboards"] 
    }
  ],
  projects: [
    { 
      title: "TechFlo Agency", 
      category: "Agency",
      status: "Active Venture", 
      symbol: "⚡", 
      description: "Co-founding an online engineering agency focused on embedded DevOps, FPGA design, hardware dashboards, software development, and AI automation.", 
      tech: ["Embedded DevOps", "FPGA", "Hardware Dashboards", "AI Automation"], 
      link: "https://techflo.co", 
      linkLabel: "techflo.co ↗" 
    },
    { 
      title: "Two-Wheel Self-Balancing Robot", 
      category: "Embedded",
      status: "Completed", 
      symbol: "🤖", 
      description: "Built and programmed an autonomous self-balancing robot incorporating an ESP32, MPU6050 IMU, TB6612 motor driver, and LDR light-following feedback loops.", 
      tech: ["ESP32", "C++", "MPU6050", "Control Systems", "LDR Feedback"], 
      link: "https://github.com/Dawoodkhan21", 
      linkLabel: "View Code ↗" 
    },
    { 
      title: "RISC-V Architecture Extensions", 
      category: "Software",
      status: "Completed", 
      symbol: "⚙️", 
      description: "Extended RISC-V computing capabilities by developing custom low-level simulation and support libraries in Python.", 
      tech: ["RISC-V", "Python", "Computer Architecture", "Systems Programming"], 
      link: "https://github.com/Dawoodkhan21", 
      linkLabel: "Repository ↗" 
    },
    { 
      title: "DevOps Automated Deployment", 
      category: "Software",
      status: "Completed", 
      symbol: "☁️", 
      description: "Built end-to-end automated software deployment pipelines using Docker containers and CI/CD tools during DevOps specialization.", 
      tech: ["Docker", "Linux", "CI/CD", "Automation", "Networking"], 
      link: "https://github.com/Dawoodkhan21", 
      linkLabel: "Pipeline Specs ↗" 
    }
  ],
  timeline: [
    { 
      date: "CO-FOUNDER", 
      title: "TechFlo Agency (techflo.co)", 
      place: "Lahore, Pakistan", 
      description: "Leading an engineering collective delivering solutions across embedded DevOps, FPGA design, automated dashboards, and system integration." 
    },
    { 
      date: "IN PROGRESS", 
      title: "B.S. Electrical Engineering", 
      place: "University of Engineering and Technology (UET), Lahore", 
      description: "Undergraduate student focusing on embedded hardware, systems architecture, signal processing, control engineering, and computing software." 
    },
    { 
      date: "NOVEMBER 2024", 
      title: "Software Engineer Intern Certification", 
      place: "HackerRank", 
      description: "Verified proficiency in Python programming and MySQL database management for backend development." 
    },
    { 
      date: "COMMUNITY", 
      title: "IEEE Member & Cloud Community Participant", 
      place: "IEEE PES & ComSoc / AWS Community Day", 
      description: "Active member of IEEE Power & Energy and Communications Societies; regular attendee at AWS Community Day Lahore." 
    }
  ],
  contacts: [
    { label: "GitHub", detail: "@Dawoodkhan21", url: "https://github.com/Dawoodkhan21", symbol: "↗" },
    { label: "LinkedIn", detail: "Professional Profile", url: "https://www.linkedin.com/in/", symbol: "↗" },
    { label: "Email", detail: "Direct Contact", url: "mailto:contact@techflo.co", symbol: "↗" }
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Render Functions
function renderSkills() {
  const container = $("#skillGroups");
  if (!container) return;
  container.innerHTML = profile.skills.map(group => `
    <article class="skill-card reveal">
      <h3>${escapeHTML(group.title)}</h3>
      <div class="skill-tags">
        ${group.items.map(item => `<span class="skill-tag">${escapeHTML(item)}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderProjects(filter = "All") {
  const container = $("#projectGrid");
  if (!container) return;
  
  const projects = profile.projects.filter(project => {
    if (filter === "All") return true;
    return project.category === filter;
  });

  container.innerHTML = projects.length ? projects.map((project, index) => `
    <article class="project-card reveal" style="--glow:${index % 2 ? "rgba(180,154,255,.18)" : "rgba(120,240,208,.16)"}">
      <div class="project-top">
        <span class="project-symbol">${escapeHTML(project.symbol || "◇")}</span>
        <span class="project-status">${escapeHTML(project.status)}</span>
      </div>
      <h3>${escapeHTML(project.title)}</h3>
      <p>${escapeHTML(project.description)}</p>
      <div class="project-bottom">
        <div class="project-tech">
          ${project.tech.map(tag => `<span>${escapeHTML(tag)}</span>`).join("<span>·</span>")}
        </div>
        <a class="project-link" href="${safeURL(project.link)}" target="_blank" rel="noopener">${escapeHTML(project.linkLabel || "Explore ↗")}</a>
      </div>
    </article>
  `).join("") : `<div class="empty-state">No projects in this category yet.</div>`;
  
  observeReveals();
}

function renderTimeline() {
  const container = $("#timeline");
  if (!container) return;
  container.innerHTML = profile.timeline.map(item => `
    <article class="timeline-item reveal">
      <div class="timeline-date">${escapeHTML(item.date)}</div>
      <div class="timeline-content">
        <h3>${escapeHTML(item.title)}</h3>
        <span class="timeline-place">${escapeHTML(item.place)}</span>
        <p>${escapeHTML(item.description)}</p>
      </div>
    </article>
  `).join("");
}

function renderContacts() {
  const container = $("#contactLinks");
  if (!container) return;
  container.innerHTML = profile.contacts.map(contact => `
    <a class="contact-card" href="${safeURL(contact.url)}" target="${contact.url.startsWith("mailto:") ? "_self" : "_blank"}" rel="noopener">
      <span>${escapeHTML(contact.label)}<small>${escapeHTML(contact.detail)}</small></span>
      <b>${escapeHTML(contact.symbol || "↗")}</b>
    </a>
  `).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function safeURL(value) {
  const raw = String(value || "#");
  if (raw.startsWith("mailto:")) return raw.replace(/[\r\n]/g, "");
  try {
    const url = new URL(raw, window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

// Intersection Observer for Animations
let revealObserver;
function observeReveals() {
  if (!("IntersectionObserver" in window)) {
    $$(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  }
  $$(".reveal:not(.visible)").forEach(el => revealObserver.observe(el));
}

// Typewriter Effect
const phrases = ["Embedded Systems Developer", "DevOps & Systems Builder", "Co-Founder @ TechFlo"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const target = $("#typewriter");
  if (!target) return;
  
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    target.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    target.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 2200; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

// Background Particle Canvas
function initParticles() {
  const canvas = $("#particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 2 + 1,
    alpha: Math.random() * 0.5 + 0.2
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = `rgba(120, 240, 208, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  renderTimeline();
  renderContacts();
  observeReveals();
  typeEffect();
  initParticles();

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Project Filter Listeners
  const filters = $("#projectFilters");
  if (filters) {
    filters.addEventListener("click", event => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      $$(".filter").forEach(item => item.classList.toggle("active", item === button));
      renderProjects(button.dataset.filter);
    });
  }

  // Mobile Menu
  const menuToggle = $("#menuToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const open = $("#nav").classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });

    $$("nav a").forEach(link => link.addEventListener("click", () => {
      $("#nav").classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  // Scroll Progress Bar
  window.addEventListener("scroll", () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = $("#progress");
    if (progress) {
      progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
    }
  }, { passive: true });
});