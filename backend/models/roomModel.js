(() => {
    const mongoose = require('mongoose');
  
    const roomSchema = new mongoose.Schema(
      {
        title: {
          type: String,
          required: true
        },
        price: {
          type: Number, 
          // Storing as string (e.g., "$219/Night") so it matches your frontend data.
          // Alternatively, store as Number and handle currency in the frontend.
          required: true
        },
        description: {
          type: String,
          required: true
        },
        beds: {
          type: Number,
          required: true
        },
        guests: {
          type: Number,
          required: true
        },
        image1: {
          type: String,
          default: "" // If no image is provided
        },
        image2: {
          type: String,
          default: "" // If no image is provided
        }
      },
      {
        timestamps: true // adds createdAt, updatedAt fields automatically
      }
    );
  
    module.exports = mongoose.model('Room', roomSchema, 'rooms');
  })();
  