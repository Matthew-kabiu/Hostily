(() => {
  document.addEventListener("DOMContentLoaded", () => {
    // Function to create the header content
    const createHeaderHTML = () => `
      <div class="video-background">
        <video autoplay muted loop id="myVideo">
          <source src="../assets/video_background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <header>
        <nav>
          <div class="logo">
            <h6 class="logo-title">Logo</h6>
          </div>
          <ul class="nav-items">
            <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Pages</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Rooms</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Blog</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>
          </ul>
          <div class="logo">
            <h6 class="logo-title">Book Now &rightarrow;</h6>
          </div>
        </nav>
        <div class="background-overlay">
          <h1 class="header-title">The Best Hotel Deals In The World</h1>
          <div class="header-cards-row">
            <div class="header-card">
              <div class="header-card-text">
                <p class="header-card-p">Check In</p>
                <input type="text" id="checkInDate" class="calendar-input" placeholder="dd/mm/yyyy" readonly />
              </div>
              <button class="calendar-button" id="checkInButton">
                <i class="fa-regular fa-calendar"></i>
              </button>
            </div>
            <div class="header-card">
              <div class="header-card-text">
                <p class="header-card-p">Check Out</p>
                <input type="text" id="checkOutDate" class="calendar-input" placeholder="dd/mm/yyyy" readonly />
              </div>
              <button class="calendar-button" id="checkOutButton">
                <i class="fa-regular fa-calendar"></i>
              </button>
            </div>
            <div class="header-card">
              <div class="header-card-text">
                <p class="header-card-p">Room</p>
                <p class="header-card-p">1 Room</p>
              </div>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="header-card check-now">
              <div class="header-card-text">
                <p class="header-card-p">CHECK NOW</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;

    // Inject the header HTML into the page
    document.getElementById("header-container").innerHTML = createHeaderHTML();

    // Event listeners for the calendar buttons
    document.getElementById("checkInButton").addEventListener("click", () => {
      showCalendar("checkInDate");
    });

    document.getElementById("checkOutButton").addEventListener("click", () => {
      showCalendar("checkOutDate");
    });

    // Function to display a simple calendar popup
    function showCalendar(inputId) {
      const input = document.getElementById(inputId);

      // Create a date input element
      const datePicker = document.createElement("input");
      datePicker.type = "date";
      datePicker.style.position = "absolute";
      datePicker.style.top = `${input.getBoundingClientRect().bottom + window.scrollY}px`;
      datePicker.style.left = `${input.getBoundingClientRect().left}px`;
      datePicker.style.zIndex = "1000";
      datePicker.className = "date-picker-popup";

      // Set initial value to current value of the input
      datePicker.value = input.value || "";

      // When a date is selected, update the input and remove the date picker
      datePicker.addEventListener("change", () => {
        const selectedDate = new Date(datePicker.value);
        const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${selectedDate.getFullYear()}`;
        input.value = formattedDate;
        document.body.removeChild(datePicker);
      });

      // Close the date picker if clicked outside
      const closeDatePicker = (event) => {
        if (!datePicker.contains(event.target) && event.target !== input) {
          document.body.removeChild(datePicker);
          document.removeEventListener("click", closeDatePicker);
        }
      };

      document.addEventListener("click", closeDatePicker);
      document.body.appendChild(datePicker);
      datePicker.focus();
    }
  });
})();