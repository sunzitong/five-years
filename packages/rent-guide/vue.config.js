const pkg = require("./package.json");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? `/fe/h5/${pkg.name}` : "",
  outputDir: `../../dist/h5/${pkg.name}`,
};
