// @flow
import type {BitmovinConfiguration, HttpClient} from '../utils/types';

import emails from './emails'
import type {NotificationEmails} from './emails'
 
export const notifications = (configuration: BitmovinConfiguration, http: HttpClient): Notifications => {
  return {
    emails: emails(configuration, http)
  }
};

export type Notifications = {
  emails: NotificationEmails
};

