const express = require("express");

const { adminAuthMiddleware } = require("../middlewares/authMiddleware");
const rateLimiter = require("../middlewares/rateLimiter");
const {
  getAllChapters,
  getChapterById,
  uploadChapter,
} = require("../controllers/chapterController");

const router = express.Router();

// Public routes
router.get("/", rateLimiter, getAllChapters);
router.get("/:id", rateLimiter, getChapterById);

// Admin-only route
router.post("/", rateLimiter, adminAuthMiddleware, uploadChapter);

module.exports = router;
