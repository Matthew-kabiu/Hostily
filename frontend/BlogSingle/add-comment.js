import { loadCommentForm } from "./comment-form.js";

export const loadAddCommentSection = () => {
  const addCommentContainer = document.querySelector("#add-comment");

  // Exit if the container is not found or already loaded
  if (!addCommentContainer || addCommentContainer.dataset.loaded) return;

  // Mark as loaded to prevent duplicate execution
  addCommentContainer.dataset.loaded = "true";

  // Populate the add comment section dynamically
  addCommentContainer.innerHTML = `
    <h3 class="comments-header">Add Comment</h3>
    <form action="" id="commentForm"></form>
  `;

  // Load the comment form
  loadCommentForm();
};

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const addCommentContainer = document.querySelector("#add-comment");

    // Exit if the container is not found or already loaded
    if (!addCommentContainer || addCommentContainer.dataset.loaded) return;

    /**
     * Observer to detect when the add-comment container enters the viewport
     */
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          loadAddCommentSection();
          observer.disconnect(); // Stop observing after content is loaded
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(addCommentContainer);
  });
})();
