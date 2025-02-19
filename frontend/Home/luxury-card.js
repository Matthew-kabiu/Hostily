document.addEventListener("DOMContentLoaded", () => {
    const luxuryRoomsContainer = document.querySelector(".luxury-rooms-container");

    // Lazy load function
    const loadLuxuryRooms = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Luxury Rooms HTML Template with 3 Cards
                const luxuryRoomsHTML = `
                    <div class="luxury-rooms-row">
                        <!-- Luxury Card 1 -->
                        <div class="luxury-rooms-card card-top-left">
                            <div class="luxury-rooms-card-text">
                                <h6 class="luxury-card-price">
                                    <span class="luxury-price">$134</span> / Night
                                </h6>
                                <p class="luxury-room">Small Suite</p>
                            </div>
                        </div>
                        <!-- Luxury Card 2 -->
                        <div class="luxury-rooms-card card-top-middle">
                            <div class="luxury-rooms-card-text">
                                <h6 class="luxury-card-price">
                                    <span class="luxury-price">$180</span> / Night
                                </h6>
                                <p class="luxury-room">Deluxe Suite</p>
                            </div>
                        </div>
                        <!-- Luxury Card 3 -->
                        <div class="luxury-rooms-card card-top-right">
                            <div class="luxury-rooms-card-text">
                                <h6 class="luxury-card-price">
                                    <span class="luxury-price">$250</span> / Night
                                </h6>
                                <p class="luxury-room">Presidential Suite</p>
                            </div>
                        </div>
                    </div>
                `;

                // Inject HTML into container
                luxuryRoomsContainer.innerHTML = luxuryRoomsHTML;

                // Stop observing once content is loaded
                observer.disconnect();
            }
        });
    };

    // Set up IntersectionObserver
    if (luxuryRoomsContainer) {
        const observer = new IntersectionObserver(loadLuxuryRooms, {
            root: null, // Observe relative to the viewport
            threshold: 0.2, // Load when 20% of the element is visible
        });

        observer.observe(luxuryRoomsContainer);
    }
});
