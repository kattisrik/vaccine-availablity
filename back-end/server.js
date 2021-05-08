const express = require("express");
const server = express();

const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = process.env.PORT || 4000;

// << db setup >>
const db = require("./db");
const dbName = "notifyme";
const collectionName = "users";

// << db init >>
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
    // get all items
    dbCollection.find().toArray(function(err, result) {
        if (err) throw err;
          console.log(result);
    });

// << db CRUD routes >>
server.post("/user", (request, response) => {
    const item = request.body;
    dbCollection.insertOne(item, (error, result) => { // callback of insertOne
        if (error) throw error;
        response.json("successfully inserted user");
    });
});

}, function(err) { // failureCallback
    throw (err);
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});