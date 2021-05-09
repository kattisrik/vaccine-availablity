const express = require("express");
const server = express();
const cors = require('cors');
const cron = require('node-cron');
const helper = require('./vaccineAvailable');

async function main(){
    try {
        cron.schedule('* * * * *', async () => {
            db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
                // get all items
                dbCollection.find().toArray( async function(err, result) {
                    if (err) throw err;
                    await helper.checkAvailability(result);
                });
            })
        });
    } catch (e) {
        console.log('an error occured: ' + JSON.stringify(e, null, 2));
        throw e;
    }
}

const body_parser = require("body-parser");

server.use(cors({ credentials: true }));

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = process.env.PORT || 4000;

// << db setup >>
const db = require("./db");
const dbName = "notifyme";
const collectionName = "users";

// << db init >>
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback

const deleteUser = (id) => dbCollection.deleteOne({ _id: id }, function(error, result) { if (error) throw error; console.log("deleted user by ID", id) });
module.exports.deleteUser = deleteUser;

// << db POST API >>
server.post("/user", (request, response) => {
    const item = request.body;
    dbCollection.insertOne(item, (error, result) => { // callback of insertOne
        if (error) throw error;
        response.json("successfully inserted user");
    });
}, );

}, function(err) { // failureCallback
    throw (err);
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});

main()
    .then(() => {console.log('-------------- Vaccine Availability Notifier --------------');});