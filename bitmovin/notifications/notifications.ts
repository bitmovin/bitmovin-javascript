import * as urljoin from 'url-join';

import http from '../utils/http';
import {ApiResource, Delete, Details, HttpClient, InternalConfiguration, List, Pagination} from '../utils/types';

import emails from './emails';
import {NotificationEmails} from './emails';
import {EmailNotificationWithConditionsDetails} from './types';
import webhooks from './webhooks';
import {NotificationWebhooks} from './webhooks';

export const notifications = (configuration: InternalConfiguration, httpClient: HttpClient = http): Notifications => {
  const list = (notificationId: string) => {
    const url = urljoin(configuration.apiBaseUrl, 'notifications', notificationId);
    return {
      details: () => http.get<EmailNotificationWithConditionsDetails>(configuration, url),
      delete: () => http.delete_<object>(configuration, url)
    };
  };

  const api = Object.assign(list, {
    emails: emails(configuration, httpClient),
    webhooks: webhooks(configuration, httpClient),
    list: () =>
      http.get<Pagination<ApiResource<object>>>(configuration, urljoin(configuration.apiBaseUrl, 'notifications'))
  });

  return api;
};

export interface Notifications {
  (notificationId: string): {
    details: Details<EmailNotificationWithConditionsDetails>;
    delete: Delete<object>;
  };

  emails: NotificationEmails;
  webhooks: NotificationWebhooks;
  list: List<object>;
}

export default notifications;
