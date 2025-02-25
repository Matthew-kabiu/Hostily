(() => {
  const express = require('express');
  const helmet = require('helmet');
  const cors = require('cors');
  const dotenv = require('dotenv');
  const newsRoutes = require('./routes/newsRoutes'); // <-- Import route

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
  const singleRoomRoute = require("./routes/singleRoomRoute");

  // Assigning Api Routes
  app.use('/api/rooms', roomRoutes);
  app.use('/api/team', teamRoutes);
  app.use('/api', newsRoutes);
  app.use("/api/rooms", singleRoomRoute);

  // Base route
  app.get('/', (req, res) => {
    res.send('Welcome to Hostily Backend!');
  });

  module.exports = app;
})();
