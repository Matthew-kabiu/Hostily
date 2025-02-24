import { pullData } from "../../JS/api.js";

export const loadRecentPosts = async () => {
  const recentPostContainer = document.querySelector("#recent-post");

  // Exit if the container is not found or already loaded
  if (!recentPostContainer || recentPostContainer.dataset.loaded) return;

  // Prevent duplicate loading
  recentPostContainer.dataset.loaded = "true";

  try {
    // Fetch news from the API using pullData
    const data = await pullData("/api/hotel-news");
    
    if (!data.success || !data.data) {
      throw new Error("Invalid API response");
    }

    const recentPostsData = data.data.slice(0, 3); // Take only the first 3 articles

    // Create the container content dynamically
    let postContent = `
      <h1 class="filter-card-title">Recent Posts</h1>
      <hr class="filter-card-hr" />
    `;

    // Loop through the first three recent posts
    recentPostsData.forEach((post) => {
      postContent += `
        <div class="single-post">
          <div class="single-post-img" style="background-image: url('${post.urlToImage || "default-image.jpg"}'); background-size: cover; background-position: center;"></div>
          <div class="single-post-content">
            <div class="single-post-calendar">
              <i class="fa-regular fa-calendar-days"></i>
              <p class="single-post-day">${new Date(post.publishedAt).toLocaleDateString()}</p>
            </div>
            <p class="single-post-title">${post.title}</p>
          </div>
        </div>
      `;
    });

    // Inject generated content into the container
    recentPostContainer.innerHTML = postContent;
  } catch (error) {
    console.error("[ERROR DEBUGGING] Failed to fetch recent posts:", error);
  }
};

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const recentPostContainer = document.querySelector("#recent-post");

    // Exit if the container is not found or already loaded
    if (!recentPostContainer || recentPostContainer.dataset.loaded) return;

    /**
     * Observer to detect when the recent post container enters the viewport
     */
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          loadRecentPosts();
          observer.disconnect(); // Stop observing after content is loaded
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(recentPostContainer);
  });
})();
