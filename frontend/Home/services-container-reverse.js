import { servicesDataReverse, servicesDataReverse1 } from "../../backend/models/servicesDataModel.js";

/**
 * Exportable function to load reverse services content
 * @param {HTMLElement} container - The container element to populate
 * @param {Object} data - Data object containing service info (title, description, imgSrc, etc.)
 */
export function loadServicesSectionReverse(container, data) {
  // If container is missing or already loaded, do nothing
  if (!container || container.dataset.loaded) return;

  // Mark as loaded
  container.dataset.loaded = "true";

  // If data is missing, log an error and show a fallback message
  if (!data) {
    console.error("Data is undefined for container:", container);
    container.innerHTML = `
      <div class="error-message">
        <p>Oops! Something went wrong while loading this section.</p>
      </div>
    `;
    return;
  }

  // Populate the container with the reverse service layout
  container.innerHTML = `
    <div class="services-container reverse">
      <div class="service-description-reverse">
        <h6 class="service-tagline">${data.tagline}</h6>
        <p class="service-title">${data.title}</p>
        <p class="service-p">${data.description}</p>
        <button class="service-button">
          Read More
          <i class="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>
      <div
        class="service-img-reverse"
        style="background: url(${data.imgSrc});"
      ></div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  // Ensure servicesDataReverse is properly defined before usage
  try {
    const servicesContainerReverse = document.querySelector(".services-container-reverse");
    if (servicesContainerReverse) {
      if (!servicesDataReverse) {
        console.warn("servicesDataReverse is not available, skipping section load.");
      } else {
        loadServicesSectionReverse(servicesContainerReverse, servicesDataReverse);
      }
    }

    const servicesContainerReverse1 = document.querySelector(".services-container-reverse1");
    if (servicesContainerReverse1) {
      if (!servicesDataReverse1) {
        console.warn("servicesDataReverse1 is not available, skipping section load.");
      } else {
        loadServicesSectionReverse(servicesContainerReverse1, servicesDataReverse1);
      }
    }
  } catch (error) {
    console.error("Error loading reverse services section:", error);
  }
});