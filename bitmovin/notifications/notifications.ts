import * as urljoin from 'url-join';

import {ApiResource, Delete, Details, HttpClient, InternalConfiguration, List, Pagination} from '../utils/types';
import http from '../utils/http';

import emails from './emails';
import {NotificationEmails} from './emails';
import webhooks from './webhooks';
import {NotificationWebhooks} from './webhooks';
import {EmailNotificationWithConditionsDetails} from './types';

export const notifications = (configuration: InternalConfiguration, httpClient: HttpClient = http): Notifications => {
  let notifications = (notificationId: string) => {
    const url = urljoin(configuration.apiBaseUrl, 'notifications', notificationId);
    return {
      details: () => http.get<EmailNotificationWithConditionsDetails>(configuration, url),
      delete: () => http.delete_<object>(configuration, url)
    };
  };

  const api = Object.assign(notifications, {
    emails: emails(configuration, httpClient),
    webhooks: webhooks(configuration, httpClient),
    list: () => http.get<Pagination<ApiResource<object>>>(configuration, urljoin(configuration.apiBaseUrl, 'notifications'))
  });

  return api;
};

export type Notifications = {
  (notificationId: string): {
    details: Details<EmailNotificationWithConditionsDetails>,
    delete: Delete<object>
  },
  emails: NotificationEmails;
  webhooks: NotificationWebhooks;
  list: List<object>
};

export default notifications;
