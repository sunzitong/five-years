var express = require("express");
var router = express.Router();
var Mock = require("mockjs");
var request = require("request");

var host = "";
if (host) {
  router.get("/*", function (req, res, next) {
    request(
      {
        uri: host + req.url,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.send(body);
        } else {
          next();
        }
      }
    );
  });

  router.post("/*", function (req, res, next) {
    request(
      {
        uri: host + req.url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.send(body);
        } else {
          next();
        }
      }
    );
  });
}

router.get("/test", function (req, res, next) {
  res.json(
    Mock.mock({
      status: 200,
      "data|1-9": [
        {
          "name|5-8": /[a-zA-Z]/,
          "id|+1": 1,
          "value|0-500": 20,
        },
      ],
    })
  );
});

module.exports = router;
