const axios = require('axios');
const redisClient = require('../config/cacheConfig'); // Import Redis client

const CACHE_KEY = 'hotel_news'; // Redis key for storing cached news
const CACHE_EXPIRY = 600; // Cache expiration time in seconds (10 minutes)

/**
 * Fetch hotel news from NewsAPI with caching
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getHotelNews(req, res) {
  try {
    // ✅ Check Redis cache first
    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      console.log("✅ Serving hotel news from cache");
      return res.status(200).json({ success: true, data: JSON.parse(cachedData) });
    }

    // ✅ Fetch fresh data if not found in cache
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

    // ✅ Store response in Redis (expires in 10 minutes)
    await redisClient.setEx(CACHE_KEY, CACHE_EXPIRY, JSON.stringify(response.data.articles));
    console.log("🆕 Fetched from API and cached.");

    return res.status(200).json({ success: true, data: response.data.articles });

  } catch (error) {
    console.error('❌ Error fetching hotel news:', error.response ? error.response.data : error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch hotel news',
      error: error.response ? error.response.data : error.message
    });
  }
}

// Export controller function
module.exports = { getHotelNews };
