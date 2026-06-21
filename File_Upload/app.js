const express = require("express");
const app = express();
const router = require("./router/router.js");
const port = 3000;

app.use("/", router);
app.listen(port, console.log("server is running....."));
