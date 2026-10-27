/*
  DAWOOD KHAN — INTERACTIVE CYBERPORTFOLIO ENGINE
  Features: Custom Cursor, Particle Canvas, Typewriter, Counter Up, 3D Tilt Cards
*/

const profileData = {
  skills: [
    {
      category: "Hardware & Embedded",
      items: [
        { name: "Electrical Engineering", level: 90 },
        { name: "ESP32 & Microcontrollers", level: 92 },
        { name: "MPU6050 & Motor Drivers", level: 88 },
        { name: "Circuit Design & Solar Systems", level: 85 }
      ]
    },
    {
      category: "Software & Languages",
      items: [
        { name: "Python", level: 90 },
        { name: "C++", level: 85 },
        { name: "RISC-V Custom Libraries", level: 82 },
        { name: "Linux & Bash", level: 88 }
      ]
    },
    {
      category: "DevOps & Cloud Systems",
      items: [
        { name: "Docker & Containers", level: 85 },
        { name: "CI/CD & Jenkins", level: 80 },
        { name: "Hardware Dashboards & AI", level: 84 },
        { name: "Networking & System SW", level: 82 }
      ]
    }
  ],
  projects: [
    {
      title: "TechFlo Engineering Agency",
      type: "agency",
      tag: "Co-Founder / Active",
      description: "Building an online engineering platform delivering embedded DevOps, FPGA design, hardware dashboards, and AI automation.",
      tech: ["Embedded DevOps", "FPGA", "Hardware Dashboards", "AI"],
      link: "https://techflo.co"
    },
    {
      title: "Self-Balancing Robot",
      type: "embedded",
      tag: "Hardware / Robotics",
      description: "Autonomous 2-wheel balancing robot utilizing ESP32, MPU6050 IMU feedback loops, TB6612 motor driver, and LDR light tracking.",
      tech: ["ESP32", "C++", "MPU6050", "Control Logic"],
      link: "https://github.com/Dawoodkhan21"
    },
    {
      title: "RISC-V Simulation Libraries",
      type: "software",
      tag: "Architecture / Python",
      description: "Extended RISC-V compute architecture by building custom Python simulation software libraries.",
      tech: ["RISC-V", "Python", "Computer Architecture"],
      link: "https://github.com/Dawoodkhan21"
    },
    {
      title: "DevOps Automated Pipeline",
      type: "software",
      tag: "DevOps / Infrastructure",
      description: "Configured automated CI/CD deployment pipelines running in Docker environments on Ubuntu cloud servers.",
      tech: ["Docker", "CI/CD", "Linux", "Jenkins"],
      link: "https://github.com/Dawoodkhan21"
    }
  ],
  timeline: [
    {
      date: "PRESENT",
      title: "Co-Founder — TechFlo Agency",
      place: "Lahore, Pakistan",
      description: "Leading development for client engineering solutions across hardware dashboards, DevOps pipelines, and AI."
    },
    {
      date: "UNDERGRADUATE",
      title: "B.S. Electrical Engineering",
      place: "University of Engineering and Technology (UET), Lahore",
      description: "Specializing in embedded logic, signal processing, microcontroller programming, and cloud systems."
    },
    {
      date: "NOVEMBER 2024",
      title: "Software Engineer Intern Certificate",
      place: "HackerRank",
      description: "Earned certification in Python programming and MySQL database management."
    }
  ],
  contacts: [
    { name: "GitHub", link: "https://github.com/Dawoodkhan21" },
    { name: "LinkedIn", link: "https://www.linkedin.com/" },
    { name: "Email", link: "mailto:contact@techflo.co" }
  ]
};

// --- CUSTOM CURSOR FOLLOW LOGIC ---
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor Hover State for Interactive Elements
document.querySelectorAll('a, button, .glass-card, .filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

// --- DYNAMIC MATRIX / PARTICLE CANVAS ---
const canvas = document.getElementById('cyberCanvas');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 0.6,
  vy: (Math.random() - 0.5) * 0.6,
  size: Math.random() * 2 + 1
}));

function renderCanvas() {
  ctx.clearRect(0, 0, width, height);

  // Draw connecting lines between close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw particles
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(renderCanvas);
}
renderCanvas();

// --- TYPEWRITER EFFECT ---
const phrases = ["Co-Founder @ TechFlo.co", "Embedded Systems Engineer", "DevOps & Cloud Developer"];
let phraseIdx = 0, charIdx = 0, isDeleting = false;

function typeWriter() {
  const target = document.getElementById("typewriterText");
  if (!target) return;

  const current = phrases[phraseIdx];
  target.textContent = isDeleting ? current.substring(0, charIdx--) : current.substring(0, charIdx++);

  let speed = isDeleting ? 40 : 80;
  if (!isDeleting && charIdx === current.length + 1) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeWriter, speed);
}
typeWriter();

// --- 3D TILT EFFECT ON CARDS ---
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
});

// --- RENDER SKILLS & BARS ---
function renderSkills() {
  const container = document.getElementById("skillsContainer");
  if (!container) return;

  container.innerHTML = profileData.skills.map(cat => `
    <div class="glass-card tilt-card">
      <h3 class="skill-category-title">&lt;${cat.category}&gt;</h3>
      ${cat.items.map(s => `
        <div class="skill-bar-wrapper">
          <div class="skill-info">
            <span>${s.name}</span>
            <span>${s.level}%</span>
          </div>
          <div class="skill-track">
            <div class="skill-fill" data-level="${s.level}"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

// --- RENDER PROJECTS ---
function renderProjects(filter = "all") {
  const container = document.getElementById("projectsContainer");
  if (!container) return;

  const filtered = profileData.projects.filter(p => filter === "all" || p.type === filter);

  container.innerHTML = filtered.map(p => `
    <div class="glass-card project-card tilt-card">
      <span class="project-tag">${p.tag}</span>
      <h3>${p.title}</h3>
      <p style="color: var(--text-muted); font-size: 13px;">${p.description}</p>
      <div class="project-tech">
        ${p.tech.map(t => `<span class="tech-item">${t}</span>`).join('')}
      </div>
      <a href="${p.link}" target="_blank" rel="noopener" class="project-link">VIEW DEPLOYMENT ↗</a>
    </div>
  `).join('');
}

// --- RENDER TIMELINE ---
function renderTimeline() {
  const container = document.getElementById("timelineContainer");
  if (!container) return;

  container.innerHTML = profileData.timeline.map(t => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-date">${t.date}</div>
      <h3>${t.title}</h3>
      <div style="color: var(--primary-cyan); font-size: 12px; margin-bottom: 6px;">${t.place}</div>
      <p style="color: var(--text-muted); font-size: 13px;">${t.description}</p>
    </div>
  `).join('');
}

// --- RENDER CONTACTS ---
function renderContacts() {
  const container = document.getElementById("contactContainer");
  if (!container) return;

  container.innerHTML = profileData.contacts.map(c => `
    <a href="${c.link}" target="_blank" rel="noopener" class="contact-btn">${c.name} ↗</a>
  `).join('');
}

// --- INTERSECTION OBSERVER FOR ANIMATIONS & COUNTER-UP ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger Skill Progress Fill
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = `${fill.dataset.level}%`;
      });

      // Trigger Number Counters
      entry.target.querySelectorAll('.stat-num').forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;
        const step = target / 30;
        const updateCounter = () => {
          count += step;
          if (count < target) {
            counter.textContent = Math.ceil(count);
            setTimeout(updateCounter, 30);
          } else {
            counter.textContent = target;
          }
        };
        updateCounter();
      });

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderProjects();
  renderTimeline();
  renderContacts();

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  document.getElementById('year').textContent = new Date().getFullYear();

  // Project Filtering
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProjects(e.target.dataset.filter);
    });
  });

  // Scroll Progress Bar
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('scrollProgress').style.width = `${(window.scrollY / total) * 100}%`;
  });
});