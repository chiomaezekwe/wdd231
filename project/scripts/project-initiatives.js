document.addEventListener("DOMContentLoaded", () => {


    const spotlightContainer = document.querySelector(".spotlights");
    const menuToggle = document.getElementById("menu-toggle");
    const closeMenu = document.getElementById("close-menu");
    const menuLinks = document.querySelector(".navbar");

    menuToggle.addEventListener("click", () => {
        menuLinks.classList.toggle("active");

        // Change the icon based on menu state
        if (menuLinks.classList.contains("active")) {
            menuToggle.textContent = "✖";
        } else {
            menuToggle.textContent = "☰";
        }

        // Get the current page URL
        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        // Highlight the active page link
        const links = document.querySelectorAll(".navbar a");
        links.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active-page");
            }
        });
    });

    closeMenu.addEventListener("click", () => {
        menuLinks.classList.remove("active");
        menuToggle.textContent = "☰";
    });

    // Fetch Spotlight Members from JSON file
    async function fetchSpotlights() {
        try {
            const response = await fetch('data/challenges.json');
            if (response.ok) {
                const membersData = await response.json();
                console.log(membersData);
                displaySpotlights(membersData);
            } else {
                throw new Error("Failed to fetch member data");
            }
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    // Display Spotlight Ads for Gold and Silver Members
    function displaySpotlights(membersData) {
        // Filter Gold and Silver Members
        const filteredMembers = membersData.filter(member => member.membership_level === 1 || member.membership_level === 2);

        // Randomly select 2 or 3 members to spotlight
        const randomSpotlights = [];
        const numSpotlights = Math.min(3, filteredMembers.length);

        while (randomSpotlights.length < numSpotlights && filteredMembers.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredMembers.length);
            randomSpotlights.push(filteredMembers[randomIndex]);
            filteredMembers.splice(randomIndex, 1); 
        }

        // Render Spotlight Ads
        randomSpotlights.forEach(member => {
            const spotlightDiv = document.createElement("div");
            spotlightDiv.classList.add("spotlight");

            spotlightDiv.innerHTML = `
            <div class="spotlight-card">
                <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Membership:</strong> ${member.membership_level === 1 ? "Gold" : "Silver"}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
        `;

            spotlightContainer.appendChild(spotlightDiv);
        });
    }

    fetchSpotlights();

    for (let i = 1; i <= 6; i++) {
        const openBtn = document.getElementById(`openButton${i}`);
        const dialog = document.getElementById(`dialogBox${i}`);
        const closeBtn = document.getElementById(`closeButton${i}`);
      
        if (openBtn && dialog && closeBtn) {
          openBtn.addEventListener("click", () => dialog.showModal());
          closeBtn.addEventListener("click", () => dialog.close());
        }
      }
    });


document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('guide-cards');
    const modal = document.getElementById('guide-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.getElementById('modal-close');
  
    // Load data from guides.json
    fetch('guides.json')
      .then(res => res.json())
      .then(guides => {
        guides.forEach((guide, index) => {
          const card = document.createElement('div');
          card.className = 'guide-card';
          card.innerHTML = `
            <img src="${guide.image}" alt="${guide.title}" />
            <div class="card-body">
              <h3>${guide.title}</h3>
              <p>${guide.description}</p>
              <button data-index="${index}">Read More</button>
            </div>
          `;
          cardContainer.appendChild(card);
        });
  
        // Add event listeners to buttons
        document.querySelectorAll('.guide-card button').forEach(button => {
          button.addEventListener('click', e => {
            const guideIndex = e.target.getAttribute('data-index');
            const guide = guides[guideIndex];
  
            modalTitle.textContent = guide.title;
            modalImage.src = guide.image;
            modalContent.textContent = guide.content;
            modal.classList.remove('hidden');
          });
        });
      });
  
    // Close modal
    modalClose.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    // Optional: Close modal on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  
  document.querySelectorAll("button[id^='openButton']").forEach((btn, index) => {
    const dialog = document.getElementById(`dialogBox${index + 1}`);
    const closeBtn = document.getElementById(`closeButton${index + 1}`);
  
    btn.addEventListener('click', () => dialog.showModal());
    closeBtn.addEventListener('click', () => dialog.close());
  });
  

// Fetch and set current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });

  document.getElementById('image').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (file) {
      if (file.size > maxSize) {
        alert('The file is too large. Please upload a file smaller than 5MB.');
        event.target.value = ''; // Clear the input
      }
    }
  });


  // added this lines

  document.addEventListener("DOMContentLoaded", () => {
    // Fetch the article data from the reviews.json file
    fetch('reviews.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(articles => {
        const articlesContainer = document.getElementById("articles-container");
  
        articles.forEach(article => {
          const articleCard = document.createElement("article");
          articleCard.classList.add("card");
  
          articleCard.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.link}">Read More</a>
          `;
  
          articlesContainer.appendChild(articleCard);
        });
      })
      .catch(error => {
        console.error('There was a problem with fetching the articles:', error);
      });
  
    // Set the current year and last modified date in the footer
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;
  
    // Add the form-related logic
    const form = document.getElementById('uploadForm');
    const downloadButton = document.getElementById('downloadData');
  
    // Load saved data from localStorage
    window.addEventListener('DOMContentLoaded', () => {
      form.fullName.value = localStorage.getItem('fullName') || '';
      form.title.value = localStorage.getItem('title') || '';
      form.message.value = localStorage.getItem('message') || '';
      const savedImage = localStorage.getItem('image');
      if (savedImage) {
        // Display image as a preview if available
        const imgPreview = document.createElement('img');
        imgPreview.src = savedImage;
        form.appendChild(imgPreview);
      }
    });
  
    // Save input changes to localStorage
    ['fullName', 'title', 'message'].forEach(field => {
      form[field].addEventListener('input', () => {
        localStorage.setItem(field, form[field].value);
      });
    });
  
    // Handle form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // prevent default form submission
  
      const file = form.image.files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        alert('Image too large! Max size is 5MB.');
        return;
      }
  
      // Create a Blob object for the image
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageDataUrl = reader.result; // Image as a Data URL (base64 encoded)
          localStorage.setItem('image', imageDataUrl); // Store image as base64 in localStorage
        };
        reader.readAsDataURL(file); // Read the file as a base64 string
      }
  
      // Save form data to localStorage
      localStorage.setItem('fullName', form.fullName.value);
      localStorage.setItem('title', form.title.value);
      localStorage.setItem('message', form.message.value);
  
      alert('Form data saved locally!');
  
      form.reset(); // Reset form after saving
    });
  
    // Handle Download of stored data as a .json file
    downloadButton.addEventListener('click', () => {
      const savedData = {
        fullName: localStorage.getItem('fullName'),
        title: localStorage.getItem('title'),
        message: localStorage.getItem('message'),
        image: localStorage.getItem('image')
      };
  
      // Create a Blob from the saved data
      const blob = new Blob([JSON.stringify(savedData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
  
      // Create a link to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'form_data.json';
      a.click();
  
      // Clean up the URL object
      URL.revokeObjectURL(url);
    });
  });
  

  