(() => {
    const express = require('express');
    const router = express.Router();
    const teamController = require('../controllers/teamController'); // Ensure correct path

    // ✅ GET /api/team - Fetch all team members
    router.get('/', teamController.getAllTeamMembers);

    // ✅ POST /api/team - Create a new team member
    router.post('/', teamController.createTeamMember);

    // ✅ PATCH /api/team/:id - Update a team member
    router.patch('/:id', teamController.updateTeamMember);

    // ✅ DELETE /api/team/:id - Delete a team member
    router.delete('/:id', teamController.deleteTeamMember);

    module.exports = router;
})();
