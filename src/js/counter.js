export function initCounters() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const counterElements = document.querySelectorAll('[data-counter]');
  
  if (counterElements.length === 0) return;

  // Easing function: easeOutExpo
  const easeOutExpo = (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  const startCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const duration = parseInt(el.getAttribute('data-duration')) || 1200;
    const isDecimal = el.getAttribute('data-decimal') === 'true';
    
    // If reduced motion, just show target immediately
    if (prefersReducedMotion) {
      el.textContent = isDecimal ? target.toFixed(2) : target.toLocaleString();
      return;
    }

    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      
      // Calculate normalized time (0 to 1)
      let percent = Math.min(progress / duration, 1);
      percent = easeOutExpo(percent);
      
      const currentVal = target * percent;
      
      if (isDecimal) {
        el.textContent = currentVal.toFixed(2);
      } else {
        el.textContent = Math.floor(currentVal).toLocaleString();
      }
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        // Ensure exact target at end
        el.textContent = isDecimal ? target.toFixed(2) : target.toLocaleString();
      }
    };
    
    requestAnimationFrame(animate);
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.5 // Trigger when at least half visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target); // Run only once
      }
    });
  }, observerOptions);

  counterElements.forEach(el => {
    // Set initial to 0
    el.textContent = el.getAttribute('data-decimal') === 'true' ? "0.00" : "0";
    observer.observe(el);
  });
}
