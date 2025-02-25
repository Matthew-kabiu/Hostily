(() => {
    const express = require("express");
    const router = express.Router();
  
    // Import the controller
    const { getSingleRoom } = require("../controllers/singleRoomController");
  
    /**
     * GET /api/rooms/single
     * Example usage:
     *   /api/rooms/single?title=Grand-Suite
     *   /api/rooms/single?roomId=63e75f939832e92c...
     */
    router.get("/single", getSingleRoom);
  
    module.exports = router;
  })();
  