import axios, { AxiosInstance } from "axios";
import { loggerInstance } from "../utils/Logger";
import CombinedSicActivitiesApiModel from "../models/CombinedSicActivitiesApiModel";
import config from "../config";

export class SicCodeService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: config.sicCodeApiTimeoutMilliseconds,
    });
  }

  public async search(
    searchString: string,
    matchPhrase: boolean,
    xRequestId: string 
  ): Promise<CombinedSicActivitiesApiModel[]> {
    const logPrefix = `context=${xRequestId} -`;
    const url = `${config.internalApiBaseUrl}/internal/sic-code-search/search`;
    try {
      loggerInstance().info(
        `${logPrefix} Making a POST request to ${url} with search string [${searchString}] and match phrase [${matchPhrase}]`
      );

      const requiredHeaders = {
        Authorization: config.internalApiKey,
        'X-Request-Id': xRequestId
      };

      const response = await this.axiosInstance.post(url, {
        search_string: searchString,
        match_phrase: matchPhrase,
        context_id: xRequestId,
       },
       { headers: requiredHeaders }
     );
      loggerInstance().info(
        `${logPrefix} Number of results returned = ${response.data.length}`
      );

      if (response.data.length > 0) {
        loggerInstance().info(
          `${logPrefix} Top result score = ${response.data[0].search_score}`
        );
      }

      return response.data;
    } catch (error) {
      loggerInstance().error(
        `${logPrefix} Error calling SIC Code API ${error.message}`
      );
      throw error;
    }
  }
}
