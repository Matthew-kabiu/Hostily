import { pullData } from "/JS/api.js"; // Import API function

(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    const accomodationContainer = document.querySelector("#accomodation");

    // Exit if the container is not found or already loaded
    if (!accomodationContainer || accomodationContainer.dataset.loaded) return;

    /**
     * Function to dynamically load the accommodation section
     */
    const loadAccomodationSection = async () => {
      try {
        // ✅ Fetch room data from API
        const response = await pullData("/api/rooms");

        if (!response.success) {
          console.error("Failed to fetch accommodation images:", response.message);
          return;
        }

        // ✅ Extract only 4 rooms
        const accomodationData = response.data.slice(0, 4).map(room => ({
          src: room.image1 || "", // Fallback to empty if missing
          alt: room.title || "Hotel Image"
        }));

        // ✅ Mark section as loaded to prevent duplicate execution
        accomodationContainer.dataset.loaded = "true";

        // ✅ Populate the accommodation section dynamically
        accomodationContainer.innerHTML = `
          <div class="accomodation-column">
            <p class="section-tagline">Accomodations</p>
            <h1 class="accomodation-title">Welcome Our Hotels And Resorts</h1>
            <p class="accomodation-p">
              Savvy travelers are looking for a memorable experience, and our hotels and resorts offer just that. From luxurious rooms to breathtaking views, we provide an unparalleled stay that will leave you wanting more. Whether you're here for business or leisure, our accommodations are designed to meet your every need.
            </p>
            <button class="accomodation-btn">
              Read More <i class="fa-solid fa-arrow-right-long"></i>
            </button>
          </div>
          <div class="accomodation-img-column">
            <div class="accomodation-img-row">
              ${accomodationData.slice(0, 2).map(img => `
          <img src="${img.src}" alt="${img.alt}" class="accomodation-img"
          onerror="this.onerror=null; this.src=''; this.style.background='var(--grey)';">
              `).join("")}
            </div>
            <div class="accomodation-img-row">
              ${accomodationData.slice(2, 4).map(img => `
          <img src="${img.src}" alt="${img.alt}" class="accomodation-img"
                onerror="this.onerror=null; this.src=''; this.style.background='var(--grey)';">
              `).join("")}
            </div>
          </div>
        `;

        // ✅ 🚀 Fix 5: Force Repaint Before Adding Animation
        setTimeout(() => {
          accomodationContainer.classList.add("accomodation-visible");
        }, 50); // Ensures the browser registers the animation

      } catch (error) {
        console.error("Error loading accommodation images:", error);
      }
    };

    /**
     * Observer to detect when the accommodation container enters the viewport
     */
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadAccomodationSection();
            observer.unobserve(entry.target); // Stop observing after content is loaded
          }
        });
      },
      { threshold: 0.2 } // Reduced threshold for earlier trigger
    );

    // ✅ Ensure animation starts hidden before being observed
    accomodationContainer.classList.add("accomodation-hidden");
    observer.observe(accomodationContainer);
  });
})();
