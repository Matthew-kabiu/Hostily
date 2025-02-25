(() => {
  const dotenv = require("dotenv");
  dotenv.config(); // Loads .env variables (MONGODB_URI, HOSTILY_API_URL, etc.)

  const Room = require("../models/roomModel");
  const redisClient = require("../config/cacheConfig"); // Import Redis client

  const CACHE_EXPIRY = 600; // Cache expiration time (10 minutes)

  /**
   * getSingleRoom
   * Retrieves a single room by either:
   *   - title (e.g. GET /api/rooms/single?title=Grand-Suite)
   *   - _id (e.g. GET /api/rooms/single?roomId=63e75f939832e92c...)
   * 
   * If neither query param is provided, it sends a 400 error.
   */
  async function getSingleRoom(req, res) {
      try {
          // Extract query params from the request
          const { title, roomId } = req.query;

          // Basic validation
          if (!title && !roomId) {
              return res.status(400).json({
                  success: false,
                  message: "Please provide either 'title' or 'roomId' in the query.",
              });
          }

          const cacheKey = title ? `room_title:${title}` : `room_id:${roomId}`;

          // ✅ Check Redis cache first
          const cachedData = await redisClient.get(cacheKey);
          if (cachedData) {
              console.log("✅ Serving single room from cache");
              return res.status(200).json({ success: true, data: JSON.parse(cachedData) });
          }

          let room;
          if (title) {
              room = await Room.findOne({ title });
          } else if (roomId) {
              room = await Room.findById(roomId);
          }

          if (!room) {
              return res.status(404).json({
                  success: false,
                  message: "Room not found.",
              });
          }

          // ✅ Store response in Redis (expires in 10 minutes)
          await redisClient.setEx(cacheKey, CACHE_EXPIRY, JSON.stringify(room));
          console.log("🆕 Fetched from database and cached.");

          return res.status(200).json({ success: true, data: room });
      } catch (error) {
          console.error("❌ Error fetching single room:", error);
          return res.status(500).json({
              success: false,
              message: "An error occurred while fetching room data.",
          });
      }
  }

  // Export your controller function(s)
  module.exports = {
      getSingleRoom,
  };
})();
