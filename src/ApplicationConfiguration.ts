type ApplicationConfiguration = Readonly<{
    env:                      string;
    internalApiBaseUrl:       string;
    internalApiKey:           string;
    contextIdPrefix:          string;
    sicCodeApiTimeoutSeconds: number;  
    port:                     number;
}>

export default ApplicationConfiguration;