# veritable-holder

## Deprecation Notice
This application was deprecated on March 14th 2024, there will be no further dependency or security updates.
---

## Description

Front-end for a holder in Veritable. Holders are drone pilot that will be request and holding licenses.

## Getting started

Follow the README in the [demo repo](https://github.com/digicatapult/veritable-poc) to start the cloudagent and von-network.

To start the application, run:

```sh
npm run start
```

## Testing

> Framework - [CYPRESS](https://docs.cypress.io/)
There are two types of tests one for React component as per individual basis and integration for testing different flows. The idea is that component test will be triggered after update to branch excluding **main** and integration for release build or after it has been merged with **main**.


> Run component tests -> `npm t`

> Run integration tests -> `npm run test:integration`

> Plugins are configured in `cyopress/plugins/` folder

- **Component tests**
  - Uses webpack so does not require a build and run [cypress/webpack-dev-server](https://npm.io/package/@cypress/webpack-dev-server)
  - Each component can be tested in isolocation
- **Integration**
  - Will start as a service
  - Allows us to mock endpoints of external parties
  - Part of Github checks for all branches excluding **main**

#### Local Development

Cypress can also be utilised in local development when you require other services you can mock out `api` responses and run under the watch flag. 
```sh
npm run test:dev
```

## Interacting with the ACA Swagger API Layer directly

**[README](https://gist.github.com/andysign/145188bc361ea9dd7e44db1a5a8a282a)**

---

## Connecting Using Custom Endpoint

To connect to a custom backend: when first opening the GUI, instead of clicking `Switch to CustomEndpoint`, select the `Dev` option, fill in the `Custom Endpoint - UserDefined` with your custom endpoint URL and hit `Switch to Custom`.

---

## Folder Structure

All the React components / sub-components, in this project are developed using the _folders-as-components_ methodology (this methodology is described in detail here **[NodeJsOrg article](https://nodejs.org/dist/latest-v7.x/docs/api/modules.html#modules_folders_as_modules)**).

That means that every existing React component here has its own folder with an _index.js_ file and the component itself. This makes importing components more elegant. In addition, certain components are grouped inside folders and sub-folders.
