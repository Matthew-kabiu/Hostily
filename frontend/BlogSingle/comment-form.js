export const loadCommentForm = () => {
  const commentFormContainer = document.querySelector("#commentForm");

  // Exit if the form is not found or already loaded
  if (!commentFormContainer || commentFormContainer.dataset.loaded) return;

  // Mark as loaded to prevent duplicate execution
  commentFormContainer.dataset.loaded = "true";

  // Populate the comment form dynamically
  commentFormContainer.innerHTML = `
    <div class="form-row">
      <div id="formInput">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
          class="form-input"
        />
        <i class="fa-regular fa-user"></i>
      </div>
      <div id="formInput">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          class="form-input"
        />
        <i class="fa-regular fa-envelope"></i>
      </div>
    </div>

    <div class="form-row">
      <div id="formInput">
        <input
          type="text"
          name="address"
          id="webAddress"
          placeholder="https://"
          class="form-input"
        />
        <i class="fa-solid fa-globe"></i>
      </div>
    </div>
    
    <div class="form-row">
      <div id="form-text-area" class="form-textarea">
        <textarea
          name="comments"
          id="formTextArea"
          placeholder="Type your comment here..."
        ></textarea>
        <i class="fa-solid fa-pencil"></i>
      </div>
    </div>

    <button id="formBtn" type="submit">
      Post Comment<i class="fa-solid fa-arrow-right-long"></i>
    </button>
  `;
};

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const commentFormContainer = document.querySelector("#commentForm");

    // Exit if the form is not found or already loaded
    if (!commentFormContainer || commentFormContainer.dataset.loaded) return;

    /**
     * Observer to detect when the comment form container enters the viewport
     */
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          loadCommentForm();
          observer.disconnect(); // Stop observing after content is loaded
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(commentFormContainer);
  });
})();
