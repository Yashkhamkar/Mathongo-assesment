// models/Chapter.js
const mongoose = require("mongoose");

const chapterModel = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    chapter: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    yearWiseQuestionCount: {
      type: Map,
      of: Number,
      required: true,
    },
    questionSolved: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      required: true,
    },
    isWeakChapter: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chapter = mongoose.model("Chapter", chapterModel);

module.exports = Chapter;
