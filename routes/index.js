var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Restful API Server" }); //view engine을 사용하여야 가능하다. ex_embedded javascript와 같이 ejs로 view 생성해야지 서버사이드 스크립트 동작함
});

router.post("/urlbody", (req, res, next) => {
  console.log(JSON.stringify(req.body));
  res.send(
    JSON.stringify({
      code: 200,
      result: req.body.key1,
    })
  );
});

module.exports = router;
