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

const webhooks = (configuration: InternalConfiguration, http: HttpClient = httpClient): NotificationWebhooks => {
  const webhooksBaseUrl = urljoin(configuration.apiBaseUrl, 'notifications', 'webhooks');
  const encodingBaseUrl = urljoin(webhooksBaseUrl, 'encoding');
  const encodingsBaseUrl = urljoin(encodingBaseUrl, 'encodings');

  const listAll = (limit, offset, sort, filter) => {
    const url = buildListUrl(webhooksBaseUrl, limit, offset, sort, filter);
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
      encodings: encodingsResource,
      transfers: {
        list: null
      }
    }
  };
};

const createLiveInputStreamChangedMethods = (
  encodingsBaseUrl: string,
  configuration: InternalConfiguration,
  http: HttpClient
): NotificationWebhooksType => {
  const typeBaseUrl = urljoin(encodingsBaseUrl, 'live-input-stream-changed');

  let liveInputStreamChanged = (notificationId: string) => {
    const url = urljoin(typeBaseUrl, notificationId);
    return {
      details: () => http.get<EmailNotificationWithConditionsDetails>(configuration, url),
      delete: () => http.delete_<object>(configuration, url),
      customData: (webhookNotification: EmailNotificationWithConditions) =>
        http.put<EmailNotificationWithConditionsDetails, EmailNotificationWithConditions>(
          configuration,
          url,
          webhookNotification
        )
    };
  };

  const create = (webhookNotification: EmailNotificationWithConditions) => {
    return http.post<EmailNotificationWithConditions, EmailNotificationWithConditions>(
      configuration,
      typeBaseUrl,
      webhookNotification
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

type NotificationWebhooksType = {
  (notificationId: string): {
    details: Details<any>;
    delete: Delete<object>;
    customData: () => Promise<any>;
  };
  create: Create<any>;
  list: List<any>;
};

export type NotificationWebhooks = {
  list: List<any>;
  encoding: {
    list: List<any>;
    encodings: {
      (encodingId: string): {
        finished: NotificationWebhooksType;
      },
      finished: NotificationWebhooksType;
      error: NotificationWebhooksType
    },
    transfers: {
      (encodingId: string): {
        finished: NotificationWebhooksType;
      },
      finished: NotificationWebhooksType;
      error: NotificationWebhooksType
    }
  }
};

export default webhooks;
