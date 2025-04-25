document.addEventListener("DOMContentLoaded", () => {
    //Set the current year if an element with ID 'year' exists
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  
    //Get URL parameters and display confirmation details (if applicable)
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const email = params.get("email");
  
    if (name && email) {
      const confirmationContainer = document.querySelector(".confirmation-details");
  
      if (confirmationContainer) {
        confirmationContainer.innerHTML = `
          <p><strong>Name:</strong> ${decodeURIComponent(name)}</p>
          <p><strong>Email:</strong> ${decodeURIComponent(email)}</p>
          <p>Thank you for getting in touch! We'll respond shortly.</p>
        `;
      }
    }
  
    //Optional: Smooth scroll to anchor if there's a hash in URL
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  });
  