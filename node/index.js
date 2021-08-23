const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.end("../index.html");
})

app.listen(port, () => {
    console.log("We started the Server");
})




// let MongoClient = require("mongodb").MongoClient, 
//     Server = require("mongodb").Server;
// let client = new MongoClient("mongodb://localhost:27017/Dictionary",
// {poolSize: 5, reconnectInterval:500},
// function (err, db) {
//     if (err) {
//         console.log("CONNECTION FAILED");
//     }else {
//         console.log("Connected");
//         db.logout(function (err, result) {
//             if (!err) {
//                 console.log("Logged out . . .");
//             }
//             db.close();
//             console.log("Connection closed . . .");
//         })
//     }
// });

