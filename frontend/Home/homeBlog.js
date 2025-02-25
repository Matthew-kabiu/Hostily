import { pullData } from "../../JS/api.js";

document.addEventListener("DOMContentLoaded", function () {
  const homeBlogSection = document.getElementById("homeBlog");

  if (homeBlogSection) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadHomeBlogContent();
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px", threshold: 0.1 }
    );

    observer.observe(homeBlogSection);
  }
});

async function loadHomeBlogContent() {
  const homeBlogSection = document.getElementById("homeBlog");
  try {
    // Fetch news from the API using pullData
    const data = await pullData("/api/hotel-news");
    
    if (!data.success || !data.data) {
      throw new Error("Invalid API response");
    }

    const blogData = data.data.slice(0, 3); // Display first 3 articles

    // Generate the blog content dynamically
    const blogContent = blogData
      .map(
        (blog) => {
          // Limit the title to a maximum of 6 words
          const titleWords = blog.title.split(" ");
          const limitedTitle = titleWords.slice(0, 6).join(" ") + (titleWords.length > 6 ? "..." : "");

          return `
            <div class="home-blog-card" onclick="window.open('${blog.url}', '_blank')">
              <div class="home-blog-card-img" style="background-image: url('${blog.urlToImage || "default-image.jpg"}');"></div>
              <div class="home-blog-card-text-container">
                <div class="home-card-date">
                  <p class="card-date">${new Date(blog.publishedAt).getDate()}</p>
                  <p class="card-month">${new Date(blog.publishedAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                </div>
                <p class="home-card-p">${limitedTitle}</p>
              </div>
            </div>
          `;
        }
      )
      .join("");

    homeBlogSection.innerHTML = `
      <h6 class="home-blog-tagline">Our Blog</h6>
      <p class="home-blog-title">Read Our Blog and News</p>
      <div class="home-blog-container">
        ${blogContent}
      </div>
    `;
  } catch (error) {
    console.error("[ERROR DEBUGGING] Failed to fetch home blog content:", error);
  }
}