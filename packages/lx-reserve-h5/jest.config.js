module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  collectCoverage: false,
  collectCoverageFrom: ["**/*.{ts,vue}"],
  moduleNameMapper: {},
  transformIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  setupFiles: ["<rootDir>/tests/unit/setup-tests.ts"],
};
