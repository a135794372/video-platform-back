 
// backend/server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// 設定影片儲存位置
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 生成唯一檔名
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "請上傳影片" });
  }
  res.json({ message: "上傳成功", filename: req.file.filename });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
