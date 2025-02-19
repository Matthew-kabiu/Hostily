import { loadComments } from "./comments.js";
import { loadAddCommentSection } from "./add-comment.js";

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const blogContentContainer = document.querySelector(".blog-content");

    // Exit if the container is not found or already loaded
    if (!blogContentContainer || blogContentContainer.dataset.loaded) return;

    /**
     * Function to dynamically load the blog content section
     */
    const loadBlogContent = () => {
      // Mark as loaded to prevent duplicate execution
      blogContentContainer.dataset.loaded = "true";

      // Populate the blog content dynamically
      blogContentContainer.innerHTML = `
        <div class="blog-card">
          <div class="blog-card-img"></div>
          <div class="blog-card-icons">
            <div class="blog-card-icon">
              <i class="fa-regular fa-user"></i>
              <p class="blog-icon-p">By Admin #1</p>
            </div>
            <div class="blog-card-icon">
              <i class="fa-regular fa-calendar-days"></i>
              <p class="blog-icon-p">07, March, 2022</p>
            </div>
            <div class="blog-card-icon">
              <i class="fa-regular fa-comments"></i>
              <p class="blog-icon-p">3 Comments</p>
            </div>
          </div>
          <hr class="blog-card-hr" />
          <div class="blog-card-content">
            <h2 class="blog-card-title">
              Get best taxi fares in your city with our booking service
            </h2>
            <p class="blog-card-p">
              Praesent non ullamcorper ligula. Proin a mi vitae massa lacinia
              sollicitudin eget eu ante. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Pellentesque consectetur rhoncus lobortis.
              Curabitur sit amet velit sagittis, pellentesque diam euismod,
              faucibus quam. Cras non rhoncus ipsum. Quisque mattis arcu metus,
            </p>
            <div class="blog-card-imgs">
              <img src="" alt="" class="blog-card-img" />
              <img src="" alt="" class="blog-card-img" />
            </div>

            <!-- Comment Section -->
            <div class="comments" id="comments"></div>

            <!-- Add A Comment -->
            <div class="add-comment" id="add-comment"></div>
          </div>
        </div>
      `;

      // Load comments and add comment section
      loadComments();
      loadAddCommentSection();
    };

    /**
     * Observer to detect when the blog-content container enters the viewport
     */
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          loadBlogContent();
          observer.disconnect(); // Stop observing after content is loaded
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(blogContentContainer);
  });
})();
