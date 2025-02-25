import { pullData } from "../../JS/api.js";

// Function to load category card dynamically from the API
export async function loadCategoryCard() {
  const categoryCardElement = document.getElementById("category-card");
  if (!categoryCardElement) return;

  try {
    const jsonData = await pullData("/api/rooms");
    if (jsonData.success && jsonData.data.length > 0) {
      const rooms = jsonData.data;
      const uniqueCategories = [...new Set(rooms.map(room => room.title))];

      // Generate dynamic category HTML
      const categoryHTML = uniqueCategories.map(title => `
        <div class="single-item" data-title="${title}">
          <div class="single-item-p">
            <p class="left-card-description">>></p>
            <p class="category-room left-card-description">${title}</p>
          </div>
          <p class="category-id left-card-description">(01)</p>
        </div>
      `).join('');

      categoryCardElement.innerHTML = `
        <h1 class="filter-card-title">Category</h1>
        <hr class="filter-card-hr" />
        ${categoryHTML}
      `;

      // On click, store the same localStorage key as in Rooms.js
      document.querySelectorAll(".single-item").forEach(item => {
        item.addEventListener("click", () => {
          const categoryTitle = item.getAttribute("data-title");
          localStorage.setItem("selectedRoomTitle", categoryTitle);
          window.location.href = "/frontend/SingleRoom/singleroom.html";
        });
      });
    } else {
      console.error("No categories found in the database.");
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// IIFE for lazy loading for the category card content
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const categoryCardElement = document.getElementById("category-card");
    if (!categoryCardElement) return;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadCategoryCard();
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1
    });

    observer.observe(categoryCardElement);
  });
})();
