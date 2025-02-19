// ✅ Move import to the top for better readability and module handling
import { pullData } from "../../JS/api.js"; // Ensure the correct path is used

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let roomsData = []; // Stores fetched room data
    const maxCardsPerRow = 3; // Defines the maximum number of room cards per row

    // ✅ Fetch rooms data using API helper
    async function fetchRoomsData() {
      try {
        const jsonData = await pullData("/api/rooms"); // ✅ Correct API function call
        if (jsonData.success) {
          roomsData = jsonData.data; // Store the fetched data
          loadRooms(); // ✅ Call loadRooms() only after data is fetched
        } else {
          console.error("Failed to fetch rooms:", jsonData.message);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }

    // ✅ Function to redirect users to a detailed room page
    function redirectToRoomDetails(room) {
      localStorage.setItem("selectedRoom", JSON.stringify(room)); // Store selected room in localStorage
      window.location.href = "/frontend/SingleRoom/singleroom.html"; // Redirect to the room details page
    }

    // ✅ Function to build HTML structure for displaying rooms
    function buildRoomsHTML() {
      if (roomsData.length === 0) return ""; // ✅ Prevent rendering empty content if no data exists

      const rows = []; // Array to store room groups

      // ✅ Split rooms into rows with a max of `maxCardsPerRow` per row
      for (let i = 0; i < roomsData.length; i += maxCardsPerRow) {
        rows.push(roomsData.slice(i, i + maxCardsPerRow));
      }

      // ✅ Generate HTML for each row of rooms
      return rows
        .map(row => {
          let rowHTML = `<div class="rooms-row">`;
          row.forEach(room => {
            const image = room.image || ""; // ✅ Use placeholder if no image exists
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
        .join(""); // ✅ Ensure the final HTML string is correctly formatted
    }

    // ✅ Function to insert room cards into the DOM
    function loadRooms() {
      const roomsContainer = document.getElementById("rooms");
      if (roomsContainer) {
        roomsContainer.innerHTML = buildRoomsHTML(); // ✅ Insert the generated HTML into the container

        const roomCards = roomsContainer.querySelectorAll(".room-card");
        roomCards.forEach(card => {
          // ✅ Ensure `data-room` attribute exists before parsing
          if (!card.hasAttribute("data-room")) return;

          try {
            const roomData = JSON.parse(card.getAttribute("data-room").replace(/&apos;/g, "'"));
            card.addEventListener("click", () => redirectToRoomDetails(roomData)); // ✅ Attach click event to redirect users
          } catch (error) {
            console.error("Error parsing room data:", error);
          }
        });
      }
    }

    // ✅ Lazy Load Data with Intersection Observer
    const roomsContainer = document.getElementById("rooms");
    if (roomsContainer) {
      const observer = new IntersectionObserver(async (entries, observer) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            await fetchRoomsData(); // ✅ Ensure fetch completes before rendering
            observer.unobserve(entry.target); // ✅ Stop observing after the data is loaded
          }
        }
      }, {
        root: null,
        threshold: 0.1 // ✅ Trigger loading when 10% of the container is visible
      });

      observer.observe(roomsContainer);
    }
  });
})();
