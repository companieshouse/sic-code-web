import ApplicationConfiguration from "./ApplicationConfiguration";

const config: ApplicationConfiguration = {
    env: (process.env.NODE_ENV || "development").toLowerCase(),
    internalApiBaseUrl: process.env.INTERNAL_API_URL as string,
    internalApiKey: process.env.CHS_INTERNAL_API_KEY as string,
    contextIdPrefix: process.env.CONTEXT_ID_PREFIX || "sic_code_web",
    sicCodeApiTimeoutMilliseconds: parseInt(process.env.SIC_CODE_API_TIMEOUT_MILLISECONDS || "10000"),
    port: parseInt(process.env.OCR_WEB_PORT || "3000")
}

export default config;