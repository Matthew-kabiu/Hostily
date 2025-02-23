const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

// Set Redis connection parameters
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";

// Create a Redis client with proper error handling
const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

(async () => {
  try {
    await client.connect();
    console.log("✅ Connected to Redis successfully");
  } catch (error) {
    console.error("❌ Redis connection error:", error);
  }
})();

// Handle Redis client errors
client.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

module.exports = client;
