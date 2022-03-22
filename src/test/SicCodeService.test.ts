import axios from 'axios';
import { SicCodeService } from "services/SicCodeService";
import { StatusCodes } from 'http-status-codes';
import CombinedSicActivitiesApiModel from "../models/CombinedSicActivitiesApiModel"
import { generateTestData } from './TestData';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('SicCodeService', () => {

    beforeEach(() => {
      jest.clearAllMocks();
    });
  
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