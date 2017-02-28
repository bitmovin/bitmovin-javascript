const settings = require('./settings.json');

const getConfiguration = () => {
  return {
    apiBaseUrl : 'https://api.bitmovin.com/v1/',
    httpHeaders: {
      'Content-Type'        : 'application/json',
      'X-Api-Key'           : settings.apiKey,
      'X-Tenant-Org-Id'     : settings.tenantOrgId,
      'X-Api-Client'        : 'bitmovin-javascript',
      'X-Api-Client-Version': '0.0.1'
    },
    eMail: settings.eMail,
    password: settings.password
  };

};

module.exports = {
  getConfiguration
};
