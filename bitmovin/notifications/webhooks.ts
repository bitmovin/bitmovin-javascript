// @flow
import * as urljoin from 'url-join';

import httpClient from '../utils/http';
import {
  ApiResource,
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
      finished: createMethods<EncodingFinishedWebhookDetails, EncodingFinishedWebhook, EncodingFinishedWebhookDetails, EncodingFinishedWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>(url, 'finished', configuration, http),
      error: createMethods<EncodingErrorWebhookDetails, EncodingErrorWebhook, EncodingErrorWebhookDetails, EncodingErrorWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>(url, 'error', configuration, http)
    };
  };
  const encodingsResource = Object.assign(encodings, {
    finished: createMethods<EncodingFinishedWebhookDetails, EncodingFinishedWebhook, EncodingFinishedWebhookDetails, EncodingFinishedWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>(encodingsBaseUrl, 'finished', configuration, http),
    error: createMethods<EncodingErrorWebhookDetails, EncodingErrorWebhook, EncodingErrorWebhookDetails, EncodingErrorWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>(encodingsBaseUrl, 'error', configuration, http)
  });

  return {
    encoding: {
      encodings: encodingsResource,
      transfers: transfersResource
    }
  };
};

const createMethods = <TListResult, TCreateParam, TCreateResult, TDetails, TDelete, TCustomData>(
  baseUrl: string,
  notificationType: string,
  configuration: InternalConfiguration,
  http: HttpClient
): NotificationWebhooksType<TListResult, TCreateParam, TCreateResult, TDetails, TDelete, TCustomData> => {
  const typeBaseUrl = urljoin(baseUrl, notificationType);

  let finished = (notificationId: string) => {
    const url = urljoin(typeBaseUrl, notificationId);
    return {
      details: () => http.get<ApiResource<TDetails>>(configuration, url),
      delete: () => http.delete_<TDelete>(configuration, url),
      customData: () =>
        http.get<TCustomData>(
          configuration,
          url
        )
    };
  };

  const create = (webhookNotification: TCreateParam) => {
    return http.post<ApiResource<TCreateResult>, TCreateParam>(
      configuration,
      typeBaseUrl,
      webhookNotification
    );
  };

  const list = (limit, offset, sort, filter) => {
    const url = buildListUrl(typeBaseUrl, limit, offset, sort, filter);
    return http.get<Pagination<TListResult>>(configuration, url);
  };

  const resource = Object.assign(finished, {
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
      (transferId: string): {
        finished: NotificationWebhooksType<TransferFinishedWebhookDetails, TransferFinishedWebhook, TransferFinishedWebhookDetails, TransferFinishedWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>,
        error: NotificationWebhooksType<EncodingErrorWebhookDetails, EncodingErrorWebhook, EncodingErrorWebhookDetails, EncodingErrorWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>
      },
      finished: NotificationWebhooksType<TransferFinishedWebhookDetails, TransferFinishedWebhook, TransferFinishedWebhookDetails, TransferFinishedWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>,
      error: NotificationWebhooksType<EncodingErrorWebhookDetails, EncodingErrorWebhook, EncodingErrorWebhookDetails, EncodingErrorWebhookDetails, DeleteResult, UserSpecificCustomDataDetails>
    }
  }
};

export default webhooks;
