const express = require("express");
const cors = require("cors");
const repositories = require("./routes/repositories");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/repositories", repositories);

module.exports = app;
