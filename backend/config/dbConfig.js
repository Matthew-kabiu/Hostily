(() => {
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');

    // Load .env if present
    dotenv.config();

    // Connection string from environment variable or fallback
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27018/hostilydb';

    // Connect to MongoDB (Removed deprecated options)
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('✅ Successfully connected to MongoDB'))
        .catch(err => console.error('❌ MongoDB connection error:', err));

    // Handle connection events (optional but recommended)
    mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB connection lost. Retrying...');
    });

    // Gracefully handle application shutdown
    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed due to app termination');
        process.exit(0);
    });

    // Export the connection (optional, if needed in other files)
    module.exports = mongoose.connection;
})();
