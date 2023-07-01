const express = require("express");
const app = express();
const cors = require("cors");

const fileRouter = require("./file-upload");
const fileStreamRouter = require("./file-stream-upload");

app.use(cors());

app.use("/api/file", fileRouter);
app.use("/api/file/stream", fileStreamRouter);

app.listen(3000);
