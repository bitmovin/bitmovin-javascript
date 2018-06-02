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

type ResponseSuccessData<T> = {
  result: T,
  messages: Array<{
    id: string,
    date: string,
    type: string
  }>
};

type ResponseErrorData = {
  code: number,
  message: string,
  developerMessage: string
};

export type ResponseEnvelope<T> = {
  requestId: string,
  status: 'SUCCESS' | 'ERROR',
  data: ResponseSuccessData<T> & ResponseErrorData
};

export type ResponseEnvelopeDelete<T> = {
  requestId: string,
  status: 'SUCCESS' | 'ERROR',
  data: T & {
    id: string
  }
};

export type ApiResource<T> = T & {
  id: string,
  name?: string,
  description?: string,
  createdAt?: string,
  customData?: string
};

export type List<T> = (
  limit?: number,
  offset?: number,
  sort?: string,
  filter?: Object
) => Promise<ResponseEnvelope<Pagination<ApiResource<T>>>>;
export type Create<T> = (data: T) => Promise<ResponseEnvelope<Pagination<ApiResource<T>>>>;
export type Details<T> = () => Promise<ResponseEnvelope<ApiResource<T>>>;
export type Delete<T> = () => Promise<ResponseEnvelopeDelete<T>>;

export type HttpClient = {
  get: (configuration: BitmovinConfiguration, url: string, fetchMethod?: any) => Promise<ResponseEnvelope<>>,
  post: (
    configuration: BitmovinConfiguration,
    url: string,
    object: Object,
    fetchMethod?: any
  ) => Promise<ResponseEnvelope<>>,
  put: (
    configuration: BitmovinConfiguration,
    url: string,
    object: Object,
    fetchMethod?: any
  ) => Promise<ResponseEnvelope<>>,
  delete_: (configuration: BitmovinConfiguration, url: string, fetchMethod?: any) => Promise<ResponseEnvelope<>>
};
