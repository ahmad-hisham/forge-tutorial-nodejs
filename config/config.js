module.exports = {
  // Forge Config parameters
  credentials: {
    client_id: "FORGE_CLIENT_ID",
    client_secret: "FORGE_CLIENT_SECRET", 
    callback_url: "http://localhost:3000/api/forge/callback/oauth"
  },

  scopes: {
    // Required scopes for your application on server-side
    internal: ["bucket:create", "bucket:read", "data:read", "data:create", "data:write"],
    // Required scope of the token sent to the client
    public: ["viewables:read"]
  },

  sample: {
    bucket_key: "-upload-sample",
    file_path: "sample",
    file_name: "sample.dwg"
  }
};