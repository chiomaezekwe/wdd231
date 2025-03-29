document.addEventListener("DOMContentLoaded", () => {
    const directoryContainer = document.querySelector("#directory");
    const gridViewBtn = document.querySelector("#gridViewBtn");
    const listViewBtn = document.querySelector("#listViewBtn");
    let isGridView = true;

    const menuToggle = document.getElementById("menu-toggle");
    const closeMenu = document.getElementById("close-menu");
    const menuLinks = document.querySelector(".menu");

    menuToggle.addEventListener("click", () => {
        menuLinks.classList.toggle("active");

        if (menuLinks.classList.contains("active")) {
            menuToggle.textContent = "✖";
        } else {
            menuToggle.textContent = "☰";
        }

        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const links = document.querySelectorAll(".menu a");
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

    async function fetchMembers() {
        try {
            let data;
            const localData = localStorage.getItem("members");
            if (localData) {
                data = JSON.parse(localData);
                displayBusinesses(data);
            } else {
                const response = await fetch("data/members.json");
                data = await response.json();
                localStorage.setItem("members", JSON.stringify(data));
                displayBusinesses(data);
            }
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayBusinesses(businesses) {
        directoryContainer.innerHTML = "";
        directoryContainer.className = isGridView ? "grid-view" : "list-view";
    
        // Define the membership level mapping
        const membershipLevels = {
            1: "Gold",
            2: "Silver",
            3: "Bronze",
            4: "Member"
        };
    
        businesses.forEach(business => {
            const card = document.createElement("div");
            card.className = "business-card";
    
            // Replace numeric membership_level with a label
            const membershipLabel = membershipLevels[business.membership_level] || "Unknown"; // Fallback to "Unknown" if level is invalid
    
            card.innerHTML = `
                <img src="${business.image}" alt="${business.name} Logo">
                <h3>${business.name}</h3>
                <p><strong>Address:</strong> ${business.address}</p>
                <p><strong>Phone:</strong> ${business.phone}</p>
                <p><strong>Membership Level:</strong> ${membershipLabel}</p>  
                <a href="${business.website}" target="_blank">Visit Website</a>
                <p><strong>Other Info:</strong> ${business.other_info}</p>
            `;
    
            directoryContainer.appendChild(card);
        });
    
        gridViewBtn.classList.toggle("active", isGridView);
        listViewBtn.classList.toggle("active", !isGridView);
    }
    

    gridViewBtn.addEventListener("click", () => {
        isGridView = true;
        displayBusinesses(JSON.parse(localStorage.getItem("members")));
    });

    listViewBtn.addEventListener("click", () => {
        isGridView = false;
        displayBusinesses(JSON.parse(localStorage.getItem("members")));
    });

    fetchMembers();
});

// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Set last modified date
document.getElementById('last-modified').textContent = document.lastModified;



