import ApplicationConfiguration from "./ApplicationConfiguration";

const config: ApplicationConfiguration = {
  applicationNamespace: "sic-code-web",
  cdnHost: process.env.CDN_HOST as string,
  urlPrefix: "sic-code-search",
  env: (process.env.NODE_ENV || "development").toLowerCase(),
  internalApiBaseUrl: process.env.INTERNAL_API_URL as string,
  internalApiKey: process.env.CHS_INTERNAL_API_KEY as string,
  sicCodeApiTimeoutMilliseconds: parseInt(
    process.env.SIC_CODE_API_TIMEOUT_MILLISECONDS || "10000",
    10
  ),
  port: parseInt(process.env.SIC_CODE_WEB_PORT || "3000", 10),
};

export default config;
