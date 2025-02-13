(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    let teamMembers = [];

    // Fetch team members from the "team" collection in the database
    async function fetchTeamMembers() {
      try {
        if (!window.Api || typeof window.Api.pullData !== "function") {
          throw new Error("API helper (window.Api) is not available.");
        }
        const jsonData = await window.Api.pullData("/api/team"); // Fetch from DB
        if (jsonData.success) {
          teamMembers = jsonData.data; // Store retrieved data
        } else {
          console.error("Failed to fetch team members:", jsonData.message);
          teamMembers = [];
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
        teamMembers = [];
      }
    }

    await fetchTeamMembers(); // Ensure data is fetched before processing

    const maxCardsPerRow = 3;
    const totalSlides = Math.ceil(teamMembers.length / maxCardsPerRow);

    // Group team members into slides (rows), each with up to 3 cards.
    const slidesHTML = [];
    for (let i = 0; i < teamMembers.length; i += maxCardsPerRow) {
      const slideMembers = teamMembers.slice(i, i + maxCardsPerRow);
      slidesHTML.push(`
        <div class="slide" style="
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: calc(100% / ${totalSlides});
        ">
          ${slideMembers.map(member => `
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
      `);
    }

    // Create the workforce section HTML with the carousel container
    const createWorkforceHTML = () => `
      <section id="members">
        <h6 class="section-tagline">Our Expert Members</h6>
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
      </section>
    `;

    // Function to load the workforce section and start the carousel
    const loadWorkforce = () => {
      const container = document.getElementById("members-container");
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
    const membersContainer = document.getElementById("members-container");
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
