import { pullData } from "../../JS/api.js";

// Load the top section dynamically with room data
export async function loadTopSection() {
  const topSectionElement = document.getElementById("top-section");
  if (!topSectionElement) return;

  // Read unified key from localStorage
  const selectedRoomTitle = localStorage.getItem("selectedRoomTitle");
  if (!selectedRoomTitle) {
    console.error("No 'selectedRoomTitle' found in localStorage.");
    return;
  }

  try {
    // Call the single-room endpoint
    const response = await pullData(`/api/rooms/single?title=${encodeURIComponent(selectedRoomTitle)}`);
    if (!response.success) {
      console.error("Failed to fetch the single room:", response.message);
      return;
    }

    const roomData = response.data;
    if (!roomData) {
      console.error("No room data returned from the server.");
      return;
    }

    // Populate the section
    topSectionElement.innerHTML = `
      <h1 id="top-section-title">${roomData.title}</h1>
      <h1 id="room-single-description">${roomData.description}</h1>
      <p id="room-single-paragraph">${roomData.paragraph || "No additional details available."}</p>
      <div class="top-img-row">
        <div class="top-img"><img src="${roomData.image1 || roomData.image}" alt="Room Image 1"></div>
        <div class="top-img"><img src="${roomData.image2 || roomData.image}" alt="Room Image 2"></div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching single room:", error);
  }
}

// IIFE for lazy loading
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const topSectionPlaceholder = document.getElementById("top-section");
    if (!topSectionPlaceholder) return;

    const observer = new IntersectionObserver(async (entries, observer) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          await loadTopSection();
          observer.unobserve(entry.target);
        }
      }
    }, {
      root: null,
      threshold: 0.1
    });

    observer.observe(topSectionPlaceholder);
  });
})();
