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


  // --- Executive Stats Detail Modal ---
  const modal = document.getElementById('stat-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-backdrop');

  const modalDetails = {
    experience: {
      title: "20+ Years in Enterprise IT Leadership",
      html: `
        <p>Over two decades directing large-scale technology initiatives, establishing program governance, and leading digital transformation across corporate environments.</p>
        
        <h4>Career Highlights:</h4>
        <ul>
          <li><strong>ADM (Cincinnati, Ohio):</strong> Technology Program Manager leading digital transformation, financial platform modernizations, and cross-functional team governance.</li>
          <li><strong>Senior Program &amp; Portfolio Lead:</strong> Managed complex program portfolios, ERP implementations, and multi-location IT initiatives.</li>
          <li><strong>Technology Delivery Manager:</strong> Led technical delivery teams, optimized business processes, and modernized legacy application architectures.</li>
        </ul>

        <h4>Core Competencies:</h4>
        <p>Strategic roadmapping, cross-departmental alignment, executive stakeholder communication, and talent development.</p>
      `
    },
    systems: {
      title: "10+ Enterprise Financial Systems & ERP Initiatives",
      html: `
        <p>Direct experience modernizing and deploying mission-critical financial applications and enterprise resource planning (ERP) platforms.</p>
        
        <h4>Focus Areas:</h4>
        <ul>
          <li><strong>Financial Platform Modernization:</strong> Streamlining legacy financial tools into scalable enterprise systems.</li>
          <li><strong>Data and Reporting Accuracy:</strong> Ensuring clear operational visibility and accurate reporting across business units.</li>
          <li><strong>Workflow Optimization:</strong> Removing process bottlenecks in financial close and planning workflows.</li>
        </ul>
      `
    },
    delivery: {
      title: "5+ Global & Cross-Functional Team Initiatives",
      html: `
        <p>Building and guiding cross-functional technology teams across distributed corporate environments.</p>
        
        <h4>Delivery Frameworks:</h4>
        <ul>
          <li><strong>Hybrid and Agile Models:</strong> Applying flexible delivery models that fit enterprise governance requirements.</li>
          <li><strong>Vendor and Partner Management:</strong> Managing strategic partner relationships, contracts, and delivery standards.</li>
          <li><strong>Team Mentorship:</strong> Fostering a supportive, high-accountability environment for technical teams.</li>
        </ul>
      `
    },
    alignment: {
      title: "100% Focus on Business Alignment",
      html: `
        <p>Ensuring technology initiatives and program milestones directly support corporate business goals.</p>
        
        <h4>Key Focus:</h4>
        <ul>
          <li><strong>Executive Communication:</strong> Translating technical roadmaps into clear business outcomes for leadership.</li>
          <li><strong>Practical Outcomes:</strong> Measuring success by business value, efficiency gains, and ROI.</li>
          <li><strong>Risk and Change Management:</strong> Identifying project risks early and guiding smooth organizational change.</li>
        </ul>
      `
    }
  };

  const openModal = (statId) => {
    const detail = modalDetails[statId];
    if (detail && modal) {
      modalTitle.textContent = detail.title;
      modalBody.innerHTML = detail.html;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // Add click & keyboard events to stat items
  statItems.forEach(item => {
    item.addEventListener('click', () => {
      const statId = item.getAttribute('data-stat-id');
      if (statId) openModal(statId);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const statId = item.getAttribute('data-stat-id');
        if (statId) openModal(statId);
      }
    });
  });

  // Modal close triggers
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

});
