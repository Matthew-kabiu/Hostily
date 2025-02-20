// Import the container-loading functions
import { loadServicesSection } from "./services-container.js";
import { loadServicesSectionReverse } from "./services-container-reverse.js";

// Import the data for your services containers
import { servicesData, servicesData1, servicesDataReverse, servicesDataReverse1 } from "../../backend/models/servicesDataModel.js";

// IIFE wrapper for scope isolation
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const servicesSection = document.querySelector("#services");

    // Early returns if the element is missing or already marked as loaded
    if (!servicesSection) {
      console.error("Services section container not found.");
      return;
    }
    if (servicesSection.dataset.loaded) {
      console.warn("Services section already loaded.");
      return;
    }

    /**
     * Dynamically load the services section
     */
    const loadServicesSectionMain = () => {
      try {
        // Mark the section as loaded to avoid multiple executions
        servicesSection.dataset.loaded = "true";

        // Create the HTML structure for services
        servicesSection.innerHTML = `
          <div class="services-container"></div>
          <div class="services-container-reverse"></div>
          <div class="services-container"></div>
          <div class="services-container-reverse"></div>
        `;

        // Grab references to the newly inserted containers
        const servicesContainers = servicesSection.querySelectorAll(".services-container");
        const reverseContainers = servicesSection.querySelectorAll(".services-container-reverse");

        // Load content into each .services-container
        if (typeof loadServicesSection === "function") {
          loadServicesSection(servicesContainers[0], servicesData);  // Pass correct data
          loadServicesSection(servicesContainers[1], servicesData1); // Pass correct data
        } else {
          throw new Error("loadServicesSection is not a function.");
        }

        // Load content into each .services-container-reverse, passing the correct data
        if (typeof loadServicesSectionReverse === "function") {
          loadServicesSectionReverse(reverseContainers[0], servicesDataReverse);
          loadServicesSectionReverse(reverseContainers[1], servicesDataReverse1);
        } else {
          throw new Error("loadServicesSectionReverse is not a function.");
        }

      } catch (error) {
        console.error("Error loading services section:", error);

        // In case of error, show a fallback message
        servicesSection.innerHTML = `
          <div class="error-message">
            <p>Oops! Something went wrong while loading the services section. Please try again later.</p>
          </div>
        `;
      }
    };

    /**
     * Set up lazy loading with IntersectionObserver
     */
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          try {
            loadServicesSectionMain();
          } catch (error) {
            console.error("Error in IntersectionObserver callback:", error);
          } finally {
            // Stop observing once content is loaded or after an error
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    // Start observing the #services section
    try {
      observer.observe(servicesSection);
    } catch (error) {
      console.error("Error observing services section:", error);
    }
  });
})();
