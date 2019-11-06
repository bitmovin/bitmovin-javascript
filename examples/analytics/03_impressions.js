const Bitmovin = require('../../dist/index').default;
console.log(Bitmovin);

const BITMOVIN_API_KEY = '<YOUR API KEY>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});

bitmovin.analytics
  .impressions({
    licenseKey: '<YOUR ANALYTICS LICENSE KEY>',
    start: new Date('2019-11-07').getTime(),
    end: new Date('2019-11-10').getTime(),
    filters: [{name: 'CUSTOM_USER_ID', operator: 'EQ', value: 'customer#1'}]
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error fetching impressions', error);
  });

bitmovin.analytics.impressions
  .details('<IMPRESSION ID>', '<YOUR ANALYTICS LICENSE KEY>')
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error getting impression details', error);
  });
