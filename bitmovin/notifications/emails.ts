// @flow
import urljoin from 'url-join';

import httpClient, {utils} from '../utils/http';
import type {BitmovinConfiguration, Create, Delete, Details, HttpClient, List} from '../utils/types';

import type {EmailNotificationWithConditions, EmailNotificationWithConditionsDetails} from './types';

const emails = (configuration: BitmovinConfiguration, http: HttpClient = httpClient): NotificationEmails => {
  const emailsBaseUrl = urljoin(configuration.apiBaseUrl, 'notifications', 'emails');
  const encodingBaseUrl = urljoin(emailsBaseUrl, 'encoding');
  const encodingsBaseUrl = urljoin(encodingBaseUrl, 'encodings');

  const listAll = (limit, offset, sort, filter) => {
    const url = buildListUrl(emailsBaseUrl, limit, offset, sort, filter);
    return http.get(configuration, url);
  };

  const listEncoding = (limit, offset, sort, filter) => {
    const url = buildListUrl(encodingBaseUrl, limit, offset, sort, filter);
    return http.get(configuration, url);
  };

  let encodings = (encodingId: string) => {
    const url = urljoin(encodingsBaseUrl, encodingId);
    return {liveInputStreamChanged: createLiveInputStreamChangedMethods(url, configuration, http)};
  };
  encodings.liveInputStreamChanged = createLiveInputStreamChangedMethods(encodingsBaseUrl, configuration, http);

  return {
    list: listAll,
    encoding: {
      list: listEncoding,
      encodings
    }
  };
};

const createLiveInputStreamChangedMethods = (
  encodingsBaseUrl: string,
  configuration: BitmovinConfiguration,
  http: HttpClient
) => {
  const typeBaseUrl = urljoin(encodingsBaseUrl, 'live-input-stream-changed');

  let liveInputStreamChanged = (notificationId: string) => {
    const url = urljoin(typeBaseUrl, notificationId);
    return {
      details: () => http.get(configuration, url),
      delete: () => http.delete_(configuration, url),
      replace: (emailNotification: EmailNotificationWithConditions) => http.put(configuration, url, emailNotification)
    };
  };

  liveInputStreamChanged.create = (emailNotification: EmailNotificationWithConditions) => {
    return http.post(configuration, typeBaseUrl, emailNotification);
  };

  liveInputStreamChanged.list = (limit, offset, sort, filter) => {
    const url = buildListUrl(typeBaseUrl, limit, offset, sort, filter);
    return http.get(configuration, url);
  };

  return liveInputStreamChanged;
};

const buildListUrl = (url, limit, offset, sort, filter) => {
  const filterParams = utils.buildFilterParamString(filter);
  let getParams = utils.buildGetParamString({
    ...filterParams,
    limit: limit,
    offset: offset,
    sort: sort
  });
  if (getParams.length > 0) {
    return urljoin(url, getParams);
  }
  return url;
};

type NotificationEmailsType = {
  $call: string => {
    details: Details<EmailNotificationWithConditionsDetails>,
    delete: Delete<Object>,
    replace: EmailNotificationWithConditions => Promise<EmailNotificationWithConditionsDetails>
  },
  create: Create<EmailNotificationWithConditions>,
  list: List<EmailNotificationWithConditionsDetails>
};

export type NotificationEmails = {
  list: List<EmailNotificationWithConditionsDetails>,
  encoding: {
    list: List<EmailNotificationWithConditionsDetails>,
    encodings: {
      $call: string => {
        liveInputStreamChanged: NotificationEmailsType
      },
      liveInputStreamChanged: NotificationEmailsType
    }
  }
};

export default emails;
