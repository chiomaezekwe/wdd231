// scripts/index.js
import { guides } from "./guides-data.js";
import { renderGuideCards } from "./render-guides.js";

// Render to #guide-cards section
renderGuideCards(guides, "guide-cards");

import {
  updateCurrentYear,
  updateLastModified,
  setupMenuToggle,
  setupModalClose
} from './utilities.js';

const data = await fetchGuides();
console.log('Fetched guides:', data);  // Add this line


document.addEventListener('DOMContentLoaded', async () => {
  // Initialize footer and utilities
  updateCurrentYear();
  updateLastModified();
  setupMenuToggle?.();     // Optional chaining in case they are undefined
  setupModalClose?.();

  const container = document.getElementById('guide-cards');
  if (!container) return;

  const data = await fetchGuides();

  if (!data || data.length === 0) {
    container.innerHTML = '<p>No guides available.</p>';
    return;
  }


 data.slice(0, 15).forEach((item) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.description}</p>
    <a href="${item.link}" class="view-more">View More</a>
  `;
  container.appendChild(card);
});


  // Use event delegation
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-more')) {
      const id = e.target.dataset.id;
      const selected = data.find((d) => d.id == id);
      if (selected) openModal(selected);
    }
  });
});


document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });





d
 