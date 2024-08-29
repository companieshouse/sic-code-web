import middleware from "../../src/middleware/createCsrfErrorMiddleware";
import { CsrfError } from "@companieshouse/web-security-node";

const createMockResponse = function () {
  return {
    redirect: jest.fn(),
    status: jest.fn(),
    render: jest.fn(),
  };
};

const createMockNext = function () {
  return jest.fn();
};

describe("createCsrfErrorMiddleware", function () {
  it("not a csrf error", function () {
    const error = new Error("Not a Csrf error");
    const response = createMockResponse();
    const mockNext = createMockNext();

    // @ts-expect-error passing null request
    middleware(error, null, response, mockNext);

    expect(response.status).toHaveBeenCalledTimes(0);
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it("csrf error", function () {
    const error = new CsrfError("a Csrf error");
    const response = createMockResponse();
    const mockNext = createMockNext();
    response.status.mockReturnValue(response);

    // @ts-expect-error passing null request
    middleware(error, null, response, mockNext);

    expect(response.status).toHaveBeenCalledWith(403);
    expect(mockNext).toHaveBeenCalledTimes(0);
    expect(response.render).toHaveBeenCalledWith("403", {
      csrfErrors: true,
    });
  });
});
