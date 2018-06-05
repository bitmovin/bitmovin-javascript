// @flow
import urljoin from 'url-join';

import http, {utils} from '../utils/http';
import type {BitmovinConfiguration, HttpClient, List} from '../utils/types';

export type UserSpecificCustomData = {
  customData: ?Object
}

export type UserSpecificCustomDataDetails = {
  createdAt: string,
  modifiedAt: string,
  customData: Object
}

export const CONDITION_MEMBERS = {
  HEIGHT: 'HEIGHT',
  WIDTH: 'WIDTH',
  BITRATE: 'BITRATE',
  FPS: 'FPS',
  ASPECTRATIO: 'ASPECTRATIO',
  INPUTSTREAM: 'INPUTSTREAM',
  LANGUAGE: 'LANGUAGE',
  CHANNELFORMAT: 'CHANNELFORMAT',
  CHANNELLAYOUT: 'CHANNELLAYOUT',
  STREAMCOUNT: 'STREAMCOUNT',
  AUDIOSTREAMCOUNT: 'AUDIOSTREAMCOUNT',
  VIDEOSTREAMCOUNT: 'VIDEOSTREAMCOUNT',
  DURATION: 'DURATION'
};
export type ConditionMembers = $Keys<typeof CONDITION_MEMBERS>;

export const CONDITION_OPERATORS = {
  'LESS_THAN_OR_EQUAL': '<=',
  'LESS_THAN': '<',
  'GREATER_THAN': '>',
  'GREATER_THAN_OR_EQUAL': '>=',
  'EQUAL': '==',
  'UNEQUAL': '!='
};
export type ConditionOperators = $Keys<typeof CONDITION_OPERATORS>;

export type AbstractConditionConditionFirst = {
  attribute: ConditionMembers,
  operator: ConditionOperators,
  value: string
};

export const STREAM_CONDITION_MEMBERS = {
  BITRATE: 'BITRATE',
  CODEC: 'CODEC',
  FPS: 'FPS',
  HEIGHT: 'HEIGHT',
  WIDTH: 'WIDTH',
  MEDIA_TYPE: 'MEDIA_TYPE',
  STREAM_ID: 'STREAM_ID'
};
export type StreamConditionMembers = $Keys<typeof STREAM_CONDITION_MEMBERS>;

export type StreamCondition = {
  attribute: StreamConditionMembers,
  operator: ConditionOperators,
  value: string
} & AbstractConditionConditionFirst

export type AbstractConjunctionIsStreamCondition = {
  conditions: Array<StreamCondition>
}

export type EmailNotification = {
  emails: Array<string>,
  name: ?string,
  description: ?string
} & UserSpecificCustomData;

export type EmailNotificationResource = {
  id: string
} & UserSpecificCustomDataDetails

export type EmailNotificationWithConditions = {
  resolve: ?boolean,
  conditions: Array<AbstractConjunctionIsStreamCondition>
} & EmailNotification

export type EmailNotificationWithConditionsDetails = EmailNotificationWithConditions & EmailNotificationResource

const notifications = (configuration: BitmovinConfiguration, http: HttpClient = http): Notifications => {
  const notificationsBaseUrl = urljoin(configuration.apiBaseUrl, 'notifications');

  const list = (limit, offset, sort, filter) => {
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
    list
  };
};

export type Notifications = {
  list: List<EmailNotificationWithConditionsDetails>
}

export default notifications;
