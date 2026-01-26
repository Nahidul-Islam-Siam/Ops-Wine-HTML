// components.js - Handles loading and rendering of navbar and footer

class ComponentLoader {
  constructor() {
    this.componentsPath = './components/';
    this.init();
  }

  async init() {
    await this.loadNavbar();
    await this.loadFooter();
    this.initializeFooter();
  }

  async loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;

    try {
      const response = await fetch(`${this.componentsPath}navbar.html`);
      const html = await response.text();
      navbarContainer.innerHTML = html;
    } catch (error) {
      console.error('Error loading navbar:', error);
    }
  }

  async loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    try {
      const response = await fetch(`${this.componentsPath}footer.html`);
      const html = await response.text();
      footerContainer.innerHTML = html;
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  }

  initializeFooter() {
    const mockSocialData = {
      facebook: "facebook.com/ops.wine",
      instagram: "instagram.com/ops_wine",
      linkedin: "linkedin.com/company/ops-wine",
      pinterest: "pinterest.com/opswine"
    };

    const socialIconsContainer = document.querySelector('.social-icons');
    const discoverMoreList = document.querySelector('.discover-more ul');

    if (!socialIconsContainer || !discoverMoreList) return;

    const platforms = ['facebook', 'instagram', 'linkedin', 'pinterest'];

    platforms.forEach(platform => {
      const url = mockSocialData[platform];
      if (url) {
        const iconBtn = this.createSocialIcon(platform, url, platform);
        socialIconsContainer.appendChild(iconBtn);

        const linkItem = this.createSocialLink(platform, url, platform.charAt(0).toUpperCase() + platform.slice(1));
        discoverMoreList.appendChild(linkItem);
      }
    });

    const contactLi = document.createElement('li');
    const contactLink = document.createElement('a');
    contactLink.href = "/contacts.html";
    contactLink.className = "link";
    contactLink.textContent = "Contact";
    contactLi.appendChild(contactLink);
    discoverMoreList.appendChild(contactLi);
  }

  ensureUrl(url) {
    if (!url) return "#";
    const trimmed = url.trim();
    return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
  }

  createSocialIcon(platform, url, label) {
    const href = this.ensureUrl(url);
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

  createSocialLink(platform, url, label) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = this.ensureUrl(url);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "link";
    a.textContent = label;
    li.appendChild(a);
    return li;
  }
}

// Initialize component loader when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ComponentLoader());
} else {
  new ComponentLoader();
}