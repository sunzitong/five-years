const plugins = [];
if (process.env.NODE_ENV !== "test") {
  plugins.push([
    "import",
    {
      libraryName: "vant",
      libraryDirectory: "es",
      style: true,
    },
    "vant",
  ]);
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins,
};
