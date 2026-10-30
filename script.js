/* =========================================================
   LATIFA KHAIRAT — PORTFOLIO INTERACTIONS
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const year = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  // Footer year
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  const closeMenu = () => {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
    if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  });

  navItems.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // Typing effect, with a plain-text fallback if Typed.js is unavailable
  const typedTarget = document.getElementById("typedText");
  if (typedTarget && window.Typed) {
    typedTarget.textContent = "";
    new Typed("#typedText", {
      strings: ["responsive websites", "thoughtful interfaces", "useful web experiences"],
      typeSpeed: 48,
      backSpeed: 28,
      backDelay: 1500,
      loop: true,
      smartBackspace: true,
      showCursor: false
    });
  }

  // Project filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
  });

  // Reveal elements as they enter the viewport; show all if unsupported
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  // Highlight the current navigation section
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeId = entry.target.id;
        navItems.forEach((link) => {
          const active = link.getAttribute("href") === `#${activeId}`;
          link.classList.toggle("active", active);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Contact form setup:
  // Add your own Web3Forms access key in the hidden input before using.
  // The form deliberately does not pretend to send messages without a backend/key.
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const accessKey = form.dataset.accessKey?.trim();
    if (!accessKey) {
      if (formStatus) {
        formStatus.textContent = "The design is ready, but message delivery is not configured yet. Add your Web3Forms access key in script.js first.";
        formStatus.className = "form-status error";
      }
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton?.innerHTML;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';
    }
    if (formStatus) {
      formStatus.textContent = "Sending your message...";
      formStatus.className = "form-status";
    }

    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("from_name", "Latifa Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Message could not be sent.");
      }

      form.reset();
      if (formStatus) {
        formStatus.textContent = "Thanks! Your message has been sent successfully.";
        formStatus.className = "form-status success";
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = error.message || "Something went wrong. Please try again later.";
        formStatus.className = "form-status error";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    }
  });
});
