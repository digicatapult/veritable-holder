# veritable-holder

## Description

Front-end for a holder in Veritable. Holders are drone pilot that will be request and holding licenses.

## Getting started

Follow the README in the [demo repo](https://github.com/digicatapult/veritable-poc) to start the cloudagent and von-network.

To start the application, run:

```sh
npm run start
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
