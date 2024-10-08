import { StatusCodes } from "http-status-codes";
import request from "supertest";
import app from "../../src/app";

jest.mock("ioredis");

describe("HealthcheckController", () => {
  it("should return 200", async () => {
    await request(app)
      .get("/sic-code-search/healthcheck")
      .expect((response) => {
        expect(response.status).toEqual(StatusCodes.OK);
      });
  });
});
