import { servicesData, servicesData1 } from "../../backend/models/servicesDataModel.js";

/**
 * Exportable function to load services content
 * @param {HTMLElement} container - The container element to populate
 * @param {Object} data - Data object containing service info (title, description, imgSrc, etc.)
 */
export function loadServicesSection(container, data) {
  if (!container || container.dataset.loaded) return;

  container.dataset.loaded = "true";

  // Ensure data is defined and contains required properties
  if (!data || !data.imgSrc || !data.tagline || !data.title || !data.description) {
    console.warn("Service data is missing or incomplete:", data);
    container.innerHTML = `
      <div class="error-message">
        <p>Oops! Something went wrong while loading this section. Please try again later.</p>
      </div>
    `;
    return;
  }

  // Populate the container with the service layout
  container.innerHTML = `
    <div class="services-container">
      <div class="service-img" style="background-image: url(${data.imgSrc});">
        <!-- Fallback content if image fails to load -->
        <div class="image-fallback">Image not available</div>
      </div>
      <div class="service-description">
        <h6 class="service-tagline">${data.tagline}</h6>
        <p class="service-title">${data.title}</p>
        <p class="service-p">${data.description}</p>
        <button class="service-button">
          Read More
          <i class="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>
    </div>
  `;

  // Add event listener to handle image loading errors
  const serviceImg = container.querySelector(".service-img");
  if (serviceImg) {
    serviceImg.addEventListener("error", () => {
      console.error("Failed to load image:", data.imgSrc);
      serviceImg.innerHTML = `<div class="image-fallback">Image not available</div>`;
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Ensure servicesData is properly defined before usage
  try {
    const servicesContainer = document.querySelector(".services-container");
    if (servicesContainer) {
      if (!servicesData) {
        console.warn("servicesData is not available, skipping section load.");
      } else {
        loadServicesSection(servicesContainer, servicesData);
      }
    }

    const servicesContainer1 = document.querySelector(".services-container1");
    if (servicesContainer1) {
      if (!servicesData1) {
        console.warn("servicesData1 is not available, skipping section load.");
      } else {
        loadServicesSection(servicesContainer1, servicesData1);
      }
    }
  } catch (error) {
    console.error("Error initializing services section:", error);
  }
});