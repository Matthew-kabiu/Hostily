(() => {
    document.addEventListener("DOMContentLoaded", () => {
      // Get the header placeholder element
      const headerPlaceholder = document.getElementById("header");
      if (!headerPlaceholder) return;
  
      // Function to load header content dynamically
      const loadHeader = async () => {
        // Dynamically import getPageData from model.js
        const { getPageData } = await import("./model.js");
  
        // Get dynamic page data
        const { title, text } = getPageData();
  
        // Build the header content (without the outer <header> element, since it already exists)
        const headerHTML = `
          <nav>
            <div class="logo">
              <h6 class="logo-title">Logo</h6>
            </div>
            <ul class="nav-items">
              <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
              <li class="nav-item"><a href="../About/about.html" class="nav-link">About</a></li>
              <li class="nav-item"><a href="../Rooms/rooms.html" class="nav-link">Rooms</a></li>
              <li class="nav-item"><a href="blog.html" class="nav-link">Blog</a></li>
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
      };
  
      // Set up the Intersection Observer to lazy-load the header when it comes into view
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadHeader();
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.1 // Trigger when 10% of the header placeholder is visible
      });
  
      observer.observe(headerPlaceholder);
    });
  })();
  