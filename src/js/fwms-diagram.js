export function initFwmsDiagram() {
  const diagram = document.querySelector('.fwms-architecture svg');
  if (!diagram) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Simple intersection observer to trigger CSS class for SVG animation
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-svg');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(diagram);
}
