const express = require("express");
const dotenv = require("dotenv");
const request = require("request");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const register = require("./Routes/register");
const login = require("./Routes/login");
const admin = require("./Routes/admin");
const slotbookingfetch = require("./Routes/slotbookingfetch");
const stats = require('./Routes/stats');
var cors = require("cors");
const winston = require('winston');
const logger = require("./Utils/serverLogger");


const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use("/register", register);
app.use("/login", login);
app.use("/admin", admin);
app.use("/slotbookingfetch", slotbookingfetch);
app.use("/stats", stats);

const PORT = 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
logger.info(`Server started on port ${PORT}`);
module.exports = app;
