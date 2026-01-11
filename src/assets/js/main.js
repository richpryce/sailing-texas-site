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

  // Ensure main image is visible initially (fix race condition)
  // Check if image is already loaded (cached or loaded before JS runs)
  if (mainImage.complete && mainImage.naturalWidth > 0) {
    // Image already loaded, ensure it's visible
    mainImage.style.opacity = '1';
  } else {
    // Image not loaded yet, set up fade-in
    // But don't hide it if it's already partially loaded
    const currentOpacity = window.getComputedStyle(mainImage).opacity;
    if (currentOpacity !== '0') {
      // Only set to 0 if not already set (preserve any existing styles)
      mainImage.style.opacity = '0';
    }
    mainImage.style.transition = 'opacity 0.3s ease';
    
    const showMainImage = () => {
      mainImage.style.opacity = '1';
    };
    
    // Use both load and error events
    mainImage.addEventListener('load', showMainImage, { once: true });
    mainImage.addEventListener('error', showMainImage, { once: true });
    
    // Fallback: check multiple times in case load event already fired
    const checkLoaded = () => {
      if (mainImage.complete && mainImage.naturalWidth > 0) {
        showMainImage();
      }
    };
    
    // Check immediately
    checkLoaded();
    
    // Check after a short delay (race condition protection)
    setTimeout(checkLoaded, 50);
    setTimeout(checkLoaded, 200);
  }

  thumbButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const newSrc = btn.dataset.image;

      // Update main image with fade effect
      mainImage.style.opacity = '0';
      mainImage.style.transition = 'opacity 0.15s ease';

      // Create new image to preload
      const newImg = new Image();
      newImg.onload = () => {
        mainImage.src = newSrc;
        mainImage.style.opacity = '1';
      };
      newImg.onerror = () => {
        // If image fails, still show it (error handler in HTML will deal with it)
        mainImage.src = newSrc;
        mainImage.style.opacity = '1';
      };
      newImg.src = newSrc;

      // Update active state
      thumbButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
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

          // Check if image is already loaded (cached images)
          if (img.complete && img.naturalWidth > 0) {
            // Image already loaded, ensure it's visible
            img.style.opacity = '1';
            return;
          }

          // Add fade-in animation for images that haven't loaded yet
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.3s ease';

          // Handle both load and error cases
          const showImage = () => {
            img.style.opacity = '1';
          };

          img.addEventListener('load', showImage, { once: true });
          img.addEventListener('error', showImage, { once: true });
          
          // Fallback: check again after a short delay in case load event already fired
          setTimeout(() => {
            if (img.complete && img.naturalWidth > 0) {
              showImage();
            }
          }, 100);

          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });

    lazyImages.forEach(img => {
      // Don't apply lazy loading to images that are already loaded
      if (img.complete && img.naturalWidth > 0) {
        // Image already loaded, ensure it's visible
        img.style.opacity = '1';
        return;
      }
      imageObserver.observe(img);
    });
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
