const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../pool.js");
const logger  = require("../Utils/serverLogger");

router.post("/", (req, res) => {
  const enteredPassword = req.body.Password;
  logger.info(JSON.stringify(req.body));
  pool.query(
    "SELECT * from person where p_id = ?",
    [req.body.Email],
    (err, result) => {
      if (err || Object.keys(result).length === 0) {
        res.send({ message: "notok" });
        logger.error("incorrect password");
      } 
      else if(result[0]['is_vaccinated']===1) {
          res.send({message:"fullyVaccinated"}); 
          logger.info("User:"+req.body.Email + " is fully vaccinated");   
      }
      else {
        const hashedPassword = result[0].password;
        bcrypt.compare(
          enteredPassword,
          hashedPassword,
          function (err, isMatch) {
            if (err || !isMatch) {
              res.send({ message: "notok" });
              logger.info("Incorrect password");
            } else {
              logger.info("login succeeded");
              let date = new Date().toISOString().split('T')[0];
              pool.query("select * from slot where p_id=? and  isAuthorized = 0 and isDeclined=0 and slot_date > ? order by slot_date ",
              [req.body.Email,date],(err,result)=>{
               if (err) {
                    logger.error(err);
                    res.send({ message: "notok" });
                 } 
              else if(result.length>0){
              logger.info("Users active slots: " + JSON.stringify(result));
              logger.info("user already has slot");
              let slotid,date,time;
              slotid = result[0]['slot_id'];
              date = new Date(result[0]['slot_date']).toISOString().split('T')[0];
              time = result[0]['slot_time'];                       
              res.send({ message: "hasslot", slot_id:slotid,sdate:date,stime:time });
               }
              else{
                 res.send({ message: "ok" });
                 logger.info("User can book a slot and redirected to slot booking page");
                 }
               });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
