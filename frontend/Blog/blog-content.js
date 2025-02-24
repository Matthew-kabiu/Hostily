// Import the pullData function from api.js
import { pullData } from "../../JS/api.js";

(() => {
  window.addEventListener("DOMContentLoaded", async () => {
    const blogContentContainer = document.querySelector(".blog-content");
    if (!blogContentContainer) {
      console.warn("[ERROR DEBUGGING] blog-content container not found.");
      return;
    }

    const pageSize = 2; // Number of posts per page
    let currentPage = 1; // Current page number
    let blogPosts = []; // Array to store fetched blog posts

    // Fetch news from the backend API using the pullData function
    const fetchNews = async () => {
      try {
        const data = await pullData("/api/hotel-news"); // Use pullData from api.js

        if (data.success) {
          blogPosts = data.data.map((post) => ({
            source: post.source.name || "Unknown Source",
            author: post.author || "Unknown Author",
            title: post.title,
            description: post.description,
            url: post.url,
            urlToImage: post.urlToImage || "default-image.jpg",
            publishedAt: new Date(post.publishedAt).toLocaleDateString(),
            content: post.content || "No content available",
          }));
        }
      } catch (error) {
        console.error("[ERROR DEBUGGING] Failed to fetch hotel news:", error);
      }
    };

    // Function to create a blog card
    const createBlogCard = (post) => {
      // Limit the title to a maximum of 9 words
      const titleWords = post.title.split(" ");
      const limitedTitle =
        titleWords.slice(0, 10).join(" ") + (titleWords.length > 10 ? "..." : "");

      return `
        <div class="blog-card">
          <div class="blog-card-img" style="background-image: url('${post.urlToImage}');"></div>
          <div class="blog-card-icons">
            <div class="blog-card-icon"><i class="fa-regular fa-user"></i><p class="blog-icon-p">${post.author}</p></div>
            <div class="blog-card-icon"><i class="fa-regular fa-calendar-days"></i><p class="blog-icon-p">${post.publishedAt}</p></div>
            <div class="blog-card-icon"><i class="fa-regular fa-newspaper"></i><p class="blog-icon-p">${post.source}</p></div>
          </div>
          <hr class="blog-card-hr">
          <div class="blog-card-content">
            <h2 class="blog-card-title">${limitedTitle}</h2>
            <p class="blog-card-p">${post.description}</p>
            <a href="${post.url}" target="_blank" class="blog-card-btn">Read More <i class="fa-solid fa-arrow-right-long"></i></a>
          </div>
        </div>
      `;
    };

    // Function to render blog posts with pagination
    const renderPosts = () => {
      blogContentContainer.innerHTML = ""; // Clear existing content
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const currentPosts = blogPosts.slice(startIndex, endIndex);

      // Render blog cards for the current page
      currentPosts.forEach((post) => {
        blogContentContainer.innerHTML += createBlogCard(post);
      });

      // Render pagination buttons
      const blogCardActionsContainer = document.createElement("div");
      blogCardActionsContainer.classList.add("blog-card-actions");

      const totalPages = Math.ceil(blogPosts.length / pageSize);
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.classList.add("blog-page-no");
        pageBtn.setAttribute("data-page", i);
        pageBtn.textContent = i < 10 ? "0" + i : i.toString();

        // Highlight the current page button
        if (i === currentPage) {
          pageBtn.style.background = "var(--black)";
          pageBtn.style.color = "var(--white)";
        }

        // Add click event to switch pages
        pageBtn.addEventListener("click", () => {
          currentPage = i;
          renderPosts();
          blogContentContainer.scrollIntoView({ behavior: "smooth" });
        });

        blogCardActionsContainer.appendChild(pageBtn);
      }

      blogContentContainer.appendChild(blogCardActionsContainer);
    };

    // Lazy load observer
    const observer = new IntersectionObserver(
      async (entries, observer) => {
        if (entries[0].isIntersecting) {
          await fetchNews(); // Fetch blog posts
          renderPosts(); // Render the posts
          observer.disconnect(); // Stop observing after the first load
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(blogContentContainer); // Start observing the container
  });
})();
