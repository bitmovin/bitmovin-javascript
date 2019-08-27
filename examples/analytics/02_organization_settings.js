const Bitmovin = require('../../dist/index').default;
console.log(Bitmovin);

const BITMOVIN_API_KEY = '<YOUR API KEY>';
const ORGANIZATION_ID = '<YOUR ORGANIZATION ID>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});
bitmovin.analytics.organizations
  .settings(ORGANIZATION_ID)
  .details()
  .then(result => {
    console.log('value: ' + result.value);
  })
  .catch(error => {
    console.error('Error getting details for organization settings!', error);
  });

bitmovin.analytics.organizations
  .settings(ORGANIZATION_ID)
  .update({
    isIndustryOptOut: false,
    industry: 'IT',
    subIndustry: 'Broadcasting'
  })
  .then(result => {
    console.log('value: ' + result.value);
  })
  .catch(error => {
    console.error('Error getting details for organization settings!', error);
  });
