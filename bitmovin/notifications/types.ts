// email notifications
export enum EventTypes {
  LIVE_INPUT_STREAM_CHANGED = 'LIVE_INPUT_STREAM_CHANGED',
  ERROR = 'ERROR'
}

export enum ConditionMembers {
  HEIGHT = 'HEIGHT',
  WIDTH = 'WIDTH',
  BITRATE = 'BITRATE',
  FPS = 'FPS',
  ASPECTRATIO = 'ASPECTRATIO',
  INPUTSTREAM = 'INPUTSTREAM',
  LANGUAGE = 'LANGUAGE',
  CHANNELFORMAT = 'CHANNELFORMAT',
  CHANNELLAYOUT = 'CHANNELLAYOUT',
  STREAMCOUNT = 'STREAMCOUNT',
  AUDIOSTREAMCOUNT = 'AUDIOSTREAMCOUNT',
  VIDEOSTREAMCOUNT = 'VIDEOSTREAMCOUNT',
  DURATION = 'DURATION'
}

export enum StreamConditionMembers {
  BITS_READ_AVG = 'bits_read_avg',
  BITS_READ_MIN = 'bits_read_min',
  BITS_READ_MAX = 'bits_read_max',
  SAMPLES_READ_AVG = 'samples_read_avg',
  SAMPLES_READ_MIN = 'samples_read_min',
  SAMPLES_READ_MAX = 'samples_read_max',
  RATE = 'rate',
  CODEC = 'codec',
  HEIGHT = 'height',
  WIDTH = 'width',
  MEDIA_TYPE = 'media_type',
  STREAM_ID = 'stream_id'
}

export enum ConditionOperators {
  LESS_THAN_OR_EQUAL = '<=',
  LESS_THAN = '<',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUAL = '>=',
  EQUAL = '==',
  UNEQUAL = '!='
}

export interface UserSpecificCustomData {
  customData?: any;
}

export interface UserSpecificCustomDataDetails {
  createdAt: string;
  modifiedAt: string;
  customData: any;
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
  conditions: Condition[];
}

export type Condition = CompoundCondition | StreamCondition;

export type EmailNotification = {
  id: string;
  type: 'EMAIL';
  eventType: EventTypes;
  emails: string[];
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

// webhook notifications

export enum EncryptionType {
  AES = 'AES',
  DESede = 'DESede',
  Blowfish = 'Blowfish',
  RSA = 'RSA'
}

export enum SignatureType {
  HMAC = 'HMAC'
}

export interface WebhookEncryptionResponse {
  type: SignatureType;
}

export interface WebhookSignatureResponse {
  type: SignatureType;
}

export enum WebhookHttpMethod {
  POST = 'POST',
  PUT = 'PUT'
}

export interface BitmovinWebhookResponse {
  url: string;
  method?: WebhookHttpMethod;
  insecureSsl?: boolean;
  signature?: WebhookSignatureResponse;
  encryption?: WebhookEncryptionResponse;
}

export type EncodingFinishedWebhookDetails = BitmovinWebhookResponse & {
  url: string;
  id: string;
};

export type BitmovinWebhook = UserSpecificCustomData & {
  url: string;
  method?: WebhookHttpMethod;
  insecureSsl?: boolean;
  signature?: WebhookSignatureResponse;
  encryption?: WebhookEncryptionResponse;
};

export type EncodingFinishedWebhook = BitmovinWebhook & {
  url: string;
};

export type EncodingErrorWebhookDetails = BitmovinWebhookResponse & {
  url: string;
  id: string;
};

export type EncodingErrorWebhook = BitmovinWebhook & {
  url: string;
};

export type TransferFinishedWebhookDetails = BitmovinWebhookResponse & {
  url: string;
  id: string;
};

export type TransferFinishedWebhook = BitmovinWebhook & {
  url: string;
};
