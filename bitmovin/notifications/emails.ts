import * as urljoin from 'url-join';

import {buildListUrl} from '../utils/UrlUtils';
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

const emails = (configuration: InternalConfiguration, http: HttpClient = httpClient): NotificationEmails => {
  const emailsBaseUrl = urljoin(configuration.apiBaseUrl, 'notifications', 'emails');
  const encodingBaseUrl = urljoin(emailsBaseUrl, 'encoding');
  const encodingsBaseUrl = urljoin(encodingBaseUrl, 'encodings');

  const listEncoding = (limit, offset, sort, filter) => {
    const url = buildListUrl(encodingBaseUrl, limit, offset, sort, filter);
    return http.get<Pagination<EmailNotificationWithConditionsDetails>>(configuration, url);
  };

  const encodings = (encodingId: string) => {
    const url = urljoin(encodingsBaseUrl, encodingId);
    return {
      liveInputStreamChanged: createLiveInputStreamChangedMethods(url, configuration, http),
      error: createErrorMethods(url, configuration, http),
      list: utils.buildListCallFunction<EmailNotificationWithConditionsDetails>(http, configuration, url)
    };
  };
  const encodingsResource = Object.assign(encodings, {
    liveInputStreamChanged: createLiveInputStreamChangedMethods(encodingsBaseUrl, configuration, http),
    error: createErrorMethods(encodingsBaseUrl, configuration, http)
  });

  return {
    list: utils.buildListCallFunction<EmailNotificationWithConditionsDetails>(http, configuration, emailsBaseUrl),
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
  return createMethods(typeBaseUrl, configuration, http);
};

const createErrorMethods = (
  encodingsBaseUrl: string,
  configuration: InternalConfiguration,
  http: HttpClient
): NotificationEmailsType => {
  const typeBaseUrl = urljoin(encodingsBaseUrl, 'error');
  return createMethods(typeBaseUrl, configuration, http);
};

const createMethods = (
  typeBaseUrl: string,
  configuration: InternalConfiguration,
  http: HttpClient
): NotificationEmailsType => {
  const specificResource = (notificationId: string) => {
    const url = urljoin(typeBaseUrl, notificationId);
    return {
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

  const resource = Object.assign(specificResource, {
    create
  });

  return resource;
};

interface NotificationEmailsType {
  (notificationId: string): {
    replace: (emailNotification: EmailNotificationWithConditions) => Promise<EmailNotificationWithConditionsDetails>;
  };

  create: Create<EmailNotificationWithConditions>;
}

export interface NotificationEmails {
  list: List<EmailNotificationWithConditionsDetails>;
  encoding: {
    list: List<EmailNotificationWithConditionsDetails>;
    encodings: {
      (encodingId: string): {
        liveInputStreamChanged: NotificationEmailsType;
        error: NotificationEmailsType;
        list: List<EmailNotificationWithConditionsDetails>;
      };
      liveInputStreamChanged: NotificationEmailsType;
      error: NotificationEmailsType;
    };
  };
}

export default emails;
