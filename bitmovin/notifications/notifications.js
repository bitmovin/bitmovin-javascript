// @flow
import urljoin from 'url-join';

import http from '../utils/http';
import type {BitmovinConfiguration, HttpClient} from '../utils/types';

export const notifications = (configuration: BitmovinConfiguration, http: HttpClient = http) => {
  const {get, post} = http;
  const notificationsBaseUrl = urljoin(configuration.apiBaseUrl, 'notifications');

  return {
  };
};

export default notifications;
