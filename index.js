const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const redisClient = require("./config/redis");
const chapterRoutes = require("./routes/chapterRoutes");

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/api/v1/chapters", chapterRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
