module.exports = {
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  collectCoverageFrom: [
    "src/**/{!(server),}.ts"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
  globalSetup: "./test/setup.ts"
};
