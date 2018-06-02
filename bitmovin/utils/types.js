// @flow

export type BitmovinConfiguration = {
  apiKey: string,
  tenantOrgId?: string,
  eMail?: string,
  password?: string,
  debug?: boolean,
  protocol?: string,
  host?: string,
  apiBaseUrl?: string,
  basePath?: string,
  requestTimeout?: number,
  xApiClient?: string,
  additionalHeaders?: Object,
  httpHeaders?: Object
};

export type Pagination<T> = {
  totalCount: number,
  items: Array<T>
};

type ResponseSuccessData<T> = {|
  result: T,
  messages?: Array<{
    id: string,
    date: string,
    type: string
  }>
|};

type ResponseErrorData = {|
  code: number,
  message: string,
  developerMessage: string
|};

export type ResponseEnvelope<T> = {
  requestId: string,
  status: 'SUCCESS' | 'ERROR',
  data: ResponseSuccessData<T> | ResponseErrorData
};

export type ApiResource<T> = T & {
  id: string,
  name?: string,
  description?: string,
  createdAt?: string,
  customData?: string
};

type CustomDataT = {
  customData?: string,
  createdAt?: string
};

export type List<T> = (
  limit?: number,
  offset?: number,
  sort?: string,
  filter?: Object
) => Promise<ResponseEnvelope<Pagination<ApiResource<T>>>>;
export type Create<T> = (data: T) => Promise<ResponseEnvelope<Pagination<ApiResource<T>>>>;
export type Details<T> = () => Promise<ResponseEnvelope<ApiResource<T>>>;
export type Delete<T> = () => Promise<ResponseEnvelope<T>>;
export type CustomData = () => Promise<ResponseEnvelope<CustomDataT>>;

export type HttpClient = {
  get: (configuration: BitmovinConfiguration, url: string, fetchMethod?: any) => Promise<ResponseEnvelope<Object>>,
  post: (
    configuration: BitmovinConfiguration,
    url: string,
    object?: Object,
    fetchMethod?: any
  ) => Promise<ResponseEnvelope<Object>>,
  put: (
    configuration: BitmovinConfiguration,
    url: string,
    object?: Object,
    fetchMethod?: any
  ) => Promise<ResponseEnvelope<Object>>,
  delete_: (configuration: BitmovinConfiguration, url: string, fetchMethod?: any) => Promise<ResponseEnvelope<Object>>
};
