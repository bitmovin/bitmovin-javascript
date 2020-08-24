const Bitmovin = require('../../dist/index').default;
console.log(Bitmovin);

const BITMOVIN_API_KEY = '<YOUR API KEY>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});

bitmovin.analytics.releases.platforms
  .list()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error fetching platforms', error);
  });

bitmovin.analytics.releases
  .platforms('web')
  .channels.list()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error fetching channels', error);
  });

bitmovin.analytics.releases
  .platforms('web')
  .channels('stable')
  .versions.list()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error fetching versions', error);
  });
