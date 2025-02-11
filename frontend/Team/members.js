(() => {
  document.addEventListener("DOMContentLoaded", () => {
    // Team member data (12 team members)
    const teamMembers = [
      { name: "Mitchelle Yeah", title: "CEO" },
      { name: "David Fincher", title: "General Manager" },
      { name: "Emily Stone", title: "Operations Manager" },
      { name: "John Doe", title: "Marketing Head" },
      { name: "Sarah Connor", title: "HR Manager" },
      { name: "James Cameron", title: "Finance Manager" },
      { name: "Alice Smith", title: " Relations Manager" },
      { name: "Robert Brown", title: "Concierge" },
      { name: "Linda Green", title: "Event Manager" },
      { name: "Michael Johnson", title: "Executive Chef" },
      { name: "Karen Lee", title: "Front Office Manager" },
      { name: "Steven White", title: "Housekeeping Supervisor" }
    ];

    const maxCardsPerRow = 3;
    const cardsPerSlide = maxCardsPerRow * 2; // Two rows per slide
    const totalSlides = Math.ceil(teamMembers.length / cardsPerSlide);

    // Group team members into slides, each slide with 2 rows (each row holds up to 3 cards)
    const slidesHTML = [];
    for (let i = 0; i < teamMembers.length; i += cardsPerSlide) {
      const slideMembers = teamMembers.slice(i, i + cardsPerSlide);
      const topRowMembers = slideMembers.slice(0, maxCardsPerRow);
      const bottomRowMembers = slideMembers.slice(maxCardsPerRow);

      slidesHTML.push(`
        <div class="slide" style="
          display: flex;
          flex-direction: column;
          gap: 40px;
          width: calc(100% / ${totalSlides});
        ">
          <!-- Top row -->
          <div class="row" style="
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 20px;
          ">
            ${topRowMembers.map(member => `
              <div class="member-card" style="
                flex: 1;
                margin: 0 10px;
                box-sizing: border-box;
              ">
                <div class="member-card-content">
                  <p class="member-name">${member.name}</p>
                  <p class="member-title">${member.title}</p>
                </div>
              </div>
            `).join('')}
          </div>
          <!-- Bottom row -->
          <div class="row" style="
            display: flex;
            justify-content: space-around;
            align-items: center;
          ">
            ${bottomRowMembers.map(member => `
              <div class="member-card" style="
                flex: 1;
                margin: 0 10px;
                box-sizing: border-box;
              ">
                <div class="member-card-content">
                  <p class="member-name">${member.name}</p>
                  <p class="member-title">${member.title}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `);
    }

    // Create the workforce section HTML with the carousel container
    const createWorkforceHTML = () => `
      <div id="members">
        <h1 class="cta-title">Meet Our Expert Team</h1>
        <div class="members-carousel-container" style="overflow: hidden; width: 100%;">
          <div class="members-carousel-row" id="carouselRow" style="
            display: flex;
            transition: transform 1s ease-in-out;
            width: ${totalSlides * 100}%;
          ">
            ${slidesHTML.join('')}
          </div>
        </div>
      </div>
    `;

    // Function to load the workforce section and start the carousel
    const loadWorkforce = () => {
      const container = document.getElementById("team-container");
      container.insertAdjacentHTML("beforeend", createWorkforceHTML());

      // Select the carousel row element
      const carouselRow = document.getElementById("carouselRow");
      let currentIndex = 0;
      const transitionDuration = 6000; // 6 seconds

      // Function to handle the carousel slide transition
      function slideCarousel() {
        currentIndex = (currentIndex + 1) % totalSlides;
        // Each slide occupies 100/totalSlides % of the carouselRow
        carouselRow.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;
      }

      // Start the automatic carousel transition
      setInterval(slideCarousel, transitionDuration);
    };

    // Lazy load the workforce section using Intersection Observer
    const membersContainer = document.getElementById("team-container");
    if (membersContainer) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadWorkforce();
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.1 // Trigger when 10% of the container is visible
      });
      observer.observe(membersContainer);
    }
  });
})();
