/* ============================================================
   LEATHER CRAFT VENTURES LTD — main.js
   Responsibilities:
     1. Sticky nav on scroll
     2. Scroll-reveal for .reveal elements
     3. Mobile hamburger menu
     4. Contact form submission handler
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. STICKY NAV ── */
  const nav = document.getElementById('site-nav');

  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load in case page is pre-scrolled


  /* ── 2. SCROLL REVEAL ── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          // Stagger siblings slightly for visual rhythm
          const delay = i * 70;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ── 3. MOBILE HAMBURGER ── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ── 4. CONTACT FORM ── */
  const form        = document.getElementById('quote-form');
  const successMsg  = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // In production: replace this block with a fetch() to your
      // email API (Formspree, EmailJS, Netlify Forms, etc.)
      // e.g.: fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: new FormData(form) })

      // Simulate successful submission
      successMsg.style.display = 'block';
      form.reset();

      setTimeout(function () {
        successMsg.style.display = 'none';
      }, 7000);
    });
  }

})();