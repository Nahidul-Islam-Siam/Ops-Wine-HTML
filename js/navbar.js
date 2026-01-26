// js/navbar.js
document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const topBar = document.getElementById('top-bar');
  const navbar = document.getElementById('main-navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileToggle = document.getElementById('mobile-toggle');
  const profileTrigger = document.getElementById('profile-trigger');
  const profileMenu = document.getElementById('profile-menu');
  const logoutBtn = document.getElementById('logout-btn');
  const guestAuth = document.getElementById('guest-auth');
  const userProfile = document.getElementById('user-profile');
  const cartCountEl = document.getElementById('cart-count');
  const langButtons = document.querySelectorAll('.lang-btn');

  // State
  let isMobileOpen = false;
  let isProfileOpen = false;
  let isLoggedIn = false; // Set to true in real app after auth check
  let cartCount = 0;

  // Initialize
  updateCartCount(cartCount);
  updateAuthUI(isLoggedIn);

  // Language Switch
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Optional: save to localStorage or send to backend
    });
  });

  // Mobile Menu Toggle
  mobileToggle.addEventListener('click', toggleMobileMenu);

  function toggleMobileMenu() {
    isMobileOpen = !isMobileOpen;
    mobileMenu.style.display = isMobileOpen ? 'block' : 'none';
    const icon = mobileToggle.querySelector('svg');
    if (isMobileOpen) {
      icon.outerHTML = `<svg class="icon-svg close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
    } else {
      icon.outerHTML = `<svg class="icon-svg menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
    }
  }

  window.closeMobileMenu = function () {
    isMobileOpen = false;
    mobileMenu.style.display = 'none';
    mobileToggle.querySelector('svg').outerHTML = `<svg class="icon-svg menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
  };

  // Profile Dropdown
  profileTrigger.addEventListener('click', toggleProfileMenu);

  function toggleProfileMenu() {
    isProfileOpen = !isProfileOpen;
    profileMenu.style.display = isProfileOpen ? 'block' : 'none';
    if (isProfileOpen) {
      document.addEventListener('click', closeProfileOnClickOutside);
    } else {
      document.removeEventListener('click', closeProfileOnClickOutside);
    }
  }

  function closeProfileOnClickOutside(e) {
    if (!userProfile.contains(e.target)) {
      isProfileOpen = false;
      profileMenu.style.display = 'none';
      document.removeEventListener('click', closeProfileOnClickOutside);
    }
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  function handleLogout() {
    isLoggedIn = false;
    updateAuthUI(isLoggedIn);
    alert('Logged out successfully!');
    // Redirect if needed: window.location.href = '/';
  }

  // Auth UI
  function updateAuthUI(loggedIn) {
    if (loggedIn) {
      guestAuth.style.display = 'none';
      userProfile.style.display = 'block';
    } else {
      guestAuth.style.display = 'flex';
      userProfile.style.display = 'none';
    }
  }

  // Cart
  function updateCartCount(count) {
    if (count > 0) {
      cartCountEl.textContent = count;
      cartCountEl.style.display = 'flex';
    } else {
      cartCountEl.style.display = 'none';
    }
  }

  // Example: Simulate cart update
  // setTimeout(() => updateCartCount(3), 2000);
});