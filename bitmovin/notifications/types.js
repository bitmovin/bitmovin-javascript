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
  type: 'CONDITION',
  attribute: StreamConditionMembers,
  operator: ConditionOperators,
  value: string
};

export type CompoundCondition = {
  type: 'AND' | 'OR',
  conditions: Array<Condition>
};

export type Condition = CompoundCondition | StreamCondition;

export type EmailNotification = {
  emails: Array<string>,
  name: ?string,
  description: ?string
} & UserSpecificCustomData;

export type EmailNotificationResource = {
  id: string,
  triggeredAt: ?string,
  resolvedAt: ?string
} & UserSpecificCustomDataDetails;

export type EmailNotificationWithConditions = {
  resolve: ?boolean,
  conditions: Array<Condition>
} & EmailNotification;

export type EmailNotificationWithConditionsDetails = EmailNotificationWithConditions & EmailNotificationResource;