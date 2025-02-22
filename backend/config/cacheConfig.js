const redis = require("redis"); // Import the Redis library
const dotenv = require("dotenv"); // Import the dotenv library to load environment variables

dotenv.config(); // Load environment variables from .env file

// Set Redis connection parameters from environment variables or use default values
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";

// Create a Redis client with the specified host and port
const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

// Event listener for successful connection to Redis
client.on("connect", () => {
  console.log("✅ Connected to Redis");
});

// Event listener for Redis errors
client.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

// Export the Redis client for use in other parts of the application
module.exports = client;