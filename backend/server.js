const express = require("express");
const notes = require("./data/Notes");
const dotenv = require("dotenv");
const request = require("request");
const bodyParser = require("body-parser")



const app = express();
app.use(bodyParser.json());

dotenv.config();

app.get("/request", (req, res) => {
request(
  "https://api.agify.io?name=Monica",
  function(error,response,body){
    if(!error && response.statusCode==200){
      console.log(body)
      res.send(body)
    }
  }
    );
  });

  app.post("/hello", (req,res) => {
    console.log("data"+JSON.stringify(req.body));
    
  });


app.get("/", (req, res) => {
res.send("API is running..");
  console.log("API is running..");
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// app.get("/api/notes/:id", (req, res) => {
//   const note = notes.find((n) => n._id===req.params.id);
//  res.send(note);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
