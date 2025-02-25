import { pullData } from "../../JS/api.js"; // Ensure API.js is correctly imported

// Function to load category card dynamically from the API
export async function loadCategoryCard() {
  const categoryCardElement = document.getElementById("category-card");
  if (!categoryCardElement) return;

  try {
    const jsonData = await pullData("/api/rooms"); // Fetch rooms from API

    if (jsonData.success && jsonData.data.length > 0) {
      const rooms = jsonData.data;
      const uniqueCategories = [...new Set(rooms.map(room => room.title))]; // Extract unique room titles

      // Generate dynamic category HTML
      const categoryHTML = uniqueCategories.map(title => `
        <div class="single-item" data-title="${title}">
          <div class="single-item-p">
            <p class="left-card-description">>></p>
            <p class="category-room left-card-description">${title}</p>
          </div>
          <p class="category-id left-card-description">(01)</p> <!-- Placeholder for count -->
        </div>
      `).join('');

      // Update the DOM with generated content
      categoryCardElement.innerHTML = `
        <p class="price-card-title">Category</p>
        <hr class="price-card-hr" />
        ${categoryHTML}
      `;

      // Add event listeners to each category item
      document.querySelectorAll(".single-item").forEach(item => {
        item.addEventListener("click", () => {
          const selectedRoomTitle = item.getAttribute("data-title"); // Unified key name
          localStorage.setItem("selectedRoomTitle", selectedRoomTitle); // Store title
          window.location.href = "/frontend/SingleRoom/singleroom.html"; // Redirect to details page
        });
      });
    } else {
      console.error("No categories found in the database.");
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// IIFE to implement lazy loading for the category card content.
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const categoryCardElement = document.getElementById("category-card");
    if (!categoryCardElement) return;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadCategoryCard();
          observer.unobserve(entry.target); // Stop observing once loaded
        }
      });
    }, {
      root: null,
      threshold: 0.1 // Trigger when at least 10% is visible
    });

    observer.observe(categoryCardElement);
  });
})();
