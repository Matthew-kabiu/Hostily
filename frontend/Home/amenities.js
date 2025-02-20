document.addEventListener("DOMContentLoaded", () => {
  const amenitiesSection = document.querySelector("#amenities");

  // Exit if the container is not found or already loaded
  if (!amenitiesSection || amenitiesSection.dataset.loaded) return;

  /**
   * Function to dynamically load the amenities section
   */
  const loadAmenitiesSection = () => {
    // Mark as loaded to prevent duplicate execution
    amenitiesSection.dataset.loaded = "true";

    // Simulated dynamic data (Can be replaced with an API call)
    const amenitiesData = [
      {
        icon: "fa-solid fa-broom fa-2x",
        title: "Room Cleaning",
        description:
          "Proin massa augue, lacinia at blandit ac, fringilla scelerisque tortor",
      },
      {
        icon: "fa-solid fa-wifi fa-2x",
        title: "Free Wi-Fi",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      },
      {
        icon: "fa-solid fa-swimming-pool fa-2x",
        title: "Swimming Pool",
        description:
          "Vivamus bibendum, dolor in gravida dictum, orci risus suscipit sapien",
      },
    ];

    // Populate the amenities section dynamically
    let amenitiesHTML = '<div class="amenities-row">';
    amenitiesData.forEach((amenity) => {
      amenitiesHTML += `
        <div class="amenity-card">
          <div class="amenity-icon">
            <i class="${amenity.icon}"></i>
          </div>
          <div class="amenity-text">
            <p class="amenity-title">${amenity.title}</p>
            <p class="amenity-p">${amenity.description}</p>
          </div>
        </div>
      `;
    });
    amenitiesHTML += "</div>";

    amenitiesSection.innerHTML = amenitiesHTML;
  };

  /**
   * Observer to detect when the amenities section enters the viewport
   */
  const observer = new IntersectionObserver(
    (entries, observer) => {
      if (entries[0].isIntersecting) {
        loadAmenitiesSection();
        observer.disconnect(); // Stop observing after content is loaded
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(amenitiesSection);
});
