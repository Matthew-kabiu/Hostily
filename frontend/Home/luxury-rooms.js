import { loadLuxuryRoomsHeader } from "./luxury-rooms-header.js";
import { loadLuxuryRooms } from "./luxury-card.js";

export const loadLuxuryRoomsSection = (entries, observer) => {
  const luxuryRoomsSection = document.querySelector("#luxuryRooms");

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Inject required HTML structure
      luxuryRoomsSection.innerHTML = `
        <div class="luxury-rooms-header"></div>
        <div class="luxury-rooms-container"></div>
      `;

      // Load the header and rooms content
      loadLuxuryRoomsHeader([{ isIntersecting: true }], observer);
      loadLuxuryRooms([{ isIntersecting: true }], observer);

      // Stop observing once content is loaded
      observer.disconnect();
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const luxuryRoomsSection = document.querySelector("#luxuryRooms");

  // Set up IntersectionObserver
  if (luxuryRoomsSection) {
    const observer = new IntersectionObserver(loadLuxuryRoomsSection, {
      root: null, // Observe relative to the viewport
      threshold: 0.2, // Load when 20% of the element is visible
    });

    observer.observe(luxuryRoomsSection);
  }
});
