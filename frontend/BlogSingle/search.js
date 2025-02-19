export const lazyLoadSearch = () => {
  // Select the search container element
  const searchContainer = document.querySelector(".filter-card.search");

  // Exit if search container is not found or already initialized
  if (!searchContainer || searchContainer.dataset.loaded) return;

  // Mark search container as loaded to prevent duplicate executions
  searchContainer.dataset.loaded = "true";

  // Insert the search input field and icon dynamically
  searchContainer.innerHTML = `
    <div class="search-input">
      <input type="text" id="searchInput" placeholder="Search..." />
      <i class="fas fa-search"></i>
    </div>
  `;
};

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    // Select the search container element
    const searchContainer = document.querySelector(".filter-card.search");

    // Exit if search container is not found or already initialized
    if (!searchContainer || searchContainer.dataset.loaded) return;

    /**
     * Observe when the search container enters the viewport
     * and load the search input lazily.
     */
    new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          lazyLoadSearch();
          observer.disconnect(); // Stop observing after loading
        }
      },
      { threshold: 0.5 }
    ).observe(searchContainer);
  });
})();
