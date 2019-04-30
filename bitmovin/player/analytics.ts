import * as urlJoin from 'url-join';

import http from '../utils/http';
import {Create, Delete, HttpClient} from '../utils/types';

export interface Analytics {
  enable: Create<any>;
  disable: Delete<any>;
}

export const analytics = (configuration, licenseId, httpClient: HttpClient): Analytics => {
  const {post, delete_} = httpClient;

  const url = urlJoin(configuration.apiBaseUrl, 'player/licenses', licenseId, 'analytics');

  return {
    enable: payload => {
      return post<any, any>(configuration, url, payload);
    },
    disable: () => {
      return delete_<any>(configuration, url);
    }
  };
};

export default (configuration, licenseId): Analytics => {
  return analytics(configuration, licenseId, http);
};
