(() => {
    document.addEventListener("DOMContentLoaded", () => {
      // Data: Array of 9 room objects with image sources (if no image, leave the value as an empty string)
      const roomsData = [
        { title: "Double Room", price: "$219/Night", description: "Elegant double room offering modern comfort and luxury", beds: 3, guests: 4, image: "" },
        { title: "Suite", price: "$299/Night", description: "A luxurious suite with modern amenities.", beds: 2, guests: 3, image: "" },
        { title: "Single Room", price: "$159/Night", description: "Cozy single room for solo travelers.", beds: 1, guests: 1, image: "" },
        { title: "Deluxe Room", price: "$249/Night", description: "Spacious room with deluxe facilities.", beds: 2, guests: 2, image: "" },
        { title: "Family Room", price: "$279/Night", description: "Ideal for families with plenty of space.", beds: 3, guests: 5, image: "" },
        { title: "Presidential Suite", price: "$499/Night", description: "The pinnacle of luxury and comfort.", beds: 4, guests: 4, image: "" },
        { title: "Economy Room", price: "$129/Night", description: "Budget-friendly without compromising comfort.", beds: 1, guests: 1, image: "" },
        { title: "Executive Room", price: "$239/Night", description: "Perfect for business travelers.", beds: 2, guests: 2, image: "" },
        { title: "Superior Room", price: "$209/Night", description: "Elegantly designed for comfort.", beds: 2, guests: 2, image: "" }
      ];
      
      const maxCardsPerRow = 3;
      
      // Group the room objects into rows (each row with up to 3 cards)
      const rows = [];
      for (let i = 0; i < roomsData.length; i += maxCardsPerRow) {
        rows.push(roomsData.slice(i, i + maxCardsPerRow));
      }
      
      // Generate HTML for each row of room cards without any inline styling.
      // Each room-card includes a data attribute (data-image) for its background image.
      const rowsHTML = rows.map(row => {
        let rowHTML = `<div class="rooms-row">`;
        row.forEach(room => {
          rowHTML += `
            <div class="room-card" data-image="${room.image}">
              <div class="room-card-overlay">
                <div class="room-card-content">
                  <div class="room-card-title">
                    <p class="room-card-title-text">${room.title}</p>
                    <p class="room-card-price">${room.price}</p>
                  </div>
                  <p class="room-card-description">${room.description}</p>
                  <div class="room-card-details">
                    <div class="beds">
                      <i class="fa-solid fa-bed"></i>
                      <p>(${room.beds}) Beds</p>
                    </div>
                    <div class="guests">
                      <i class="fa-solid fa-user-group"></i>
                      <p>(${room.guests}) Guests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
        rowHTML += `</div>`;
        return rowHTML;
      }).join('');
      
      // Create the overall HTML for the rooms section (placed directly in the "#rooms" placeholder)
      const createRoomsHTML = () => `${rowsHTML}`;
      
      // Function to load the rooms content into the placeholder and set background images via a CSS custom property
      const loadRooms = () => {
        const roomsContainer = document.getElementById("rooms");
        if (roomsContainer) {
          roomsContainer.innerHTML = createRoomsHTML();
          
          // For each room-card, set the CSS custom property '--room-bg' using its data-image attribute.
          // If no valid image is found, the property is not set so that the CSS fallback applies.
          const roomCards = roomsContainer.querySelectorAll(".room-card");
          roomCards.forEach(card => {
            const imageUrl = card.getAttribute("data-image");
            if (imageUrl && imageUrl.trim() !== "") {
              card.style.setProperty('--room-bg', `url(${imageUrl})`);
            } else {
              card.style.removeProperty('--room-bg');
            }
          });
        }
      };
      
      // Lazy-load the rooms section using Intersection Observer
      const roomsContainer = document.getElementById("rooms");
      if (roomsContainer) {
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadRooms();
              observer.unobserve(entry.target);
            }
          });
        }, {
          root: null,
          threshold: 0.1
        });
        observer.observe(roomsContainer);
      }
    });
  })();
  