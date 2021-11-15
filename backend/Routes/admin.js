const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../pool.js");

router.post("/login", (req, res) => {
  const enteredPassword = req.body.Password;
  pool.query(
    "SELECT * from vaccinator where e_id = ?",
    [req.body.Email],
    (err, result) => {
      if (err || Object.keys(result).length === 0) {
        res.send({ message: "notok" });
      } else {
        const hashedPassword = result[0].e_password;
        bcrypt.compare(
          enteredPassword,
          hashedPassword,
          function (err, isMatch) {
            if (err || !isMatch) {
              res.send({ message: "notok" });
              // res.status(401).send("authentication failed");
              console.log("login failed");
            } else {
              console.log("login succeed");
              res.send({ message: "ok" });
              // res.status(200).send('Login Successful');
            }
          }
        );
      }
    }
  );
});
router.post("/register", (req, res) => {
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

router.post("/manage", (req, res) => {
  pool.query(
    "UPDATE contains SET stockAvailable = stockAvailable + ? WHERE v_name = ? and vc_name = ? ",
    [
      req.body.stockAvailable,
      req.body.vaccine,
      req.body.vaccinationCenter,
    ],
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

router.get("/decline", (req, res) => {
  let selectedvaccine, selectedVaccinationCenter;
  pool.query("select vc_name,v_name from slot where slot_id= ?",[req.body.SlotId],
     (err, result) => {
       if (err) {
         console.log(err);
         res.send({ message: "notok" });
       } else {
        selectedVaccinationCenter = result[0]['vc_name'];
        selectedvaccine = result[0]['v_name'];
        pool.query("UPDATE contains SET stockAvailable = stockAvailable + 1 Where v_name = ? AND vvc_name =?",
        [selectedvaccine,selectedVaccinationCenter],
        (err, result)=>{
          if (err) {
            console.log(err);
            res.send({ message: "notok" });
          } else {
            console.log("Vaccine Quantity updated successfully" + JSON.stringify(result));
            res.send({ message: "ok" });
          }
        });
       }
     })
    });


router.post("/authorize", (req, res) => {
  selectedSlotId = req.body.SlotId;
  pool.query("UPDATE slot SET isAuthorized = 1 Where slot_id = ?",
     [selectedSlotId],
     (err, result) => {
       if (err) {
         console.log(err);
         res.send({ message: "notok" });
       } else {
         console.log("Registered succesfully" + JSON.stringify(result));
         res.send({ message: "ok" });
       }
     })
    });
module.exports = router;
