const express = require("express");
const router = express.Router();
const pool = require("../pool.js");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  const myPlaintextPassword = req.body.Password;
  const hash = bcrypt.hashSync(myPlaintextPassword, 5);

  pool.query(
    "INSERT INTO person (p_firstname,p_lastname,p_id,password) VALUES (?,?,?,?)",
    [req.body.FirstName, req.body.LastName, req.body.Email, hash],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "notok" });
      } else {
        console.log("Registered succesfully" + JSON.stringify(result));
        res.send({ message: "ok" });
      }
    }
  );
});

module.exports = router;
