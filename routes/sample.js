var express = require("express");
var router = express.Router();

var oss = require("../models/forge-oss");

router.get("/buckets", async function (req, res) {

  // oss.getBuckets().then(function (buckets) {
  //   res.json(buckets);
  // }).catch(function (error) {
  //   res.status(500).json(error);
  // });
    
  var buckets = await oss.getBuckets();
  res.json(buckets);
});

module.exports = router;