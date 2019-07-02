import * as urljoin from 'url-join';

import httpClient, {utils} from '../utils/http';
import {
  ApiResource,
  Create2,
  Delete,
  DeleteResult,
  Details,
  HttpClient,
  InternalConfiguration,
  List
} from '../utils/types';

import {
  EncodingErrorWebhook,
  EncodingErrorWebhookDetails,
  EncodingFinishedWebhook,
  EncodingFinishedWebhookDetails,
  TransferFinishedWebhook,
  TransferFinishedWebhookDetails,
  UserSpecificCustomDataDetails,
  WebhookDetails
} from './types';

export {DeleteResult};

const webhooks = (configuration: InternalConfiguration, http: HttpClient = httpClient): NotificationWebhooks => {
  const webhooksBaseUrl = urljoin(configuration.apiBaseUrl, 'notifications', 'webhooks');
  const encodingBaseUrl = urljoin(webhooksBaseUrl, 'encoding');
  const encodingsBaseUrl = urljoin(encodingBaseUrl, 'encodings');
  const transfersBaseUrl = urljoin(encodingBaseUrl, 'transfers');

  const encodings = (encodingId: string) => {
    const url = urljoin(encodingsBaseUrl, encodingId);
    return {
      list: utils.buildListCallFunction<any>(http, configuration, url),
      finished: createMethods<EncodingFinishedWebhook, EncodingFinishedWebhookDetails>(
        url,
        'finished',
        configuration,
        http
      ),
      error: createMethods<EncodingErrorWebhook, EncodingErrorWebhookDetails>(url, 'error', configuration, http)
    };
  };
  const encodingsResource = Object.assign(encodings, {
    finished: createMethods<EncodingFinishedWebhook, EncodingFinishedWebhookDetails>(
      encodingsBaseUrl,
      'finished',
      configuration,
      http
    ),
    error: createMethods<EncodingErrorWebhook, EncodingErrorWebhookDetails>(
      encodingsBaseUrl,
      'error',
      configuration,
      http
    )
  });

  const transfers = (transferId: string) => {
    const url = urljoin(transfersBaseUrl, transferId);
    return {
      finished: createMethods<TransferFinishedWebhook, TransferFinishedWebhookDetails>(
        url,
        'finished',
        configuration,
        http
      ),
      error: createMethods<EncodingErrorWebhook, EncodingErrorWebhookDetails>(url, 'error', configuration, http)
    };
  };
  const transfersResource = Object.assign(transfers, {
    finished: createMethods<TransferFinishedWebhook, TransferFinishedWebhookDetails>(
      transfersBaseUrl,
      'finished',
      configuration,
      http
    ),
    error: createMethods<EncodingErrorWebhook, EncodingErrorWebhookDetails>(
      transfersBaseUrl,
      'error',
      configuration,
      http
    )
  });

  const list = utils.buildListCallFunction<any>(http, configuration, webhooksBaseUrl);

  return {
    encoding: {
      encodings: encodingsResource,
      transfers: transfersResource
    },
    list
  };
};

const createMethods = <T, TDetails>(
  baseUrl: string,
  notificationType: string,
  configuration: InternalConfiguration,
  http: HttpClient
): NotificationWebhooksType<T, TDetails> => {
  const typeBaseUrl = urljoin(baseUrl, notificationType);

  const finished = (notificationId: string) => {
    const url = urljoin(typeBaseUrl, notificationId);
    return {
      details: () => http.get<ApiResource<TDetails>>(configuration, url),
      delete: () => http.delete_<DeleteResult>(configuration, url),
      customData: () => http.get<UserSpecificCustomDataDetails>(configuration, url)
    };
  };

  const create = (webhookNotification: T) => {
    return http.post<ApiResource<TDetails>, T>(configuration, typeBaseUrl, webhookNotification);
  };

  const resource = Object.assign(finished, {
    create,
    list: utils.buildListCallFunction<TDetails>(http, configuration, typeBaseUrl)
  });

  return resource;
};

export interface NotificationWebhooksType<T, TDetails> {
  (notificationId: string): {
    details: Details<TDetails>;
    delete: Delete<DeleteResult>;
    customData: () => Promise<UserSpecificCustomDataDetails>;
  };

  create: Create2<T, TDetails>;
  list: List<TDetails>;
}

export interface NotificationWebhooks {
  list: List<WebhookDetails>;
  encoding: {
    encodings: {
      (encodingId: string): {
        list: List<WebhookDetails>;
        finished: NotificationWebhooksType<EncodingFinishedWebhook, EncodingFinishedWebhookDetails>;
        error: NotificationWebhooksType<EncodingErrorWebhook, EncodingErrorWebhookDetails>;
      };
      finished: NotificationWebhooksType<EncodingFinishedWebhook, EncodingFinishedWebhookDetails>;
      error: NotificationWebhooksType<EncodingErrorWebhook, EncodingErrorWebhookDetails>;
    };
    transfers: {
      (transferId: string): {
        finished: NotificationWebhooksType<TransferFinishedWebhook, TransferFinishedWebhookDetails>;
        error: NotificationWebhooksType<EncodingErrorWebhook, EncodingErrorWebhookDetails>;
      };
      finished: NotificationWebhooksType<TransferFinishedWebhook, TransferFinishedWebhookDetails>;
      error: NotificationWebhooksType<EncodingErrorWebhook, EncodingErrorWebhookDetails>;
    };
  };
}

export default webhooks;
