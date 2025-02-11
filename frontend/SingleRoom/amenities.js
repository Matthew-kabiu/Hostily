// Export the loadAmenities function for use in other modules.
export function loadAmenities() {
    const amenitiesElement = document.getElementById("amenities");
    if (!amenitiesElement) return;
  
    amenitiesElement.innerHTML = `
      <h1 id="room-single-title">Amenities</h1>
      <div id="amenities-row">
        <!-- 1st Column -->
        <div class="amenities-column">
          <div class="amenities-item">
            <i class="fa-solid fa-broom"></i>
            <p class="amenities-item-p">Room Cleaning</p>
          </div>
          <div class="amenities-item">
            <i class="fa-regular fa-map"></i>
            <p class="amenities-item-p">Pick Up & Drop</p>
          </div>
          <div class="amenities-item">
            <i class="fa-solid fa-wifi"></i>
            <p class="amenities-item-p">Home Wifi</p>
          </div>
        </div>
  
        <!-- 2nd Column -->
        <div class="amenities-column">
          <div class="amenities-item">
            <i class="fa-solid fa-square-parking"></i>
            <p class="amenities-item-p">Car Parking</p>
          </div>
          <div class="amenities-item">
            <i class="fa-solid fa-spa"></i>
            <p class="amenities-item-p">Spa Center</p>
          </div>
          <div class="amenities-item">
            <i class="fa-solid fa-mug-saucer"></i>
            <p class="amenities-item-p">Breakfast</p>
          </div>
        </div>
  
        <!-- 3rd Column -->
        <div class="amenities-column">
          <div class="amenities-item">
            <i class="fa-solid fa-water-ladder"></i>
            <p class="amenities-item-p">Swimming Pool</p>
          </div>
          <div class="amenities-item">
            <i class="fa-solid fa-key"></i>
            <p class="amenities-item-p">Smart Key</p>
          </div>
          <div class="amenities-item">
            <i class="fa-solid fa-dumbbell"></i>
            <p class="amenities-item-p">Fitness Gym</p>
          </div>
        </div>
      </div>
    `;
  }
  
  // IIFE to implement lazy-loading for the amenities section.
  (() => {
    document.addEventListener("DOMContentLoaded", () => {
      const amenitiesElement = document.getElementById("amenities");
      if (!amenitiesElement) return;
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadAmenities();
            observer.unobserve(entry.target); // Stop observing once loaded.
          }
        });
      }, {
        root: null,
        threshold: 0.1 // Trigger when 10% of the element is visible.
      });
  
      observer.observe(amenitiesElement);
    });
  })();
  