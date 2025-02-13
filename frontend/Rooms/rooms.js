(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let roomsData = []; 
    const maxCardsPerRow = 3;

    // Fetch rooms data using our API helper
    async function fetchRoomsData() {
      try {
        const jsonData = await window.Api.pullData("/api/rooms");
        if (jsonData.success) {
          roomsData = jsonData.data;
        } else {
          console.error("Failed to fetch rooms:", jsonData.message);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }

    function redirectToRoomDetails(room) {
      // Store room details in localStorage
      localStorage.setItem("selectedRoom", JSON.stringify(room));
      // Redirect to the Single Room page
      window.location.href = "/frontend/SingleRoom/singleroom.html";
    }

    function buildRoomsHTML() {
      const rows = [];
      for (let i = 0; i < roomsData.length; i += maxCardsPerRow) {
        rows.push(roomsData.slice(i, i + maxCardsPerRow));
      }
    
      return rows.map(row => {
        let rowHTML = `<div class="rooms-row">`;
        row.forEach(room => {
          const image = room.image || "";
          const price = `$${room.price} /Night`;
    
          rowHTML += `
            <div class="room-card" data-room='${JSON.stringify(room).replace(/'/g, "&apos;")}'>
              <div class="room-card-overlay">
                <div class="room-card-content">
                  <div class="room-card-title">
                    <p class="room-card-title-text">${room.title}</p>
                    <p class="room-card-price">${price}</p>
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
    }
    

    function loadRooms() {
      const roomsContainer = document.getElementById("rooms");
      if (roomsContainer) {
        const rowsHTML = buildRoomsHTML();
        roomsContainer.innerHTML = rowsHTML;
    
        const roomCards = roomsContainer.querySelectorAll(".room-card");
        roomCards.forEach(card => {
          const imageUrl = card.getAttribute("data-image");
          if (imageUrl && imageUrl.trim() !== "") {
            card.style.setProperty('--room-bg', `url(${imageUrl})`);
          } else {
            card.style.removeProperty('--room-bg');
          }
    
          // Fix: Ensure safe JSON parsing
          card.addEventListener("click", () => {
            const rawData = card.getAttribute("data-room").replace(/&apos;/g, "'");
            try {
              const roomData = JSON.parse(rawData);
              redirectToRoomDetails(roomData);
            } catch (error) {
              console.error("Error parsing room data:", error, rawData);
            }
          });
        });
      }
    }
    
    const roomsContainer = document.getElementById("rooms");
    if (roomsContainer) {
      const observer = new IntersectionObserver(async (entries, observer) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            await fetchRoomsData();
            loadRooms();
            observer.unobserve(entry.target);
          }
        }
      }, {
        root: null,
        threshold: 0.1
      });
      observer.observe(roomsContainer);
    }
  });
})();
