// @flow
import urljoin from 'url-join';

import http, {utils} from '../utils/http';
import type {BitmovinConfiguration, Create, Delete, Details, HttpClient, List, ResponseEnvelope} from '../utils/types';

import type {EmailNotificationWithConditions, EmailNotificationWithConditionsDetails} from './types';

const emails = (configuration: BitmovinConfiguration, http: HttpClient = http): NotificationEmails => {
  const notificationsBaseUrl = urljoin(configuration.apiBaseUrl, 'notifications');

  let encodings = (encodingId: string): Object => {

  };

  encodings.list = (limit, offset, sort, filter) => {
    let url = urljoin(notificationsBaseUrl, 'emails', 'encoding', 'encodings', 'live-input-stream-changed');

    const filterParams = utils.buildFilterParamString(filter);
    let getParams = utils.buildGetParamString({
      ...filterParams,
      limit: limit,
      offset: offset,
      sort: sort
    });
    if (getParams.length > 0) {
      url = urljoin(url, getParams);
    }

    return http.get(configuration, url);
  };

  return {
    encoding: {
      encodings
    }
  };
};

export type NotificationEmails = {
  encoding: {
    encodings: {
      $call: string => {
        liveInputStreamChanged: {
          $call: () => {
            details: Details<EmailNotificationWithConditionsDetails>,
            delete: Delete<Object>,
            replace: EmailNotificationWithConditions => Promise<EmailNotificationWithConditionsDetails>
          },
          create: () => Create<EmailNotificationWithConditions>,
          list: List<EmailNotificationWithConditionsDetails>
        }
      },
      liveInputStreamChanged: {
        $call: () => {
          details: Details<EmailNotificationWithConditionsDetails>,
          delete: Delete<Object>,
          replace: EmailNotificationWithConditions => Promise<EmailNotificationWithConditionsDetails>
        },
        create: () => Create<EmailNotificationWithConditions>,
        list: List<EmailNotificationWithConditionsDetails>
      }
    }
  }
};

export default emails;
