const express = require("express");
const con = require("../pool.js");
const router = express.Router();
const pool = require("../pool.js");

router.get("/vaccine", (req, res) => {
  pool.query(
    "SELECT v_name from vaccine",
    [req.body.vc_name],
    (err, result) => {
      if (err) {
        res.send({ message: "notok" });
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/vaccine", (req, res) => {
  pool.query(
    "SELECT v_name from contains where vc_name = ? and stockAvailable > 0",
    [req.body.vc_name],
    (err, result) => {
      if (err) {
        res.send({ message: "notok" });
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/vaccinationcenter", (req, res) => {
  pool.query("SELECT vc_name from VaccinationCenter", (err, result) => {
    if (err) {
      res.send({ message: "notok" });
    } else {
      res.send(result);
    }
  });
});

router.post("/slotbook", (req, res) => {
  let id = Math.floor(Math.random() * 10000);
  pool.query(
    "INSERT INTO slot (vc_name,v_name,slot_date,slot_time,slot_id,e_id,p_id) VALUES (?,?,?,?,?,'VC101@gmail.com','abhiteja.mandava98@gmail.com');",
    [req.body.VC_name, req.body.V_name, req.body.FDate, req.body.Ftime, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "notok" });
      } else {
        res.send({ id: id });
      }
    }
  );
});

router.get("/slot", (req, res) => {
  pool.query("SELECT * from slot", (err, result) => {
    if (err) {
      res.send({ message: "notok" });
    } else {
      res.send(result);
    }
  });
});

router.post("/getSlotsById", (req, res) => {
  pool.query(
    "SELECT * from slot where p_id = ? and isAuhtorized = NULL",
    (err, result) => {
      if (err) {
        res.send({ message: "notok" });
      } else {
        res.send(result);
      }
    }
  );
});
module.exports = router;
