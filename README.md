# camunda-8-connector-openweather-api-nodejs

![Compatible with: Camunda Platform 8](https://img.shields.io/badge/Compatible%20with-Camunda%20Platform%208-0072Ce)
[![](https://img.shields.io/badge/Community%20Extension-An%20open%20source%20community%20maintained%20project-FF4700)](https://github.com/camunda-community-hub/community)
[![](https://img.shields.io/badge/Lifecycle-Proof%20of%20Concept-blueviolet)](https://github.com/Camunda-Community-Hub/community/blob/main/extension-lifecycle.md#proof-of-concept-)

A Node.js Camunda 8 Connector to retrieve data from the OpenWeather API.

For instructions on how to run this connector, see the [Camunda 8 Connector SDK for Node.js](https://github.com/camunda-community-hub/connector-sdk-nodejs).

For an explanation of the source code of this connector, see [this tutorial article](https://medium.com/@sitapati/how-to-build-a-camunda-8-connector-using-the-node-js-sdk-5eb3d798f9ff).

## API

### Input

```json
{
  "latitude": ".....",
  "longitude": ".....",
  "units": "....",
  "apiKey": "....",
  "resultVariable": "..."
}
```

### Output

```json
{
  [resultVariable || "weather"]: {
    "forecast": "....",
    "code": "...."
  }
}
```