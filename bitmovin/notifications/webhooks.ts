// @flow
import * as urljoin from 'url-join';

import httpClient, {utils} from '../utils/http';
import {
  ApiResource,
  Create, Create2,
  Delete,
  Details,
  HttpClient,
  InternalConfiguration,
  List,
  Pagination
} from '../utils/types';

import {
  EmailNotificationWithConditions,
  EmailNotificationWithConditionsDetails, EncodingErrorWebhook, EncodingErrorWebhookDetails, EncodingFinishedWebhook,
  EncodingFinishedWebhookDetails, UserSpecificCustomDataDetails
} from './types';

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

type NotificationWebhooksType<TListResult, TCreateParam, TCreateResult, TDetails, TDelete, TCustomData> = {
  (notificationId: string): {
    details: Details<TDetails>,
    delete: Delete<TDelete>,
    customData: () => Promise<TCustomData>,
  },
  create: Create2<TCreateParam, TCreateResult>,
  list: List<TListResult>
};

interface DeleteResult {
  id: string
};

export type NotificationWebhooks = {
  encoding: {
    encodings: {
      (encodingId: string): {
        finished: NotificationWebhooksType<EncodingFinishedWebhookDetails, EncodingFinishedWebhook, EncodingFinishedWebhookDetails, EncodingFinishedWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>,
        error: NotificationWebhooksType<EncodingErrorWebhookDetails, EncodingErrorWebhook, EncodingErrorWebhookDetails, EncodingErrorWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>
      },
      finished: NotificationWebhooksType<EncodingFinishedWebhookDetails, EncodingFinishedWebhook, EncodingFinishedWebhookDetails, EncodingFinishedWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>,
      error: NotificationWebhooksType<EncodingErrorWebhookDetails, EncodingErrorWebhook, EncodingErrorWebhookDetails, EncodingErrorWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>
    },
    transfers: {
      (encodingId: string): {
        finished: NotificationWebhooksType,
        error: NotificationWebhooksType
      },
      finished: NotificationWebhooksType,
      error: NotificationWebhooksType
    }
  }
};

export default webhooks;
