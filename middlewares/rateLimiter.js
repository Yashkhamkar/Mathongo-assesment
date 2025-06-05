const redisClient = require("../config/redis");

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_WINDOW_REQUEST_COUNT = 30;

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;

    const requests = await redisClient.get(ip);

    if (requests === null) {
      await redisClient.set(ip, 1, { EX: WINDOW_SIZE_IN_SECONDS });
      next();
    } else if (parseInt(requests) < MAX_WINDOW_REQUEST_COUNT) {
      await redisClient.incr(ip);
      next();
    } else {
      res.status(429).json({
        message: `Rate limit exceeded. Max ${MAX_WINDOW_REQUEST_COUNT} requests per minute.`,
      });
    }
  } catch (error) {
    console.error("Rate limiter error:", error);
    next();
  }
};

module.exports = rateLimiter;
