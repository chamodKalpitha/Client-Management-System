import rateLimit from "express-rate-limit";
import MongoStore from "../config/ratelimitStore.config.mjs";
import "dotenv/config";

export default rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Too many accounts created from this IP, please try again after 15 minutes",
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (req, res, next, options) =>
    res.status(options.statusCode).json({
      status: "error",
      message: options.message,
    }),
  store: new MongoStore({
    uri: process.env.MONGO_URI, // Your MongoDB connection string
    prefix: "rl_", // Optional prefix for the keys
  }),
});
