(() => {
    const mongoose = require('mongoose');
  
    const teamSchema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        image: {
          type: String,
          default: "" // Default empty string if no image is provided
        }
      },
      {
        timestamps: true // Automatically adds createdAt, updatedAt fields
      }
    );
  
    module.exports = mongoose.model('Team', teamSchema, 'team');
  })();
  