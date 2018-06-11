import urljoin from 'url-join';

import http from '../../utils/http';

export const contactDetails = (configuration, http) => {
  const contactDetailsBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'billing', 'contact-details');
  const {get, put} = http;

  return {
    details: () => {
      return get(configuration, contactDetailsBaseUrl);
    },
    update: contactDetails => {
      return put(configuration, contactDetailsBaseUrl, contactDetails);
    }
  };
};

export default configuration => {
  return contactDetails(configuration, http);
};
