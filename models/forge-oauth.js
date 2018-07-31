var forgeSDK = require("forge-apis");

// Forge config information, such as client ID and secret
var config = require("../config/config");

module.exports = {
  getCredentials: function (tokenScope) {
    var client_id = config.credentials.client_id;
    var client_secret = config.credentials.client_secret;
    var scopes = config.scopes[tokenScope];
    var autoRefresh = true;

    return new forgeSDK.AuthClientTwoLegged(client_id, client_secret, scopes, autoRefresh);
  }
};