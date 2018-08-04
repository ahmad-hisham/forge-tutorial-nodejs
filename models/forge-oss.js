var forgeSDK = require("forge-apis");
var oauth = require("../models/forge-oauth");

module.exports = {
  getBuckets: async function () {
    var forgeOAuth = oauth.getCredentials("internal");
    var bucketsApi = new forgeSDK.BucketsApi();

    var credentials = await forgeOAuth.authenticate();
    var buckets = await bucketsApi.getBuckets({ limit: 100 }, forgeOAuth, credentials);
    return buckets.body.items;
  },

  createBucket: async function (bucketKey) {
    var forgeOAuth = oauth.getCredentials("internal");
    var bucketsApi = new forgeSDK.BucketsApi();

    var newBucket = {
      bucketKey: bucketKey,
      policyKey: "transient"
    };

    try {
      var credentials = await forgeOAuth.authenticate();
      var bucket = await bucketsApi.createBucket(newBucket, {}, forgeOAuth, credentials);
      return bucket.body;
    } catch (error) {
      if (error.statusCode == 409) { // Bucket already exists
        bucket = await bucketsApi.getBucketDetails(bucketKey, forgeOAuth, credentials);
        return bucket.body;
      } else {
        return (error);
      }
    }
  }, 

  uploadObject: async function (bucketKey, fileName, filePath) {
    var forgeOAuth = oauth.getCredentials("internal");
    var objectsApi = new forgeSDK.ObjectsApi();
    var fs = require("fs");

    var credentials = await forgeOAuth.authenticate();
    var filecontent = await fs.promises.readFile(filePath);
    var bucketObject = await objectsApi.uploadObject(bucketKey, fileName, filecontent.length, filecontent, {}, forgeOAuth, credentials);
    return bucketObject.body;
  }
};
