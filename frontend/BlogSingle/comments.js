export const loadComments = () => {
  const commentsContainer = document.querySelector("#comments");

  // Exit if the container is not found or already loaded
  if (!commentsContainer || commentsContainer.dataset.loaded) return;

  /**
   * Simulated dynamic comments data (Can be replaced with an API)
   */
  const commentsData = [
    {
      name: "John Doe",
      date: "20 May, 2022 At 9:00 PM",
      text: "Phasellus nisi sapien, rutrum placerat sapien eu, rhoncus tempus felis. Nulla non pulvinar enim, vel viverra nunc.",
      imgSrc: "https://example.com/user1.jpg",
    },
    {
      name: "Jane Smith",
      date: "22 May, 2022 At 4:30 PM",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus bibendum, dolor in gravida dictum, orci risus suscipit sapien.",
      imgSrc: "https://example.com/invalid.jpg", // Invalid or missing to demonstrate fallback
    },
  ];

  // Mark as loaded to prevent duplicate execution
  commentsContainer.dataset.loaded = "true";

  // Populate the comments section dynamically, including the `#CommentNo` span
  let commentsContent = `
    <h3 class="comments-header">
      Comments <span id="CommentNo">(${commentsData.length})</span>
    </h3>
  `;

  commentsData.forEach((comment) => {
    commentsContent += `
      <div class="single-comment">
        <div class="comment-user">
          <img 
            src="${comment.imgSrc}" 
            alt="${comment.name}" 
            class="comment-user-img"
            id="comment-user-img"
            onerror="this.style.background='var(--grey)'; this.src='';"
          />
        </div>
        <div class="single-comment-details">
          <div class="single-comment-header">
            <h4 class="comment-name">${comment.name}</h4>
            <p class="comment-date">${comment.date}</p>
          </div>
          <div class="comment-text">
            <p class="comment-text-p">${comment.text}</p>
          </div>
        </div>
      </div>
    `;
  });

  // Inject content into the container
  commentsContainer.innerHTML = commentsContent;
};

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const commentsContainer = document.querySelector("#comments");

    // Exit if the container is not found or already loaded
    if (!commentsContainer || commentsContainer.dataset.loaded) return;

    /**
     * Observer to detect when the comments container enters the viewport
     */
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          loadComments();
          observer.disconnect(); // Stop observing after content is loaded
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(commentsContainer);
  });
})();
