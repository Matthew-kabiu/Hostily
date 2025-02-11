// Export the loadBookingCard function so it can be imported elsewhere if needed.
export function loadBookingCard() {
  const bookingCardPlaceholder = document.getElementById("booking-card");
  if (!bookingCardPlaceholder) return;

  bookingCardPlaceholder.innerHTML = `
    <p class="price-card-title">Booking Now</p>
    <hr class="price-card-hr" />
    <!-- Check In -->
    <div class="booking-input-placeholder">
      <input
        type="text"
        name="check-in"
        id="checkIn"
        placeholder="Check In"
        readonly
        class="booking-input"
      />
      <i class="fa-solid fa-chevron-down"></i>
    </div>
    <!-- Check Out -->
    <div class="booking-input-placeholder">
      <input
        type="text"
        name="check-out"
        id="checkOut"
        placeholder="Check Out"
        readonly
        class="booking-input"
      />
      <i class="fa-solid fa-chevron-down"></i>
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
      />
      <i class="fa-solid fa-chevron-down"></i>
    </div>
    <!-- Check -->
    <button class="price-card-btn">
      Check<i class="fa-solid fa-arrow-right"></i>
    </button>
  `;
}

// IIFE that implements lazy-loading for the booking card content
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const bookingCardPlaceholder = document.getElementById("booking-card");
    if (!bookingCardPlaceholder) return;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadBookingCard();
          observer.unobserve(entry.target); // Stop observing after loading content
        }
      });
    }, {
      root: null,
      threshold: 0.1
    });

    observer.observe(bookingCardPlaceholder);
  });
})();
