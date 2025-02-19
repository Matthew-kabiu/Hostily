export const loadRecentPosts = () => {
  const recentPostContainer = document.querySelector("#recent-post");

  // Exit if the container is not found or already loaded
  if (!recentPostContainer || recentPostContainer.dataset.loaded) return;

  // Prevent duplicate loading
  recentPostContainer.dataset.loaded = "true";

  // Simulated dynamic data (Can be replaced with an API call)
  const recentPostsData = [
    {
      date: "10 February, 2025",
      title: "Discover the Best Travel Destinations for 2025!",
      imgUrl: "https://example.com/recent-post-image1.jpg",
    },
    {
      date: "18 March, 2025",
      title: "How to Get the Best Hotel Deals This Year!",
      imgUrl: "https://example.com/recent-post-image2.jpg",
    },
    {
      date: "05 April, 2025",
      title: "Exclusive Travel Tips for Budget Travelers",
      imgUrl: "https://example.com/recent-post-image3.jpg",
    },
  ];

  // Create the container content dynamically
  let postContent = `
    <h1 class="filter-card-title">Recent Posts</h1>
    <hr class="filter-card-hr" />
  `;

  // Loop through the first three recent posts
  recentPostsData.slice(0, 3).forEach((post) => {
    postContent += `
      <div class="single-post">
        <div class="single-post-img" style="background-image: url('${post.imgUrl}'); background-size: cover; background-position: center;"></div>
        <div class="single-post-content">
          <div class="single-post-calendar">
            <i class="fa-regular fa-calendar-days"></i>
            <p class="single-post-day">${post.date}</p>
          </div>
          <p class="single-post-title">${post.title}</p>
        </div>
      </div>
    `;
  });

  // Inject generated content into the container
  recentPostContainer.innerHTML = postContent;
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
