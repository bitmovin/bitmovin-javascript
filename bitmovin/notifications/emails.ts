// @flow
import * as urljoin from 'url-join';

import httpClient, {utils} from '../utils/http';
import {
  ApiResource,
  Create,
  Delete,
  Details,
  HttpClient,
  InternalConfiguration,
  List,
  Pagination
} from '../utils/types';

import {EmailNotificationWithConditions, EmailNotificationWithConditionsDetails} from './types';
import {buildListUrl} from '../utils/UrlUtils';

const emails = (configuration: InternalConfiguration, http: HttpClient = httpClient): NotificationEmails => {
  const emailsBaseUrl = urljoin(configuration.apiBaseUrl, 'notifications', 'emails');
  const encodingBaseUrl = urljoin(emailsBaseUrl, 'encoding');
  const encodingsBaseUrl = urljoin(encodingBaseUrl, 'encodings');

  const listAll = (limit, offset, sort, filter) => {
    const url = buildListUrl(emailsBaseUrl, limit, offset, sort, filter);
    return http.get<Pagination<EmailNotificationWithConditionsDetails>>(configuration, url);
  };

  const listEncoding = (limit, offset, sort, filter) => {
    const url = buildListUrl(encodingBaseUrl, limit, offset, sort, filter);
    return http.get<Pagination<EmailNotificationWithConditionsDetails>>(configuration, url);
  };

  const encodings = (encodingId: string) => {
    const url = urljoin(encodingsBaseUrl, encodingId);
    return {liveInputStreamChanged: createLiveInputStreamChangedMethods(url, configuration, http)};
  };
  const encodingsResource = Object.assign(encodings, {
    liveInputStreamChanged: createLiveInputStreamChangedMethods(encodingsBaseUrl, configuration, http)
  });

  return {
    list: listAll,
    encoding: {
      list: listEncoding,
      encodings: encodingsResource
    }
  };
};

const createLiveInputStreamChangedMethods = (
  encodingsBaseUrl: string,
  configuration: InternalConfiguration,
  http: HttpClient
): NotificationEmailsType => {
  const typeBaseUrl = urljoin(encodingsBaseUrl, 'live-input-stream-changed');

  let liveInputStreamChanged = (notificationId: string) => {
    const url = urljoin(typeBaseUrl, notificationId);
    return {
      details: () => http.get<EmailNotificationWithConditionsDetails>(configuration, url),
      delete: () => http.delete_<object>(configuration, url),
      replace: (emailNotification: EmailNotificationWithConditions) =>
        http.put<EmailNotificationWithConditionsDetails, EmailNotificationWithConditions>(
          configuration,
          url,
          emailNotification
        )
    };
  };

  const create = (emailNotification: EmailNotificationWithConditions) => {
    return http.post<EmailNotificationWithConditions, EmailNotificationWithConditions>(
      configuration,
      typeBaseUrl,
      emailNotification
    );
  };

  const list = (limit, offset, sort, filter) => {
    const url = buildListUrl(typeBaseUrl, limit, offset, sort, filter);
    return http.get<Pagination<EmailNotificationWithConditionsDetails>>(configuration, url);
  };

  const resource = Object.assign(liveInputStreamChanged, {
    create,
    list
  });

  return resource;
};

type NotificationEmailsType = {
  (notificationId: string): {
    details: Details<EmailNotificationWithConditionsDetails>;
    delete: Delete<object>;
    replace: (emailNotification: EmailNotificationWithConditions) => Promise<EmailNotificationWithConditionsDetails>;
  };
  create: Create<EmailNotificationWithConditions>;
  list: List<EmailNotificationWithConditionsDetails>;
};

export type NotificationEmails = {
  list: List<EmailNotificationWithConditionsDetails>;
  encoding: {
    list: List<EmailNotificationWithConditionsDetails>;
    encodings: {
      (encodingId: string): {
        liveInputStreamChanged: NotificationEmailsType;
      };
      liveInputStreamChanged: NotificationEmailsType;
    };
  };
};

export default emails;
