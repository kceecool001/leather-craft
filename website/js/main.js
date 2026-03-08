/* ============================================================
   LEATHER CRAFT VENTURES LTD — main.js
   Responsibilities:
     1. Sticky nav on scroll
     2. Scroll-reveal for .reveal elements
     3. Mobile hamburger menu with keyboard support
     4. Smooth scrolling for anchor links
     5. Contact form submission handler
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. STICKY NAV ── */
  const nav = document.getElementById('site-nav');

  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ── 2. SCROLL REVEAL ── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
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


  /* ── 3. MOBILE HAMBURGER WITH KEYBOARD SUPPORT ── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  let lastFocusedElement = null;

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    lastFocusedElement = document.activeElement;
    const firstLink = mobileMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }


  /* ── 4. SMOOTH SCROLLING FOR ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#main-content') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ── 5. CONTACT FORM ── */
  const form = document.getElementById('quote-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      successMsg.style.display = 'block';
      form.reset();
      setTimeout(function () {
        successMsg.style.display = 'none';
      }, 7000);
    });
  }

})();