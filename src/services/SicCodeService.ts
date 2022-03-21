import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import axiosInstance from "./axiosInstance";
import { loggerInstance } from '../utils/Logger';
import CombinedSicActivitiesApiModel from "../models/CombinedSicActivitiesApiModel"


import config from "../config";

export class SicCodeService {

    public search = async (searchString: string, matchPhrase: boolean): Promise<CombinedSicActivitiesApiModel[]>  => {

        const contextId = config.contextIdPrefix + "-" + uuidv4();
        const logPrefix = `context_id=${contextId} ${SicCodeService.name} -`;
        const url = `${config.internalApiBaseUrl}/internal/sic-code-search`;
        try {

            loggerInstance().info(`${logPrefix} Making a POST request to ${url} with search string [${searchString}] and match phrase [${matchPhrase}]`);

            const response = await axiosInstance.post(url, {
                search_string: searchString,
                match_phrase: matchPhrase,
                context_id: contextId
            });
            loggerInstance().info(`${logPrefix} Number of results returned = ${response.data.length}`);

            return response.data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response ) {
                    loggerInstance().error(`${logPrefix} status code that falls out of the range of 2xx with value of ${error.response.status}`);
                } else if (error.request) {
                    loggerInstance().error(`${logPrefix} the request was made but no response was received since ${error}`);
                } 
                else {
                    loggerInstance().error(`${logPrefix} Other Axios error found ${error.message}`);
                }
            } else {
                loggerInstance().error(`${logPrefix} Non Axios error found ${error.message}`);
            }

            throw error;
        }
    }
}

