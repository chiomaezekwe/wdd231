document.addEventListener("DOMContentLoaded", () => {
    const directoryContainer = document.querySelector("#directory");
    const gridViewBtn = document.querySelector("#gridViewBtn");
    const listViewBtn = document.querySelector("#listViewBtn");
    let isGridView = true;
  
    const menuToggle = document.getElementById("menu-toggle");
    const closeMenu = document.getElementById("close-menu");
    const menuLinks = document.querySelector(".navbar");


    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const menu = document.querySelector('.navbar');

    menuBtn.addEventListener('click', () => {
        menu.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        menu.classList.remove('active');
    });

   
    // Close menu
    if (closeMenu && menuLinks) {
      closeMenu.addEventListener("click", () => {
        menuLinks.classList.remove("active");
        if (menuToggle) menuToggle.textContent = "☰";
      });
    }



    document.addEventListener("DOMContentLoaded", () => {
        const menuToggle = document.querySelector(".menu-btn");
        const menuClose = document.querySelector(".close-btn");
        const menuLinks = document.querySelector(".menu");
    
        // Toggle open
        menuToggle?.addEventListener("click", () => {
          menuLinks?.classList.toggle("active");
          menuToggle.textContent = menuLinks.classList.contains("active") ? "✖" : "☰";
        });
    
        // Toggle close
        menuClose?.addEventListener("click", () => {
          menuLinks?.classList.remove("active");
          menuToggle.textContent = "☰";
        });
    
        // Highlight current page link
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll(".navbar a");
    
        navLinks.forEach(link => {
          const href = link.getAttribute("href");
          link.classList.toggle("active-page", href === currentPage);
        });
      });

    // Fetch and display members
    async function fetchMembers() {
      try {
        let data;
        const localData = localStorage.getItem("members");
        if (localData) {
          data = JSON.parse(localData);
          displayBusinesses(data);
        } else {
          const response = await fetch("data/gallery.json");
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          data = await response.json();
          localStorage.setItem("members", JSON.stringify(data));
          displayBusinesses(data);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }
  
    function displayBusinesses(businesses) {
      if (!directoryContainer) return;
  
      directoryContainer.innerHTML = "";
      directoryContainer.className = isGridView ? "grid-view" : "list-view";
  
      businesses.forEach(business => {
        const card = document.createElement("div");
        card.className = "business-card";
  
        card.innerHTML = `
          <img src="${business.image}" alt="${business.name} Logo">
          <h3>${business.name}</h3>
          <p><strong>Description:</strong> ${business.description}</p>
          <p><strong>Other Info:</strong> ${business.other_info}</p>
        `;
  
        directoryContainer.appendChild(card);
      });
  
      if (gridViewBtn && listViewBtn) {
        gridViewBtn.classList.toggle("active", isGridView);
        listViewBtn.classList.toggle("active", !isGridView);
      }
    }
  
    if (gridViewBtn) {
      gridViewBtn.addEventListener("click", () => {
        isGridView = true;
        const data = JSON.parse(localStorage.getItem("members") || "[]");
        displayBusinesses(data);
      });
    }
  
    if (listViewBtn) {
      listViewBtn.addEventListener("click", () => {
        isGridView = false;
        const data = JSON.parse(localStorage.getItem("members") || "[]");
        displayBusinesses(data);
      });
    }
  
    fetchMembers();
  });
  
  // Footer year and last-modified
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  const modifiedEl = document.getElementById('last-modified');
  if (modifiedEl) modifiedEl.textContent = document.lastModified;
  