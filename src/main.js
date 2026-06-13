import './design_system/index.css';

document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initNav();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initClipboardCopy();
  initCarousels();
});

function initHero() {
  if (sessionStorage.getItem('heroLoaded')) {
    document.body.classList.add('hero--loaded');
    return;
  }
  requestAnimationFrame(() => {
    document.body.classList.add('hero--loaded');
    sessionStorage.setItem('heroLoaded', '1');
  });
}

function initNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('nav--scrolled', window.scrollY > 80);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!hamburger || !menu) return;
  const open = () => {
    menu.classList.add('mobile-menu--open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    menu.classList.remove('mobile-menu--open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };
  hamburger.addEventListener('click', () =>
    menu.classList.contains('mobile-menu--open') ? close() : open()
  );
  menu.querySelectorAll('a[href]').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
  elements.forEach(el => observer.observe(el));
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const duration = parseInt(el.dataset.duration || '1200', 10);
    const isDecimal = el.dataset.decimal === 'true';
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = target * easeOut(progress);
      if (isDecimal) {
        el.textContent = value.toFixed(2);
      } else {
        el.textContent = Math.round(value).toLocaleString() + suffix;
      }
      if (progress < 1) requestAnimationFrame(tick);
      else el.classList.add('counter--done');
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

function initClipboardCopy() {
  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy-target');
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        Object.assign(ta.style, { position: 'fixed', opacity: '0', top: '0', left: '0' });
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      btn.classList.add('copy-btn--copied');
      setTimeout(() => btn.classList.remove('copy-btn--copied'), 2000);
    });
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  const overlay = document.getElementById('modal-overlay');
  if (!modal || !overlay) return;
  modal.classList.add('modal--open');
  overlay.classList.add('modal-overlay--open');
  document.body.style.overflow = 'hidden';
  const firstFocusable = modal.querySelector('button, a[href]');
  if (firstFocusable) firstFocusable.focus();
}

function closeModal() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('modal--open'));
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('modal-overlay--open');
  document.body.style.overflow = '';
}

function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel__track');
    const imgs = Array.from(carousel.querySelectorAll('.carousel__img'));
    const dotsWrap = carousel.querySelector('.carousel__dots');
    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');
    let index = 0;

    imgs.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'carousel__dot' + (i === 0 ? ' carousel__dot--active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.children);

    function goTo(i) {
      index = (i + imgs.length) % imgs.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('carousel__dot--active', di === index));
    }

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));

    imgs.forEach((img) => img.addEventListener('click', () => openLightbox(img.src, img.alt)));
  });
}

function openLightbox(src, alt) {
  let lightbox = document.querySelector('.lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox__close" aria-label="Close">×</button>
      <img class="lightbox__img" src="" alt="" />
    `;
    document.body.appendChild(lightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox__close')) {
        lightbox.classList.remove('lightbox--active');
      }
    });
  }
  lightbox.querySelector('.lightbox__img').src = src;
  lightbox.querySelector('.lightbox__img').alt = alt;
  lightbox.classList.add('lightbox--active');
}

window.openModal = openModal;
window.closeModal = closeModal;

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
