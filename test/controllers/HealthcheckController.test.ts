import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from "../../src/app";
describe('HealthcheckController', () => {

  it('should return 200', async () => {
    await request(app)
      .get("/sic-code-search/healthchecks")
      .expect(response => {
        expect(response.status).toEqual(StatusCodes.OK);
      });
  });
});
