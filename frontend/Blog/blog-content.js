(() => {
  // Wait until the DOM is fully loaded before executing
  window.addEventListener("DOMContentLoaded", () => {
    const blogContentContainer = document.querySelector(".blog-content");

    // Exit if the blog content container is not found
    if (!blogContentContainer) {
      console.warn("[ERROR DEBUGGING] blog-content container not found.");
      return;
    }

    // Example array of 6 blog posts
    const blogPosts = [
      {
        author: "By Admin #1",
        date: "07, March, 2022",
        comments: "3 Comments",
        title: "Get best taxi fares in your city with our booking service",
        description: `Praesent non ullamcorper ligula. Proin a mi vitae massa lacinia sollicitudin eget eu ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur rhoncus lobortis. Curabitur sit amet velit sagittis, pellentesque diam euismod, faucibus quam. Cras non rhoncus ipsum. Quisque mattis arcu metus,`,
        btnText: "Read More",
      },
      {
        author: "By John Doe #2",
        date: "15, April, 2022",
        comments: "10 Comments",
        title: "Why booking early can save you money on hotel rooms",
        description: `Praesent non ullamcorper ligula. Proin a mi vitae massa lacinia sollicitudin eget eu ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur rhoncus lobortis. Curabitur sit amet velit sagittis, pellentesque diam euismod, faucibus quam. Cras non rhoncus ipsum. Quisque mattis arcu metus`,
        btnText: "Discover More",
      },
      {
        author: "By Jane Smith #3",
        date: "20, May, 2022",
        comments: "5 Comments",
        title: "Top 10 tips for finding the perfect hotel",
        description: `Praesent non ullamcorper ligula. Proin a mi vitae massa lacinia sollicitudin eget eu ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur rhoncus lobortis. Curabitur sit amet velit sagittis, pellentesque diam euismod, faucibus quam. Cras non rhoncus ipsum. Quisque mattis arcu metus`,
        btnText: "Check it Out",
      },
      {
        author: "By Admin #4",
        date: "10, June, 2022",
        comments: "0 Comments",
        title: "Explore the world with Hostily bookings",
        description: `Praesent non ullamcorper ligula. Proin a mi vitae massa lacinia sollicitudin eget eu ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur rhoncus lobortis. Curabitur sit amet velit sagittis, pellentesque diam euismod, faucibus quam. Cras non rhoncus ipsum. Quisque mattis arcu metus`,
        btnText: "Read More",
      },
      {
        author: "By John Doe #5",
        date: "12, July, 2022",
        comments: "2 Comments",
        title: "Booking hacks: Save more on your next stay",
        description: `Praesent non ullamcorper ligula. Proin a mi vitae massa lacinia sollicitudin eget eu ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur rhoncus lobortis. Curabitur sit amet velit sagittis, pellentesque diam euismod, faucibus quam. Cras non rhoncus ipsum. Quisque mattis arcu metus`,
        btnText: "Discover More",
      },
      {
        author: "By Sarah Green #6",
        date: "01, August, 2022",
        comments: "8 Comments",
        title: "Exclusive deals for early bookings",
        description: `Praesent non ullamcorper ligula. Proin a mi vitae massa lacinia sollicitudin eget eu ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur rhoncus lobortis. Curabitur sit amet velit sagittis, pellentesque diam euismod, faucibus quam. Cras non rhoncus ipsum. Quisque mattis arcu metus`,
        btnText: "Book Now",
      },
    ];

    const pageSize = 2;
    const totalPages = Math.ceil(blogPosts.length / pageSize);
    let currentPage = 1;

    // Function to create a blog card's HTML structure
    const createBlogCard = (post) => `
            <div class="blog-card">
                <div class="blog-card-img"></div>
                <div class="blog-card-icons">
                    <div class="blog-card-icon"><i class="fa-regular fa-user"></i><p class="blog-icon-p">${post.author}</p></div>
                    <div class="blog-card-icon"><i class="fa-regular fa-calendar-days"></i><p class="blog-icon-p">${post.date}</p></div>
                    <div class="blog-card-icon"><i class="fa-regular fa-comments"></i><p class="blog-icon-p">${post.comments}</p></div>
                </div>
                <hr class="blog-card-hr">
                <div class="blog-card-content">
                    <h2 class="blog-card-title">${post.title}</h2>
                    <p class="blog-card-p">${post.description}</p>
                    <button class="blog-card-btn">${post.btnText} <i class="fa-solid fa-arrow-right-long"></i></button>
                </div>
            </div>
        `;

    // Function to render blog posts
    const renderPosts = () => {
      blogContentContainer.innerHTML = "";

      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const currentPosts = blogPosts.slice(startIndex, endIndex);

      currentPosts.forEach((post) => {
        blogContentContainer.innerHTML += createBlogCard(post);
      });

      // Create pagination buttons
      const blogCardActionsContainer = document.createElement("div");
      blogCardActionsContainer.classList.add("blog-card-actions");

      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.classList.add("blog-page-no");
        pageBtn.setAttribute("data-page", i);
        pageBtn.textContent = i < 10 ? "0" + i : i.toString();

        if (i === currentPage) {
          pageBtn.style.background = "var(--black)";
          pageBtn.style.color = "var(--white)";
        }

        pageBtn.addEventListener("click", () => {
          currentPage = i;
          renderPosts();
          blogContentContainer.scrollIntoView({ behavior: "smooth" });
        });

        blogCardActionsContainer.appendChild(pageBtn);
      }

      blogContentContainer.appendChild(blogCardActionsContainer);
    };

    // Lazy Load Observer
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          renderPosts();
          observer.disconnect(); // Stop observing after loading content
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(blogContentContainer);
  });
})();
