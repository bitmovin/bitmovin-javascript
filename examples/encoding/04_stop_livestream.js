// 04_stop_livestream.js

const Bitmovin = require('bitmovin-javascript').default;

const BITMOVIN_API_KEY = 'INSERT_YOUR_API_KEY';

const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: true});

const main = () => {
  return stopLiveEncoding('ID_OF_ENCODING_TO_STOP')
};

const stopLiveEncoding = (encodingId) => {
  return bitmovin.encoding.encodings(encodingId).stopLive();
};

main().then((stopResponse) => {
  console.log('----------------------------------------------------------------------');
  console.log('Successfully stopped live encoding with id ' + stopResponse.id + '!');
  console.log('----------------------------------------------------------------------');
}).catch((error) => {
  console.error('ERROR!', error);
  process.exit(8);
});