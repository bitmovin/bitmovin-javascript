# [![bitmovin](http://bitmovin-a.akamaihd.net/webpages/bitmovin-logo-github.png)](http://www.bitmovin.com)

# New API Client (Recommended)

`bitmovin-javascript` is the legacy Bitmovin API client for JavaScript. 

We recommend using the new client, which you can find at [bitmovin-api-sdk-javascript](https://github.com/bitmovin/bitmovin-api-sdk-javascript). Using the new client guarantees 100% specification conformity at any given time and access to all features of the API as soon as they are released.

---

## Bitmovin Javascript API Client 
[![bitmovin](http://bitmovin-a.akamaihd.net/webpages/bitmovin-logo-github.png)](http://www.bitmovin.com)
[![codecov](https://codecov.io/gh/bitmovin/bitmovin-javascript/branch/develop/graph/badge.svg?token=XNzQalljOE)](https://codecov.io/gh/bitmovin/bitmovin-javascript)
[![npm version](https://badge.fury.io/js/bitmovin-javascript.svg)](https://badge.fury.io/js/bitmovin-javascript)
[![Build Status](https://travis-ci.org/bitmovin/bitmovin-javascript.svg?branch=develop)](https://travis-ci.org/bitmovin/bitmovin-javascript)

Javascript-API-Client which enables you to seamlessly integrate the [Bitmovin API](https://bitmovin.com/encoding-documentation/bitmovin-api) into your projects.
Using this API client requires an active account.

[Sign up for a Bitmovin Account!](https://dashboard.bitmovin.com/signup)

The full API reference can be found [here](https://bitmovin.com/encoding-documentation/bitmovin-api/).

Installation 
------------

``` bash
npm install bitmovin-javascript
```
or with yarnpkg
``` bash
yarn add bitmovin-javascript
```

Initialization
----------

### Node

Using ES6 `import`
```es6
import Bitmovin from 'bitmovin-javascript';
const bitmovin = Bitmovin({'apiKey': '<YOUR_API_KEY>'});
```

With `require`
```js
const Bitmovin = require('bitmovin-javascript').default;
const bitmovin = Bitmovin({'apiKey': '<YOUR_API_KEY>'});
```

### Browser

Use `bitmovin-javascript/dist/bitmovin.browser.js` or `bitmovin.browser.min.js` for the minified version.

### ES5 with Modules (CommonJS)

Import `bitmovin-javascript/dist/index.js`.

### Types

- Typescript (`bitmovin-javascript/dist/index.d.ts`)

Usage
-----------

The Bitmovin-Javascript API Client is closely modeled after our Bitmovin API Reference [Bitmovin API](https://bitmovin.com/encoding-documentation/bitmovin-api/).
Each resource in the API Reference has a 1:1 mapping in our API Client.

All methods return a `Promise` Object that will return the fetched result values from the API.

So for example the list all inputs call is defined as `GET v1/encoding/inputs` in our API-Reference and simply corresponds to:

```js
const limit = 100;
const offset = 0;
bitmovin.encoding.inputs.list(limit, offset).then(result => {
  const {items} = result;
  items.forEach(input => {
    console.log(input.name);
  });
});
```

Examples
-----------

An sample DASH & HLS encoding sample can be found in [examples/encoding/01_simple_encoding_dash_manifest.js](https://github.com/bitmovin/bitmovin-javascript/blob/develop/examples/encoding/01_simple_encoding_dash_manifest.js)

For more examples visit our [example page](https://github.com/bitmovin/bitmovin-javascript/tree/develop/examples/encoding).

Contributing
-----------

If you want to contribute feel free to send pull requests. Code quality is ensured through [lint-staged](https://github.com/okonet/lint-staged), please make sure all tests are passing with `yarn test`.

Upgrade from v1
----------------

Version 2 of the Bitmovin JavaScript client still has the same 1:1 mapping as v1. With v2 we improved the bundling and changed the default export to not require a `new` to create a Bitmovin "object".
Internally the client changed quite a lot as you can see in [this pull request](https://github.com/bitmovin/bitmovin-javascript/pull/62).

License
-----------
MIT
