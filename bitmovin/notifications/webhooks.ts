// @flow
import * as urljoin from 'url-join';

import httpClient from '../utils/http';
import {
  Create2,
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
  EncodingFinishedWebhookDetails, TransferFinishedWebhook, TransferFinishedWebhookDetails, UserSpecificCustomDataDetails
} from './types';
import {buildListUrl} from '../utils/UrlUtils';

const webhooks = (configuration: InternalConfiguration, http: HttpClient = httpClient): NotificationWebhooks => {
  const webhooksBaseUrl = urljoin(configuration.apiBaseUrl, 'notifications', 'webhooks');
  const encodingBaseUrl = urljoin(webhooksBaseUrl, 'encoding');
  const encodingsBaseUrl = urljoin(encodingBaseUrl, 'encodings');
  const transfersBaseUrl = urljoin(encodingBaseUrl, 'transfers');

  const encodings = (encodingId: string) => {
    const url = urljoin(encodingsBaseUrl, encodingId);
    return {
      finished: createEncodingsFinishedMethods(url, configuration, http),
      error: createEncodingsErrorMethods(url, configuration, http)
    };
  };
  const encodingsResource = Object.assign(encodings, {
    finished: createEncodingsFinishedMethods(encodingsBaseUrl, configuration, http),
    error: createEncodingsErrorMethods(encodingsBaseUrl, configuration, http)
  });

  return {
    encoding: {
      encodings: encodingsResource,
      transfers: transfersResource
    }
  };
};

const createEncodingsFinishedMethods = (
  encodingsBaseUrl: string,
  configuration: InternalConfiguration,
  http: HttpClient
): NotificationWebhooksType<EncodingFinishedWebhookDetails, EncodingFinishedWebhook, EncodingFinishedWebhookDetails, EncodingFinishedWebhookDetails, DeleteResult, UserSpecificCustomDataDetails> => {
  const typeBaseUrl = urljoin(encodingsBaseUrl, 'finished ');

  let finished = (notificationId: string) => {
    const url = urljoin(typeBaseUrl, notificationId);
    return {
      details: () => http.get<EncodingFinishedWebhookDetails>(configuration, url),
      delete: () => http.delete_<DeleteResult>(configuration, url),
      customData: () =>
        http.get<UserSpecificCustomDataDetails>(
          configuration,
          url
        )
    };
  };

  const create = (webhookNotification: EncodingFinishedWebhook) => {
    return http.post<EncodingFinishedWebhookDetails, EncodingFinishedWebhook>(
      configuration,
      typeBaseUrl,
      webhookNotification
    );
  };

  const list = (limit, offset, sort, filter) => {
    const url = buildListUrl(typeBaseUrl, limit, offset, sort, filter);
    return http.get<Pagination<EncodingFinishedWebhookDetails>>(configuration, url);
  };

  const resource = Object.assign(finished, {
    create,
    list
  });

  return resource;
};

const createEncodingsErrorMethods = (
  encodingsBaseUrl: string,
  configuration: InternalConfiguration,
  http: HttpClient
): NotificationWebhooksType<EncodingErrorWebhookDetails, EncodingErrorWebhook, EncodingErrorWebhookDetails, EncodingErrorWebhookDetails, DeleteResult, UserSpecificCustomDataDetails> => {
  const typeBaseUrl = urljoin(encodingsBaseUrl, 'error ');

  let error = (notificationId: string) => {
    const url = urljoin(typeBaseUrl, notificationId);
    return {
      details: () => http.get<EncodingErrorWebhookDetails>(configuration, url),
      delete: () => http.delete_<DeleteResult>(configuration, url),
      customData: () =>
        http.get<UserSpecificCustomDataDetails>(
          configuration,
          url
        )
    };
  };

  const create = (webhookNotification: EncodingErrorWebhook) => {
    return http.post<EncodingErrorWebhookDetails, EncodingErrorWebhook>(
      configuration,
      typeBaseUrl,
      webhookNotification
    );
  };

  const list = (limit, offset, sort, filter) => {
    const url = buildListUrl(typeBaseUrl, limit, offset, sort, filter);
    return http.get<Pagination<EncodingErrorWebhookDetails>>(configuration, url);
  };

  const resource = Object.assign(error, {
    create,
    list
  });

  return resource;
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
        finished: NotificationWebhooksType<TransferFinishedWebhookDetails, TransferFinishedWebhook, TransferFinishedWebhookDetails, TransferFinishedWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>,
        error: NotificationWebhooksType<EncodingErrorWebhookDetails, EncodingErrorWebhook, EncodingErrorWebhookDetails, EncodingErrorWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>
      },
      finished: NotificationWebhooksType<TransferFinishedWebhookDetails, TransferFinishedWebhook, TransferFinishedWebhookDetails, TransferFinishedWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>,
      error: NotificationWebhooksType<EncodingErrorWebhookDetails, EncodingErrorWebhook, EncodingErrorWebhookDetails, EncodingErrorWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>
    }
  }
};

export default webhooks;
