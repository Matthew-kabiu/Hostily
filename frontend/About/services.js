(() => {
    document.addEventListener("DOMContentLoaded", () => {
      // Function to create the services section content
      const createServicesHTML = () => `
        <div class="services-row">
          <div class="service-card">
            <img src="../assets/broom.svg" alt="Room Cleaning" class="service-card-img">
            <p class="service-card-title">Room Cleaning</p>
            <p class="service-card-p">Proin massa augue, lacinia at blandit ac, Fringilla scelerisque tortor. Mauris</p>
          </div>
          <div class="service-card">
            <img src="../assets/car-parking.svg" alt="Car Parking" class="service-card-img">
            <p class="service-card-title">Car Parking</p>
            <p class="service-card-p">Proin massa augue, lacinia at blandit ac, Fringilla scelerisque tortor. Mauris</p>
          </div>
          <div class="service-card">
            <img src="../assets/swimming-pool.svg" alt="Swimming Pool" class="service-card-img">
            <p class="service-card-title">Swimming Pool</p>
            <p class="service-card-p">Proin massa augue, lacinia at blandit ac, Fringilla scelerisque tortor. Mauris</p>
          </div>
          <div class="service-card">
            <img src="../assets/map.svg" alt="Pickup & Drop" class="service-card-img">
            <p class="service-card-title">Pickup & Drop</p>
            <p class="service-card-p">Proin massa augue, lacinia at blandit ac, Fringilla scelerisque tortor. Mauris</p>
          </div>
        </div>
      `;
  
      // Select the existing services section
      const servicesSection = document.getElementById("services");
  
      // Ensure services section exists before proceeding
      if (!servicesSection) {
        console.error("Error: Services section (#services) not found in the document.");
        return;
      }
  
      servicesSection.innerHTML = ""; // Clear initial content for lazy loading
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            servicesSection.innerHTML = createServicesHTML(); // Inject services content
            observer.unobserve(servicesSection); // Stop observing after loading
          }
        });
      }, { threshold: 0.1 });
  
      observer.observe(servicesSection);
    });
  })();
  
