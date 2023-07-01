const fs = require("fs");
const express = require("express");
const router = express.Router();

/**
 * 注意：
 *  1.流式上传，不要加这两行，完整文件上传需要这两行，只是用来解析formData
 *  2.需要单独给上传方法使用，不要全局使用，会影响其他流方式上传接口
 */
const formidable = require("express-formidable");

/**
 * 完整文件上传
 * 文件大小1000mb
 */
router.post(
  "/upload",
  formidable({ maxFileSize: 1024 * 1024 * 1000 }),
  (req, res) => {
    console.log(req.fields);
    const rs = fs.createReadStream(req.files.file.path);
    fs.mkdirSync("./files", { recursive: true });
    const ws = fs.createWriteStream(`./files/${req.fields.name}`);

    rs.pipe(ws);
    rs.on("end", () => {
      fs.unlinkSync(req.files.file.path);
      res.send("上传成功");
    });
  }
);

module.exports = router;
