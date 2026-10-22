// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById("themeToggle");
const themeToggleIcon = document.getElementById("themeToggleIcon");
const html = document.documentElement;

// Pilih default berdasarkan attribute awal <html data-theme="...">
// Light = default, Dark = optional
let isDark = html.getAttribute("data-theme") === "dark";


const syncThemeIcon = () => {
  if (!themeToggleIcon) return;
  // Kalau dark: tampilkan moon, kalau light: tampilkan sun
  themeToggleIcon.src = isDark ? "icons/darkmode.png" : "icons/lightmode.png";
  themeToggleIcon.alt = "";
};

// Pastikan tampilan awal langsung benar (tanpa harus klik tombol)
syncThemeIcon();

// NOTE: Pada markup, tombol berisi <img>. Jangan pakai textContent.
// Kita hanya toggle data-theme + icon.
themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  html.setAttribute("data-theme", isDark ? "dark" : "light");
  syncThemeIcon();
});


// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// ========== MOBILE MENU ==========
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
});
navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

// ========== SCROLL REVEAL ==========
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Animate skill bars
        const fill = entry.target.querySelector(".skill-fill");
        if (fill) {
          setTimeout(() => {
            fill.style.width = fill.dataset.width + "%";
          }, 200);
        }
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
);

revealEls.forEach((el) => revealObserver.observe(el));

// Also observe all skill cards for bar animation
document.querySelectorAll(".skill-card").forEach((card) => {
  const fill = card.querySelector(".skill-fill");
  if (!fill) return;
  const obs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          fill.style.width = fill.dataset.width + "%";
        }, 400);
        obs.unobserve(card);
      }
    },
    { threshold: 0.3 },
  );
  obs.observe(card);
});

// ========== SEND MESSAGE ==========
function handleSend() {
  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const pesan = document.getElementById("pesan").value;

  const nomorWA = "6285736184601";

  const text = `Halo Rafli,%0A%0A
  Nama: ${nama}%0A
  Email: ${email}%0A
  Pesan: ${pesan}`;

  const url = `https://wa.me/${nomorWA}?text=${text}`;

  window.open(url, "_blank");
}

// ========== SMOOTH ACTIVE NAV ==========
const sections = document.querySelectorAll("section[id]");
const navAs = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navAs.forEach((a) => {
    a.style.color =
      a.getAttribute("href") === "#" + current ? "var(--text)" : "";
  });
});

// ========== HERO TITLE ANIMATION ==========
const heroLines = document.querySelectorAll(".hero-title .line");
heroLines.forEach((line, i) => {
  line.style.opacity = "0";
  line.style.transform = "translateY(30px)";
  line.style.transition = `all 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 0.15 + 0.2}s`;
  setTimeout(() => {
    line.style.opacity = "1";
    line.style.transform = "none";
  }, 50);
});
