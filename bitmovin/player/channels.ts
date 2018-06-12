import urljoin from 'url-join';

import http, {utils} from '../utils/http';
import {HttpClient} from '../utils/types';

export const channels = (configuration, httpClient: HttpClient) => {
  const {get} = httpClient;
  const resourceDetails = channelName => {
    const versions = {
      list: utils.buildListCallFunction(
        httpClient,
        configuration,
        urljoin(configuration.apiBaseUrl, 'player/channels', channelName, 'versions')
      ),
      latest: () => {
        const url = urljoin(configuration.apiBaseUrl, 'player/channels', channelName, 'versions', 'latest');
        return get(configuration, url);
      }
    };

    return {
      versions
    };
  };

  const list = utils.buildListCallFunction(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'player/channels')
  );

  const resource = Object.assign(resourceDetails, {list});
  return resource;
};

export default configuration => {
  return channels(configuration, http);
};
