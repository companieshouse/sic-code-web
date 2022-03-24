import { SicCodeService } from "../../src/services/SicCodeService";
import { generateTestData } from "../TestData";
import {
  // expectToHaveBackButton,
  // expectToHaveErrorMessages,
  // expectToHaveErrorSummaryContaining,
  // expectToHaveInput, expectToHavePopulatedInput,
  expectToHaveTitle,
  // expectToHaveTitleWithError
} from './HtmlPatternAssertions';

import request from "supertest";
import app from "../../src/app";


jest.mock("../../src/services/SicCodeService", () => {
  return {
    data: generateTestData()
  };
});

// MOCK SERVICE TO RETURN TESTDATA

describe("/", () => {
  describe("GET ", () => {
    test("should respond with a 200 status code and have correct page title", async () => {
      const pageTitle = "SIC Code Search";
      const response = await request(app).get("/").send();
      expect(response.statusCode).toBe(200);
      expectToHaveTitle(response.text, pageTitle);
    });
  });


  describe("POST ", () => {

    test("should respond with a 200 status code and return testData", async () => {

      // jest.spyOn(SicCodeService, 'search').mockImplementationOnce(() => {
      //   return { applicationReference: ‘12345-12345’} as SuppressionSession
      // });

      const pageTitle = "SIC Code Search";
      const testData = generateTestData();
      const response = await request(app).post("/").send({
        search_string: "barley",
        match_phrase: true,
      });
      expect(response.statusCode).toBe(200);
      expectToHaveTitle(response.text, pageTitle);
    });
  });
  
  // describe('on GET', () => {

  //   it('should return 200 and render the Contact Details page', async () => {

  //     jest.spyOn(SessionService, 'getSuppressionSession').mockImplementationOnce(() => {
  //       return { applicationReference: '12345-12345'} as SuppressionSession
  //     });

  //     jest.spyOn(SuppressionService.prototype, 'get').mockImplementationOnce(() => {
  //       return Promise.resolve({ addressToRemove: undefined as any } as SuppressionData)
  //     });

  //     await request(app)
  //       .get(CONTACT_DETAILS_PAGE_URI)
  //       .expect(response => {
  //         expect(response.status).toEqual(StatusCodes.OK);
  //         expectToHaveTitle(response.text, pageTitle);
  //         expectToHaveBackButton(response.text, SERVICE_ADDRESS_PAGE_URI);
  //         expectToHaveInput(response.text, 'line1',
  //           'Building and street <span class=\"govuk-visually-hidden\">line 1 of 2</span>');
  //         expectToHaveInput(response.text, 'line2',
  //           '<span class=\"govuk-visually-hidden\">Building and street line 2 of 2</span>');
  //         expectToHaveInput(response.text, 'town', 'Town or city');
  //         expectToHaveInput(response.text, 'county', 'County');
  //         expectToHaveInput(response.text, 'postcode', 'Postcode');
  //         expectToHaveInput(response.text, 'country', 'Country');
  //       });
  //   });
  
});
