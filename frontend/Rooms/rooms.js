import { pullData } from "../../JS/api.js";

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let roomsData = [];
    const maxCardsPerRow = 3;

    async function fetchRoomsData() {
      try {
        const jsonData = await pullData("/api/rooms");
        if (jsonData.success) {
          roomsData = jsonData.data;
          loadRooms();
        } else {
          console.error("Failed to fetch rooms:", jsonData.message);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }

    // Store only the room title in localStorage
    function redirectToRoomDetails(room) {
      localStorage.setItem("selectedRoomTitle", room.title);
      window.location.href = "/frontend/SingleRoom/singleroom.html";
    }

    function buildRoomsHTML() {
      if (roomsData.length === 0) return "";

      const rows = [];
      for (let i = 0; i < roomsData.length; i += maxCardsPerRow) {
        rows.push(roomsData.slice(i, i + maxCardsPerRow));
      }

      return rows
        .map(row => {
          let rowHTML = `<div class="rooms-row">`;
          row.forEach(room => {
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
        })
        .join("");
    }

    function loadRooms() {
      const roomsContainer = document.getElementById("rooms");
      if (!roomsContainer) return;

      roomsContainer.innerHTML = buildRoomsHTML();

      const roomCards = roomsContainer.querySelectorAll(".room-card");
      roomCards.forEach(card => {
        if (!card.hasAttribute("data-room")) return;

        try {
          const roomData = JSON.parse(card.getAttribute("data-room").replace(/&apos;/g, "'"));
          card.addEventListener("click", () => redirectToRoomDetails(roomData));
        } catch (error) {
          console.error("Error parsing room data:", error);
        }
      });
    }

    // Lazy Load Data with Intersection Observer
    const roomsContainer = document.getElementById("rooms");
    if (roomsContainer) {
      const observer = new IntersectionObserver(async (entries, observer) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            await fetchRoomsData();
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
