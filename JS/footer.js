(() => {
  document.addEventListener("DOMContentLoaded", () => {
    // Get the existing footer placeholder
    const footerElement = document.getElementById("footer");

    if (footerElement) {
      // Function to create the footer content
      const createFooterHTML = () => `
        <div class="footer-row">
          <div class="footer-column">
            <div class="footer-logo">
              <p class="footer-logo-title">LOGO</p>
            </div>
            <p class="footer-p">
              Phasellus nisi sapien, rutrum placerat sapien eu, rhoncus tempus
            </p>
            <div class="footer-icons">
              <div class="footer-icon">
                <a class="footer-icon-link" href="#"><i class="fa-brands fa-facebook-f"></i></a>
              </div>
              <div class="footer-icon">
                <a class="footer-icon-link" href="#"><i class="fa-brands fa-twitter"></i></a>
              </div>
              <div class="footer-icon">
                <a class="footer-icon-link" href="#"><i class="fa-brands fa-instagram"></i></a>
              </div>
              <div class="footer-icon">
                <a class="footer-icon-link" href="#"><i class="fa-brands fa-youtube"></i></a>
              </div>
            </div>
          </div>

          <div class="footer-column">
            <p class="footer-title">Information</p>
            <ul class="footer-items">
              <div class="footer-card">
                <i class="fa-solid fa-map fa-2x info-icon"></i>
                <p class="footer-p">GXF4+8HQ Chippenham United Kingdom</p>
              </div>
              <div class="footer-card">
                <i class="fa-solid fa-envelope-open-text fa-2x info-icon"></i>
                <p class="footer-p">help.ino@gmail.com</p>
              </div>
              <div class="footer-card">
                <i class="fa-solid fa-phone fa-2x info-icon"></i>
                <p class="footer-p">+123 (458) 585 568</p>
              </div>
            </ul>
          </div>

          <div class="footer-column pages">
            <p class="footer-title">Pages Links</p>
            <ul class="footer-items">
              <a href="#" class="footer-link">Room Cleaning</a>
              <a href="#" class="footer-link">Car Parking</a>
              <a href="#" class="footer-link">Swimming Pool</a>
              <a href="#" class="footer-link">Fitness Gym</a>
            </ul>
          </div>

          <div class="footer-column">
            <p class="footer-title">Subscribe</p>
            <div class="email">
              <input type="email" placeholder="Email Address" maxlength="60" required class="email-input" />
              <button type="submit" class="email-submit">
                <i class="fa-regular fa-hand-pointer"></i>
              </button>
            </div>
            <button class="back-to-top" id="backToTop">
              <i class="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </div>

        <div class="footer-bottom-row">
          <div class="footer-bottom-column">
            <p class="copyright">Copyright &copy; 2025 Hostily Built By Spookie Solutions</p>
          </div>
          <div class="faq-links">
            <a href="#" class="footer-bottom-link">FAQ</a>
            <p class="stroke">|</p>
            <a href="#" class="footer-bottom-link">Terms Of Use</a>
            <p class="stroke">|</p>
            <a href="#" class="footer-bottom-link">Privacy Policy</a>
            <p class="stroke">|</p>
          </div>
        </div>
      `;

      // Function that loads the footer content into the placeholder
      const loadFooter = () => {
        footerElement.innerHTML = createFooterHTML();

        // Implement back-to-top functionality
        const backToTopButton = footerElement.querySelector("#backToTop");
        if (backToTopButton) {
          backToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
        }
      };

      // Use Intersection Observer to lazy-load the footer when it enters the viewport
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadFooter();
            // Once the footer is loaded, stop observing it
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.1, // Load when at least 10% of the footer is visible
      });

      observer.observe(footerElement);
    }
  });
})();
