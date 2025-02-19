(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const accomodationContainer = document.querySelector("#accomodation");

    // Exit if the container is not found or already loaded
    if (!accomodationContainer || accomodationContainer.dataset.loaded) return;

    /**
     * Function to dynamically load the accomodation section
     */
    const loadAccomodationSection = () => {
      // Mark as loaded to prevent duplicate execution
      accomodationContainer.dataset.loaded = "true";

      // Simulated dynamic data (Can be replaced with an API call)
      const accomodationData = [
        { src: "images/hotel-1.jpg", alt: "Hotel 1" },
        { src: "images/hotel-2.jpg", alt: "Hotel 2" },
        { src: "images/hotel-3.jpg", alt: "Hotel 3" },
        { src: "images/hotel-4.jpg", alt: "Hotel 4" },
      ];

      // Populate the accomodation section dynamically
      accomodationContainer.innerHTML = `
        <div class="accomodation-column">
          <p class="section-tagline">Accomodations</p>
          <h1 class="accomodation-title">Welcome Our Hotels And Resorts</h1>
          <p class="accomodation-p">
            Savvy travelers are looking for more than just the next destination on
            the map. They are looking for a memorable experience and to make new
            friends along the way. Our hotels and resorts are designed to provide
            just that.
          </p>
          <button class="accomodation-btn">
            Read More
            <i class="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>

        <div class="accomodation-img-column">
          <div class="accomodation-img-row">
            ${accomodationData
              .slice(0, 2)
              .map(
                (img) => `
              <img src="${img.src}" alt="${img.alt}" class="accomodation-img" />
            `
              )
              .join("")}
          </div>
          <div class="accomodation-img-row">
            ${accomodationData
              .slice(2, 4)
              .map(
                (img) => `
              <img src="${img.src}" alt="${img.alt}" class="accomodation-img" />
            `
              )
              .join("")}
          </div>
        </div>
      `;
    };

    /**
     * Observer to detect when the accomodation container enters the viewport
     */
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          loadAccomodationSection();
          observer.disconnect(); // Stop observing after content is loaded
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(accomodationContainer);
  });
})();
