import { createLogger } from '@companieshouse/structured-logging-node';
import ApplicationLogger from '@companieshouse/structured-logging-node/lib/ApplicationLogger';
import config from "../config";

let logger: ApplicationLogger;

export function loggerInstance(): ApplicationLogger {
  if (!logger) {
    logger = createLogger(config.applicationNamespace);
  }
  return logger;
}
