// Export the function so it can be imported elsewhere if needed.
export function loadSpecialInstructions() {
    const specialInstructionsElement = document.getElementById("special-instructions");
    if (!specialInstructionsElement) return;
  
    specialInstructionsElement.innerHTML = `
      <h1 id="room-single-title">
        Special check-in Instructions
      </h1>
      <p id="special-instructions-p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sed tempore debitis consequatur incidunt, quae cupiditate officia facere iste saepe, ab, sit aut iusto temporibus? Vero commodi non, nisi ex temporibus veniam itaque iure modi architecto quidem eos quibusdam corrupti, necessitatibus illum quasi quisquam! Quod dolorem pariatur minima amet saepe suscipit molestias nesciunt animi quibusdam. Temporibus iusto mollitia dolores accusamus?
      </p>
      <p id="special-instructions-p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sed tempore debitis consequatur incidunt, quae cupiditate officia facere iste saepe, ab, sit aut iusto temporibus veniam itaque iure modi architecto quidem eos quibusdam corrupti, necessitatibus illum quasi quisquam! Quod dolorem pariatur minima amet saepe suscipit molestias nesciunt animi quibusdam. Temporibus iusto mollitia dolores accusamus?
      </p>
    `;
  }
  
  // IIFE to implement lazy loading for the special instructions content.
  (() => {
    document.addEventListener("DOMContentLoaded", () => {
      const specialInstructionsElement = document.getElementById("special-instructions");
      if (!specialInstructionsElement) return;
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadSpecialInstructions();
            observer.unobserve(entry.target); // Stop observing once loaded.
          }
        });
      }, {
        root: null,
        threshold: 0.1 // Trigger when 10% is visible.
      });
  
      observer.observe(specialInstructionsElement);
    });
  })();
  