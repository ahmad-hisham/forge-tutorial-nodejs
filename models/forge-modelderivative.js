var forgeSDK = require("forge-apis");
var oauth = require("../models/forge-oauth");

module.exports = {
  translateObject: async function (objectName) {
    var forgeOAuth = oauth.getCredentials("internal");
    var derivativesApi = new forgeSDK.DerivativesApi();

    var credentials = await forgeOAuth.authenticate();

    // prepare the translation job payload
    var postJob = new forgeSDK.JobPayload();
    postJob.input = new forgeSDK.JobPayloadInput();
    postJob.input.urn = objectName.toBase64();
    postJob.output = new forgeSDK.JobPayloadOutput([new forgeSDK.JobSvfOutputPayload()]);
    postJob.output.formats[0].type = "svf";
    postJob.output.formats[0].views = ["2d", "3d"];

    // post the job
    var data = await derivativesApi.translate(postJob, {}, forgeOAuth, credentials);
    return data.body;
  }
};

String.prototype.toBase64 = function () {
  return new Buffer.from(this).toString("base64");
};