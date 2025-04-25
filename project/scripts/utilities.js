// scripts/utilities.js

export function updateCurrentYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
  
  export function updateLastModified() {
    const modifiedEl = document.getElementById('last-modified');
    if (modifiedEl) {
      modifiedEl.textContent = document.lastModified;
    }
  }
  
  export function setupMenuToggle() {
    const toggleBtn = document.getElementById('menu-toggle');
    const closeBtn = document.getElementById('close-menu');
    const nav = document.querySelector('.navbar');
  
    if (toggleBtn && nav) {
      toggleBtn.addEventListener('click', () => {
        nav.style.display = 'flex';
      });
    }
  
    if (closeBtn && nav) {
      closeBtn.addEventListener('click', () => {
        nav.style.display = 'none';
      });
    }
  }
  
  export function setupModalClose() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-modal');
  
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
  
      // Optional: Close modal when clicking outside modal content
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }
  }
  