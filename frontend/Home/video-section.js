document.addEventListener("DOMContentLoaded", () => {
  const videoSection = document.querySelector("#videoSection");

  // Exit if the container is not found or already loaded
  if (!videoSection || videoSection.dataset.loaded) return;

  /**
   * Function to dynamically load the video section
   */
  const loadVideoSection = () => {
    // Mark as loaded to prevent duplicate execution
    videoSection.dataset.loaded = "true";

    // Populate the video section dynamically
    videoSection.innerHTML = `
      <div class="video-container">
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoplay
          loop
          muted
          id="video"
        ></video>
        <div class="video-overlay-text">
          <p>Book hotel rooms, get deals & book flights online.</p>
        </div>
      </div>
    `;
  };

  /**
   * Observer to detect when the video section enters the viewport
   */
  const observer = new IntersectionObserver(
    (entries, observer) => {
      if (entries[0].isIntersecting) {
        loadVideoSection();
        observer.disconnect(); // Stop observing after content is loaded
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(videoSection);
});
