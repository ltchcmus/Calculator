module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx)$": ["babel-jest", { configFile: "./babel.config.cjs" }],
  },
  testMatch: [
    "**/__tests__/**/*.(test|spec).js?(x)",
    "**/?(*.)+(spec|test).js?(x)",
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/main.jsx",
    "!src/**/*.test.{js,jsx}",
  ],
};
