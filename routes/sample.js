var express = require("express");
var router = express.Router();

var oss = require("../models/forge-oss");

router.get("/buckets", async function (req, res) {
  var buckets = await oss.getBuckets();
  res.json(buckets);
});

var config = require("../config/config");

router.post("/create_bucket", async function (req, res) {
  var bucketKey = config.credentials.client_id.toLowerCase() + config.sample.bucket_key;
  var bucket = await oss.createBucket(bucketKey);
  res.json(bucket);
});

var path = require("path");

router.post("/upload_object", async function (req, res) {
  var bucketKey = config.credentials.client_id.toLowerCase() + config.sample.bucket_key;
  var fileName = config.sample.file_name;
  var filePath = path.join(__dirname, "..", config.sample.file_path, fileName);

  var bucketObject = await oss.uploadObject(bucketKey, fileName, filePath);
  res.json(bucketObject);
});

var modelderivative = require("../models/forge-modelderivative");

router.post("/object_translate", async function (req, res) {
  var bucketKey = config.credentials.client_id.toLowerCase() + config.sample.bucket_key;
  var fileName = config.sample.file_name;
  var objectId = "urn:adsk.objects:os.object:" + bucketKey + "/" + fileName;

  try {
    var data = await modelderivative.translateObject(objectId);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/object_translated", async function (req, res) {
  var bucketKey = config.credentials.client_id.toLowerCase() + config.sample.bucket_key;
  var fileName = config.sample.file_name;
  var objectId = "urn:adsk.objects:os.object:" + bucketKey + "/" + fileName;

  for (let i = 0; i < 10; ++i) {
    try {
      var data = await modelderivative.getManifest(objectId);
      if (data.progress == "complete") {
        res.json({status: "complete"});
        return;
      }
      setTimeout(console.log("Retry " + i), 5000);
    } catch(err) { /* Silent retry */ }
  }
  res.json({status: "failed"});
});

module.exports = router;