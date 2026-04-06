/* ============================================================
   LEATHER CRAFT VENTURES LTD — main.js
   Responsibilities:
     1. Sticky nav on scroll
     2. Scroll-reveal for .reveal elements
     3. Mobile hamburger menu with keyboard support
     4. Smooth scrolling for anchor links
     5. Contact form submission handler
     6. Mobile optimizations and touch handling
   ============================================================ */

(function () {
  'use strict';

  /* ── MOBILE DETECTION ── */
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isMobile) {
    document.body.classList.add('is-mobile');
  }
  
  if (isTouch) {
    document.body.classList.add('is-touch');
  }

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
          const delay = isMobile ? i * 50 : i * 70; // Faster animations on mobile
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: isMobile ? 0.08 : 0.12 } // Lower threshold on mobile
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
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
    
    const firstLink = mobileMenu.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
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

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });
    
    // Handle swipe to close on mobile
    if (isTouch) {
      let startY = 0;
      let startX = 0;
      
      mobileMenu.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
      }, { passive: true });
      
      mobileMenu.addEventListener('touchend', function(e) {
        const endY = e.changedTouches[0].clientY;
        const endX = e.changedTouches[0].clientX;
        const diffY = startY - endY;
        const diffX = Math.abs(startX - endX);
        
        // Swipe up to close (and not too much horizontal movement)
        if (diffY > 50 && diffX < 100) {
          closeMenu();
        }
      }, { passive: true });
    }
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
      
      // Scroll to success message on mobile
      if (isMobile) {
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      setTimeout(function () {
        successMsg.style.display = 'none';
      }, 7000);
    });
    
    // Improve form UX on mobile
    if (isMobile) {
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(function(input) {
        // Prevent zoom on focus for iOS
        if (input.type !== 'file') {
          input.addEventListener('focus', function() {
            if (parseFloat(getComputedStyle(input).fontSize) < 16) {
              input.style.fontSize = '16px';
            }
          });
        }
      });
    }
  }


  /* ── 6. MOBILE OPTIMIZATIONS ── */
  
  // Optimize scroll performance on mobile
  if (isMobile) {
    let ticking = false;
    
    function optimizedScroll() {
      if (!ticking) {
        requestAnimationFrame(function() {
          handleNavScroll();
          ticking = false;
        });
        ticking = true;
      }
    }
    
    window.removeEventListener('scroll', handleNavScroll);
    window.addEventListener('scroll', optimizedScroll, { passive: true });
  }
  
  // Handle orientation change
  window.addEventListener('orientationchange', function() {
    // Close mobile menu on orientation change
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
    
    // Recalculate viewport height for mobile browsers
    setTimeout(function() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', vh + 'px');
    }, 100);
  });
  
  // Set initial viewport height
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
  
  // Handle resize for mobile browsers
  window.addEventListener('resize', function() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }, { passive: true });
  
  // Improve touch scrolling on iOS
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    document.body.style.webkitOverflowScrolling = 'touch';
  }
  
  // Prevent double-tap zoom on buttons
  if (isTouch) {
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-navy, .btn-outline, .btn-white');
    buttons.forEach(function(button) {
      button.style.touchAction = 'manipulation';
    });
  }
  
  // Add loading state for better perceived performance
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

})();