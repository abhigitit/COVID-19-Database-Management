const express = require("express");
const con = require("../pool.js");
const router = express.Router();
const pool = require("../pool.js");


router.get("/", (req, res) => {
    pool.query(
      "Select v_name, CONCAT(CONVERT((count(*) * 100.0 / (select count(*) from Slot where isAuthorized = '1')), NCHAR) , '%') as Percentage_Of_Shots from Slot where isAuthorized = '1' group by v_name;",
    
      (err, result) => {
        if (err) {
          res.send({ message: "notok" });
        } else {
          res.send(result);
          console.log(result[0]['v_name']);
        }
      }
    );
  });
  module.exports = router;

