(() => {
    const http = require('http');
    const app = require('./app');
    require('./config/dbConfig'); // Ensure DB connection is established
    const dotenv = require('dotenv');
  
    dotenv.config();
    const PORT = process.env.PORT || 3000;
  
    const server = http.createServer(app);
  
    server.listen(PORT, () => {
      console.log(`Hostily backend is running on http://localhost:${PORT}`);
    });
  })();
   