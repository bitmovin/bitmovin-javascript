// @flow
import type {BitmovinConfiguration, HttpClient} from '../utils/types';
import http from '../utils/http';

import emails from './emails';
import type {NotificationEmails} from './emails';

export const notifications = (configuration: BitmovinConfiguration, httpClient: HttpClient = http): Notifications => {
  return {
    emails: emails(configuration, httpClient)
  };
};

export type Notifications = {
  emails: NotificationEmails
};

export default notifications;
