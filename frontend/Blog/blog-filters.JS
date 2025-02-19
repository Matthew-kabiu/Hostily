import { lazyLoadSearch } from "./search.js";
import { loadRecentPosts } from "./recent-posts.js";
import { loadCategoryCard } from "./category-card.js";

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const blogFiltersContainer = document.querySelector(".blog-filters");

    // Exit if the container is not found or already loaded
    if (!blogFiltersContainer || blogFiltersContainer.dataset.loaded) return;

    /**
     * Function to dynamically load blog filters content
     */
    const loadBlogFilters = () => {
      // Mark as loaded to prevent duplicate execution
      blogFiltersContainer.dataset.loaded = "true";

      // Populate the blog filters section
      blogFiltersContainer.innerHTML = `
        <div class="filter-card search"></div>
        <div id="category-card" class="filter-card"></div>
        <div class="filter-card" id="recent-post"></div>
      `;

      // Load dependent scripts
      lazyLoadSearch();
      loadRecentPosts();
      loadCategoryCard();
    };

    /**
     * Observer to detect when the blog-filters container enters the viewport
     */
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          loadBlogFilters();
          observer.disconnect(); // Stop observing after content is loaded
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(blogFiltersContainer);
  });
})();
