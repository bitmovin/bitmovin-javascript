// @flow

//email notifications
export enum ConditionMembers {
  HEIGHT,
  WIDTH,
  BITRATE,
  FPS,
  ASPECTRATIO,
  INPUTSTREAM,
  LANGUAGE,
  CHANNELFORMAT,
  CHANNELLAYOUT,
  STREAMCOUNT,
  AUDIOSTREAMCOUNT,
  VIDEOSTREAMCOUNT,
  DURATION
}

export enum StreamConditionMembers {
  BITRATE,
  CODEC,
  FPS,
  HEIGHT,
  WIDTH,
  MEDIA_TYPE,
  STREAM_ID
}

export enum ConditionOperators {
  LESS_THAN_OR_EQUAL,
  LESS_THAN,
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL,
  EQUAL,
  UNEQUAL
}

export interface UserSpecificCustomData {
  customData?: object;
}

export interface UserSpecificCustomDataDetails {
  createdAt: string;
  modifiedAt: string;
  customData: object;
}

export interface AbstractConditionConditionFirst {
  attribute: ConditionMembers;
  operator: ConditionOperators;
  value: string;
}

export interface StreamCondition {
  type: 'CONDITION';
  attribute: StreamConditionMembers;
  operator: ConditionOperators;
  value: string;
}

export interface CompoundCondition {
  type: 'AND' | 'OR';
  conditions: Array<Condition>;
}

export type Condition = CompoundCondition | StreamCondition;

export type EmailNotification = {
  id: string;
  emails: Array<string>;
  name?: string;
  description?: string;
} & UserSpecificCustomData;

export type EmailNotificationResource = {
  id: string;
  triggeredAt?: string;
  resolvedAt?: string;
} & UserSpecificCustomDataDetails;

export type EmailNotificationWithConditions = {
  resolve?: boolean;
  conditions: Condition;
} & EmailNotification;

export type EmailNotificationWithConditionsDetails = EmailNotificationWithConditions & EmailNotificationResource;

//webhook notifications
