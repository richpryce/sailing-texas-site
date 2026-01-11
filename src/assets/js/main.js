/**
 * Sailing Texas - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBoatGallery();
  initSmoothScroll();
  initLazyLoading();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mainNav = document.getElementById('main-nav');

  if (!menuToggle || !mobileNav) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileNav.classList.toggle('is-open');
    mobileNav.setAttribute('aria-hidden', isExpanded);

    // Toggle icons
    const menuIcon = menuToggle.querySelector('.menu-icon');
    const closeIcon = menuToggle.querySelector('.close-icon');

    if (menuIcon && closeIcon) {
      menuIcon.classList.toggle('hidden', !isExpanded);
      closeIcon.classList.toggle('hidden', isExpanded);
    }

    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMobileMenu();
      menuToggle.focus();
    }
  });

  function closeMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    const menuIcon = menuToggle.querySelector('.menu-icon');
    const closeIcon = menuToggle.querySelector('.close-icon');
    if (menuIcon && closeIcon) {
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  }
}

/**
 * Boat Gallery - Image Switcher
 */
function initBoatGallery() {
  const mainImage = document.getElementById('main-boat-image');
  const thumbButtons = document.querySelectorAll('.thumb-btn');

  if (!mainImage || thumbButtons.length === 0) return;

  thumbButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const newSrc = btn.dataset.image;

      // Update main image with fade effect
      mainImage.style.opacity = '0';

      setTimeout(() => {
        mainImage.src = newSrc;
        mainImage.style.opacity = '1';
      }, 150);

      // Update active state
      thumbButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Add smooth transition to main image
  mainImage.style.transition = 'opacity 0.15s ease';
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });
}

/**
 * Lazy Loading for images (native + fallback)
 */
function initLazyLoading() {
  // Native lazy loading is supported in modern browsers
  // This adds intersection observer for older browsers or enhanced control

  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Add fade-in animation
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.3s ease';

          img.addEventListener('load', () => {
            img.style.opacity = '1';
          }, { once: true });

          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

/**
 * Copy to clipboard with feedback
 */
window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Show success feedback
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = 'Link copied to clipboard!';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-ocean-deep, #0a2540);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 1000;
      animation: fadeInUp 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  });
};

/**
 * Format numbers with locale
 */
window.formatNumber = function(num) {
  return new Intl.NumberFormat('en-US').format(num);
};
