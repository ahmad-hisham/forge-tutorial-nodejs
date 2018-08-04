var express = require("express");
var router = express.Router();

var oss = require("../models/forge-oss");

router.get("/buckets", async function (req, res) {
  var buckets = await oss.getBuckets();
  res.json(buckets);
});

module.exports = router;