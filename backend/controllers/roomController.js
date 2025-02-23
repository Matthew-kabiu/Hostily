const Room = require('../models/roomModel'); // Import the Room model
const redisClient = require('../config/cacheConfig'); // Import Redis client

const CACHE_KEY = 'rooms'; // Redis cache key for storing rooms

/**
 * Get all rooms with Redis caching
 */
async function getAllRooms(req, res) {
  try {
    // ✅ Check Redis cache first
    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      console.log("✅ Serving rooms from cache");
      return res.status(200).json({ success: true, data: JSON.parse(cachedData) });
    }

    // ✅ If no cache, fetch from MongoDB with timeout
    const rooms = await Room.find({}).maxTimeMS(5000); // Timeout after 5 seconds

    // ✅ Store data in Redis (Cache expires in 10 minutes)
    await redisClient.setEx(CACHE_KEY, 600, JSON.stringify(rooms));
    console.log("🆕 Fetched from database and cached.");

    return res.status(200).json({ success: true, data: rooms });

  } catch (error) {
    console.error('❌ Error fetching rooms:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}

/**
 * Create a new room and update cache
 */
async function createRoom(req, res) {
  try {
    const { title, price, description, beds, guests, image1, image2 } = req.body;

    // ✅ Validate required fields
    if (!title || !price || !description || !beds || !guests) {
      return res.status(400).json({ success: false, message: 'All fields (title, price, description, beds, guests) are required!' });
    }

    const newRoom = await Room.create({
      title,
      price,
      description,
      beds,
      guests,
      image1: image1 || "",
      image2: image2 || ""
    });

    // ✅ Clear cache after adding a new room
    await redisClient.del(CACHE_KEY);
    console.log("🗑 Cache cleared after adding new room.");

    return res.status(201).json({ success: true, data: newRoom });
  } catch (error) {
    console.error('❌ Error creating room:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}

/**
 * Update a room by ID
 */
async function updateRoom(req, res) {
  try {
    const { id } = req.params;
    const { title, price, description, beds, guests, image1, image2 } = req.body;

    // ✅ Find and update the room
    const updatedRoom = await Room.findByIdAndUpdate(
      id, 
      { title, price, description, beds, guests, image1, image2 }, 
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // ✅ Clear cache after updating a room
    await redisClient.del(CACHE_KEY);
    console.log("🗑 Cache cleared after updating room.");

    return res.status(200).json({ success: true, data: updatedRoom });
  } catch (error) {
    console.error('❌ Error updating room:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}

/**
 * Delete a room by ID
 */
async function deleteRoom(req, res) {
  try {
    const { id } = req.params;
    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // ✅ Clear cache after deleting a room
    await redisClient.del(CACHE_KEY);
    console.log("🗑 Cache cleared after deleting room.");

    return res.status(200).json({ success: true, message: 'Room deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting room:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}

// Export all functions
module.exports = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom
};
