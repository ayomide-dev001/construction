// ====================
// Mobile Navigation
// ====================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const mobileOverlay = document.getElementById("mobileOverlay");
const header = document.getElementById("header");

function toggleMenu() {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
  document.body.style.overflow = navLinks.classList.contains("active")
    ? "hidden"
    : "";
}

function closeMenu() {
  hamburger.classList.remove("active");
  navLinks.classList.remove("active");
  mobileOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

hamburger?.addEventListener("click", toggleMenu);
mobileOverlay?.addEventListener("click", closeMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    // Only close if it's a hash link (same page navigation)
    if (link.getAttribute("href").startsWith("#")) {
      closeMenu();
    }
  });
});

// Close menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("active")) {
    closeMenu();
  }
});

// ====================
// Sticky Header & Scroll Effects
// ====================
let lastScroll = 0;
const navbar = document.getElementById("navbar");
const topBar = document.querySelector(".top-bar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add shadow to navbar on scroll
  if (currentScroll > 50) {
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }

  // Hide/show top bar on scroll for mobile
  if (window.innerWidth <= 768) {
    if (currentScroll > lastScroll && currentScroll > 100) {
      topBar.style.transform = "translateY(-100%)";
      header.style.transform = "translateY(-" + topBar.offsetHeight + "px)";
    } else {
      topBar.style.transform = "translateY(0)";
      header.style.transform = "translateY(0)";
    }
  }

  lastScroll = currentScroll;
});

// Reset header on resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    topBar.style.transform = "";
    header.style.transform = "";
    closeMenu();
  }
});

// ====================
// Smooth Scrolling
// ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      const headerOffset = header.offsetHeight;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ====================
// Active Navigation Link
// ====================
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  let current = "";
  const scrollPos = window.pageYOffset + header.offsetHeight + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// ====================
// Counter Animation
// ====================
const counters = document.querySelectorAll(".counter");
const speed = 200;

function animateCounters() {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(animateCounters, 20);
    } else {
      counter.innerText = target;
    }
  });
}

// Intersection Observer for counters
const statsSection = document.querySelector(".stats-section");
let counted = false;

const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px",
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !counted) {
      animateCounters();
      counted = true;
    }
  });
}, observerOptions);

if (statsSection) {
  statsObserver.observe(statsSection);
}

// ====================
// Tab Functionality
// ====================
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons and contents
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    // Add active class to clicked button
    btn.classList.add("active");

    // Show corresponding content
    const tabId = btn.getAttribute("data-tab");
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
      activeContent.classList.add("active");
    }
  });
});

// ====================
// Project Filtering
// ====================
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 10);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.8)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// ====================
// Skills Circle Animation
// ====================
const skillCircles = document.querySelectorAll(".skill-circle");
const circumference = 2 * Math.PI * 45; // r=45

function animateSkills() {
  skillCircles.forEach((circle) => {
    const percent = circle.getAttribute("data-percent");
    const progress = circle.querySelector(".skill-progress");
    const offset = circumference - (percent / 100) * circumference;

    progress.style.strokeDashoffset = offset;
  });
}

const skillsSection = document.querySelector(".skills-section");
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !skillsAnimated) {
      setTimeout(animateSkills, 300);
      skillsAnimated = true;
    }
  });
}, observerOptions);

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// ====================
// Video Modal
// ====================
const playBtn = document.getElementById("playBtn");
const videoModal = document.getElementById("videoModal");
const closeModal = document.querySelector(".close-modal");
const iframe = videoModal?.querySelector("iframe");

function openModal() {
  videoModal.classList.add("active");
  document.body.style.overflow = "hidden";
  if (iframe) {
    iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
  }
}

function closeModalFunc() {
  videoModal.classList.remove("active");
  document.body.style.overflow = "";
  if (iframe) {
    iframe.src = "";
  }
}

playBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

closeModal?.addEventListener("click", closeModalFunc);

videoModal?.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    closeModalFunc();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && videoModal?.classList.contains("active")) {
    closeModalFunc();
  }
});

// ====================
// Scroll Reveal Animation
// ====================
const revealElements = document.querySelectorAll(
  ".service-card, .team-card, .blog-card, .choose-item, .project-card, .contact-item",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease";
  revealObserver.observe(el);
});

// ====================
// Hero Slider Dots
// ====================
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    dots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");
    currentSlide = index;
  });
});

// Auto-advance dots
setInterval(() => {
  currentSlide = (currentSlide + 1) % dots.length;
  dots.forEach((d) => d.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}, 5000);

// ====================
// Search Button
// ====================
const searchBtn = document.querySelector(".search-btn");

searchBtn?.addEventListener("click", () => {
  const searchOverlay = document.createElement("div");
  searchOverlay.className = "search-overlay";
  searchOverlay.innerHTML = `
        <div class="search-container">
            <input type="text" placeholder="Search..." autofocus>
            <button class="close-search"><i class="fas fa-times"></i></button>
        </div>
    `;

  searchOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;

  searchOverlay.querySelector(".search-container").style.cssText = `
        width: 100%;
        max-width: 600px;
        position: relative;
    `;

  searchOverlay.querySelector("input").style.cssText = `
        width: 100%;
        padding: 20px 60px 20px 30px;
        font-size: 1.5rem;
        border: none;
        border-bottom: 3px solid var(--primary-color);
        background: transparent;
        color: white;
        outline: none;
    `;

  searchOverlay.querySelector(".close-search").style.cssText = `
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    `;

  document.body.appendChild(searchOverlay);
  document.body.style.overflow = "hidden";

  const closeSearch = () => {
    searchOverlay.remove();
    document.body.style.overflow = "";
  };

  searchOverlay
    .querySelector(".close-search")
    .addEventListener("click", closeSearch);
  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  searchOverlay.querySelector("input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      alert("Searching for: " + e.target.value);
      closeSearch();
    }
    if (e.key === "Escape") closeSearch();
  });
});

// ====================
// Contact Form
// ====================
const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = "#27ae60";
    btn.style.borderColor = "#27ae60";

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
      btn.style.borderColor = "";
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  }, 1500);
});

// ====================
// Loading Animation
// ====================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Animate hero content
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(50px)";

    setTimeout(() => {
      heroContent.style.transition = "all 1s ease";
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }, 300);
  }
});

// ====================
// Touch Events for Mobile
// ====================
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 100;
  const diff = touchStartY - touchEndY;

  // Swipe up to close mobile menu
  if (
    Math.abs(diff) > swipeThreshold &&
    navLinks.classList.contains("active")
  ) {
    if (diff < 0) {
      // Swipe down
      closeMenu();
    }
  }
}

console.log("Buildex Construction Website - Mobile Optimized");
