import { pullData } from "../../JS/api.js"; // Ensure API.js is correctly imported

// ✅ Load the booking card dynamically with room data
export async function loadBookingCard() {
  const bookingCardPlaceholder = document.getElementById("booking-card");
  if (!bookingCardPlaceholder) return;

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

    // ✅ Populate booking card structure dynamically
    bookingCardPlaceholder.innerHTML = `
      <p class="price-card-title">Booking Now</p>
      <hr class="price-card-hr" />
      
      <!-- Check In -->
      <div class="booking-input-placeholder" id="checkInPlaceholder">
        <input
          type="text"
          name="check-in"
          id="checkIn"
          placeholder="Check In"
          readonly
          class="booking-input"
        />
        <i class="fa-solid fa-chevron-down" id="checkInIcon"></i>
      </div>

      <!-- Check Out -->
      <div class="booking-input-placeholder" id="checkOutPlaceholder">
        <input
          type="text"
          name="check-out"
          id="checkOut"
          placeholder="Check Out"
          readonly
          class="booking-input"
        />
        <i class="fa-solid fa-chevron-down" id="checkOutIcon"></i>
      </div>

      <!-- Room -->
      <div class="booking-input-placeholder">
        <input
          type="text"
          name="room"
          id="room"
          placeholder="Room"
          readonly
          class="booking-input"
          value="${roomData.title}"
        />
      </div>

      <!-- Check Button -->
      <button class="price-card-btn">
        Book Now<i class="fa-solid fa-arrow-right"></i>
      </button>
    `;

    // --- Calendar Functionality ---

    try {
      const checkInCalendar = flatpickr("#checkIn", {
        dateFormat: "Y-m-d",
        minDate: "today", // Prevent selection of past dates
      });

      const checkOutCalendar = flatpickr("#checkOut", {
        dateFormat: "Y-m-d",
        minDate: "today",
      });

      // Ensure check-out date is always after check-in date
      document.getElementById("checkIn").addEventListener("change", function () {
        checkOutCalendar.set("minDate", this.value);
      });

      // Attach event listeners to initialize calendar on both the input and the icon
      const checkInInput = document.getElementById("checkIn");
      const checkInIcon = document.getElementById("checkInIcon");
      const checkOutInput = document.getElementById("checkOut");
      const checkOutIcon = document.getElementById("checkOutIcon");

      // Open Flatpickr when clicking the input or icon
      function openFlatpickr(calendarInstance) {
        return () => calendarInstance.open();
      }

      checkInInput.addEventListener("click", openFlatpickr(checkInCalendar));
      checkInIcon.addEventListener("click", openFlatpickr(checkInCalendar));
      checkOutInput.addEventListener("click", openFlatpickr(checkOutCalendar));
      checkOutIcon.addEventListener("click", openFlatpickr(checkOutCalendar));

    } catch (error) {
      console.error("Flatpickr initialization failed. Falling back to custom calendar.", error);
      attachFallbackCalendar();
    }

  } catch (error) {
    console.error("Error fetching single room:", error);
  }
}

// ✅ Lazy load booking-card content
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const bookingCardPlaceholder = document.getElementById("booking-card");
    if (!bookingCardPlaceholder) return;

    const observer = new IntersectionObserver(async (entries, observer) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          await loadBookingCard();
          observer.unobserve(entry.target);
        }
      }
    }, {
      root: null,
      threshold: 0.1
    });

    observer.observe(bookingCardPlaceholder);
  });
})();
