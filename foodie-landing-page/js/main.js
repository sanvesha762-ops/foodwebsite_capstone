// Shared JS for landing + auth pages (with animations + mobile nav)
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Smooth scrolling on landing page ---------- */
  const scrollTriggers = document.querySelectorAll("[data-scroll-target]");

  scrollTriggers.forEach((el) => {
    el.addEventListener("click", (e) => {
      const targetId = el.getAttribute("data-scroll-target");
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ---------- Demo search behavior ---------- */
  const searchForm = document.querySelector(".search-bar");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const address = document.querySelector("#location")?.value || "";
      const category =
        document.querySelector("#category")?.value || "All Categories";

      alert(
        `Searching restaurants near "${address || "your location"}" in category "${category}".\n(Connect this to a real API later.)`
      );
    });
  }

  /* ---------- Highlight active nav item (landing page only) ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

  function setActiveNav() {
    if (!sections.length || !navLinks.length) return;

    let currentId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = "#" + section.id;
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNav);
  setActiveNav();

  /* ---------- Mobile navbar toggle ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinksContainer = document.querySelector(".nav-links");
  const navAuthContainer = document.querySelector(".nav-auth");

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navLinksContainer.classList.toggle("mobile-open");
      if (navAuthContainer) {
        navAuthContainer.classList.toggle("mobile-open");
      }
    });

    // close menu when clicking any nav link
    navLinksContainer.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "a") {
        navToggle.classList.remove("open");
        navLinksContainer.classList.remove("mobile-open");
        if (navAuthContainer) {
          navAuthContainer.classList.remove("mobile-open");
        }
      }
    });
  }

  /* ---------- Reveal sections on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Auth pages: login + signup demo ---------- */

  // Login form
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.querySelector("#login-email")?.value;
      alert(`Logged in successfully as ${email} (demo).\nRedirecting home...`);
      window.location.href = "index.html";
    });

    const demoLoginBtn = document.querySelector("#demoLoginBtn");
    if (demoLoginBtn) {
      demoLoginBtn.addEventListener("click", () => {
        alert("Continuing as guest (demo).\nRedirecting to home page...");
        window.location.href = "index.html";
      });
    }
  }

  // Signup form
  const signupForm = document.querySelector("#signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.querySelector("#signup-name")?.value || "Friend";
      const pwd = document.querySelector("#signup-password")?.value || "";
      const confirm = document.querySelector("#signup-confirm")?.value || "";

      if (pwd !== confirm) {
        alert("Passwords do not match. Please check and try again.");
        return;
      }

      alert(
        `Welcome to Foodie, ${name}! (demo signup)\nYou can now log in with your credentials.`
      );
      window.location.href = "login.html";
    });
  }
});