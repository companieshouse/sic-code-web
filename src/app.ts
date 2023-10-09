import  express from "express";
import nunjucks, { ConfigureOptions } from "nunjucks";
import * as path from "path";
import router from "./routers/routes";
import config from "./config";
import { loggerInstance } from "./utils/Logger";
// needed to add body-parser middleware to parse the POST form fields into a JavaScript object - https://thewebdev.info/2021/07/04/how-to-fix-the-express-js-req-body-undefined-error/
import bodyParser from "body-parser";

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
    "node_modules/govuk-frontend/components/"
  ], nunjucksConfig)
  .addGlobal("urlPrefix", config.urlPrefix)
  .addGlobal("assetPath", config.cdnHost);

app.set("views", viewPath);
app.set("view engine", "njk");

// apply our default router to /
app.use("/", router);

export default app;
