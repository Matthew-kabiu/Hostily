import { pullData } from "../../JS/api.js"; // Ensure API.js is correctly imported

// ✅ Load the price card dynamically with room data
export async function loadPriceCard() {
  const priceCard = document.getElementById("price-card");
  if (!priceCard) return;

  // Read the selected room title from localStorage
  const selectedRoomTitle = localStorage.getItem("selectedRoomTitle");
  if (!selectedRoomTitle) {
    console.error("No 'selectedRoomTitle' found in localStorage.");
    return;
  }

  try {
    // Fetch the room details from the backend
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

    // ✅ Populate the price-card with dynamic data
    priceCard.innerHTML = `
      <p class="price-card-title">Your Price</p>
      <hr class="price-card-hr" />
      <div class="price-cards-beds">
        <i class="fa-solid fa-bed"></i>
        <p class="left-card-description">(${roomData.beds}) beds</p>
      </div>
      <div class="price-cards-guests">
        <i class="fa-solid fa-user-group"></i>
        <p class="left-card-description">(${roomData.guests}) guests</p>
      </div>
      <p class="price-card-price">
        $${roomData.price} <span class="price-card-span">/Night</span>
      </p>
      <button class="price-card-btn">
        BOOK NOW<i class="fa-solid fa-arrow-right"></i>
      </button>
    `;
  } catch (error) {
    console.error("Error fetching single room:", error);
  }
}

// ✅ Lazy load price-card content
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const priceCardPlaceholder = document.getElementById("price-card");
    if (!priceCardPlaceholder) return;

    const observer = new IntersectionObserver(async (entries, observer) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          await loadPriceCard();
          observer.unobserve(entry.target);
        }
      }
    }, {
      root: null,
      threshold: 0.1
    });

    observer.observe(priceCardPlaceholder);
  });
})();
