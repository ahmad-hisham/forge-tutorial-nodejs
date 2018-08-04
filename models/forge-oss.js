var forgeSDK = require("forge-apis");
var oauth = require("../models/forge-oauth");

module.exports = {
  getBuckets: async function () {
    var forgeOAuth = oauth.getCredentials("internal");
    var bucketsApi = new forgeSDK.BucketsApi();

    var credentials = await forgeOAuth.authenticate();
    var buckets = await bucketsApi.getBuckets({ limit: 100 }, forgeOAuth, credentials);
    return buckets.body.items;

    // USING Promises pyramid
    // return new Promise(function (resolve, reject) {
    //   forgeOAuth.authenticate().then(function (credentials) {
    //     bucketsApi.getBuckets({ limit: 100 }, forgeOAuth, credentials).then(function (buckets) {
    //       resolve(buckets.body.items);
    //     });
    //   });
    // });

    // USING Promises chaining
    // return forgeOAuth.authenticate()
    //   .then((credentials) => bucketsApi.getBuckets({ limit: 100 }, forgeOAuth, credentials))
    //   .then((buckets) => buckets.body.items);
  }
};
