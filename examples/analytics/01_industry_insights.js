const Bitmovin = require('../../dist/index').default;
console.log(Bitmovin);

const BITMOVIN_API_KEY = '<YOUR API KEY>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});
bitmovin.analytics.insights.industry.builder
  .metric('error_percentage')
  .industry('all')
  .subIndustry('test')
  .filter('browser', 'Firefox')
  .query()
  .then(result => {
    console.log('value: ' + result.value);
  })
  .catch(error => {
    console.error('Error getting industry insight!', error);
  });
