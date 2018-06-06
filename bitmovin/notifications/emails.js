// @flow
import urljoin from 'url-join';

import http, {utils} from '../utils/http';
import type {BitmovinConfiguration, Create, Delete, Details, HttpClient, List} from '../utils/types';

import type {EmailNotificationWithConditions, EmailNotificationWithConditionsDetails} from './types';

const createLiveInputStreamChangedMethods = (
  encodingsBaseUrl: string,
  configuration: BitmovinConfiguration,
  http: HttpClient
) => {
  let liveInputStreamChanged = (notificationId: string) => {
    const url = urljoin(encodingsBaseUrl, notificationId);
    return {
      details: () => http.get(configuration, url),
      delete: () => http.delete_(configuration, url),
      replace: (emailNotification: EmailNotificationWithConditions) => http.put(configuration, url, emailNotification)
    };
  };

  liveInputStreamChanged.create = (emailNotification: EmailNotificationWithConditions) => {
    return http.post(configuration, encodingsBaseUrl, emailNotification);
  };

  liveInputStreamChanged.list = (limit, offset, sort, filter) => {
    let url = encodingsBaseUrl;

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

  return liveInputStreamChanged;
};

const emails = (configuration: BitmovinConfiguration, http: HttpClient = http): NotificationEmails => {
  const notificationsBaseUrl = urljoin(configuration.apiBaseUrl, 'notifications', 'emails', 'encoding', 'encodings');

  let encodings = (encodingId: string) => {
    const url = urljoin(notificationsBaseUrl, encodingId);
    return {liveInputStreamChanged: createLiveInputStreamChangedMethods(url, configuration, http)};
  };
  encodings.liveInputStreamChanged = createLiveInputStreamChangedMethods(notificationsBaseUrl, configuration, http);

  return {
    encoding: {
      encodings
    }
  };
};

type NotificationEmailsType = {
  $call: string => {
    details: Details<EmailNotificationWithConditionsDetails>,
    delete: Delete<Object>,
    replace: EmailNotificationWithConditions => Promise<EmailNotificationWithConditionsDetails>
  },
  create: Create<EmailNotificationWithConditions>,
  list: List<EmailNotificationWithConditionsDetails>
}

export type NotificationEmails = {
  encoding: {
    encodings: {
      $call: string => {
        liveInputStreamChanged: NotificationEmailsType
      },
      liveInputStreamChanged: NotificationEmailsType
    }
  }
};

export default emails;
