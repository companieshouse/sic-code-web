import { SicCodeService } from "../../src/services/SicCodeService";
import { generateTestData } from "../TestData";
import {
  expectToHaveTitle,
  expectToHaveTableRow,
  expectToHaveErrorSummaryContaining
} from "./HtmlPatternAssertions";

import request from "supertest";
import app from "../../src/app";

jest.mock("ioredis");

afterEach(() => {
  jest.restoreAllMocks();
});

describe("/sic-code-search", () => {
  describe("GET ", () => {
    test("should respond with a 200 status code and have correct page title", async () => {
      const pageTitle = "Find a Standard Industrial Classification (SIC) code – GOV.UK";
      const response = await request(app).get("/sic-code-search").send();
      expect(response.statusCode).toBe(200);
      expectToHaveTitle(response.text, pageTitle);
    });
  });

  describe("POST ", () => {
    test("should respond with a 200 status code and return testData", async () => {
      const testData = generateTestData();

      jest
        .spyOn(SicCodeService.prototype, "search")
        .mockImplementationOnce(() => Promise.resolve(testData));

      const pageTitle = "Find a Standard Industrial Classification SIC code – GOV.UK";
      const response = await request(app).post("/sic-code-search").send({
        search_string: "barley",
        matchOptions: "or",
      });
      expect(response.statusCode).toBe(200);
      expectToHaveTitle(response.text, pageTitle);
      // Be careful with test data - do not use brakets since this is used in the RegEx even if escaped in the parameter
      expectToHaveTableRow(
        response.text,
        "01110",
        "Growing of cereals except rice, leguminous crops and oil seeds",
        "Barley growing"
      );
      expectToHaveTableRow(
        response.text,
        "11060",
        "Manufacture of malt",
        "Barley malting manufacture"
      );
      expectToHaveTableRow(
        response.text,
        "10611",
        "Grain milling",
        "Barley milling manufacture"
      );
      expectToHaveTableRow(
        response.text,
        "10611",
        "Grain milling",
        "Barley meal production manufacture"
      );
      expectToHaveTableRow(
        response.text,
        "10611",
        "Grain milling",
        "Barley processing blocked, flaked, puffed or pearled manufacture"
      );
    });

    test("should respond with a 200 status code and return testData", async () => {
      jest
        .spyOn(SicCodeService.prototype, "search")
        .mockImplementationOnce(() => Promise.reject(new Error()));

      const pageTitle = "Find a Standard Industrial Classification SIC code – GOV.UK";
      const response = await request(app).post("/sic-code-search").send({
        search_string: "barley",
        matchOptions: "and",
      });
      expect(response.statusCode).toBe(200);
      expectToHaveTitle(response.text, pageTitle);
      expectToHaveErrorSummaryContaining(response.text, "A Server Error occured when trying to find your SIC Code");
    });
  });
});
