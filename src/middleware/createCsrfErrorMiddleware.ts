import { NextFunction, Request, Response } from "express";
import { CsrfError } from "@companieshouse/web-security-node";

const csrfErrorTemplateName = "403";

const csrfErrorHandler = (
  err: CsrfError | Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(err instanceof CsrfError)) {
    return next(err);
  }

  return res.status(403).render(csrfErrorTemplateName, {
    csrfErrors: true,
  });
};

export default csrfErrorHandler;
