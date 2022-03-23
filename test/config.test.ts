describe("environmental variables", () => {
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
  });

  it("provides contextIdPrefix variable configured from the environment", function () {
    process.env.CONTEXT_ID_PREFIX = "sic_code_web_config_test";

    const configModule = require("../src/config").default;

    expect(configModule.contextIdPrefix).toEqual("sic_code_web_config_test");
  });

  it("provides default contextIdPrefix variable when not present in environment", function () {
    delete process.env.CONTEXT_ID_PREFIX;

    const configModule = require("../src/config").default;
    expect(configModule.contextIdPrefix).toEqual("sic_code_web");
  });

  it("provides internalApiBaseUrl variable configured from the environment", function () {
    process.env.INTERNAL_API_URL = "localhost_config_test";

    const configModule = require("../src/config").default;

    expect(configModule.internalApiBaseUrl).toEqual("localhost_config_test");
  });

  it("provides internalApiKey variable configured from the environment", function () {
    process.env.CHS_INTERNAL_API_KEY = "1111";

    const configModule = require("../src/config").default;

    expect(configModule.internalApiKey).toEqual("1111");
  });

  it("provides sicCodeApiTimeoutMilliseconds variable configured from the environment", function () {
    process.env.SIC_CODE_API_TIMEOUT_MILLISECONDS = "20000";

    const configModule = require("../src/config").default;

    expect(configModule.sicCodeApiTimeoutMilliseconds).toEqual(20000);
  });

  it("provides default sicCodeApiTimeoutMilliseconds variable when not present in environment", function () {
    delete process.env.SIC_CODE_API_TIMEOUT_MILLISECONDS;

    const configModule = require("../src/config").default;

    expect(configModule.sicCodeApiTimeoutMilliseconds).toEqual(10000);
  });

  it("provides port variable configured from the environment", function () {
    process.env.SIC_CODE_WEB_PORT = "3333";

    const configModule = require("../src/config").default;

    expect(configModule.port).toEqual(3333);
  });

  it("provides default port variable when not present in environment", function () {
    delete process.env.SIC_CODE_WEB_PORT;

    const configModule = require("../src/config").default;

    expect(configModule.port).toEqual(3000);
  });
});
