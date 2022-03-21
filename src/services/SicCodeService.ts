import axios, { AxiosInstance } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import axiosInstance from "./axiosInstance";
import { loggerInstance } from '../utils/Logger';
import CombinedSicActivitiesApiModel from "../models/CombinedSicActivitiesApiModel"


import config from "../config";

export class SicCodeService {

    private readonly sicCodeApiTimeoutMs = config.sicCodeApiTimeoutMilliseconds * 1000;

    public search = async (searchString: string, matchPhrase: boolean): Promise<CombinedSicActivitiesApiModel[]>  => {

        try {

            const context_id = config.contextIdPrefix + "-" + uuidv4();
            const url = `${config.internalApiBaseUrl}/internal/sic-code-search`;

            loggerInstance().info(`context_id=${context_id} {${SicCodeService.name} - Making a POST request to ${url} with search string [${searchString}] and match phrase [${matchPhrase}]`);

            const response = await axiosInstance.post(url, {
                search_string: searchString,
                match_phrase: matchPhrase,
                context_id: context_id
            });
            console.log(response.data);

            return response.data;

        } catch (error) {
            // Error 😨
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
            console.log(error);
            throw error;
        }
    }


}

