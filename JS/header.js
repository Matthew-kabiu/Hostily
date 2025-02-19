(() => {
  document.addEventListener("DOMContentLoaded", () => {
      // Get the header placeholder element
      const headerPlaceholder = document.getElementById("header");
      if (!headerPlaceholder) return;

      // Function to load header content dynamically
      const loadHeader = async () => {
          try {
              // Corrected module import path
              const { getPageData } = await import("../../backend/models/headerModel.js");

              // Get dynamic page data
              const { title, text } = getPageData();

              // Build the header content
              const headerHTML = `
                  <nav>
                      <div class="logo">
                          <h6 class="logo-title">Logo</h6>
                      </div>
                      <ul class="nav-items">
                          <li class="nav-item"><a href="../Home/home.html" class="nav-link">Home</a></li>
                          <li class="nav-item"><a href="../About/about.html" class="nav-link">About</a></li>
                          <li class="nav-item"><a href="../Rooms/rooms.html" class="nav-link">Rooms</a></li>
                          <li class="nav-item"><a href="../Blog/blog.html" class="nav-link">Blog</a></li>
                          <li class="nav-item"><a href="../Contact/contact.html" class="nav-link">Contact</a></li>
                      </ul>
                      <div class="logo logo-btn">
                          <h6 class="logo-title">Book Now &rightarrow;</h6>
                      </div>
                  </nav>
                  <div class="header-wrapper">
                      <h1 class="header-title">${title}</h1>
                      <p class="header-text">${text}</p>
                  </div>
              `;

              // Insert the header content into the placeholder
              headerPlaceholder.innerHTML = headerHTML;
          } catch (error) {
              console.error("Error loading header:", error);
          }
      };

      // Set up the Intersection Observer to lazy-load the header
      const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  loadHeader();
                  observer.unobserve(entry.target);
              }
          });
      }, {
          root: null,
          threshold: 0.1
      });

      observer.observe(headerPlaceholder);
  });
})();
