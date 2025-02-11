(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const membersCtaSection = document.getElementById("members-cta");
      if (!membersCtaSection) return;
  
      // Function to load the Members CTA content into the placeholder
      const loadMembersCta = () => {
        membersCtaSection.innerHTML = `
          <div class="members-cta-column">
            <p class="members-cta-tagline">
              Message From The CEO
            </p>
            <div class="members-logo">
              <h6 class="logo-title">Logo</h6>
            </div>
            <p class="members-cta-p">
              Lorem ipsum dolor sit amet consectetur. Gravida euismod enim euismod nullam. Nunc odio nibh at mollis consectetur amet. Amet hendrerit sed orci est. Sagittis eu volutpat erat nulla. Diam amet nibh quisque neque. Arcu nulla eu rhoncus et gravida. Feugiat egestas ultrices turpis vitae. Aliquet ipsum pellentesque pharetra mattis rhoncus. Aliquet amet rhoncus pulvinar ac vel. Et neque eget pellentesque sed. Convallis facilisis pharetra leo facilisi. Vulputate nibh ut volutpat rhoncus sem iaculis. Vitae in est fames nascetur. Euismod sed nisl augue erat. Non elementum in viverra mi in.
            </p>
          </div>
          <div class="column-img">
            <div class="ceo-image"></div>
            <p class="ceo-title">
              JOHN WAINAINA , A MEMBER OF THE ROTARY CLUB OF JUJA IS THE SELCTION OF THE NOMINATING COMMITTEE FOR PRESIDENT OF ROTARY CLUB JUJA FOR 2023-24
            </p>
          </div>
        `;
      };
  
      // Set up an Intersection Observer to lazy-load the content when the placeholder is visible
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadMembersCta();
            observer.unobserve(entry.target); // Stop observing once content is loaded
          }
        });
      }, {
        root: null,
        threshold: 0.1 // Trigger when at least 10% of the section is visible
      });
  
      observer.observe(membersCtaSection);
    });
  })();
  