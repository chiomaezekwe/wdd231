// scripts/renderGuides.js

export function renderGuideCards(guides, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ""; // Clear before rendering

  guides.forEach((guide) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${guide.image}" alt="${guide.title}" loading="lazy">
      <h3>${guide.title}</h3>
      <p>${guide.description}</p>
      <button class="view-more">View More</button>
    `;

    container.appendChild(card);
  });
}
