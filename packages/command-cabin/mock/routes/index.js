var express = require("express");
var router = express.Router();
var Mock = require("mockjs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const glob = require("glob");
const path = require("path");

const timeout = 400;

const files = glob(path.join(__dirname, "../data/**/*.js"), {
  sync: true,
});
files.forEach((file) => {
  const api = require(file);
  router[api.method.toLowerCase()](api.path, function (req, res, next) {
    setTimeout(() => {
      if (api.response) {
        res.json(api.response);
      } else {
        res.send();
      }
    }, timeout);
  });
});

module.exports = router;
