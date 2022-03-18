import axios from "axios";
import config from "../config";

const requiredHeaders = {
    Authorization: config.internalApiKey
};

const axiosInstance = axios.create({
    baseURL: `${config.internalApiBaseUrl}/internal`,
    headers: requiredHeaders,
    timeout: config.sicCodeApiTimeoutSeconds * 1000
});

export default axiosInstance;
