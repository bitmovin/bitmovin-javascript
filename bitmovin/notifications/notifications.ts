// @flow
import {HttpClient, InternalConfiguration} from '../utils/types';
import http from '../utils/http';

import emails from './emails';
import {NotificationEmails} from './emails';

export const notifications = (configuration: InternalConfiguration, httpClient: HttpClient = http): Notifications => {
  return {
    emails: emails(configuration, httpClient)
  };
};

export type Notifications = {
  emails: NotificationEmails
};

export default notifications;
