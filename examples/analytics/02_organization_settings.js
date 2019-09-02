const Bitmovin = require('../../dist/index').default;
console.log(Bitmovin);

const BITMOVIN_API_KEY = '<YOUR API KEY>';
const ORGANIZATION_ID = '<YOUR ORGANIZATION ID>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});
bitmovin.analytics.insights.organizations
  .settings(ORGANIZATION_ID)
  .details()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error getting details for organization settings!', error);
  });

bitmovin.analytics.insights.organizations
  .settings(ORGANIZATION_ID)
  .update({
    includeInInsights: false
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error updating organization settings!', error);
  });
