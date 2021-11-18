const express = require("express");
const router = express.Router();
const pool = require("../pool.js");
const bcrypt = require("bcrypt");
const logger  = require("../Utils/serverLogger");

router.post("/", (req, res) => {
  logger.info("POST /register");
  logger.info("request: "+ JSON.stringify(req.body));
  const myPlaintextPassword = req.body.Password;
  const hash = bcrypt.hashSync(myPlaintextPassword, 5);
  if(hash){
    logger.info("Password hashed : "+ hash);
  }
  else{
    logger.error("Password not hashed")
  }
  pool.query(
    "INSERT INTO person (p_firstname,p_lastname,p_id,p_address,dob,password) VALUES (?,?,?,?,?,?)",
    [
      req.body.FirstName,
      req.body.LastName,
      req.body.Email,
      req.body.address,
      req.body.DOB,
      hash,
    ],
    (err, result) => {
      if (err) {
        logger.error(err);
        res.send({ message: "notok" });
      } else {
        if(req.body.HomePhone){
          pool.query(
            "INSERT INTO p_phones VALUES (?,?)",
            [
              req.body.Email,
              req.body.HomePhone,
            ],
            (err) => {
              if (err) {
                logger.error(err);
                res.send({ message: "notok" });
              } 
            }
          );
      
        }
        if(req.body.Mobile){
          pool.query(
            "INSERT INTO p_phones VALUES (?,?)",
            [
              req.body.Email,
              req.body.Mobile,
            ],
            (err) => {
              if (err) {
                logger.error(err);
                res.send({ message: "notok" });
              } 
            }
          );
      
        }
        if(req.body.ECName && req.body.ECPhone){
          pool.query(
            "INSERT INTO emergencycontact VALUES (?,?,?)",
            [
              req.body.Email,
              req.body.ECPhone,
              req.body.ECName
            ],
            (err) => {
              if (err) {
                logger.error(err);
                res.send({ message: "notok" });
              } 
            }
          );
      
        }      
        logger.info("Registered succesfully" + JSON.stringify(result));
        res.send({ message: "ok" });
      }
    }
  );

});

module.exports = router;
