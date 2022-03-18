type ApplicationConfiguration = Readonly<{
    env:                      string;
    internalApiBaseUrl:       string;
    internalApiKey:           string;
    sicCodeApiTimeoutSeconds: number;  
    port:                     number;
}>

export default ApplicationConfiguration;