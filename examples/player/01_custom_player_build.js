const Bitmovin = require('bitmovin-javascript').default;
const Promise = require('bluebird');

const BITMOVIN_API_KEY = '<YOUR_API_KEY>';
const bitmovin = new Bitmovin({apiKey: BITMOVIN_API_KEY, debug: false});

const playerVersion = 'v7.6.2';
const domains = ['example.com', 'bitmovin.com'];

const main = () =>
  new Promise((resolve, reject) => {
    const domainPromises = domains.map(domain => createPlayerBuildDomain(domain));

    Promise.all(domainPromises)
      .then(playerBuildDomains => {
        const domainRefs = playerBuildDomains.map(playerBuildDomain => {
          return {
            domainId: playerBuildDomain.id
          };
        });
        const customBuildPromise = createCustomBuild(playerVersion, domainRefs);

        customBuildPromise.then(createdCustomPlayerBuild => {
          bitmovin.player.customBuilds
            .web(createdCustomPlayerBuild.id)
            .start()
            .then(startResponse => {
              console.log('Successfully started player build', startResponse);
              waitForPlayerBuildFinished(createdCustomPlayerBuild)
                .then(() => {
                  console.log('Successfully finished player build');
                  resolve(true);
                })
                .catch(error => {
                  reject(error);
                });
            })
            .catch(error => {
              reject(error);
            });
        });
      })
      .catch(error => {
        reject(error);
      });
  });

const waitForPlayerBuildFinished = playerBuild => {
  return new Promise((resolve, reject) => {
    const waitForPlayerBuildToBeFinishedOrError = () => {
      console.log('Getting Status for player build with ID ', playerBuild.id);
      bitmovin.player.customBuilds
        .web(playerBuild.id)
        .status()
        .then(response => {
          console.log('Player build status is ' + response.status + '.');

          if (response.status === 'FINISHED') {
            return resolve(response.status);
          }

          if (response.status === 'ERROR') {
            return reject(response.status);
          }

          setTimeout(waitForPlayerBuildToBeFinishedOrError, 10000);
        });
    };
    waitForPlayerBuildToBeFinishedOrError();
  });
};

const createPlayerBuildDomain = domain => {
  return new Promise((resolve, reject) => {
    const playerBuildDomain = {
      domain
    };
    bitmovin.player.customBuilds.web.domains
      .add(playerBuildDomain)
      .then(createdPlayerBuildDomain => {
        console.log('Successfully added cutom player build domain', createdPlayerBuildDomain);
        return resolve(createdPlayerBuildDomain);
      })
      .catch(error => {
        console.error('Error adding custom player build domain', error);
        return reject(error);
      });
  });
};

const createCustomBuild = (playerVersion, domains) => {
  return new Promise((resolve, reject) => {
    const customBuild = {
      playerVersion,
      domains
    };

    bitmovin.player.customBuilds.web
      .add(customBuild)
      .then(createdCustomBuild => {
        console.log('Successfully created custom build', createdCustomBuild);
        resolve(createdCustomBuild);
      })
      .catch(error => {
        console.error('Error creating custom build', error);
        reject(error);
      });
  });
};

const exit = (code, message) => {
  console.error('ERROR: ', message, 'Exiting with code ', code);
  process.exit(code);
};

main()
  .then(result => {
    console.log('Finished custom build!');
  })
  .catch(error => {
    exit(100, error);
  });
