var express = require("express");
var router = express.Router();

var oss = require("../models/forge-oss");
var config = require("../config/config");

router.get("/buckets", async function (req, res) {
  var buckets = await oss.getBuckets();
  res.json(buckets);
});

router.post("/create_bucket", async function (req, res) {
  var bucketKey = config.credentials.client_id.toLowerCase() + config.sample.bucket_key;
  var bucket = await oss.createBucket(bucketKey);
  res.json(bucket);
});

module.exports = router;