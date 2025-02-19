// Export the loadBookingCard function so it can be imported elsewhere if needed.
export function loadBookingCard() {
  const bookingCardPlaceholder = document.getElementById("booking-card");
  if (!bookingCardPlaceholder) return;

  // Retrieve selected room data from localStorage
  const selectedRoom = JSON.parse(localStorage.getItem("selectedRoom"));
  // const selectedCategoryRoom = localStorage.getItem("selectedCategoryRoom");

  if (!selectedRoom) {
    console.error("No room data found in localStorage.");
    return;
  }

  // Populate booking card structure dynamically
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
        value="${selectedRoom.title}"
      />
      
    </div>

    <!-- Check Button -->
    <button class="price-card-btn">
      Book Now<i class="fa-solid fa-arrow-right"></i>
    </button>
  `;

  // --- Calendar Functionality ---
  
  // Try to initialize Flatpickr on the check-in and check-out inputs.
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

  // Fallback custom calendar implementation if Flatpickr is not available.
  function attachFallbackCalendar() {
    let currentCalendarPopup = null;

    function showCalendar(inputElement) {
      if (currentCalendarPopup) {
        currentCalendarPopup.remove();
        currentCalendarPopup = null;
      }

      currentCalendarPopup = document.createElement("div");
      currentCalendarPopup.classList.add("calendar-popup");
      currentCalendarPopup.innerHTML = `<div class="calendar-content"><p>Calendar (choose a date)</p></div>`;
      currentCalendarPopup.style.zIndex = "1000";

      // Positioning the calendar below the input
      const rect = inputElement.getBoundingClientRect();
      currentCalendarPopup.style.position = "absolute";
      currentCalendarPopup.style.top = `${rect.bottom + window.scrollY}px`;
      currentCalendarPopup.style.left = `${rect.left + window.scrollX}px`;

      document.body.appendChild(currentCalendarPopup);
    }

    function hideCalendar() {
      if (currentCalendarPopup) {
        currentCalendarPopup.remove();
        currentCalendarPopup = null;
      }
    }

    // Attach event listeners to both input fields and icons
    const checkInPlaceholder = document.getElementById("checkInPlaceholder");
    const checkOutPlaceholder = document.getElementById("checkOutPlaceholder");
    
    if (checkInPlaceholder) {
      checkInPlaceholder.addEventListener("click", (e) => {
        e.stopPropagation();
        showCalendar(document.getElementById("checkIn"));
      });
    }
    
    if (checkOutPlaceholder) {
      checkOutPlaceholder.addEventListener("click", (e) => {
        e.stopPropagation();
        showCalendar(document.getElementById("checkOut"));
      });
    }

    document.addEventListener("click", (e) => {
      if (currentCalendarPopup && !currentCalendarPopup.contains(e.target)) {
        hideCalendar();
      }
    });
  }
}
