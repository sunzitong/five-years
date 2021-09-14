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

const files = glob(path.join(__dirname, "../data/*.js"), {
  sync: true,
});

files.forEach((filePath) => {
  const api = require(filePath);
  proxy[api.path] = api.response;
  router.get(api.path, function (req, res, next) {
    setTimeout(() => {
      res.json(api.response);
    }, timeout);
  });
});

module.exports = router;
