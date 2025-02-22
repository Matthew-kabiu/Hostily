const Room = require('../models/roomModel'); // Import the Room model

/**
 * Get all rooms
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with all rooms
 */
async function getAllRooms(req, res) {
  try {
    const rooms = await Room.find({}); // Fetch all rooms from the database
    return res.status(200).json({ success: true, data: rooms }); // Return success response with rooms data
  } catch (error) {
    console.error('Error fetching rooms:', error); // Log error to the console
    return res.status(500).json({ success: false, message: 'Server Error' }); // Return server error response
  }
}

/**
 * Create a new room
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response with the created room
 */
async function createRoom(req, res) {
  try {
    const newRoom = await Room.create(req.body); // Create a new room with the request body data
    return res.status(201).json({ success: true, data: newRoom }); // Return success response with the new room data
  } catch (error) {
    console.error('Error creating room:', error); // Log error to the console
    return res.status(500).json({ success: false, message: 'Server Error' }); // Return server error response
  }
}

// Export the controller functions
module.exports = {
  getAllRooms,
  createRoom
};