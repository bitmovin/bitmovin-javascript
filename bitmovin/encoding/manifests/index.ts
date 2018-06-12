import urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {HttpClient} from '../../utils/types';

import dashManifests from './dash';
import hlsManifests from './hls';
import smoothManifests from './smooth';

export const manifests = (configuration, httpClient: HttpClient) => {
  return {
    list: utils.buildListCallFunction(
      httpClient,
      configuration,
      urljoin(configuration.apiBaseUrl, 'encoding/manifests')
    ),
    dash: dashManifests(configuration),
    hls: hlsManifests(configuration),
    smooth: smoothManifests(configuration)
  };
};

export default configuration => {
  return manifests(configuration, http);
};
