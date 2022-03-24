import axios, { AxiosInstance } from "axios";
import { v4 as uuidv4 } from "uuid";
import { loggerInstance } from "../utils/Logger";
import CombinedSicActivitiesApiModel from "../models/CombinedSicActivitiesApiModel";
import config from "../config";

export class SicCodeService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    const requiredHeaders = {
      Authorization: config.internalApiKey,
    };
    this.axiosInstance = axios.create({
      headers: requiredHeaders,
      timeout: config.sicCodeApiTimeoutMilliseconds,
    });
  }

  public async search(
    searchString: string,
    matchPhrase: boolean
  ): Promise<CombinedSicActivitiesApiModel[]>  {
    const contextId = config.contextIdPrefix + "-" + uuidv4();
    const logPrefix = `context_id=${contextId} ${SicCodeService.name} -`;
    const url = `${config.internalApiBaseUrl}/internal/sic-code-search`;
    try {
      loggerInstance().info(
        `${logPrefix} Making a POST request to ${url} with search string [${searchString}] and match phrase [${matchPhrase}]`
      );

      const response = await this.axiosInstance.post(url, {
        search_string: searchString,
        match_phrase: matchPhrase,
        context_id: contextId,
      });
      loggerInstance().info(
        `${logPrefix} Number of results returned = ${response.data.length}`
      );

      return response.data;
    } catch (error) {
      loggerInstance().error(
        `${logPrefix} Error calling SIC Code API ${error.message}`
      );
      throw error;
    }
  };
}
