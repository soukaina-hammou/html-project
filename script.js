document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!expanded));
      if (nav.style.display === "block") {
        nav.style.display = "";
      } else {
        nav.style.display = "block";
      }
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // close nav on mobile
          if (window.innerWidth <= 640 && nav) {
            nav.style.display = "";
            navToggle.setAttribute("aria-expanded", "false");
          }
        }
      }
    });
  });

  // Simple contact form validation & submit handler
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!name || !email || !message) {
        status.textContent = "Please complete all fields.";
        return;
      }
      if (!emailRe.test(email)) {
        status.textContent = "Please provide a valid email address.";
        return;
      }
      // Simulate successful submit
      status.textContent = "Sending message…";
      setTimeout(() => {
        status.textContent = "Thanks — your message has been sent.";
        form.reset();
      }, 900);
    });
  }
});
