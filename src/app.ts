import  express from "express";
import nunjucks, { ConfigureOptions } from "nunjucks";
import * as path from "path";
import router from "./routers/routes";
import config from "./config";
import { loggerInstance } from "./utils/Logger";
// needed to add body-parser middleware to parse the POST form fields into a JavaScript object - https://thewebdev.info/2021/07/04/how-to-fix-the-express-js-req-body-undefined-error/
import bodyParser from "body-parser";

import cookieParser from "cookie-parser";
import Redis from "ioredis";
import { SessionMiddleware, SessionStore, CookieConfig } from "@companieshouse/node-session-handler";
import {CsrfProtectionMiddleware} from "@companieshouse/web-security-node"
import csrfErrorHandler from "middleware/createCsrfErrorMiddleware";

const sessionStore = new SessionStore(new Redis(`redis://${config.session.cacheServer}`));
const cookieConfig: CookieConfig = { cookieName: config.session.cookieName, cookieSecret: config.session.cookieSecret, cookieDomain: config.session.cookieDomain };
const sessionMiddleware = SessionMiddleware(cookieConfig, sessionStore);

const csrfProtectionMiddleware = CsrfProtectionMiddleware({
  sessionStore,
  enabled: true,
  sessionCookieName: config.session.cookieName
});

const app = express();

// set some app variables from the environment
app.set("port", process.env.PORT || "3000");
app.set("dev", process.env.NODE_ENV === "development");
app.disable("x-powered-by");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// where nunjucks templates should resolve to
const viewPath = path.join(__dirname, "views");

// set up the template engine
const nunjucksConfig: ConfigureOptions = {
  autoescape: true,
  noCache: false,
  express: app
};

loggerInstance().debug("Starting app in mode [" + config.env + "] using CDN [" + config.cdnHost + "] and sic-code-api at [" + config.internalApiBaseUrl + "]");

nunjucks
  .configure([
    viewPath,
    "node_modules/govuk-frontend/",
    "node_modules/govuk-frontend/components/",
    "node_modules/@companieshouse/"
  ], nunjucksConfig)
  .addGlobal("urlPrefix", config.urlPrefix)
  .addGlobal("assetPath", config.cdnHost);

app.set("views", viewPath);
app.set("view engine", "njk");

// apply our default router to /
app.use("/", router);

app.use(cookieParser());
app.use(sessionMiddleware)
app.use(csrfProtectionMiddleware);
app.use(csrfErrorHandler);

export default app;
