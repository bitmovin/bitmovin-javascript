const Bitmovin = require('../../dist/index').default;
console.log(Bitmovin);

const BITMOVIN_API_KEY = '<YOUR API KEY>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});

bitmovin.analytics.filters
  .customUserId({
    licenseKey: '<YOUR ANALYTICS LICENSE KEY>',
    start: new Date('2019-11-07').getTime(),
    end: new Date('2019-11-10').getTime(),
    query: '<CUSTOM_USER_ID>'
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error fetching impressions', error);
  });
