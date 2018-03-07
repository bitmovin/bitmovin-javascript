// 04_stop_livestream.js

const Bitmovin = require('bitmovin-javascript').default;
const BITMOVIN_API_KEY = 'INSERT_YOUR_API_KEY';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY});

const ENCODING_ID_TO_STOP = 'ENCODING ID TO STOP';

const main = () => {
  return bitmovin.encoding.encodings(ENCODING_ID_TO_STOP).stopLive();
};

main().then((stopResponse) => {
  console.log('----------------------------------------------------------------------');
  console.log('Successfully stopped live encoding with id ' + stopResponse.id + '!');
  console.log('----------------------------------------------------------------------');
}).catch((error) => {
  console.error('ERROR!', error);
  process.exit(100);
});
