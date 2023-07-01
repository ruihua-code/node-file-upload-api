const express = require("express");
const router = express.Router();
const fs = require("fs");

/**
 * 大文件，分片流式上传
 */
router.post("/upload", (req, res) => {
  const { flag, fileName } = req.query;
  if (flag === "start") {
    data = [];
    index = 0;
  }
  const filePath = `./files/${fileName}`;
  fs.mkdirSync("./files", { recursive: true });
  // 以追加的方式写文件流
  const writeStream = fs.createWriteStream(filePath, { flags: "a" });

  req.on("data", (chunk) => {
    writeStream.write(chunk);
  });
  req.on("end", () => {
    writeStream.end();
    res.send("上传成功");
  });

  writeStream.on("error", (err) => {
    console.error(err);
    res.sendStatus(500);
  });
});

module.exports = router;
