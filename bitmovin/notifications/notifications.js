// @flow
import urljoin from 'url-join';

import http, {utils} from '../utils/http';
import type {BitmovinConfiguration, HttpClient, List} from '../utils/types';

import type {EmailNotificationWithConditionsDetails} from './types';

const notifications = (configuration: BitmovinConfiguration, http: HttpClient = http): Notifications => {
  const notificationsBaseUrl = urljoin(configuration.apiBaseUrl, 'notifications');

  const list = (limit, offset, sort, filter) => {
    let url = urljoin(notificationsBaseUrl, 'emails', 'encoding', 'encodings', 'live-input-stream-changed');

    const filterParams = utils.buildFilterParamString(filter);
    let getParams = utils.buildGetParamString({
      ...filterParams,
      limit: limit,
      offset: offset,
      sort: sort
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return http.get(configuration, url);
  };

  return {
    list
  };
};

export type Notifications = {
  list: List<EmailNotificationWithConditionsDetails>
};

export default notifications;
