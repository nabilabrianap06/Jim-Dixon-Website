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


  // --- Executive Stats Detail Modal ---
  const modal = document.getElementById('stat-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-backdrop');

  const modalDetails = {
    experience: {
      title: "20+ Years of Enterprise IT Leadership",
      html: `
        <p>A proven track record spanning over two decades of directing large-scale technology initiatives, establishing enterprise PMO standards, and leading digital transformation across global corporate environments.</p>
        
        <h4>Key Experience Highlights:</h4>
        <ul>
          <li><strong>ADM (Cincinnati, Ohio)</strong> — Technology Program Manager leading enterprise digital transformation, core financial platform modernizations, and cross-functional team governance.</li>
          <li><strong>Senior Program & Portfolio Lead</strong> — Directed complex enterprise portfolio initiatives, ERP integrations, PMO structure alignment, and multi-million-dollar technology investments.</li>
          <li><strong>Technology Delivery Manager</strong> — Spearheaded technical delivery teams, business process optimization, and legacy application migration strategies.</li>
        </ul>

        <h4>Leadership Core Strengths:</h4>
        <p>Strategic technology roadmapping, cross-departmental alignment, executive stakeholder engagement, and technical talent development.</p>
      `
    },
    systems: {
      title: "Enterprise Financial Systems & Platforms",
      html: `
        <p>Specialized domain expertise in governing, modernizing, and deploying mission-critical financial applications and enterprise resource planning (ERP) platforms.</p>
        
        <h4>Focus Areas:</h4>
        <ul>
          <li><strong>ERP & Financial Modernization:</strong> Streamlining legacy financial architecture into integrated enterprise platforms.</li>
          <li><strong>Data & Reporting Integrity:</strong> Ensuring high visibility, compliance, and accurate cross-functional reporting across business units.</li>
          <li><strong>Process Optimization:</strong> Reducing operational friction and accelerating financial close and forecasting workflows.</li>
        </ul>
      `
    },
    delivery: {
      title: "Global Cross-Functional Team Delivery",
      html: `
        <p>Building, guiding, and scaling high-performing cross-functional technology teams across distributed enterprise environments.</p>
        
        <h4>Delivery Frameworks & Approach:</h4>
        <ul>
          <li><strong>Hybrid & Agile Methodologies:</strong> Tailoring project delivery frameworks to align with complex corporate governance requirements.</li>
          <li><strong>Vendor & Partner Integration:</strong> Managing strategic third-party relationships, contract negotiations, and quality control.</li>
          <li><strong>Team Mentorship:</strong> Fostering a high-trust, high-accountability culture that empowers technical teams to perform at their best.</li>
        </ul>
      `
    },
    alignment: {
      title: "100% Strategic Business Alignment",
      html: `
        <p>Ensuring every IT dollar, program milestone, and technical architecture decision serves a clear corporate strategic objective.</p>
        
        <h4>Strategic Alignment Principles:</h4>
        <ul>
          <li><strong>C-Suite & Stakeholder Communication:</strong> Translating complex technical roadmaps into business outcomes for executive leadership.</li>
          <li><strong>Value Realization:</strong> Measuring program success strictly against business value, operational efficiency, and ROI.</li>
          <li><strong>Risk & Governance Controls:</strong> Proactive risk identification and proactive change management across organizational business units.</li>
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
