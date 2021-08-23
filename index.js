


const express = require("express");
const app = express();
const http = require("http").Server(app);



const port = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;

app.get('/', (req, res) => {
    res.sendFile("C:/Users/Mot1026/Desktop/All Matvey's/for WEB/Project for the school DICTIONARY/index.html");
})

http.listen(port, () => {
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

