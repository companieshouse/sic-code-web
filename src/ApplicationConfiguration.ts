type ApplicationConfiguration = Readonly<{
    applicationNamespace:          string;
    contextIdPrefix:               string;
    env:                           string;
    internalApiBaseUrl:            string;
    internalApiKey:                string;
    sicCodeApiTimeoutMilliseconds: number;  
    port:                          number;
}>

export default ApplicationConfiguration;