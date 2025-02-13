(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let teamMembers = []; 
    const maxCardsPerRow = 3;
    const cardsPerSlide = maxCardsPerRow * 2; // Two rows per slide
    let totalSlides = 1; // Default until we fetch data

    async function fetchTeamData() {
      try {
        const jsonData = await window.Api.pullData("/api/team");
        if (jsonData.success) {
          teamMembers = jsonData.data;
          totalSlides = Math.ceil(teamMembers.length / cardsPerSlide);
          loadWorkforce();
        } else {
          console.error("Failed to fetch team members:", jsonData.message);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    }

    function buildSlidesHTML() {
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
      return slidesHTML.join('');
    }

    function loadWorkforce() {
      const container = document.getElementById("team-container");
      container.innerHTML = `
        <div id="members">
          <h1 class="cta-title">Meet Our Expert Team</h1>
          <div class="members-carousel-container" style="overflow: hidden; width: 100%;">
            <div class="members-carousel-row" id="carouselRow" style="
              display: flex;
              transition: transform 1s ease-in-out;
              width: ${totalSlides * 100}%;
            ">
              ${buildSlidesHTML()}
            </div>
          </div>
        </div>
      `;

      // Start the automatic carousel transition
      const carouselRow = document.getElementById("carouselRow");
      let currentIndex = 0;
      const transitionDuration = 6000;

      function slideCarousel() {
        currentIndex = (currentIndex + 1) % totalSlides;
        carouselRow.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;
      }

      setInterval(slideCarousel, transitionDuration);
    }

    // Lazy-load the workforce section using Intersection Observer
    const membersContainer = document.getElementById("team-container");
    if (membersContainer) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            fetchTeamData();
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.1
      });
      observer.observe(membersContainer);
    }
  });
})();
