// left-panel.js
import { loadPriceCard } from "./price-card.js";
import { loadCategoryCard } from "./category-card.js";
import { loadBookingCard } from "./booking-card.js";

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const leftPanel = document.querySelector("#left-panel");
    if (!leftPanel) return;

    // Function to load the left panel content (placeholders)
    const loadLeftPanel = () => {
      leftPanel.innerHTML = `
        <!-- Price Card -->
        <div id="price-card" class="left-panel-card"></div>
        <!-- Category Card -->
        <div id="category-card" class="left-panel-card"></div>
        <!-- Booking Now Card -->
        <div id="booking-card" class="left-panel-card"></div>
      `;
      // Once placeholders are inserted, call the functions to populate them.
      loadPriceCard();
      loadCategoryCard();
      loadBookingCard();
    };

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load the top section content when at least 10% is visible.
            loadLeftPanel();
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(leftPanel);
  });
})();
