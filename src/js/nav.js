export function initNav() {
  const nav = document.getElementById('main-nav');
  const hero = document.getElementById('hero');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!nav || !hero) return;

  // 1. Scroll style for nav
  const handleScroll = () => {
    // Height of hero approx minus some threshold
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // init

  // 2. Mobile Menu Toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
      document.body.classList.toggle('nav-open-active');
      
      // Prevent body scroll when menu is open
      if (navLinks.classList.contains('nav-open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        document.body.classList.remove('nav-open-active');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Active section highlighting
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Remove active from all
        links.forEach(link => link.classList.remove('active'));
        
        // Add to current
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}
