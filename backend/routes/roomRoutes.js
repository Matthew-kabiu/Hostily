(() => {
    const express = require('express');
    const router = express.Router();
    const Room = require('../models/roomModel'); // or require a service if you have one
  
    // GET /api/rooms
    router.get('/', async (req, res) => {
      try {
        const rooms = await Room.find({});
        return res.status(200).json({ success: true, data: rooms });
      } catch (error) {
        console.error('Error fetching rooms:', error);
        return res.status(500).json({ success: false, message: 'Server Error' });
      }
    });
  
    // You can define other routes (POST, PATCH, DELETE) here if needed
  
    module.exports = router;
  })();
  