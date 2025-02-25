import { pullData } from "/JS/api.js"; // Import API request function

/**
 * Dynamically loads luxury rooms once they appear in the viewport.
 */
export const loadLuxuryRooms = async (entries, observer) => {
  const luxuryRoomsContainer = document.querySelector(".luxury-rooms-container");

  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      try {
        // ✅ Fetch room data from the API
        const response = await pullData("/api/rooms"); 

        if (!response.success) {
          console.error("Failed to fetch luxury rooms:", response.message);
          return;
        }

        // ✅ Extract only 5 rooms (3 for top row, 2 for bottom row)
        const luxuryRoomsData = response.data.slice(0, 5);

        // ✅ Maintain unique IDs for the first 5 rooms
        const roomIdMapping = [
          "card-top-left",
          "card-top-middle",
          "card-top-right",
          "card-bottom-left",
          "card-bottom-right"
        ];

        // ✅ Construct HTML dynamically
        let luxuryRoomsHTML = '<div class="luxury-rooms-row">';
        
        luxuryRoomsData.forEach((room, index) => {
          if (index === 3) luxuryRoomsHTML += '</div><div class="luxury-rooms-row" id="bottom-row">';
          
          luxuryRoomsHTML += `
            <div class="luxury-rooms-card" id="${roomIdMapping[index]}">
              <div class="luxury-rooms-card-text">
                <h6 class="luxury-card-price">
                  <span class="luxury-price">$${room.price}</span> / Night
                </h6>
                <p class="luxury-room">${room.title}</p>
              </div>
            </div>
          `;
        });

        luxuryRoomsHTML += "</div>"; // Close last row

        // ✅ Inject HTML into container
        luxuryRoomsContainer.innerHTML = luxuryRoomsHTML;

        // ✅ Stop observing once loaded
        observer.disconnect();

      } catch (error) {
        console.error("Error loading luxury rooms:", error);
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const luxuryRoomsContainer = document.querySelector(".luxury-rooms-container");

  // ✅ Set up IntersectionObserver for lazy loading
  if (luxuryRoomsContainer) {
    const observer = new IntersectionObserver(loadLuxuryRooms, {
      root: null, // Observe relative to the viewport
      threshold: 0.2, // Load when 20% of the element is visible
    });

    observer.observe(luxuryRoomsContainer);
  }
});
