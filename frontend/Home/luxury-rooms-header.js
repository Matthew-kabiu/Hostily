export const loadLuxuryRoomsHeader = (entries, observer) => {
  const luxuryRoomsHeaderContainer = document.querySelector(
    ".luxury-rooms-header"
  );

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Luxury Rooms Header HTML Template
      const luxuryRoomsHeaderHTML = `
        <div class="luxury-rooms-header-text">
          <h6 class="luxury-tagline">Deluxe And Luxury</h6>
          <h1 class="luxury-header-title">Our Luxury Rooms</h1>
        </div>

        <div class="luxury-rooms-tabs">
          <button class="luxury-rooms-menu menu-active" data-category="all">All Rooms</button>
          <button class="luxury-rooms-menu" data-category="luxury">Luxury</button>
          <button class="luxury-rooms-menu" data-category="single">Single</button>
          <button class="luxury-rooms-menu" data-category="small-suite">Small Suite</button>
          <button class="luxury-rooms-menu" data-category="family">Family</button>
        </div>
      `;

      // Inject HTML into container
      luxuryRoomsHeaderContainer.innerHTML = luxuryRoomsHeaderHTML;

      // Attach event listeners for tab selection
      setupLuxuryRoomsTabs();

      // Stop observing once content is loaded
      observer.disconnect();
    }
  });
};

// Function to handle menu button clicks
function setupLuxuryRoomsTabs() {
  const menuButtons = document.querySelectorAll(".luxury-rooms-menu");

  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      menuButtons.forEach((btn) => btn.classList.remove("menu-active"));
      // Add active class to the clicked button
      button.classList.add("menu-active");

      // Optional: You can implement filtering logic here to display relevant rooms
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const luxuryRoomsHeaderContainer = document.querySelector(
    ".luxury-rooms-header"
  );

  // Set up IntersectionObserver
  if (luxuryRoomsHeaderContainer) {
    const observer = new IntersectionObserver(loadLuxuryRoomsHeader, {
      root: null, // Observe relative to the viewport
      threshold: 0.2, // Load when 20% of the element is visible
    });

    observer.observe(luxuryRoomsHeaderContainer);
  }
});
