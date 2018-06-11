export interface BitmovinConfiguration {
  apiKey: string;
  tenantOrgId?: string;
  eMail?: string;
  password?: string;
  debug?: boolean;
  protocol?: string;
  host?: string;
  apiBaseUrl?: string;
  basePath?: string;
  requestTimeout?: number;
  xApiClient?: string;
  additionalHeaders?: Object;
  httpHeaders?: Object;
}

export interface Pagination<T> {
  totalCount: number;
  items: T[];
}

interface ResponseSuccessData<T> {
  result: T;
  messages?: Array<{
    id: string;
    date: string;
    interface: string
  }>;
}

interface ResponseErrorData {
  code: number;
  message: string;
  developerMessage: string;
}

export interface ResponseEnvelope<T> {
  requestId: string;
  status: 'SUCCESS' | 'ERROR';
  data: ResponseSuccessData<T> | ResponseErrorData;
}

export type ApiResource<T> = T & {
  id: string;
  name?: string;
  description?: string;
  createdAt?: string;
  customData?: string
};

interface CustomDataT {
  customData?: string;
  createdAt?: string;
}

export type List<T> = (
  limit?: number,
  offset?: number,
  sort?: string,
  filter?: Object
) => Promise<Pagination<ApiResource<T>>>;

export type Create<T> = (data: T) => Promise<Pagination<ApiResource<T>>>;
export type Details<T> = () => Promise<ApiResource<T>>;
export type Delete<T> = () => Promise<T>;
export type CustomData = () => Promise<CustomDataT>;

export interface HttpClient {
  get: (configuration: BitmovinConfiguration, url: string, fetchMethod?: any) => Promise<Object>;
  post: (configuration: BitmovinConfiguration, url: string, object?: Object, fetchMethod?: any) => Promise<Object>;
  put: (configuration: BitmovinConfiguration, url: string, object?: Object, fetchMethod?: any) => Promise<Object>;
  delete_: (configuration: BitmovinConfiguration, url: string, fetchMethod?: any) => Promise<Object>;
}

declare var __VERSION__: any;
