(() => {
  document.addEventListener("DOMContentLoaded", () => {
    // Function to create the contact section
    const createContactHTML = () => `
            <section id="contact">
                <div class="get-in-touch-column">
                    <h1 class="contact-header">Get In Touch</h1>
                    <p class="contact-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                        officiis rem ipsum accusamus minus deleniti facilis corrupti delectus
                        sit fugit.
                    </p>
                    <!-- Phone -->
                    <div class="contact-card">
                        <i class="fa-solid fa-phone fa-2x"></i>
                        <div class="contact-text">
                            <p class="contact-text-title">Emergency Help</p>
                            <p class="contact-text-description">+123 (458) 896 895</p>
                        </div>
                    </div>
        
                    <!-- Email -->
                    <div class="contact-card">
                        <i class="fa-solid fa-envelope fa-2x"></i>
                        <div class="contact-text">
                            <p class="contact-text-title">Quick Email</p>
                            <p class="contact-text-description">support@gmail.com</p>
                        </div>
                    </div>
        
                    <!-- Location -->
                    <div class="contact-card">
                        <i class="fa-solid fa-location-dot fa-2x"></i>
                        <div class="contact-text">
                            <p class="contact-text-title">Office Address</p>
                            <p class="contact-text-description last-contact">
                                GXF$+8HQ Chippenham United Kingdom
                            </p>
                        </div>
                    </div>
        
<div class="contact-icons">
    <div class="contact-icon">
        <a href="#" class="contact-icon-link">
            <i class="fa-brands fa-facebook-f icon-link"></i>
        </a>    
    </div>
    <div class="contact-icon">
        <a href="#" class="contact-icon-link">
            <i class="fa-brands fa-twitter icon-link"></i>
        </a>  
    </div>
    <div class="contact-icon">
        <a href="#" class="contact-icon-link">
            <i class="fa-brands fa-instagram icon-link"></i>
        </a>  
    </div>
    <div class="contact-icon">
        <a href="#" class="contact-icon-link">
            <i class="fa-brands fa-youtube icon-link"></i>
        </a>  
    </div>
</div>

                </div>
        
                <div class="get-in-touch-column">
                    <h1 class="contact-header">Send Message</h1>
                    <form action="#" class="contact-form">
                        <div class="input-row">
                            <div class="contact-input">
                                <i class="fa-solid fa-user"></i>
                                <input type="text" placeholder="Full Name" />
                            </div>
                            <div class="contact-input">
                                <i class="fa-solid fa-envelope"></i>
                                <input type="text" placeholder="Email Address" />
                            </div>
                        </div>
                        <div class="input-row">
                            <div class="contact-input">
                                <i class="fa-solid fa-phone"></i>
                                <input type="text" placeholder="Phone" />
                            </div>
                            <div class="contact-input">
                                <i class="fa-solid fa-address-book"></i>
                                <input type="text" placeholder="Subject" />
                            </div>
                        </div>
                        <div class="input-row">
                            <div class="textarea">
                                <i class="fa-solid fa-comments"></i>
                                <textarea name="comments" id="contact-comments" placeholder="Type your comments....."></textarea>
                            </div>
                        </div>
                        <button type="submit" id="btn-submit">Submit Now
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </form>
                </div>
            </section>
        `;

    // Lazy load the contact section when the placeholder is in the viewport
    const contactPlaceholder = document.getElementById("contact-placeholder");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Inject the contact HTML into the page
            contactPlaceholder.insertAdjacentHTML(
              "afterend",
              createContactHTML()
            );
            observer.unobserve(contactPlaceholder); // Stop observing after injection
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the placeholder is visible
      }
    );

    observer.observe(contactPlaceholder);
  });
})();
