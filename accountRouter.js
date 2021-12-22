const Router = require("express");
const router = new Router();
const controller = require("./accountController");
// const {check} = require("express-validator");
const authMiddlewaree = require("./middlewaree/authMiddlewaree");
// const roleMiddlewaree = require("./middlewaree/roleMiddlewaree");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});


router.get("/newWord", authMiddlewaree ,urlencodedParser ,controller.newWord);
router.get("/getWords", authMiddlewaree ,urlencodedParser ,controller.getWords);
router.get("/getAllWords", authMiddlewaree ,urlencodedParser ,controller.getAllWords);
router.get("/countWords", authMiddlewaree ,urlencodedParser ,controller.countWords);


module.exports = router;
