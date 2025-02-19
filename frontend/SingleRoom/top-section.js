// ✅ Import pullData correctly from api.js
import { pullData } from "../../JS/api.js"; 


// ✅ Fetch rooms data using our API helper
async function fetchRoomsData() {
  try {
    const jsonData = await pullData("/api/rooms"); // ✅ Correct function call
    if (jsonData.success) {
      return jsonData.data; // Return the fetched data
    } else {
      console.error("Failed to fetch rooms:", jsonData.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

// ✅ Function to load the top section dynamically with room data
export async function loadTopSection() {
  let roomsData = await fetchRoomsData(); // ✅ Ensure data is fetched

  const topSectionElement = document.getElementById("top-section");
  if (!topSectionElement) return;

  // ✅ Retrieve selected room and category data from localStorage
  const selectedRoom = JSON.parse(localStorage.getItem("selectedRoom"));
  const selectedCategoryRoom = localStorage.getItem("selectedCategoryRoom");

  // ✅ Determine which data to use
  let roomData = selectedRoom;

  if (selectedRoom) {
    roomData = selectedRoom;
  } else if (selectedCategoryRoom) {
    roomData = roomsData.find(room => room.title === selectedCategoryRoom) || selectedRoom;
  }

  if (!roomData) {
    console.error("No valid room data found.");
    return;
  }

  // ✅ Populate the section with dynamic data
  topSectionElement.innerHTML = `
    <h1 id="top-section-title">${roomData.title}</h1>
    <h1 id="room-single-description">${roomData.description}</h1>
    <p id="room-single-paragraph">${roomData.paragraph || "No additional details available."}</p>
    <div class="top-img-row">
      <div class="top-img"><img src="${roomData.image1}" alt="Room Image 1"></div>
      <div class="top-img"><img src="${roomData.image2}" alt="Room Image 2"></div>
    </div>
  `;
}

// ✅ IIFE for lazy loading implementation
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const topSectionPlaceholder = document.getElementById("top-section");
    if (!topSectionPlaceholder) return;

    const observer = new IntersectionObserver(async (entries, observer) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          await loadTopSection(); // ✅ Now fetches data internally
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
