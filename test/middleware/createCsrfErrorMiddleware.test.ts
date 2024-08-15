import sinon, { SinonStubbedInstance } from "sinon";
import middleware from "../../src/middleware/createCsrfErrorMiddleware";
import { expect } from "chai";
import { CsrfError } from "@companieshouse/web-security-node";

const createMockResponse = function () {
  return {
    redirect: sinon.stub(),
    status: sinon.stub(),
    render: sinon.stub(),
  };
};

const createMockNext = function () {
  return sinon.stub();
};

describe("createCsrfErrorMiddleware", function () {
  it("not a csrf error", function () {
    const error = new Error("Not a Csrf error");
    const response = createMockResponse();
    const mockNext = createMockNext();

    // @ts-expect-error
    middleware(error, null, response, mockNext);

    expect(response.status).callCount(0);
    expect(mockNext).to.have.been.calledOnceWithExactly(error);
  });

  it("csrf error", function () {
    const error = new CsrfError("a Csrf error");
    const response = createMockResponse();
    const mockNext = createMockNext();
    response.status.returns(response);

    // @ts-expect-error
    middleware(error, null, response, mockNext);

    expect(response.status).calledOnceWithExactly(403);
    expect(mockNext).callCount(0);
    expect(response.render).to.have.been.calledOnceWithExactly("403", {
      csrfErrors: true,
    });
  });
});
