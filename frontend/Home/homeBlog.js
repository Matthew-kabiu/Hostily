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

function loadHomeBlogContent() {
  const homeBlogSection = document.getElementById("homeBlog");

  // Simulated dynamic data (Can be replaced with an API call)
  const blogData = [
    {
      imgUrl: "path-to-image1.jpg",
      date: "27",
      month: "July 2022",
      description:
        "The ultimate guide to finding the best hotels in your area.",
    },
    {
      imgUrl: "path-to-image2.jpg",
      date: "15",
      month: "August 2022",
      description: "Top 10 travel destinations for your next vacation.",
    },
    {
      imgUrl: "path-to-image3.jpg",
      date: "03",
      month: "September 2022",
      description: "How to save money on your next hotel booking.",
    },
  ];

  // Generate the blog content dynamically
  const blogContent = blogData
    .map(
      (blog) => `
    <div class="home-blog-card">
      <div class="home-blog-card-img" style="background-image: url('${blog.imgUrl}');"></div>
      <div class="home-blog-card-text-container">
        <div class="home-card-date">
          <p class="card-date">${blog.date}</p>
          <p class="card-month">${blog.month}</p>
        </div>
        <p class="home-card-p">${blog.description}</p>
      </div>
    </div>
  `
    )
    .join("");

  homeBlogSection.innerHTML = `
    <h6 class="home-blog-tagline">Our Blog</h6>
    <p class="home-blog-title">Read Our Blog and News</p>
    <div class="home-blog-container">
      ${blogContent}
    </div>
  `;
}
