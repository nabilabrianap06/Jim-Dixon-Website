/* ============================================
   JIM DIXON — Portfolio Interactions
   Subtle, executive micro-interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Reading Progress Bar ---
  const progressBar = document.getElementById('scroll-progress');

  const updateProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    }
  };


  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // --- Stats Counter & Fade-in Animation ---
  const statItems = document.querySelectorAll('.stat-item');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600; // 1.6s
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      // Ease-out cubic formula for smooth count up
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOutProgress * target);

      el.textContent = `${currentVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(updateCount);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        item.classList.add('animated');

        const numberEl = item.querySelector('.stat-number[data-target]');
        if (numberEl && !numberEl.classList.contains('counted')) {
          numberEl.classList.add('counted');
          animateCounter(numberEl);
        }

        statsObserver.unobserve(item);
      }
    });
  }, {
    threshold: 0.25
  });

  statItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
    statsObserver.observe(item);
  });


  // --- Nav scroll state & progress ---
  const nav = document.querySelector('.nav');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    updateProgress();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  updateProgress();


  // --- Mobile menu ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }


  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // --- Core Expertise Accordion ---
  const expertiseItems = document.querySelectorAll('.expertise-item');

  expertiseItems.forEach(item => {
    item.addEventListener('click', () => {
      const isExpanded = item.classList.contains('active');

      expertiseItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });

      if (isExpanded) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

});
