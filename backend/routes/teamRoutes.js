(() => {
    const express = require('express');
    const router = express.Router();
    const Team = require('../models/teamModel'); // Ensure correct path
  
    // GET /api/team - Fetch all team members
    router.get('/', async (req, res) => {
      try {
        const teamMembers = await Team.find({});
        return res.status(200).json({ success: true, data: teamMembers });
      } catch (error) {
        console.error('Error fetching team members:', error);
        return res.status(500).json({ success: false, message: 'Server Error' });
      }
    });
  
    module.exports = router;
  })();
  