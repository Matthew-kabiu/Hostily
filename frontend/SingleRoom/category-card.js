// Export the loadCategoryCard function so it can be imported elsewhere if needed.
export function loadCategoryCard() {
  const categoryCardElement = document.getElementById("category-card");
  if (!categoryCardElement) return;

  categoryCardElement.innerHTML = `
    <p class="price-card-title">Category</p>
    <hr class="price-card-hr" />
    <!-- Small Suite -->
    <div class="single-item">
      <div class="single-item-p">
        <p class="left-card-description">>></p>
        <p class="category-room left-card-description">Small Suite</p>
      </div>
      <p class="category-id left-card-description">(05)</p>
    </div>
    <!-- Luxury Room -->
    <div class="single-item">
      <div class="single-item-p">
        <p class="left-card-description">>></p>
        <p class="category-room left-card-description">Luxury Room</p>
      </div>
      <p class="category-id left-card-description">(08)</p>
    </div>
    <!-- Single -->
    <div class="single-item">
      <div class="single-item-p">
        <p class="left-card-description">>></p>
        <p class="category-room left-card-description">Single</p>
      </div>
      <p class="category-id left-card-description">(05)</p>
    </div>
    <!-- Family -->
    <div class="single-item">
      <div class="single-item-p">
        <p class="left-card-description">>></p>
        <p class="category-room left-card-description">Family</p>
      </div>
      <p class="category-id left-card-description">(09)</p>
    </div>
    <!-- Double Room -->
    <div class="single-item">
      <div class="single-item-p">
        <p class="left-card-description">>></p>
        <p class="category-room left-card-description">Double Room</p>
      </div>
      <p class="category-id left-card-description">(03)</p>
    </div>
  `;
}

// IIFE to implement lazy-loading for the category card content.
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const categoryCardElement = document.getElementById("category-card");
    if (!categoryCardElement) return;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadCategoryCard();
          observer.unobserve(entry.target); // Stop observing once content is loaded.
        }
      });
    }, {
      root: null,
      threshold: 0.1 // Trigger when at least 10% is visible.
    });

    observer.observe(categoryCardElement);
  });
})();
