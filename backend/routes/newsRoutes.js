(() => {
  const express = require('express');
  const router = express.Router();
  const axios = require('axios');

  // GET /api/hotel-news
  router.get('/hotel-news', async (req, res) => {
    try {
      const NEWS_API_URL = 'https://newsapi.org/v2/everything';
      const apiKey = process.env.NEWSAPI_KEY;

      if (!apiKey) {
        return res.status(500).json({ 
          success: false, 
          message: 'NEWSAPI_KEY is not set in .env' 
        });
      }

      const response = await axios.get(NEWS_API_URL, {
        params: {
          q: 'hotels',
          apiKey,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 10 // Fetch latest 10 articles
        }
      });

      // Validate API response
      if (!response.data || !response.data.articles) {
        throw new Error('Invalid API response structure');
      }

      return res.status(200).json({ 
        success: true, 
        data: response.data.articles
      });

    } catch (error) {
      console.error('[ERROR DEBUGGING] Error fetching hotel news:', error.response ? error.response.data : error.message);
      
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch hotel news',
        error: error.response ? error.response.data : error.message
      });
    }
  });

  module.exports = router;
})();
