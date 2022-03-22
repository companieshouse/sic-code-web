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
   //     expect(axios.post).toHaveBeenCalledWith(`/internal/sic-code-search`);
        expect(result).toEqual(testData);
        });
    });
});
  /*
    const searchString: string = 'ABC';
    const matchPhrase: boolean = false;
  
  
    describe('searching sic code', () => {
  
    it('should retrieve full suppression', async () => {

        mockedAxios.post.mockReturnValue(Promise.resolve({
            status: StatusCodes.OK,
            data: generateTestData()
        }));
    
        const sicCodeService = new SicCodeService();
    
        await sicCodeService.search(searchString, matchPhrase).then((response: CombinedSicActivitiesApiModel[]) => {
            expect(response).toEqual(generateTestData())
        });
    });
   });
});
*/