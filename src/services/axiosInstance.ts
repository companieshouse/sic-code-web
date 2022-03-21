import axios from "axios";
import config from "../config";

const requiredHeaders = {
    Authorization: config.internalApiKey
};

const axiosInstance = axios.create({
    headers: requiredHeaders,
    timeout: config.sicCodeApiTimeoutMilliseconds
});

export default axiosInstance;
