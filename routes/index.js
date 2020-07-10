var express = require("express");
var router = express.Router();
// var users = require("../controller/userController");
var db = require("../db/sql.js");
/* GET home page. */
router.get("/change", function (req, res) {
  let { id } = req.body;
  db.query({
    data: { id },
    callBack: (rst) => {
      res.send(rst);
    },
  });
});

module.exports = router;