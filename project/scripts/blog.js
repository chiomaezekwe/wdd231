document.addEventListener("DOMContentLoaded", () => {
  // Fetch the article data from the reviews.json file
  fetch('data/reviews.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(articles => {
      const articlesContainer = document.getElementById("articles-container");

      const articleCard = document.createElement("article");
      articleCard.classList.add("card");


      // Loop through each article and create the HTML structure

      const fragment = document.createDocumentFragment();
      articles.forEach(article => {
        const articleCard = document.createElement("article");
        articleCard.classList.add("card");

        articleCard.innerHTML = `
          <h2>${article.title}</h2>
          <p>${article.description}</p>
          <a href="${article.link}">Read More</a>
        `;

        fragment.appendChild(articleCard);
      });

      articlesContainer.appendChild(fragment);
    });
  })

    .catch(error => {
      console.error('There was a problem with fetching the articles:', error);
    });

  // Set the current year and last modified date in the footer
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;



// I added this 
  

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("articles-container");

  try {
    const res = await fetch("data/articles.json"); // Adjust path if needed
    const articles = await res.json();

    articles.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <button class="view-more" data-index="${index}">View More</button>
      `;
      container.appendChild(card);
    });

    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("view-more")) {
        const index = e.target.dataset.index;
        const selected = articles[index];

        document.getElementById("modal-title").textContent = selected.title;
        document.getElementById("modal-description").textContent = selected.description;
        document.getElementById("modal-link").href = selected.link;

        document.getElementById("article-modal").showModal();
      }
    });

    document.getElementById("close-modal").addEventListener("click", () => {
      document.getElementById("article-modal").close();
    });

  } catch (error) {
    console.error("Error loading articles:", error);
    container.innerHTML = "<p>Failed to load articles.</p>";
  }
});


