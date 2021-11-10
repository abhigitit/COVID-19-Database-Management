const express = require("express");
const dotenv = require("dotenv");
const request = require("request");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const register = require('./Routes/register');
const login = require('./Routes/login');
var cors = require('cors')

const app = express();
app.use(cors())

app.use(bodyParser.json());

app.use('/register',register);
app.use('/login',login);


const PORT =  5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
module.exports = app;
