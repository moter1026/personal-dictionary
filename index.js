const fs = require('fs');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});
const express = require("express");
const app = express();
const jsonParser = express.json();
const host = '127.0.0.1'
const port = 5000;
var serve = serveStatic('./', { 'index': ['index.html', 'index.htm'] })


//    Открываем главный файл index.html
app.use(express.static(__dirname));

// //    Авторизация
// app.post("/login", jsonParser, (req, res) => {
//   console.log(req.body.loginNick)
//   fs.readdir(`./persons`, (err, files) => {
//     let Iam = 0;
//     for (let i = 0; i < files.length; i++) {
//       if (files[i] == req.body.loginNick) {
//         Iam = 1;
//       }
//     }
//     if (Iam == 1) {
//       console.log("TRUe");
//       fs.readFile(`./persons/${req.body.loginNick}/login.txt`, (err, data) => {
//         let jsonToObject = JSON.parse(data);
//         if (jsonToObject.password == req.body.loginPassword) {
//           let successLogin = {
//             success: true,
//             resText: "You succesful login",
//             UserNick: req.body.loginNick
//           };
//           res.json(successLogin);
//         } else {
//           let wrongPassword = {
//             success: false,
//             resText: "Yout password wrong",
//             UserNick: ''
//           };
//           res.json(wrongPassword);        }
//       })
//     } else {
//       let ErrorText = {
//         success: false,
//         resText: "Your login is wrong!",
//         UserNick: ''
//       };
//       res.json(ErrorText);
//       console.log(ErrorText);
      
//     }
//   })
// });
app.get("/sign Up, register.html", (req, res) => {
  if (User.nick != '') {
    console.log("USER save")
    res.redirect("./account.html");
  } else res.redirect("./sign Up, register.html");
})
let successLogin = {};
let User = {nick: ''};
//    Авторизация
app.post("/login", urlencodedParser, (req, res) => {
  console.log(req.body.loginNick)
  let Iam = 0;
  fs.readdir(`./persons`, (err, files) => {
    for (let i = 0; i < files.length; i++) {
      if (files[i] == req.body.loginNick) {
        Iam = 1;
      }
    }
    if (Iam == 1) {
      console.log("TRUe");
      fs.readFile(`./persons/${req.body.loginNick}/login.txt`, (err, data) => {
        let jsonToObject = JSON.parse(data);
        if (jsonToObject.password == req.body.loginPassword) {
          successLogin = {
            success: true,
            resText: "You succesful login",
            UserNick: req.body.loginNick
          };
          User.nick = req.body.loginNick;
          console.log(successLogin);
          // res.json(successLogin);
          
        } else {
          let wrongPassword = {
            success: false,
            resText: "Yout password wrong",
            UserNick: ''
          };
          // res.json(wrongPassword);        
        }
      } )
    } else {
      let ErrorText = {
        success: false,
        resText: "Your login is wrong!",
        UserNick: ''
      };
      // res.json(ErrorText);
      console.log(ErrorText);
      
    }
  })
  console.log(successLogin);
  res.redirect("./sign Up, register.html");
});


//    Регистрация
app.post("/register", urlencodedParser, (req,res) => {


  let data = {
    nick: req.body.registrNick,
    Email: req.body.registrEmail,
    password: req.body.registrPassword
  };
  let dataToJson = JSON.stringify(data);
  fs.mkdir(`./persons/${req.body.registrNick}`, err => {
    if (err) console.log("Error make a dir");
  });
  fs.open(`./persons/${req.body.registrNick}/login.txt`, 'a+',  (err) => {
    if (err) {
      res.send("Error!");
    }
    console.log("We created file.");
  });
  
  fs.appendFile(`./persons/${req.body.registrNick}/login.txt`, dataToJson, err => {
    if (err) {
      console.log("Error append");
    }
  })
  res.redirect("./index.html");
  res.end("END");

});

//      Слушаем порт 
app.listen(port, host, () => {
  console.log(`Server listens http://${host}:${port}`);
})
