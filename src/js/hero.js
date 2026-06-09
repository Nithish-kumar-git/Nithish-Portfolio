export function initHeroSequence() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const elements = {
    eyebrow: document.querySelector('.hero-eyebrow'),
    title: document.querySelector('.hero-title'),
    subtitle: document.querySelector('.hero-subtitle'),
    pills: document.querySelectorAll('.proof-pill'),
    actions: document.querySelector('.hero-actions'),
    github: document.querySelector('.hero-github-link'),
    indicator: document.querySelector('.scroll-indicator')
  };

  if (!elements.title) return;

  // For reduced motion, just show everything instantly
  if (prefersReducedMotion) {
    Object.values(elements).forEach(el => {
      if (!el) return;
      if (NodeList.prototype.isPrototypeOf(el)) {
        el.forEach(n => { n.style.opacity = '1'; n.style.transform = 'none'; });
      } else {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
    return;
  }

  // Animation Sequence setup
  const setAnim = (el, transformStr) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = transformStr;
    // Force reflow
    void el.offsetWidth;
  };

  const execAnim = (el, delay, duration) => {
    if (!el) return;
    setTimeout(() => {
      el.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay);
  };

  // Initial states
  setAnim(elements.eyebrow, 'translateY(8px)');
  setAnim(elements.title, 'translateY(12px)');
  setAnim(elements.subtitle, 'translateY(12px)');
  elements.pills.forEach(p => setAnim(p, 'translateY(12px)'));
  setAnim(elements.actions, 'translateY(12px)');
  setAnim(elements.github, 'translateY(12px)');
  if(elements.indicator) setAnim(elements.indicator, 'translateY(0)');

  // Execution
  execAnim(elements.eyebrow, 100, 300);
  
  // Title stagger logic (splitting by lines roughly if needed, or just animating container)
  execAnim(elements.title, 200, 400);
  
  execAnim(elements.subtitle, 350, 300);
  
  // Pills stagger
  elements.pills.forEach((pill, i) => {
    execAnim(pill, 450 + (i * 80), 250);
  });
  
  execAnim(elements.actions, 600, 300);
  execAnim(elements.github, 700, 300);
  
  if (elements.indicator) {
    setTimeout(() => {
      elements.indicator.style.transition = 'opacity 600ms ease-out';
      elements.indicator.style.opacity = '1';
    }, 900);
  }
}
