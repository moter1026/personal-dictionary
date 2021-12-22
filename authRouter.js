const Router = require("express");
const router = new Router();
const controller = require("./authController");
const {check} = require("express-validator");
const authMiddlewaree = require("./middlewaree/authMiddlewaree");
const roleMiddlewaree = require("./middlewaree/roleMiddlewaree");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});


router.post("/registration",[
    urlencodedParser,
    check("registrNick", "Имя пользователя не может быть пустым").notEmpty(),
    check("registrPassword", "Пароль должен быть длинее 4 и короче 20 чимволов").isLength({min: 4, max: 20}) 
]
    ,controller.registration);
router.post("/login",urlencodedParser, controller.login);
router.get("/users", roleMiddlewaree(["ADMIN"]), urlencodedParser,  controller.getUsers);
router.get("/authUser", authMiddlewaree ,urlencodedParser ,controller.authUser);


module.exports = router;