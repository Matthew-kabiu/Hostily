(() => {
  const express = require('express');
  const router = express.Router();
  const roomController = require('../controllers/roomController'); // Ensure correct path

  // GET /api/rooms - Fetch all rooms
  router.get('/', roomController.getAllRooms);

  // POST /api/rooms - Create a new room
  router.post('/', roomController.createRoom); // This should match the export in roomController.js

  module.exports = router;
})();
