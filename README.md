# [![bitmovin](https://cloudfront-prod.bitmovin.com/wp-content/themes/Bitmovin-V-0.1/images/logo3.png)](http://www.bitmovin.com)
[![codecov](https://codecov.io/gh/bitmovin/bitmovin-javascript/branch/master/graph/badge.svg?token=RTe2DSu4fG)](https://codecov.io/gh/bitmovin/bitmovin-javascript)
Javascript-API-Client which enables you to seamlessly integrate the [Bitmovin API](https://bitmovin.com/video-infrastructure-service-bitmovin-api/) into your projects.
Using this API client requires an active account. [Sign up for a Bitmovin API key](https://bitmovin.com/bitmovins-video-api/).

The full [Bitmovin API reference](https://bitmovin.com/encoding-documentation/bitmovin-api/) can be found on our website.

Installation 
------------

``` bash
npm install bitmovin-javascript
```

Initialization
----------

With Babel/ES6:
```es6
import Bitmovin from 'bitmovin-javascript';
const bitmovin = new Bitmovin({'apiKey': BITMOVIN_API_KEY, debug: false});
```

With NodeJS:

```js
const Bitmovin = require('bitmovin-javascript').default;
const bitmovin = new Bitmovin({'apiKey': BITMOVIN_API_KEY, debug: false});
```

Usage
-----------

The Bitmovin-Javascript API Client is closely modeled after our Bitmovin API Reference [Bitmovin API](https://bitmovin.com/encoding-documentation/bitmovin-api/).
Each resource in the API Reference has a 1:1 mapping in our API Client.

All methods return a `Promise` Object that will return the fetched result values from the API.

So for example the list all inputs call is defined as `GET v1/encoding/inputs` in our API-Reference and simply corresponds to:

```js
const limit = 100;
const offset = 0;
bitmovin.encoding.inputs.listAll(limit, offset).then((inputs) => {
  inputs.forEach((input) => {
    console.log(input.name);
  });
});
```

Examples
-----------

You sample DASH & HLS encoding sample can be found in [examples/encoding/01_simple_encoding_dash_manifest.js](https://github.com/bitmovin/bitmovin-javascript/blob/develop/examples/encoding/01_simple_encoding_dash_manifest.js)

For more examples visit our [example page](https://github.com/bitmovin/bitmovin-javascript/tree/develop/examples/encoding)

