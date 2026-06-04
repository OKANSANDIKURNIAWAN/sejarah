const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
  createTrail(mx, my);
});

// Ring follows with lag
function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor expand on hover
document
  .querySelectorAll("a,button,.headline-card,.collage-cell,.polaroid,.nav-dot")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.opacity = "0.7";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.opacity = "1";
    });
  });

// Trail
function createTrail(x, y) {
  const trail = document.getElementById("cursor-trail");
  const dot = document.createElement("div");
  dot.className = "trail-dot";
  dot.style.left = x + "px";
  dot.style.top = y + "px";
  trail.appendChild(dot);
  setTimeout(() => dot.remove(), 600);
}

// ===== PARTICLES =====
const particleContainer = document.getElementById("particles");
for (let i = 0; i < 25; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  const size = Math.random() * 4 + 1;
  p.style.cssText = `
  width:${size}px;height:${size}px;
  left:${Math.random() * 100}%;
  animation-duration:${Math.random() * 20 + 10}s;
  animation-delay:${Math.random() * 15}s;
`;
  particleContainer.appendChild(p);
}

// ===== SCENE DUST =====
const dustContainer = document.getElementById("scene-dust-container");
for (let i = 0; i < 40; i++) {
  const d = document.createElement("div");
  d.className = "dust-mote";
  d.style.cssText = `
  left:${Math.random() * 100}%;
  --ds:${Math.random() * 20 + 10}s;
  --dd2:${Math.random() * 15}s;
`;
  dustContainer.appendChild(d);
}

// ===== PARALLAX =====
document.addEventListener("mousemove", (e) => {
  const cx = (e.clientX / window.innerWidth - 0.5) * 20;
  const cy = (e.clientY / window.innerHeight - 0.5) * 20;

  const figS = document.querySelector(".figure-soeharto");
  const figH = document.querySelector(".figure-habibie");
  const beam = document.querySelector(".light-beam");
  const docs = document.querySelectorAll(".float-doc");

  if (figS)
    figS.style.transform = `translate(calc(-50% + ${cx * 0.5}px), calc(-50% + ${cy * 0.3}px))`;
  if (figH)
    figH.style.transform = `translate(calc(50% + ${cx * 0.3}px), calc(-50% + ${cy * 0.3}px))`;
  if (beam)
    beam.style.transform = `translate(calc(-50% + ${cx * 0.2}px), calc(-50% + ${cy * 0.1}px))`;

  docs.forEach((d, i) => {
    const factor = (i % 2 === 0 ? 1 : -1) * 0.8;
    d.style.transform = `rotate(${parseFloat(getComputedStyle(d).getPropertyValue("--dr") || "0")}deg) translateX(${cx * factor}px) translateY(${cy * 0.5}px)`;
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);
revealEls.forEach((el) => observer.observe(el));

// ===== NAV DOTS =====
const sections = ["intro", "konteks", "demonstrasi", "peralihan", "warisan"];
const navDots = document.querySelectorAll(".nav-dot");

navDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    document
      .getElementById(sections[i])
      ?.scrollIntoView({ behavior: "smooth" });
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        const idx = sections.indexOf(id);
        navDots.forEach((d) => d.classList.remove("active"));
        if (idx >= 0) navDots[idx].classList.add("active");
      }
    });
  },
  { threshold: 0.3 },
);

sections.forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// ===== CINEMATIC SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const intro = document.getElementById("intro");
  if (intro) {
    const introContent = intro.querySelector(".intro-content");
    if (introContent) {
      introContent.style.transform = `translateY(${scrollY * 0.4}px)`;
      introContent.style.opacity = Math.max(0, 1 - scrollY / 500);
    }
  }

  // Parallax on demo-bg
  const demoBg = document.querySelector(".demo-bg");
  if (demoBg) {
    const rect = demoBg.closest(".demo-hero")?.getBoundingClientRect();
    if (rect) {
      const progress = -rect.top / rect.height;
      demoBg.style.transform = `translateY(${progress * 40}px) scale(1.1)`;
    }
  }

  // Scene parallax
  const sceneBg = document.querySelector(".scene-bg");
  if (sceneBg) {
    const rect = sceneBg.closest(".cinematic-scene")?.getBoundingClientRect();
    if (rect) {
      const progress = -rect.top / rect.height;
      sceneBg.style.transform = `scale(1.15) translateY(${progress * 30}px)`;
    }
  }
});

// ===== GRAIN SIZE RANDOMIZATION =====
setInterval(() => {
  const grain = document.getElementById("grain");
  if (grain) {
    grain.style.opacity = (0.03 + Math.random() * 0.02).toFixed(3);
  }
}, 150);
