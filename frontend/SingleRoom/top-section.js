// Export the function so that other modules can import and use it.
export function loadTopSection() {
    const topSectionElement = document.getElementById("top-section");
    if (!topSectionElement) return;
  
    topSectionElement.innerHTML = `
      <h1 id="room-single-title">
        Luxury Room is the best online room for luxury hotels
      </h1>
      <p id="room-single-description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, sit
        mollitia quidem aperiam molestias aut ducimus error sequi dolorem
        blanditiis perferendis amet sapiente unde facere placeat incidunt
        quia. Nostrum, fugiat. Dolorum dolorem sint aliquid, cum distinctio
        maiores, odit nisi accusantium voluptatem nobis qui vero pariatur?
        Illum eius fugiat voluptatibus quidem reprehenderit nesciunt dolores
        quasi, illo molestias. Quia distinctio voluptatum quae!
      </p>
      <div class="top-img-row">
        <div class="top-img"></div>
        <div class="top-img"></div>
      </div>
    `;
  }
  
  // IIFE that implements lazy loading for the top-section content.
  (() => {
    document.addEventListener("DOMContentLoaded", () => {
      const topSectionPlaceholder = document.getElementById("top-section");
      if (!topSectionPlaceholder) return;
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Load the top section content when at least 10% is visible.
            loadTopSection();
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.1
      });
  
      observer.observe(topSectionPlaceholder);
    });
  })();
  