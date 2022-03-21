type ApplicationConfiguration = Readonly<{
    env:                           string;
    internalApiBaseUrl:            string;
    internalApiKey:                string;
    contextIdPrefix:               string;
    sicCodeApiTimeoutMilliseconds: number;  
    port:                          number;
}>

export default ApplicationConfiguration;