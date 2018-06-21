import * as urljoin from 'url-join';

import {buildListUrl} from '../utils/UrlUtils';
import http, {utils} from '../utils/http';
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
      details: () => httpClient.get<EmailNotificationWithConditionsDetails>(configuration, url),
      delete: () => httpClient.delete_<any>(configuration, url)
    };
  };

  const api = Object.assign(list, {
    emails: emails(configuration, httpClient),
    webhooks: webhooks(configuration, httpClient),
    list: utils.buildListCallFunction<ApiResource<any>>(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'notifications')
    )
  });

  return api;
};

export interface Notifications {
  (notificationId: string): {
    details: Details<EmailNotificationWithConditionsDetails>;
    delete: Delete<any>;
  };

  emails: NotificationEmails;
  webhooks: NotificationWebhooks;
  list: List<any>;
}

export default notifications;
