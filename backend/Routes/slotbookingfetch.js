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

router.get("/slot", (req, res) => {
  pool.query("SELECT * from slot", (err, result) => {
    if (err) {
      res.send({ message: "notok" });
    } else {
      res.send(result);
    }
  });
});
module.exports = router;
