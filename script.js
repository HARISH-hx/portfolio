/* ===========================
   SMOOTH SCROLLING & NAVIGATION
   =========================== */

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle?.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

/* ===========================
   INTERSECTION OBSERVER FOR ANIMATIONS
   =========================== */

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.hero-content, .about-grid, .skills-grid, .projects-grid, .timeline, .section-header').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  observer.observe(el);
});

/* ===========================
   SCROLL ANIMATIONS
   =========================== */

const scrollElements = document.querySelectorAll('[class*="card"], [class*="item"]');
const elementInView = (el, dividedBy = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividedBy
  );
};

const displayScrollElement = (element) => {
  element.classList.add('scrolled');
};

const hideScrollElement = (element) => {
  element.classList.remove('scrolled');
};

const handleScrollAnimation = () => {
  scrollElements.forEach((element) => {
    if (elementInView(element, 1.25)) {
      displayScrollElement(element);
    }
  });
};

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation();

/* ===========================
   STAGGER ANIMATIONS FOR CARDS
   =========================== */

const animateElementsWithDelay = (elements, delayInMs = 100) => {
  elements.forEach((element, index) => {
    element.style.animation = `fadeInUp 0.8s ease-out ${index * delayInMs}ms forwards`;
    element.style.opacity = '0';
  });
};

// Animate project cards
const projectCards = document.querySelectorAll('.project-card');
animateElementsWithDelay(projectCards, 150);

// Animate skill categories
const skillCategories = document.querySelectorAll('.skill-category');
animateElementsWithDelay(skillCategories, 100);

// Animate highlight cards
const highlightCards = document.querySelectorAll('.highlight-card');
animateElementsWithDelay(highlightCards, 100);

// Animate timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
animateElementsWithDelay(timelineItems, 150);

/* ===========================
   PARALLAX EFFECT FOR HERO
   =========================== */

const parallaxElements = document.querySelectorAll('.gradient-orb');

const handleParallax = () => {
  const scrolled = window.scrollY;
  parallaxElements.forEach((el, index) => {
    const speed = 0.5 + index * 0.1;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
};

window.addEventListener('scroll', handleParallax, { passive: true });

/* ===========================
   FLOATING CARDS PARALLAX
   =========================== */

const floatingCards = document.querySelectorAll('.floating-card');

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  floatingCards.forEach((card, index) => {
    const moveX = (mouseX - 0.5) * 20 * (index + 1);
    const moveY = (mouseY - 0.5) * 20 * (index + 1);
    card.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

/* ===========================
   ACTIVE NAV LINK HIGHLIGHTING
   =========================== */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNavLink = () => {
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.style.borderBottomColor = 'transparent');
      navLinks.forEach(link => link.style.color = 'var(--text-muted)');
      if (navLink) {
        navLink.style.color = 'var(--text)';
        navLink.style.borderBottomColor = 'var(--primary)';
        navLink.style.borderBottomWidth = '2px';
      }
    }
  });
};

window.addEventListener('scroll', highlightNavLink, { passive: true });

/* ===========================
   COUNTER ANIMATION
   =========================== */

const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;

  counters.forEach(counter => {
    const animate = () => {
      const target = +counter.getAttribute('data-target') || parseFloat(counter.textContent);
      const increment = target / speed;

      const updateCount = () => {
        const count = +counter.textContent;
        if (count < target) {
          counter.textContent = (count + increment).toFixed(2);
          setTimeout(updateCount, 1);
        } else {
          counter.textContent = target;
        }
      };
      updateCount();
    };

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animate();
        observer.unobserve(counter);
      }
    });

    observer.observe(counter);
  });
};

animateCounters();

/* ===========================
   CONTACT FORM HANDLING
   =========================== */

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
    button.disabled = true;
    button.style.background = 'linear-gradient(135deg, #10b981, #14b8a6)';

    // Reset form
    contactForm.reset();

    // Reset button after 3 seconds
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
      button.style.background = '';
    }, 3000);
  });
}

/* ===========================
   SMOOTH SCROLL BEHAVIOR FOR ANCHOR LINKS
   =========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ===========================
   BACK TO TOP BUTTON
   =========================== */

const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.style.opacity = '1';
    backToTopBtn.style.pointerEvents = 'auto';
  } else {
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.pointerEvents = 'none';
  }
});

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* ===========================
   SKILL TAG HOVER EFFECT
   =========================== */

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) translateY(-5px)';
    this.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)';
  });

  tag.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) translateY(0)';
    this.style.boxShadow = 'none';
  });
});

/* ===========================
   PROJECT CARD HOVER ANIMATION
   =========================== */

const projectImages = document.querySelectorAll('.project-image');

projectImages.forEach(image => {
  image.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });

  image.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

/* ===========================
   REVEAL ANIMATION ON SCROLL
   =========================== */

const revealElements = () => {
  const reveals = document.querySelectorAll('.project-card, .skill-category, .highlight-card, .timeline-item');

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('revealed');
    }
  });
};

window.addEventListener('scroll', revealElements, { passive: true });
revealElements();

/* ===========================
   SMOOTH TRANSITIONS FOR INTERACTIVE ELEMENTS
   =========================== */

const interactiveElements = document.querySelectorAll('.btn, .nav-link, .social-links a, .project-link');

interactiveElements.forEach(element => {
  element.addEventListener('mousedown', function() {
    this.style.transform = 'scale(0.95)';
  });

  element.addEventListener('mouseup', function() {
    this.style.transform = '';
  });

  element.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

/* ===========================
   FORM INPUT FOCUS EFFECTS
   =========================== */

const formInputs = document.querySelectorAll('input, textarea');

formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'translateY(-2px)';
  });

  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'translateY(0)';
  });
});

/* ===========================
   KEYBOARD NAVIGATION SUPPORT
   =========================== */

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }

  // Keyboard shortcut to scroll to top
  if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

/* ===========================
   DYNAMIC SCROLL HEADER SHADOW
   =========================== */

const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    header.style.background = 'rgba(15, 23, 42, 0.95)';
  } else {
    header.style.boxShadow = 'none';
    header.style.background = 'rgba(15, 23, 42, 0.8)';
  }
}, { passive: true });

/* ===========================
   PAGE LOAD ANIMATIONS
   =========================== */

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  
  // Add animation to hero content on load
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.animation = 'fadeInUp 1s ease-out';
  }
});

/* ===========================
   PERFORMANCE: DEBOUNCE SCROLL
   =========================== */

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener('scroll', debounce(() => {
  highlightNavLink();
  handleScrollAnimation();
}, 100), { passive: true });

/* ===========================
   ACCESSIBILITY: FOCUS VISIBLE
   =========================== */

document.addEventListener('keydown', () => {
  document.body.classList.add('using-keyboard');
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('using-keyboard');
});

/* Add focus styles */
const style = document.createElement('style');
style.textContent = `
  body.using-keyboard a:focus,
  body.using-keyboard button:focus,
  body.using-keyboard input:focus,
  body.using-keyboard textarea:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

/* ===========================
   CONSOLE GREETING
   =========================== */

console.log('%c🚀 Welcome to Harish B\'s Portfolio!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cLooking for a passionate Frontend Developer? Let\'s connect!', 'color: #ec4899; font-size: 14px;');
console.log('%cGitHub: https://github.com/HARISH-hx', 'color: #14b8a6; font-size: 12px;');
console.log('%cLinkedIn: https://www.linkedin.com/in/harish-babu-dev/', 'color: #f59e0b; font-size: 12px;');
