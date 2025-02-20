export const loadLuxuryRooms = (entries, observer) => {
  const luxuryRoomsContainer = document.querySelector(
    ".luxury-rooms-container"
  );

  // Simulated dynamic data (Can be replaced with an API call)
  const luxuryRoomsData = [
    { id: "card-top-left", price: "$134", roomType: "Small Suite" },
    { id: "card-top-middle", price: "$180", roomType: "Deluxe Suite" },
    { id: "card-top-right", price: "$250", roomType: "Presidential Suite" },
    { id: "card-bottom-left", price: "$200", roomType: "Luxury Suite" },
    { id: "card-bottom-right", price: "$220", roomType: "Family Room" },
  ];

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Build the luxury rooms HTML dynamically
      let luxuryRoomsHTML = "";
      for (let i = 0; i < luxuryRoomsData.length; i += 3) {
        luxuryRoomsHTML += '<div class="luxury-rooms-row">';
        for (let j = i; j < i + 3 && j < luxuryRoomsData.length; j++) {
          const room = luxuryRoomsData[j];
          luxuryRoomsHTML += `
            <div class="luxury-rooms-card" id="${room.id}">
              <div class="luxury-rooms-card-text">
                <h6 class="luxury-card-price">
                  <span class="luxury-price">${room.price}</span> / Night
                </h6>
                <p class="luxury-room">${room.roomType}</p>
              </div>
            </div>
          `;
        }
        luxuryRoomsHTML += "</div>";
      }

      // Inject HTML into container
      luxuryRoomsContainer.innerHTML = luxuryRoomsHTML;

      // Stop observing once content is loaded
      observer.disconnect();
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const luxuryRoomsContainer = document.querySelector(
    ".luxury-rooms-container"
  );

  // Set up IntersectionObserver
  if (luxuryRoomsContainer) {
    const observer = new IntersectionObserver(loadLuxuryRooms, {
      root: null, // Observe relative to the viewport
      threshold: 0.2, // Load when 20% of the element is visible
    });

    observer.observe(luxuryRoomsContainer);
  }
});
