import './redesign.css';

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let lastMenuTrigger = null;

function setMenu(open, returnFocus = true) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileMenu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  if (open) {
    lastMenuTrigger = menuToggle;
    mobileMenu.querySelector('a')?.focus();
  } else if (returnFocus) {
    lastMenuTrigger?.focus();
  }
}

menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false, false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') setMenu(false);
});

const updateHeader = () => header?.classList.toggle('site-header--raised', window.scrollY > 16);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

if (!motionQuery.matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px' });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

document.querySelectorAll('[data-dialog]').forEach((trigger) => {
  trigger.addEventListener('click', () => document.getElementById(trigger.dataset.dialog)?.showModal());
});
document.querySelectorAll('[data-close-dialog]').forEach((button) => {
  button.addEventListener('click', () => button.closest('dialog')?.close());
});
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
});

const copyButton = document.querySelector('[data-copy-email]');
const copyStatus = document.querySelector('[data-copy-status]');
copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.email);
    copyStatus.textContent = 'Email copied.';
  } catch {
    copyStatus.textContent = 'Copy unavailable — select the address above.';
  }
});
