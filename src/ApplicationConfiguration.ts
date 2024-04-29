type ApplicationConfiguration = Readonly<{
  applicationNamespace: string;
  cdnHost: string;
  env: string;
  internalApiBaseUrl: string;
  internalApiKey: string;
  sicCodeApiTimeoutMilliseconds: number;
  port: number;
  urlPrefix: string;
}>;

export default ApplicationConfiguration;
