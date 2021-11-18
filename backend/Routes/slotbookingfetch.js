const express = require("express");
const con = require("../pool.js");
const router = express.Router();
const pool = require("../pool.js");
const uuid = require("uuid");

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

router.get("/sponsor", (req, res) => {
  pool.query("SELECT s_name from sponsor", (err, result) => {
    if (err) {
      res.send({ message: "notok" });
    } else {
      res.send(result);
    }
  });
});

router.post("/slotUpdate", (req, res) => {
  console.log(req.body.Slotid);
  pool.query(
    "Update slot Set vc_name = ?,v_name = ?, slot_date=?, slot_time = ? where slot_id = ? ",
    [
      req.body.VC_name,
      req.body.V_name,
      req.body.FDate,
      req.body.Ftime,
      req.body.Slotid,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "notok" });
      } else {
        res.send({ id: req.body.Slotid });
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
  let vaccinator;
  let id = uuid.v1();
  pool.query(
    "Select e_id from Vaccinator where vc_name = ?;",
    [req.body.VC_name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result[0]["e_id"]);
        pool.query(
          "INSERT INTO slot (vc_name,v_name,slot_date,slot_time,slot_id,e_id,p_id) VALUES (?,?,?,?,?,?,?);",
          [
            req.body.VC_name,
            req.body.V_name,
            req.body.FDate,
            req.body.Ftime,
            id,
            result[0]["e_id"],
            req.body.Email,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ message: "notok" });
            } else {
              pool.query(
                "UPDATE person set sponsor_name = ?",
                [req.body.sponsorName],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.send({ message: "notok" });
                  } else {
                    res.send({ id: id });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.post("/updateStockOnBooking", (req, res) => {
  pool.query(
    "UPDATE contains SET stockAvailable = stockAvailable -1 WHERE v_name = ? and vc_name = ? ",
    [req.body.V_name, req.body.VC_name],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "stock not uodated after slot booking" });
      } else {
        res.send({ message: "stock updated after slot booking" });
      }
    }
  );
});

router.get("/slot", (req, res) => {
  pool.query(
    "SELECT * from slot where isDeclined=0 and isAuthorized = 0",
    (err, result) => {
      if (err) {
        res.send({ message: "notok" });
      } else {
        res.send(result);
      }
    }
  );
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
