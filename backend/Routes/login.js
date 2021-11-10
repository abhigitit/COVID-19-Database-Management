const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../pool.js");

router.post("/", (req, res) => {
  const enteredPassword = req.body.Password;
  pool.query("SELECT * from person where p_id = ?",[req.body.Email],(err,result)=>{
    if (err || Object.keys(result).length === 0) {
      res.status(401).send("authentication failed");
    }
    else{
    const hashedPassword = result[0].password;
    bcrypt.compare(enteredPassword, hashedPassword, function(err, isMatch) {
      if (err ||!isMatch) {
        res.status(401).send('authentication failed');
      } 
      else {
        res.status(200).send('Login Successful');
      }
    })}
  });

  
});

module.exports = router;
