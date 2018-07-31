var express = require("express");
var router = express.Router();

var oauth = require("../models/forge-oauth");

// Endpoint to return a 2-legged access token
router.get("/token", function (req, res) {
  var forgeOAuth = oauth.getCredentials("public");

  forgeOAuth.authenticate().then(function (credentials) {

    console.log(credentials);
    res.json(credentials);

  }, function (err) {
    console.error(err);
  });
});

module.exports = router;