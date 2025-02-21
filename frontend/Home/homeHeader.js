document.addEventListener("DOMContentLoaded", function () {
    const homeHeaderSection = document.getElementById("homeHeader");
  
    if (homeHeaderSection) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadHomeHeaderContent();
              observer.unobserve(entry.target);
              initializeFlatpickr();
              applyFlatpickrStyles();
            }
          });
        },
        { rootMargin: "0px", threshold: 0.1 }
      );
  
      observer.observe(homeHeaderSection);
    }
  });
  
  function loadHomeHeaderContent() {
    const homeHeaderSection = document.getElementById("homeHeader");
    homeHeaderSection.innerHTML = `
      <nav>
        <div class="logo">
          <h6 class="logo-title">Logo</h6>
        </div>
        <ul class="nav-items">
          <li class="nav-item">
            <a href="../Home/home.html" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a href="../About/about.html" class="nav-link">About</a>
          </li>
          <li class="nav-item">
            <a href="../Rooms/rooms.html" class="nav-link">Rooms</a>
          </li>
          <li class="nav-item">
            <a href="../Blog/blog.html" class="nav-link">Blog</a>
          </li>
          <li class="nav-item">
            <a href="../Contact/contact.html" class="nav-link">Contact</a>
          </li>
        </ul>
        <div class="logo logo-btn">
          <h6 class="logo-title">Book Now &rightarrow;</h6>
        </div>
      </nav>
      <div class="home-content">
        <p class="home-header-title">The Best Hotel Deals In the World</p>
        <div class="check-now">
          <div class="check-card">
            <div class="check-card-text">
              <p class="check-card-p">Check In</p>
              <input
                type="text"
                class="check-card-input"
                id="check-in"
                placeholder="dd/mm/yy"
                readonly
              />
            </div>
            <i class="fa-regular fa-calendar" id="calendar-icon"></i>
          </div>
          <div class="check-card">
            <div class="check-card-text">
              <p class="check-card-p">Check Out</p>
              <input
                type="text"
                class="check-card-input"
                id="check-out"
                placeholder="dd/mm/yy"
                readonly
              />
            </div>
            <i class="fa-regular fa-calendar" id="calendar-icon"></i>
          </div>
          <div class="check-card check-room">
            <div class="check-card-text">
              <p class="check-card-p">Room</p>
              <select class="room-options" style="color: var(--white);">
                ${generateRoomOptions()}
              </select>
            </div>
          </div>
          <button class="check-card" id="checkNowBtn">
          CHECK NOW
          </button>
        </div>
      </div>
    `;
  }
  
  function generateRoomOptions() {
    const roomTypes = [
      "Single Room",
      "Double Room",
      "Suite",
      "Family Room",
      "Deluxe Room",
      "Executive Suite",
      "Presidential Suite",
      "Penthouse",
      "Villa",
    ];
  
    return roomTypes
      .map((room) => `<option value="${room}">${room}</option>`)
      .join("");
  }
  
  function initializeFlatpickr() {
    const checkInInput = document.getElementById("check-in");
    const checkOutInput = document.getElementById("check-out");
    const calendarIcons = document.querySelectorAll("#calendar-icon");
  
    if (checkInInput && checkOutInput && calendarIcons.length > 0) {
      const flatpickrInstanceIn = flatpickr(checkInInput, {
        enableTime: false,
        dateFormat: "d/m/Y",
        allowInput: true,
        clickOpens: false,
        minDate: "today",
      });
  
      const flatpickrInstanceOut = flatpickr(checkOutInput, {
        enableTime: false,
        dateFormat: "d/m/Y",
        allowInput: true,
        clickOpens: false,
        minDate: "today",
      });
  
      const openCalendarIn = () => flatpickrInstanceIn.open();
      const openCalendarOut = () => flatpickrInstanceOut.open();
  
      checkInInput.addEventListener("click", openCalendarIn);
      checkOutInput.addEventListener("click", openCalendarOut);
  
      calendarIcons.forEach((icon) => {
        icon.addEventListener("click", (event) => {
          if (event.target.previousElementSibling.id === "check-in") {
            openCalendarIn();
          } else if (event.target.previousElementSibling.id === "check-out") {
            openCalendarOut();
          }
        });
      });
  
      document.addEventListener("click", function (event) {
        if (
          !checkInInput.contains(event.target) &&
          !checkOutInput.contains(event.target) &&
          !document.querySelector(".flatpickr-calendar").contains(event.target)
        ) {
          flatpickrInstanceIn.close();
          flatpickrInstanceOut.close();
        }
      });
    }
  }