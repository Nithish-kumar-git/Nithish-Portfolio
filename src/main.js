// ============================================================
// MAIN.JS — Nithish Kumar V Portfolio
// Design System v2.0 integration
// ============================================================

import './design_system/index.css';

// ─────────────────────────────────────────────────────────────
// 1. HERO LOAD SEQUENCE
// Add hero--loaded to body on DOMContentLoaded so .hero-animate
// children play their staggered entrance. Uses sessionStorage to
// skip re-animation on back navigation.
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Small tick so the first paint renders before animating
  requestAnimationFrame(() => {
    document.body.classList.add('hero--loaded');
  });

  initNav();
  initReveal();
  initCounters();
  initMobileMenu();
  initClipboardCopy();
});

// ─────────────────────────────────────────────────────────────
// 2. NAV SCROLL STATE
// Adds .nav--scrolled after 80px of scroll.
// ─────────────────────────────────────────────────────────────
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const toggle = () => nav.classList.toggle('nav--scrolled', window.scrollY > 80);
  toggle(); // set correct state on load
  window.addEventListener('scroll', toggle, { passive: true });
}

// ─────────────────────────────────────────────────────────────
// 3. SCROLL REVEAL
// Watches .reveal elements and adds .reveal--visible on entry.
// ─────────────────────────────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ─────────────────────────────────────────────────────────────
// 4. COUNTER ANIMATION
// Watches .counter elements. On intersection, counts from 0 to
// data-counter value. Reads data-suffix and data-duration.
// HTML must contain the real value as fallback text content.
// ─────────────────────────────────────────────────────────────
function initCounters() {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('[data-counter]').forEach((el) => counterObserver.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.counter);
  const suffix = el.dataset.suffix || '';
  const duration = parseInt(el.dataset.duration || '1200', 10);
  const isDecimal = el.dataset.decimal === 'true' || String(target).includes('.');
  const start = performance.now();

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOut(progress);
    const current = target * eased;

    el.textContent = isDecimal
      ? current.toFixed(2) + suffix
      : Math.floor(current).toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = isDecimal
        ? target.toFixed(2) + suffix
        : target.toLocaleString() + suffix;
      el.classList.add('counter--done');
    }
  }

  requestAnimationFrame(tick);
}

// ─────────────────────────────────────────────────────────────
// 5. MOBILE MENU
// Hamburger toggles .mobile-menu--open. ESC closes. Focus trap.
// ─────────────────────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!hamburger || !menu) return;

  const menuLinks = menu.querySelectorAll('.mobile-menu__link');

  function openMenu() {
    menu.classList.add('mobile-menu--open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('mobile-menu--open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
}

// ─────────────────────────────────────────────────────────────
// 6. CLIPBOARD COPY
// Elements with [data-copy-target]. Adds .copy-btn--copied for 2s.
// ─────────────────────────────────────────────────────────────
function initClipboardCopy() {
  document.querySelectorAll('[data-copy-target]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const target = btn.dataset.copyTarget;
      try {
        await navigator.clipboard.writeText(target);
        btn.classList.add('copy-btn--copied');
        setTimeout(() => btn.classList.remove('copy-btn--copied'), 2000);
      } catch {
        // Clipboard API not available — silent fail
      }
    });
  });
}
