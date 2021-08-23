// let MongoClient = require('mongodb').MongoClient;
// // let Server = require('mongodb').Server;
// let client = new MongoClient("mongodb://dbadmin:test@localhost:27017/admin");
// client.connect();

// async function run() {
//   try {
//     await client.connect();

//     const database = client.db('Dictionary');
//     const movies = database.collection('users');
// // gybh
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { name: 'Andrew' };
//     const movie = await movies.findOne(query);

//     console.log(movie);
//   } catch {
//     console.log("!!!ERROR!!!");
//   }finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run();

let MongoClient = require("mongodb").MongoClient, 
    Server = require("mongodb").Server;
let client = new MongoClient("mongodb://localhost:27017/Dictionary",
{poolSize: 5, reconnectInterval:500},
function (err, db) {
    if (err) {
        console.log("CONNECTION FAILED");
    }else {
        console.log("Connected");
        db.logout(function (err, result) {
            if (!err) {
                console.log("Logged out . . .");
            }
            db.close();
            console.log("Connection closed . . .");
        })
    }
});

// MongoClient.connect("mongodb://localhost:27017/Dictionary",
//                     {poolSize: 5, reconnectInterval:500},
//                     function (err, db) {
//                         if (err) {
//                             console.log("CONNECTION FAILED");
//                         }else {
//                             console.log("Connected");
//                             db.logout(function (err, result) {
//                                 if (!err) {
//                                     console.log("Logged out . . .");
//                                 }
//                                 db.close();
//                                 console.log("Connection closed . . .");
//                             })
//                         }
//                     });
// console.log(client.db("Dictionary"));
// // .collection("users")

// client.close();