(() => {
    const mongoose = require('mongoose');
  
    const newsSchema = new mongoose.Schema(
      {
        source: {
          id: { type: String, default: null },
          name: { type: String, required: true },
        },
        author: { type: String, default: null },
        title: { type: String, required: true },
        description: { type: String, required: true },
        url: { type: String, required: true },
        urlToImage: { type: String, default: "" },
        publishedAt: { type: Date, required: true },
        content: { type: String, default: "" },
      },
      { timestamps: true }
    );
  
    module.exports = mongoose.model('News', newsSchema, 'news');
  })();
  