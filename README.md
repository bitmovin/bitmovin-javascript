# Bitmovin Javascript API Client
[![bitmovin](http://bitmovin-a.akamaihd.net/webpages/bitmovin-logo-github.png)](http://www.bitmovin.com)
[![npm version](https://badge.fury.io/js/bitmovin-javascript.svg)](https://badge.fury.io/js/bitmovin-javascript)

TypeScript/JavaScript-Client which enables you to seamlessly integrate the Bitmovin API into your projects. Using this API client requires an active account.

[Sign up for a Bitmovin Account!](https://dashboard.bitmovin.com/signup)

The full API reference can be found [here](https://bitmovin.com/docs).

Installation
------------

``` bash
npm install bitmovin-javascript@3.1.1-alpha.0
```

Initialization
----------

### Node

Using ES6 `import`
```es6
import BitmovinApi from 'bitmovin-javascript';

const bitmovinApi = new BitmovinApi({apiKey: '<YOUR_API_KEY>'});
```

With `require`
```js
exports.__esModule = true;
const BitmovinApi = require('bitmovin-javascript')["default"];

const bitmovinApi = new BitmovinApi({apiKey: '<YOUR_API_KEY>'});
```

### Browser

Use `bitmovin-javascript/dist/bitmovin.browser.js` or `bitmovin.browser.min.js` for the minified version.

### ES5 with Modules (CommonJS)

Import `bitmovin-javascript/dist/index.js`.

### Types

- Typescript (`bitmovin-javascript/dist/index.d.ts`)
