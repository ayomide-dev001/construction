// ====================
// Mobile Navigation
// ====================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".navLinks");

hamburger?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// ====================
// Sticky Header
// ====================
const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    header.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// ====================
// Smooth Scrolling
// ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 110;
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

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ====================
// Counter Animation
// ====================
const counters = document.querySelectorAll(".counter");
const speed = 200;

const animateCounters = () => {
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
};

// Intersection Observer for counters
const statsSection = document.querySelector(".stats-section");
let counted = false;

const observerOptions = {
  threshold: 0.5,
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

const animateSkills = () => {
  skillCircles.forEach((circle) => {
    const percent = circle.getAttribute("data-percent");
    const progress = circle.querySelector(".skill-progress");
    const offset = circumference - (percent / 100) * circumference;

    progress.style.strokeDashoffset = offset;
  });
};

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

playBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  videoModal.classList.add("active");
  if (iframe) {
    iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
  }
});

closeModal?.addEventListener("click", () => {
  videoModal.classList.remove("active");
  if (iframe) {
    iframe.src = "";
  }
});

videoModal?.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    videoModal.classList.remove("active");
    if (iframe) {
      iframe.src = "";
    }
  }
});

// ====================
// Scroll Reveal Animation
// ====================
const revealElements = document.querySelectorAll(
  ".service-card, .team-card, .blog-card, .choose-item, .project-card",
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
// Hero Slider (Simple Version)
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

// Auto-advance dots (visual only since we have one slide)
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
  const searchTerm = prompt("Enter your search term:");
  if (searchTerm) {
    alert(`Searching for: ${searchTerm}`);
  }
});

// ====================
// Form Validation (if forms exist)
// ====================
const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple validation
    const inputs = form.querySelectorAll("input, textarea, select");
    let isValid = true;

    inputs.forEach((input) => {
      if (input.hasAttribute("required") && !input.value.trim()) {
        isValid = false;
        input.style.borderColor = "#e74c3c";
      } else {
        input.style.borderColor = "";
      }
    });

    if (isValid) {
      // Show success message
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      btn.innerText = "Sent Successfully!";
      btn.style.background = "#27ae60";

      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
        form.reset();
      }, 3000);
    }
  });
});

// ====================
// Parallax Effect for Hero
// ====================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");

  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
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

console.log("Buildex Construction Website Loaded Successfully!");
