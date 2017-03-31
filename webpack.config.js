var bundle = __dirname + "/bundle.js";
var adminBundle = __dirname + "/admin-bundle.js";

module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: {
  	bundle: bundle,
  	adminBundle: adminBundle
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  }
}