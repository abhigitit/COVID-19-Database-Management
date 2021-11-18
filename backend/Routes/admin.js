const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../pool.js");
const uuid = require('uuid');
const logger  = require("../Utils/serverLogger");


router.post("/login", (req, res) => {
  logger.info(" at /admin/login route");
  const enteredPassword = req.body.Password;
  pool.query(
    "SELECT * from vaccinator where e_id = ?",
    [req.body.Email],
    (err, result) => {
      logger.info("Query output: "+ JSON.stringify(result));
      if (err || Object.keys(result).length === 0) {
        logger.error(err);
        res.send({ message: "notok" });
      } else {
        const hashedPassword = result[0].e_password;
        bcrypt.compare(
          enteredPassword,
          hashedPassword,
          function (err, isMatch) {
            if (err || !isMatch) {
              logger.error("invalid password");
              res.send({ message: "notok" });
            } else {
              logger.info("login succeed");
              res.send({ message: "ok" });
            }
          }
        );
      }
    }
  );
});
router.post("/register", (req, res) => {
  logger.info(" at /admin/register route");
  const myPlaintextPassword = req.body.Password;
  const hash = bcrypt.hashSync(myPlaintextPassword, 5);
  logger.info("Admin Password hashed : " + myPlaintextPassword);


  pool.query(
    "INSERT INTO vaccinator (e_id,e_name,e_password,vc_name) VALUES (?,?,?,?)",
    [req.body.Email, req.body.Name, hash, req.body.VCname],
    (err, result) => {
      if (err) {
        logger.error(err);
        res.send({ message: "notok" });
      } else {
        logger.info("Vaccinator Registered succesfully" + JSON.stringify(result));
        res.send({ message: "ok" });
      }
    }
  );
});

router.post("/manage", (req, res) => {
  logger.info(" at /admin/manageStock route");

  pool.query(
    "UPDATE contains SET stockAvailable = stockAvailable + ? WHERE v_name = ? and vc_name = ? ",
    [
      req.body.stockAvailable,
      req.body.vaccine,
      req.body.vaccinationCenter,
    ],
    (err, result) => {
      if (err) {
        logger.error(err);
        res.send({ message: "notok" });
      } else {
        logger.info("Vaccina Stock updated succesfully" + JSON.stringify(result));
        res.send({ message: "ok" });
      }
    }
  );
});

router.post("/decline", (req, res) => {
  logger.error("at admin/decline route")
  selectedSlotId = req.body.SlotId;
  logger.info("slot id : " + selectedSlotId);
  pool.query("UPDATE slot SET isDeclined = 1 Where slot_id = ?",
     [selectedSlotId],
     (err) => {
       if (err) {
         logger.error(err);
         res.send({ message: "notok" });
       } else {
         logger.info("isDeclined flag enabled");
         pool.query("select vc_name,v_name from slot where slot_id= ?",[req.body.SlotId],
         (err,result)=>{
           if(err){
            logger.error(err);
            res.send({ message: "notok" });
           }
           else{
            selectedVaccinationCenter = result[0]['vc_name'];
            selectedvaccine = result[0]['v_name'];
            pool.query("UPDATE contains SET stockAvailable = stockAvailable + 1 Where v_name = ? AND vc_name =?",
            [selectedvaccine,selectedVaccinationCenter],(err)=>{
              if(err){

                console.log(err);
                res.send({ message: "notok" });
              }
              else{

                console.log("Vaccine Quantity updated successfully" + JSON.stringify(result));
              }
            }
            )
           }
         })
         res.send({ message: "ok" });
       }
     })

    });

router.post("/authorize", (req, res) => {
  logger.info("at admin/authorize route");
  selectedSlotId = req.body.SlotId;
  logger.info("slot id : " + selectedSlotId);
  email = req.body.PId;
  pool.query("UPDATE slot SET isAuthorized = 1 Where slot_id = ?",
     [selectedSlotId],
     (err, result) => {
       if (err) {
         console.log(err);
         res.send({ message: "otok" });
       } else {
         logger.info("Authorized succesfully" + JSON.stringify(result));
         pool.query("select * from slot, vaccine where slot.v_name = vaccine.v_name and isAuthorized = 1 and p_id = ?",[email],
         (err,result)=>{
           if(err){
             console.log(err);
           }
           else{
            let date,time,vaccine,vaccinationCenter,email;
            var d = new Date();
            console.log(d);
            dt = new Date(d.setMonth(d.getMonth() + 1));
            console.log(dt);
            date = dt.toISOString().split('T')[0];
            time = result[0]['slot_time'];
            vaccine = result[0]['v_name'];
            vaccinationCenter = result[0]['vc_name'];
            email = result[0]['p_id'];
            vaccinator = result[0]['e_id'];
            if(result.length<result[0]['no_of_doses']){
              let id = uuid.v1();
              pool.query(
                "INSERT INTO slot (vc_name,v_name,slot_date,slot_time,slot_id,e_id,p_id) VALUES (?,?,?,?,?,?,?);",
                [
                  vaccinationCenter,
                  vaccine,
                  date,
                  time,
                  id,
                  vaccinator,
                  email
                ],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.send({ message: "notok" });
                  } else {
                    logger.info("second slot booked successfully: " + JSON.stringify(result));
                    res.send({message:"ok"});

                   }})
            }
            else{
              pool.query("UPDATE person SET is_vaccinated = 1 Where p_id = ?",[email],(err,result)=>{
              if(err){
                logger.error(err);
                res.send({message:"notok"});
              }
              else{
                logger.info("is completely vaccinated flag enabled in person table");
                res.send({message:"ok"});
              }
              });
            }
           }

         });
       }
     })
    });
module.exports = router;
