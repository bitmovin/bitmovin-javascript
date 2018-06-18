import {HttpClient, InternalConfiguration} from '../utils/types';
import http from '../utils/http';

import emails from './emails';
import {NotificationEmails} from './emails';
import webhooks from './webhooks';
import {NotificationWebhooks} from './webhooks';

export const notifications = (configuration: InternalConfiguration, httpClient: HttpClient = http): Notifications => {
  return {
    emails: emails(configuration, httpClient),
    webhooks: webhooks(configuration, httpClient)
  };
};

export type Notifications = {
  emails: NotificationEmails;
  webhooks: NotificationWebhooks;
};

export default notifications;
