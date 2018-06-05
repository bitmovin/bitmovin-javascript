// @flow
import {CONDITION_MEMBERS, CONDITION_OPERATORS, STREAM_CONDITION_MEMBERS} from './enums';

export type ConditionMembers = $Keys<typeof CONDITION_MEMBERS>;
export type ConditionOperators = $Keys<typeof CONDITION_OPERATORS>;
export type StreamConditionMembers = $Keys<typeof STREAM_CONDITION_MEMBERS>;

export type UserSpecificCustomData = {
  customData: ?Object
};

export type UserSpecificCustomDataDetails = {
  createdAt: string,
  modifiedAt: string,
  customData: Object
};

export type AbstractConditionConditionFirst = {
  attribute: ConditionMembers,
  operator: ConditionOperators,
  value: string
};

export type StreamCondition = {
  attribute: StreamConditionMembers,
  operator: ConditionOperators,
  value: string
} & AbstractConditionConditionFirst;

export type AbstractConjunctionIsStreamCondition = {
  conditions: Array<StreamCondition>
};

export type EmailNotification = {
  emails: Array<string>,
  name: ?string,
  description: ?string
} & UserSpecificCustomData;

export type EmailNotificationResource = {
  id: string
} & UserSpecificCustomDataDetails;

export type EmailNotificationWithConditions = {
  resolve: ?boolean,
  conditions: Array<AbstractConjunctionIsStreamCondition>
} & EmailNotification;

export type EmailNotificationWithConditionsDetails = EmailNotificationWithConditions & EmailNotificationResource;
