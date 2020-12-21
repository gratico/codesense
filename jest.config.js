const esModules = ["@thi.ng/rstream-graph", "@thi.ng/rstream", "lib0"].join(
  "|"
);
module.exports = {
  testEnvironment: "node",
  reporters: ["default"],
  setupFiles: ["<rootDir>/tools/jest/setup.js"],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  modulePathIgnorePatterns: ["__mocks__", "__fixtures__"],

  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/dist"],
};
