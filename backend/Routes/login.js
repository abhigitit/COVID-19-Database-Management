const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");

const pool = require("../pool.js");

const bodyParser = require("body-parser");

router.post("/login", (req, res) => {
  console.log("from frontend" + req.body);
  pool.query(
    "SELECT * from person where p_id = ?",
    [req.body.email_id],
    (err, result) => {
      if (err) {
        res.send("Error");
      }
      console.log("result" + result.length);

      if (result && result.length > 0) {
        bcrypt.compare(
          req.body.password,
          result[0].password,
          (err, response) => {
            console.log("response" + response);
            if (response) {
              console.log("Got response");

              let userObject = { email_id: result[0].p_id };

              res.writeHead(200, {
                "Content-Type": "text/plain",
              });

              res.end(JSON.stringify(userObject));
            } else {
              res.writeHead(401, {
                "Content-Type": "text/plain",
              });

              res.end("INCORRECT_PASSWORD");
              console.log("incorrect password");
            }
          }
        );
      } else if (result.length == 0) {
        res.send("email not found"); //this is what you are missing
      } else {
        res.writeHead(401, {
          "Content-Type": "text/plain",
        });

        res.end("NO_USER");
      }
    }
  );
});

module.exports = router;
