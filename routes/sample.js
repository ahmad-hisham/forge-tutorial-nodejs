var express = require("express");
var router = express.Router();

var oss = require("../models/forge-oss");
var modelderivative = require("../models/forge-modelderivative");
var config = require("../config/config");
var path = require("path");

router.get("/buckets", async function (req, res) {
  var buckets = await oss.getBuckets();
  res.json(buckets);
});

router.post("/create_bucket", async function (req, res) {
  var bucketKey = config.credentials.client_id.toLowerCase() + config.sample.bucket_key;
  var bucket = await oss.createBucket(bucketKey);
  res.json(bucket);
});

router.post("/upload_object", async function (req, res) {
  var bucketKey = config.credentials.client_id.toLowerCase() + config.sample.bucket_key;
  var fileName = config.sample.file_name;
  var filePath = path.join(__dirname, "..", config.sample.file_path, fileName);

  var bucketObject = await oss.uploadObject(bucketKey, fileName, filePath);
  res.json(bucketObject);
});

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

module.exports = router;