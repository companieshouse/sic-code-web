import  express from "express";
import * as nunjucks from "nunjucks";
import * as path from "path";
import router from "./routers/routes";
import config from "./config";
// needed to add body-parser middleware to parse the POST form fields into a JavaScript object - https://thewebdev.info/2021/07/04/how-to-fix-the-express-js-req-body-undefined-error/
import bodyParser from "body-parser";

const app = express();

// set some app variables from the environment
app.set("port", process.env.PORT || "3000");
app.set("dev", process.env.NODE_ENV === "development");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// where nunjucks templates should resolve to
const viewPath = path.join(__dirname, "views");

// set up the template engine
const env = nunjucks.configure([
  viewPath,
  "node_modules/govuk-frontend/",
  "node_modules/govuk-frontend/components",
], {
  autoescape: true,
  express: app,
});

app.set("views", viewPath);
app.set("view engine", "njk");
app.use(`/${config.urlPrefix}/public`, express.static(path.join(__dirname, "../dist")));

// serve static assets in development. this will not execute in production.
if (process.env.NODE_ENV === "development") {
  app.use("/static", express.static("dist/static"));
  env.addGlobal("CSS_URL", "/static/app.css");
}
// apply our default router to /
app.use("/", router);

export default app;
