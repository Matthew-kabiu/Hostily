// Export the loadAccordion function so it can be imported elsewhere if needed.
export function loadAccordion() {
    const accordion = document.getElementById("accordion");
    if (!accordion) return;
  
    // Define your accordion data in an array.
    const accordionData = [
      {
        question: "Do you pay before or after booking a hotel?",
        answer:
          "Payment policies vary by hotel. Some require prepayment, while others allow payment at check-in."
      },
      {
        question: "What documents are needed for hotel booking?",
        answer:
          "Most hotels require a valid ID (passport or driver's license) and a credit/debit card for check-in."
      },
      {
        question: "Do hotels charge your card before you check in?",
        answer:
          "Some hotels place a temporary hold on your card before check-in, while others charge at checkout."
      }
    ];
  
    // Build the accordion HTML dynamically.
    let html = "";
    accordionData.forEach(item => {
      html += `
        <div class="accordion-item">
          <button class="accordion-header">
            ${item.question}
            <i class="fa-solid fa-chevron-down"></i>
          </button>
          <div class="accordion-content">
            <p class="accordion-p">${item.answer}</p>
          </div>
        </div>
      `;
    });
    accordion.innerHTML = html;
  
    // Initially hide all accordion content.
    const accordionContents = accordion.querySelectorAll(".accordion-content");
    accordionContents.forEach(content => {
      content.style.display = "none";
    });
  
    // Add click event listeners to toggle the accordion items.
    const accordionHeaders = accordion.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        if (content.style.display === "none" || content.style.display === "") {
          content.style.display = "block";
          header.classList.add("active");
        } else {
          content.style.display = "none";
          header.classList.remove("active");
        }
      });
    });
  }
  
  // IIFE to implement lazy-loading for the accordion content.
  (() => {
    document.addEventListener("DOMContentLoaded", () => {
      const accordionElement = document.getElementById("accordion");
      if (!accordionElement) return;
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadAccordion();
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.1 // Trigger when at least 10% is visible.
      });
  
      observer.observe(accordionElement);
    });
  })();
  