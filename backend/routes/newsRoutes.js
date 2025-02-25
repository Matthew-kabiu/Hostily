(() => {
  const express = require('express');
  const router = express.Router();
  const newsController = require('../controllers/newsController'); // Import controller

  // GET /api/hotel-news
  router.get('/hotel-news', newsController.getHotelNews);

  module.exports = router;
})();
