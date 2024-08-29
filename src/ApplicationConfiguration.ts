type ApplicationConfiguration = Readonly<{
  applicationNamespace: string;
  cdnHost: string;
  env: string;
  internalApiBaseUrl: string;
  internalApiKey: string;
  sicCodeApiTimeoutMilliseconds: number;
  port: number;
  urlPrefix: string;
  session: {
    cookieName: string;
    cookieSecret: string;
    cookieDomain: string;
    cacheServer: string;
};
}>;

export default ApplicationConfiguration;
