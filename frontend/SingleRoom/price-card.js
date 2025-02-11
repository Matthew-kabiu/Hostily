// Export the loadBookingCard function so that it can be imported elsewhere.
export function loadPriceCard() {
  const priceCard = document.getElementById("price-card");
  if (!priceCard) return;

  priceCard.innerHTML = `
    <p class="price-card-title">Your Price</p>
    <hr class="price-card-hr" />
    <div class="price-cards-beds">
      <i class="fa-solid fa-bed"></i>
      <p class="left-card-description">(3) Beds</p>
    </div>
    <div class="price-cards-guests">
      <i class="fa-solid fa-user-group"></i>
      <p class="left-card-description">(6) Guests</p>
    </div>
    <p class="price-card-price">
      $219 <span class="price-card-span">/Night</span>
    </p>
    <button class="price-card-btn">
      BOOK NOW<i class="fa-solid fa-arrow-right"></i>
    </button>
  `;
}

// IIFE to implement lazy-loading functionality
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const priceCard = document.getElementById("price-card");
    if (!priceCard) return;

    // Set up the Intersection Observer to lazy-load the content when at least 10% is visible.
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadPriceCard();
          observer.unobserve(entry.target); // Stop observing once content is loaded.
        }
      });
    }, {
      root: null,
      threshold: 0.1
    });

    observer.observe(priceCard);
  });
})();
