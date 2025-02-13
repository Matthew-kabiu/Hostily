// Fetch rooms data using our API helper
async function fetchRoomsData() {
  try {
    const jsonData = await window.Api.pullData("/api/rooms");
    if (jsonData.success) {
      return jsonData.data; // Return the data
    } else {
      console.error("Failed to fetch rooms:", jsonData.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

// Function to load the top section dynamically with room data
export async function loadTopSection() {
  let roomsData = await fetchRoomsData(); // Fetch rooms before using

  const topSectionElement = document.getElementById("top-section");
  if (!topSectionElement) return;

  // Retrieve selected room data from localStorage
  const selectedRoom = JSON.parse(localStorage.getItem("selectedRoom"));

  if (!selectedRoom) {
    console.error("No room data found in localStorage.");
    return;
  }

  // Populate the section with dynamic data
  topSectionElement.innerHTML = `
    <h1 id="top-section-title">${selectedRoom.title}</h1>
    <h1 id="room-single-description">${selectedRoom.description}</h1>
    <p id="room-single-paragraph">${selectedRoom.paragraph || "No additional details available."}</p>
    <div class="top-img-row">
      <div class="top-img">${selectedRoom.image1}</div>
      <div class="top-img">${selectedRoom.image2}</div>
    </div>
  `;
}

// IIFE for lazy loading implementation
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const topSectionPlaceholder = document.getElementById("top-section");
    if (!topSectionPlaceholder) return;

    const observer = new IntersectionObserver(async (entries, observer) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          await loadTopSection(); // Now fetches data internally
          observer.unobserve(entry.target);
        }
      }
    }, {
      root: null,
      threshold: 0.1,
    });

    observer.observe(topSectionPlaceholder);
  });
})();
