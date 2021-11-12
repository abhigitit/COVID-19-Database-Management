const express = require("express");
const router = express.Router();
const pool = require("../pool.js");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  const myPlaintextPassword = req.body.Password;
  const hash = bcrypt.hashSync(myPlaintextPassword, 5);

  pool.query(
    "INSERT INTO vaccinator (e_id,e_name,e_password,vc_name) VALUES (?,?,?,?)",
    [req.body.Email, req.body.Name, hash, req.body.VCname],
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
