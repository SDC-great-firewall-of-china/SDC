/** @type {import('jest').Config} */
const config = {
  preset: "@shelf/jest-mongodb",
  collectCoverage: false,
  collectCoverageFrom: ["client/src/components/componentA/**/*.{js,jsx,ts,tsx}","!<rootDir>/node_modules/", "server/reviewsRoutes.js"],
  coverageThreshold: {
    "global": {
      "lines": 90,
      "statements": 90
    }},
  coverageDirectory: 'coverage',
  // testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.svg$': 'identity-obj-proxy',
  },
};

module.exports = config;

