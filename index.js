// implement your API here
const express = require("express");
// Import database
const db = require("./data/db.js");

//create server using express
const server = express();
// current post variable
const port = 5000;
// have server use JSON
server.use(express.json());

// Post request /api/users
server.post("/api/users", (req, res) => {
  //check if name or bio is sent to db
  const name = req.body.name;
  const bio = req.body.bio;
  // retrieve the new user
  const newUser = req.body;

  if (!name || !bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user!"
    });
  }
  db.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

// Get (all users) request /api/users
server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        errorMessage: "The users information could not be retrieved."
      });
    });
});
// Get (single users) request /api/users/:id
server.get("/api/users/:id", (req, res) => {
  const userID = req.params.id;
  db.findById(userID)
    .then(user => {
      // if user info is not found for that ID, then send an error
      if (!user) {
        return res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      } else {
        return res.json(user);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        errorMessage: "The users information could not be retrieved."
      });
    });
});
// Delete request /api/users/:id
// Put request /api/users/:id

// listen to current server
server.listen(port, () => {
  console.log(`\n*** API running on port ${port} ***\n`);
});
