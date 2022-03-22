import axios from 'axios';
import { SicCodeService } from "../../src/services/SicCodeService";
import { generateTestData } from '../TestData';
import { StatusCodes } from 'http-status-codes';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('SicCodeService', () => {

    describe("when API call is successful", () => {
        it("should return search results list", async () => {
        // given
        const testData = generateTestData();
        const searchString = 'ABC';
        const matchPhrase = false;

        mockedAxios.post.mockImplementationOnce(() => Promise.resolve({
            status: StatusCodes.OK,
            data: testData
          }));

        // when
        const sicCodeService = new SicCodeService();
        const result = await sicCodeService.search(searchString, matchPhrase);
    
        // then
        expect(result).toEqual(testData);
        });
    });
    describe("when API call fails", () => {
        it("should re-throw the error with the correct status code", async () => {
          // given
          mockedAxios.post.mockReturnValue(Promise.reject({
            response: {status: StatusCodes.SERVICE_UNAVAILABLE}
          }));
          const searchString = 'ABC';
          const matchPhrase = false;
    
          // when
          const sicCodeService = new SicCodeService();
          await sicCodeService.search(searchString, matchPhrase).catch((err) => {
            expect(expect(err.response.status).toBe(503));
          });
        });
      });
});
