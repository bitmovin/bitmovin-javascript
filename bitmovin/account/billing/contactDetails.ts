import * as urljoin from 'url-join';

import http from '../../utils/http';
import {HttpClient} from '../../utils/types';

export const contactDetails = (configuration, httpClient: HttpClient) => {
  const contactDetailsBaseUrl = urljoin(configuration.apiBaseUrl, 'account', 'billing', 'contact-details');
  const {get, put} = httpClient;

  return {
    details: () => {
      return get(configuration, contactDetailsBaseUrl);
    },
    update: contactDetailsPayload => {
      return put(configuration, contactDetailsBaseUrl, contactDetailsPayload);
    }
  };
};

export default configuration => {
  return contactDetails(configuration, http);
};
