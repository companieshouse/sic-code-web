# SIC Code Web

## Overview

This web app allows you to enter keywords for a SIC code search using the [sic-code-api](https://github.com/companieshouse/sic-code-api). A SIC Code is an abbreviation of "Standard industrial classification of economic activities".

It has one screen with a search form, with the following input fields:

- search text: add one or more keywords to be used in the search (the search is case insensitive).
- match phrase checkbox: if selected then results will only be returned if the exact phrase is present.

When this form is submitted then the search parameters are posted to the `sic-code-api` and the results are displayed with the search parameters.

This Node.js application is based on the [Node Web Starter](https://github.com/companieshouse/node-web-starter) template in 2022 and uses:

- [Express](https://expressjs.com),
- [TypeScript](https://typescriptlang.org),
- [GovUK Frontend](https://github.com/alphagov/govuk-frontend).
- [`Axios`](https://axios-http.com/) to call the `sic-code-api`

## Running locally on Docker env

The recommended local development method, using development orchestrator service in [Docker CHS Development](https://github.com/companieshouse/docker-chs-development), that uses [tilt](https://tilt.dev/).

1. Clone [Docker CHS Development](https://github.com/companieshouse/docker-chs-development) and follow the steps in the README.
2. Run `./bin/chs-dev modules enable sic-code`
3. Run `./bin/chs-dev development enable sic-code-web` (this will allow you to make changes in real time).
4. Run docker using `tilt up` in the docker-chs-development directory.
5. Use spacebar in the command line to open tilt window in a browser - wait for sic-code-web to become green.(If you have credential errors then  you may not be logged into `eu-west-2`.)
6. Open your browser and go to page <http://chs.local/sic-code-search>

This 'Docker CHS Development' project has:

1. Environment variables used to configure this service in docker are located in the file `services/modules/sic-code/sic-code-web.docker-compose.yaml`. 
2. The database file to add more data for this environment is in 'services/modules/sic-code/assets/database.mongo.js'

## Build and Test changes

1. To compile the project use `make build`
2. To test the project use `make test`
3. or `make clean build test`

## If you want to run this locally (outside docker), say for easier debugging

Still start the docker environment above so that you can access the `sic-code-api` and CDN

Set environmental variables as in `services/modules/sic-code/sic-code-web.docker-compose.yaml`

`npm run dev`

Go to browser at `http://localhost:3000/sic-code-search`

## Environment Variables

The following is a list of environment variables for the service to run (but these are already set up when using `docker-chs-development`)

Name                                        | Description                                                            | Example Value
------------------------------------------- | ---------------------------------------------------------------------- | ------------------------
INTERNAL_API_URL                            | Base URL to `sic-code-api`                                             | `http://internalapi`
CHS_INTERNAL_API_KEY                        | API Key for calling the `sic-code-api`                                 |
SIC_CODE_API_TIMEOUT_MILLISECONDS           | API call timeout in milliseconds                                       | 10000 (default)
SIC_CODE_WEB_PORT                           | Application port number                                                | 3000 (default)
CDN_HOST                                    | Path to CH Styling for this application                                | View the page source of the [DevHub](https://developer.company-information.service.gov.uk/) page - example `https://d3q1r7ldqt8xxd.cloudfront.net/`

### Testing

[Jest](https://jestjs.io/) is used in testing

  `npm run test`
  `npm run test:coverage`

### Linting

[TSLint](https://palantir.github.io/tslint/) is used to perform static analysis on code style.

  `npm run lint`
