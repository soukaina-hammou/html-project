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

  // Scroll reveal + progress bar animation
  const observerOptions = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // animate inner progress bars if present
        entry.target.querySelectorAll && entry.target.querySelectorAll('.progress').forEach(pb => {
          const span = pb.querySelector('span');
          const pct = Number(pb.getAttribute('data-progress') || 0);
          if (span) span.style.width = pct + '%';
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe revealables (cards, sections)
  document.querySelectorAll('.reveal, .card').forEach(el => revealObserver.observe(el));

  // Also animate skills progress on page load if visible
  document.querySelectorAll('.progress').forEach(pb => {
    // set initial width 0 (CSS default) and animate when in view via observer
    // For elements already in view, observer callback will run above and animate them
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
        // reset progress bars if present (no-op for form, keeps behavior predictable)
      }, 900);
    });
  }
});
