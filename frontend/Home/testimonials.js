document.addEventListener("DOMContentLoaded", () => {
  const testimonialSection = document.querySelector("#testimonial");

  // Testimonial data
  const testimonialData = [
    {
      name: "John Hannington",
      title: "UX Designer",
      text: "Lorem ipsum dolor sit amet consectetur. Feugiat diam placerat posuere velit tempor felis turpis est non. Aliquam ipsum eu sed arcu pellentesque. Facilisis lacus id quis facilisi sed mauris quis vulputate sollicitudin. Ultrices enim quisque a. Risus est cursus aliquam justo semper facilisis aliquam a ipsum. Tristique condimentum ipsum praesent faucibus amet. Nisi neque donec vitae vitae. Fermentum etiam a amet.",
      iconUrl: "https://example.com/testimonial-icon1.jpg", // Replace with actual image URL
    },
    {
      name: "Jane Doe",
      title: "Product Manager",
      text: "Lorem ipsum dolor sit amet consectetur. Feugiat diam placerat posuere velit tempor felis turpis est non. Aliquam ipsum eu sed arcu pellentesque. Facilisis lacus id quis facilisi sed mauris quis vulputate sollicitudin. Ultrices enim quisque a. Risus est cursus aliquam justo semper facilisis aliquam a ipsum. Tristique condimentum ipsum praesent faucibus amet. Nisi neque donec vitae vitae. Fermentum etiam a amet.",
      iconUrl: "https://example.com/testimonial-icon2.jpg", // Replace with actual image URL
    },
    {
      name: "Michael Smith",
      title: "Software Engineer",
      text: "Lorem ipsum dolor sit amet consectetur. Feugiat diam placerat posuere velit tempor felis turpis est non. Aliquam ipsum eu sed arcu pellentesque. Facilisis lacus id quis facilisi sed mauris quis vulputate sollicitudin. Ultrices enim quisque a. Risus est cursus aliquam justo semper facilisis aliquam a ipsum. Tristique condimentum ipsum praesent faucibus amet. Nisi neque donec vitae vitae. Fermentum etiam a amet.",
      iconUrl: "https://example.com/testimonial-icon3.jpg", // Replace with actual image URL
    },
  ];

  // Exit if the section is not found or already loaded
  if (!testimonialSection || testimonialSection.dataset.loaded) return;

  // Mark as loaded to prevent duplicate execution
  testimonialSection.dataset.loaded = "true";

  // Function to render a testimonial
  const renderTestimonial = (index) => {
    const testimonial = testimonialData[index];
    testimonialSection.innerHTML = `
      <div class="testimonial-container">
        <div class="testimonial-icon" style="background-image: url(${
          testimonial.iconUrl
        });"></div>
        <div class="testimonial-text">
          <p class="testimonial-name">${testimonial.name}</p>
          <p class="testimonial-title">${testimonial.title}</p>
          <p class="testimonial-p">${testimonial.text}</p>
          <div class="testimonial-actions">
            ${testimonialData
              .map(
                (_, i) => `
              <button id="testimonial-btn" class="${
                i === index ? "active" : ""
              }" data-index="${i}">
                <div class="circle"></div>
              </button>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  };

  // Initial render
  let currentIndex = 0;
  renderTestimonial(currentIndex);

  // Event listener for testimonial buttons
  testimonialSection.addEventListener("click", (event) => {
    if (event.target.closest("#testimonial-btn")) {
      currentIndex = parseInt(
        event.target.closest("#testimonial-btn").dataset.index,
        10
      );
      renderTestimonial(currentIndex);
    }
  });

  // Optional: Implement a slider to automatically transition between testimonials
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonialData.length;
    renderTestimonial(currentIndex);
  }, 5000); // Change testimonial every 5 seconds
});

// Lazy loading implementation
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Load the testimonials section
        document.dispatchEvent(new Event("DOMContentLoaded"));
        observer.disconnect(); // Stop observing after content is loaded
      }
    });
  },
  { threshold: 0.5 }
);

// Start observing the testimonial section
const testimonialSection = document.querySelector("#testimonial");
if (testimonialSection) {
  observer.observe(testimonialSection);
}
