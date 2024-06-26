describe("environmental variables", () => {
  beforeEach(() => {
    jest.resetModules();
  });


  it("provides internalApiBaseUrl variable configured from the environment", () => {
    process.env.INTERNAL_API_URL = "localhost_config_test";

    // eslint-disable-next-line
    const configModule = require("../src/config").default;

    expect(configModule.internalApiBaseUrl).toEqual("localhost_config_test");
  });

  it("provides internalApiKey variable configured from the environment", () => {
    process.env.CHS_INTERNAL_API_KEY = "1111";

    // eslint-disable-next-line
    const configModule = require("../src/config").default;

    expect(configModule.internalApiKey).toEqual("1111");
  });

  it("provides sicCodeApiTimeoutMilliseconds variable configured from the environment", () => {
    process.env.SIC_CODE_API_TIMEOUT_MILLISECONDS = "20000";

    // eslint-disable-next-line
    const configModule = require("../src/config").default;

    expect(configModule.sicCodeApiTimeoutMilliseconds).toEqual(20000);
  });

  it("provides default sicCodeApiTimeoutMilliseconds variable when not present in environment", () => {
    delete process.env.SIC_CODE_API_TIMEOUT_MILLISECONDS;

    // eslint-disable-next-line
    const configModule = require("../src/config").default;

    expect(configModule.sicCodeApiTimeoutMilliseconds).toEqual(10000);
  });

  it("provides port variable configured from the environment", () => {
    process.env.SIC_CODE_WEB_PORT = "3333";

    // eslint-disable-next-line
    const configModule = require("../src/config").default;

    expect(configModule.port).toEqual(3333);
  });

  it("provides default port variable when not present in environment", () => {
    delete process.env.SIC_CODE_WEB_PORT;

    // eslint-disable-next-line
    const configModule = require("../src/config").default;

    expect(configModule.port).toEqual(3000);
  });
});
