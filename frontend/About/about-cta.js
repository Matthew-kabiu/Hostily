(() => {
    document.addEventListener("DOMContentLoaded", () => {
      // Function to create the CTA section content
      const createCTAHTML = () => `
        <h6 class="section-tagline">Company Offers</h6>
        <h1 class="cta-title">
          Book now and save up to 35% on hotel rooms.
        </h1>
        <p class="cta-p">
          Hasellus nisi sapien, rutrum placerat sapien eu, rhoncus tempus felis. Nulla non pulvinar enim, vel viverra nunc. Integer condimentum vulputate justo. Morbi rhoncus elit in tellus viverra, vel fermentum orci dictum. Vestibulum non nisi commodo, tincidunt elit non, consectetur tellus. Fusce in commodo velit. In dapibus dui vitae tortor ullamcorper mollis.
        </p>
        <div class="hotel-room"></div>
      `;
  
      // Select the existing CTA section
      const ctaSection = document.getElementById("about-cta");
  
      // Ensure CTA section exists before proceeding
      if (!ctaSection) {
        console.error("Error: CTA section (#cta) not found in the document.");
        return;
      }
  
      ctaSection.innerHTML = ""; // Clear initial content for lazy loading
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ctaSection.innerHTML = createCTAHTML(); // Inject CTA content
            observer.unobserve(ctaSection); // Stop observing after loading
          }
        });
      }, { threshold: 0.1 });
  
      observer.observe(ctaSection);
    });
  })();
  