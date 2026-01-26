// script.js
// State variables
let isMobileMenuOpen = false;
let isProfileMenuOpen = false;
let currentLanguage = "English";
let isLoggedIn = false; // Set to true to simulate logged-in state
let cartItemCount = 0; // Simulate cart items
let currentCategory = 'All';
let currentSlide = 0;
let currentBlogSlide = 0;

// Product data
const products = [
  {
    id: 1,
    name: 'UBERTH - Franciacorta Brut Docg',
    price: 25.00,
    discount: 8,
    rating: 5,
    reviews: 0,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
    category: 'Sparkling'
  },
  {
    id: 2,
    name: 'Winery Sparkling',
    price: 180.00,
    discount: 10,
    rating: 5,
    reviews: 0,
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400',
    category: 'Sparkling'
  },
  {
    id: 3,
    name: 'Kasper Maddox',
    price: 488.00,
    discount: 50,
    rating: 5,
    reviews: 0,
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400',
    category: 'White Wines'
  },
  {
    id: 4,
    name: 'Rose wine',
    price: 500.00,
    discount: 20,
    rating: 5,
    reviews: 0,
    image: 'https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400',
    category: 'Rosé Wines'
  },
  {
    id: 5,
    name: 'Winery Sparkling',
    price: 180.00,
    discount: 10,
    rating: 5,
    reviews: 0,
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400',
    category: 'Sparkling'
  },
  {
    id: 6,
    name: 'Wine House Rose Wine',
    price: 250.00,
    discount: 10,
    rating: 5,
    reviews: 0,
    image: 'https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=400',
    category: 'Rosé Wines'
  },
  {
    id: 7,
    name: 'High Class Red Wine',
    price: 220.00,
    discount: 10,
    rating: 5,
    reviews: 0,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
    category: 'Red Wine'
  },
  {
    id: 8,
    name: 'High Class Red Wine',
    price: 220.00,
    discount: 10,
    rating: 5,
    reviews: 0,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
    category: 'Red Wine'
  }
];

// Initialize UI on load
document.addEventListener("DOMContentLoaded", function() {
  updateCartCount(cartItemCount);
  updateAuthUI(isLoggedIn);
  setLanguage(currentLanguage);
  initializeFooter();
  renderProducts();
  renderTrendingProducts();
  initializeCarousel();
  renderBlogPosts();
  initializeBlogCarousel();
});

// Language Switcher
function switchLanguage(lang) {
  currentLanguage = lang;
  setLanguage(lang);
}

function setLanguage(lang) {
  const buttons = document.querySelectorAll('.language-switcher button');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.innerText === lang);
  });
}

// Cart Count
function updateCartCount(count) {
  cartItemCount = count;
  const cartCountEl = document.getElementById('cart-count');
  if (count > 0) {
    cartCountEl.textContent = count;
    cartCountEl.style.display = 'flex';
  } else {
    cartCountEl.style.display = 'none';
  }
}

// Auth UI Toggle
function updateAuthUI(loggedIn) {
  isLoggedIn = loggedIn;
  const guestAuth = document.getElementById('guest-auth');
  const profileDropdown = document.querySelector('.profile-dropdown:not(#guest-auth)');

  if (loggedIn) {
    guestAuth.style.display = 'none';
    profileDropdown.style.display = 'block';
  } else {
    guestAuth.style.display = 'flex';
    profileDropdown.style.display = 'none';
  }
}

// Profile Menu Toggle
function toggleProfileMenu() {
  isProfileMenuOpen = !isProfileMenuOpen;
  const menu = document.getElementById('profile-menu');
  menu.style.display = isProfileMenuOpen ? 'block' : 'none';

  if (isProfileMenuOpen) {
    document.addEventListener('click', closeProfileMenuOnClickOutside);
  } else {
    document.removeEventListener('click', closeProfileMenuOnClickOutside);
  }
}

function closeProfileMenuOnClickOutside(e) {
  const profileDropdown = document.querySelector('.profile-dropdown');
  if (!profileDropdown.contains(e.target)) {
    isProfileMenuOpen = false;
    document.getElementById('profile-menu').style.display = 'none';
    document.removeEventListener('click', closeProfileMenuOnClickOutside);
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  isMobileMenuOpen = !isMobileMenuOpen;
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBtn = document.querySelector('.mobile-menu-btn svg');

  if (isMobileMenuOpen) {
    mobileMenu.style.display = 'block';
    menuBtn.outerHTML = `<svg class="icon-svg close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
  } else {
    mobileMenu.style.display = 'none';
    menuBtn.outerHTML = `<svg class="icon-svg menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
  }
}

function closeMobileMenu() {
  isMobileMenuOpen = false;
  document.getElementById('mobile-menu').style.display = 'none';
  const menuBtn = document.querySelector('.mobile-menu-btn svg');
  menuBtn.outerHTML = `<svg class="icon-svg menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
}

// Logout Handler
function handleLogout() {
  updateAuthUI(false);
  alert("Logged out successfully!");
}

// Footer Functions
const mockSocialData = {
  facebook: "facebook.com/ops.wine",
  instagram: "instagram.com/ops_wine",
  linkedin: "linkedin.com/company/ops-wine",
  pinterest: "pinterest.com/opswine"
};

function ensureUrl(url) {
  if (!url) return "#";
  const trimmed = url.trim();
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}

function createSocialIcon(platform, url, label) {
  const href = ensureUrl(url);
  const iconMap = {
    facebook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.323 0 2.456.098 2.768.142v3.24h-1.9c-1.5 0-1.792.714-1.792 1.762v2.317h3.588l-.467 3.47h-3.12V24C19.612 23.096 24 18.13 24 12.073z"/></svg>',
    instagram: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.205.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    linkedin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
    pinterest: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12c0 5.098 3.158 9.44 7.575 11.156-.095-.955-.18-2.416.03-3.441.186-.905 1.212-5.806 1.212-5.806s-.307-.612-.307-1.524c0-1.426.828-2.498 1.843-2.498.873 0 1.282.648 1.282 1.434 0 .873-.557 2.176-.843 3.356-.235.972.496 1.774 1.46 1.774 1.776 0 3.144-1.874 3.144-4.58 0-2.393-1.726-4.067-4.178-4.067-2.845 0-4.516 2.136-4.516 4.34 0 .857.331 1.784.745 2.293.08.099.095.18.07.285-.075.323-.246 1.016-.283 1.156-.046.174-.143.21-.324.133-1.244-.528-2.023-1.813-2.023-3.218 0-2.64 2.006-5.067 5.318-5.067 2.835 0 4.933 1.975 4.933 4.614 0 2.777-1.766 4.977-4.353 4.977-.833 0-1.584-.447-1.843-1.016l-.503 1.92c-.18 1.075-1.13 2.423-1.583 2.992-.453.568-1.13.85-1.843.85-.095 0-.19-.006-.285-.018C3.158 21.44 0 17.098 0 12 0 5.373 5.373 0 12 0z"/></svg>'
  };

  const btn = document.createElement('a');
  btn.href = href;
  btn.target = "_blank";
  btn.rel = "noopener noreferrer";
  btn.className = `icon-btn ${platform}`;
  btn.setAttribute('aria-label', label);
  btn.innerHTML = iconMap[platform] || '';
  return btn;
}

function createSocialLink(platform, url, label) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = ensureUrl(url);
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.className = "link";
  a.textContent = label;
  li.appendChild(a);
  return li;
}

function initializeFooter() {
  const socialData = mockSocialData;
  const socialIconsContainer = document.querySelector('.social-icons');
  const discoverMoreList = document.querySelector('.discover-more ul');

  const platforms = ['facebook', 'instagram', 'linkedin', 'pinterest'];

  platforms.forEach(platform => {
    const url = socialData[platform];
    if (url) {
      const iconBtn = createSocialIcon(platform, url, platform);
      socialIconsContainer.appendChild(iconBtn);

      const linkItem = createSocialLink(platform, url, platform.charAt(0).toUpperCase() + platform.slice(1));
      discoverMoreList.appendChild(linkItem);
    }
  });

  const contactLi = document.createElement('li');
  const contactLink = document.createElement('a');
  contactLink.href = "/contact";
  contactLink.className = "link";
  contactLink.textContent = "Contact";
  contactLi.appendChild(contactLink);
  discoverMoreList.appendChild(contactLi);
}

// Shop By Category Functions
function filterByCategory(category) {
  currentCategory = category;
  
  // Update active tab
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.textContent === category) {
      tab.classList.add('active');
    }
  });
  
  renderProducts();
}

function renderProducts() {
  const productsGrid = document.getElementById('products-grid');
  if (!productsGrid) return;
  
  const filteredProducts = currentCategory === 'All' 
    ? products 
    : products.filter(p => p.category === currentCategory);
  
  productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" onclick="viewProduct(${product.id})">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
        ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-rating">
          ${generateStars(product.rating)}
          <span class="review-count">(${product.reviews} reviews)</span>
        </div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  `).join('');
}

function generateStars(rating) {
  return Array(5).fill(0).map((_, i) => 
    `<span class="star">${i < rating ? '★' : '☆'}</span>`
  ).join('');
}

function viewProduct(id) {
  console.log('View product:', id);
  // Add navigation logic here
}

// Trending Products Carousel
function renderTrendingProducts() {
  const carouselTrack = document.getElementById('carousel-track');
  if (!carouselTrack) return;
  
  carouselTrack.innerHTML = products.slice(0, 4).map(product => `
    <div class="product-card" style="min-width: 280px;" onclick="viewProduct(${product.id})">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
        ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-rating">
          ${generateStars(product.rating)}
          <span class="review-count">(${product.reviews} reviews)</span>
        </div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  `).join('');
}

function initializeCarousel() {
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  
  if (prevBtn) prevBtn.addEventListener('click', () => moveCarousel(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => moveCarousel(1));
}

function moveCarousel(direction) {
  const track = document.getElementById('carousel-track');
  if (!track) return;
  
  const cardWidth = 280 + 32; // card width + gap
  const maxSlides = products.slice(0, 4).length - 1;
  
  currentSlide = Math.max(0, Math.min(currentSlide + direction, maxSlides));
  track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
}

// Blog Posts Data
const blogPosts = [
  {
    id: 1,
    title: 'Famous Wine Regions Around the World',
    date: { day: 10, month: 'JAN' },
    author: 'Mr. Admin',
    views: '11 views',
    excerpt: 'Certain regions are well known for their long-standing wine traditions. Areas like France\'s Bordeaux, Italy\'s Tuscany, and Spain\'s Rioja are recognized for their unique climates and soil, which...',
    image: 'https://images.unsplash.com/photo-1560932082-8d5545ed8f95?w=400'
  },
  {
    id: 2,
    title: 'Famous Wine Regions Around the World',
    date: { day: 10, month: 'JAN' },
    author: 'Mr. Admin',
    views: '11 views',
    excerpt: 'Certain regions are well known for their long-standing wine traditions. Areas like France\'s Bordeaux, Italy\'s Tuscany, and Spain\'s Rioja are recognized for their unique climates and soil, which...',
    image: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=400'
  },
  {
    id: 3,
    title: 'The History of Wine: A Journey Through Time',
    date: { day: 10, month: 'JAN' },
    author: 'Mr. Admin',
    views: '11 views',
    excerpt: 'As time passed, wine spread across Europe through the Greeks and Romans, who improved grape-growing techniques and storage methods. Many of today\'s famous wine regions develope...',
    image: 'https://images.unsplash.com/photo-1566754477239-8b4552689f90?w=400'
  }
];

// Render Blog Posts
function renderBlogPosts() {
  const blogTrack = document.getElementById('blog-carousel-track');
  if (!blogTrack) return;
  
  blogTrack.innerHTML = blogPosts.map(post => `
    <div class="blog-card" onclick="viewBlogPost(${post.id})">
      <div class="blog-image">
        <img src="${post.image}" alt="${post.title}" />
        <div class="blog-date-badge">
          <span class="blog-date-day">${post.date.day}</span>
          <span class="blog-date-month">${post.date.month}</span>
        </div>
      </div>
      <div class="blog-content">
        <h3 class="blog-title">${post.title}</h3>
        <div class="blog-meta">
          <span>👤 ${post.author}</span>
          <span>👁 ${post.views}</span>
        </div>
        <p class="blog-excerpt">${post.excerpt}</p>
      </div>
    </div>
  `).join('');
}

function initializeBlogCarousel() {
  const prevBtn = document.getElementById('blog-carousel-prev');
  const nextBtn = document.getElementById('blog-carousel-next');
  
  if (prevBtn) prevBtn.addEventListener('click', () => moveBlogCarousel(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => moveBlogCarousel(1));
}

function moveBlogCarousel(direction) {
  const track = document.getElementById('blog-carousel-track');
  if (!track) return;
  
  const cardWidth = 350 + 32; // card width + gap
  const maxSlides = blogPosts.length - 1;
  
  currentBlogSlide = Math.max(0, Math.min(currentBlogSlide + direction, maxSlides));
  track.style.transform = `translateX(-${currentBlogSlide * cardWidth}px)`;
}

function viewBlogPost(id) {
  console.log('View blog post:', id);
  // Add navigation logic here
}