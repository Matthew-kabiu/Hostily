const Team = require('../models/teamModel'); // Import the Team model
const redisClient = require('../config/cacheConfig'); // Import Redis client

const CACHE_KEY = 'team_members'; // Redis cache key for storing team members

/**
 * Get all team members with Redis caching
 */
async function getAllTeamMembers(req, res) {
  try {
    // ✅ First, check Redis cache
    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      console.log("✅ Serving team members from cache");
      return res.status(200).json({ success: true, data: JSON.parse(cachedData) });
    }

    // ✅ If no cache, fetch from MongoDB with a timeout
    const teamMembers = await Team.find({}).maxTimeMS(5000); // Timeout after 5 seconds

    // ✅ Store in Redis (Cache expiration: 10 minutes)
    await redisClient.setEx(CACHE_KEY, 600, JSON.stringify(teamMembers));
    console.log("🆕 Fetched from database and cached.");

    return res.status(200).json({ success: true, data: teamMembers });

  } catch (error) {
    console.error('❌ Error fetching team members:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}

/**
 * Create a new team member and update cache
 */
async function createTeamMember(req, res) {
  try {
    const { name, title, image } = req.body;

    // ✅ Validate required fields
    if (!name || !title) {
      return res.status(400).json({ success: false, message: 'Both name and title are required!' });
    }

    const newTeamMember = await Team.create({
      name,
      title,
      image: image || "" // Default empty string if no image is provided
    });

    // ✅ Clear cache after adding a new team member
    await redisClient.del(CACHE_KEY);
    console.log("🗑 Cache cleared after adding new team member.");

    return res.status(201).json({ success: true, data: newTeamMember });
  } catch (error) {
    console.error('❌ Error creating team member:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}

/**
 * Update a team member by ID
 */
async function updateTeamMember(req, res) {
  try {
    const { id } = req.params;
    const { name, title, image } = req.body;

    // ✅ Find and update the team member
    const updatedMember = await Team.findByIdAndUpdate(
      id,
      { name, title, image },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }

    // ✅ Clear cache after updating a team member
    await redisClient.del(CACHE_KEY);
    console.log("🗑 Cache cleared after updating team member.");

    return res.status(200).json({ success: true, data: updatedMember });
  } catch (error) {
    console.error('❌ Error updating team member:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}

/**
 * Delete a team member by ID
 */
async function deleteTeamMember(req, res) {
  try {
    const { id } = req.params;
    const deletedMember = await Team.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }

    // ✅ Clear cache after deleting a team member
    await redisClient.del(CACHE_KEY);
    console.log("🗑 Cache cleared after deleting team member.");

    return res.status(200).json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting team member:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}

// Export all functions
module.exports = {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
};
