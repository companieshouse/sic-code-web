import axios, { AxiosInstance } from 'axios';

import axiosInstance from "./axiosInstance";


import config from "../config";

export class SicCodeService {

    private readonly axiosInstance: AxiosInstance;
    private readonly sicCodeApiTimeoutMs = config.sicCodeApiTimeoutSeconds * 1000;
    

    public search = async (searchText: string, matchPhrase: boolean): Promise<any> => {

        try {

            const response = await axiosInstance.post("/sic_code_search", {
                search_string: searchText,
                match_phrase: matchPhrase,
                context_id: "web app TODO"
            });

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
        }
    }


}

