const express = require("express");
const router = express.Router();
const pool = require('../pool.js');

router.post('/',(req,res)=>{
    pool.query("INSERT INTO person (p_firstname,p_lastname,p_id,password) VALUES (?,?,?,?)", [req.body.FirstName,req.body.LastName,req.body.Email,req.body.Password],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Registered succesfully"+JSON.stringify(result));
            res.send({message: "Reagistered Successsully"}); 
        }
    
})});

module.exports = router;