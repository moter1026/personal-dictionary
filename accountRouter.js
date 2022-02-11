const Router = require("express");
const router = new Router();
const controller = require("./accountController");
const authMiddlewaree = require("./middlewaree/authMiddlewaree");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});


router.get("/newWord", authMiddlewaree ,urlencodedParser ,controller.newWord);
router.get('/redact', authMiddlewaree, urlencodedParser ,controller.redact);
router.get("/getWords", authMiddlewaree ,urlencodedParser ,controller.getWords);
router.get("/getAllWords", authMiddlewaree ,urlencodedParser ,controller.getAllWords);
router.get("/countWords", authMiddlewaree ,urlencodedParser ,controller.countWords);
router.get("/deleteWord", authMiddlewaree ,urlencodedParser ,controller.deleteWord);


module.exports = router;
