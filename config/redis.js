const { createClient } = require("redis");

const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.connect();

module.exports = redisClient;
