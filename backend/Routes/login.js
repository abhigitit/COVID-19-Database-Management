const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../pool.js");

router.post("/", (req, res) => {
  const enteredPassword = req.body.Password;
  console.log(req.body);
  pool.query(
    "SELECT * from person where p_id = ?",
    [req.body.Email],
    (err, result) => {
      if (err || Object.keys(result).length === 0) {
        res.send({ message: "notok" });
      } 
      else if(result[0]['is_vaccinated']===1) {
          res.send({message:"fullyVaccinated"});        
      }
      else {
        //console.log(result[0]['is_vaccinated'])
        const hashedPassword = result[0].password;
        bcrypt.compare(
          enteredPassword,
          hashedPassword,
          function (err, isMatch) {
            if (err || !isMatch) {
              res.send({ message: "notok" });
              console.log("Incorrect password");
            } else {
              console.log("login succeeded");
              let date = new Date().toISOString().split('T')[0];
              pool.query("select * from slot where p_id=? and  isAuthorized = 0 and isDeclined=0 and slot_date > ? order by slot_date ",
              [req.body.Email,date],(err,result)=>{
               if (err) {
                    console.log(err);
                    res.send({ message: "notok" });
                 } 
              else if(result.length>0){
              console.log(result);
              let slotid,date,time;
              slotid = result[0]['slot_id'];
              date = new Date(result[0]['slot_date']).toISOString().split('T')[0];
              time = result[0]['slot_time'];                       
              res.send({ message: "hasslot", slot_id:slotid,sdate:date,stime:time });
               }
                 else{
                 res.send({ message: "ok" });
                 }
               });
                            //res.send({ message: "ok" });

            }
          }
        );
      }
    }
  );
});

module.exports = router;
