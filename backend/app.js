(() => {
  const express = require('express');
  const helmet = require('helmet');
  const cors = require('cors');
  const dotenv = require('dotenv');

  dotenv.config();
  const app = express();

  app.use(helmet());
  app.use(cors({
    origin: '*', // Allows all origins (You can replace this with frontend URL for security)
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
  app.use(express.json());

  // Importing routes.
  const roomRoutes = require('./routes/roomRoutes');
  const teamRoutes = require('./routes/teamRoutes');
  app.use('/api/rooms', roomRoutes);
  app.use('/api/team', teamRoutes);

  // Base route
  app.get('/', (req, res) => {
    res.send('Welcome to Hostily Backend!');
  });

  module.exports = app;
})();
