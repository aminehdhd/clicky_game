var express = require("express");

const superagent = require("superagent");
var app = express();
var port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var path = require("path");

// Takes you to the home page when user types in locahost:8080
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Receives user inputs and queries the api then sends results back to the fron tend
app.post("/search", function(req, res) {
  var userInput = localStorage.getItem('movieID');
  // take userInput and run a db query for the id
  // grab the title off that item
  // run axios request to the guidebox api
  var query = `http://api-public.guidebox.com/v2/search?type=movie&field=title&query=${userInput}&api_key=3228a71302f7780be2e65d84356cadc6d85b7a4e`;
  superagent
    .get(query)
    .then(function(data) {
      // Sends data received from the api back to the front end
      res.json(data.body);
      //console.log(data.body)
    })
    .catch(function(error) {
      console.log(error);
    });
  console.log(userInput);
});


// Starts the server
app.listen(port, function() {
  console.log("The server is working on port 3000");
});