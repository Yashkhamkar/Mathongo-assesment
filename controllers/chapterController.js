const Chapter = require("../models/chapterModel");
const redisClient = require("../config/redis");
const { parseJsonFile } = require("../utils/parseJsonFile");

const getAllChapters = async (req, res) => {
  try {
    const {
      class: classFilter,
      unit,
      status,
      subject,
      weakChapters,
      page = 1,
      limit = 10,
    } = req.query;

    const cacheKey = `chapters:${JSON.stringify(req.query)}`;
    const cachedChapters = await redisClient.get(cacheKey);
    
    if (cachedChapters) {
      console.log("Returning cached chapters");
      return res.status(200).json(JSON.parse(cachedChapters));
    }

    const query = {};
    if (classFilter) query.class = classFilter;
    if (unit) query.unit = unit;
    if (status) query.status = status;
    if (subject) query.subject = subject;
    if (weakChapters !== undefined)
      query.isWeakChapter = weakChapters === "true";

    const totalChapters = await Chapter.countDocuments(query);
    const chapters = await Chapter.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const response = {
      totalChapters,
      totalPages: Math.ceil(totalChapters / limit),
      currentPage: Number(page),
      chapters,
    };
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(response));
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching chapters:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    console.error("Error fetching chapter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const uploadChapter = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileContent = req.files.file.data.toString("utf-8");
    let chapterJson;
    try {
      chapterJson = parseJsonFile(fileContent);
    } catch (error) {
      return res.status(400).json({ error: "Invalid JSON format" });
    }

    const sucessfull = [];
    const failed = [];

    for (const chapterData of chapterJson) {
      const {
        subject,
        chapter,
        class: className,
        unit,
        yearWiseQuestionCount,
        questionSolved,
        status,
        isWeakChapter,
      } = chapterData;

      if (
        !subject ||
        !chapter ||
        !className ||
        !unit ||
        !yearWiseQuestionCount ||
        typeof questionSolved !== "number" ||
        !status ||
        typeof isWeakChapter !== "boolean" ||
        typeof yearWiseQuestionCount !== "object" ||
        !["Not Started", "In Progress", "Completed"].includes(status)
      ) {
        failed.push({ chapter: chapterData, error: "Missing required fields" });
        continue;
      }

      try {
        const created = await Chapter.create(chapterData);
        sucessfull.push(created);
      } catch (error) {
        failed.push({ chapter: chapterData, error: error.message });
      }
    }
    await redisClient.flushAll();
    res.status(200).json({
      message: "Chapters uploaded successfully",
      sucessfull,
      failed,
    });
  } catch (error) {
    console.error("Error uploading chapter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllChapters,
  getChapterById,
  uploadChapter,
};
