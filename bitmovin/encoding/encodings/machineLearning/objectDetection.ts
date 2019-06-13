import * as urljoin from 'url-join';

import http, {utils} from '../../../utils/http';
import {
  ApiResource,
  Create,
  CustomData,
  Delete,
  Details,
  HttpClient,
  InternalConfiguration,
  List
} from '../../../utils/types';

const OBJECT_DETECTION_PATH = 'machine-learning/object-detection';

export const objectDetection = (
  configuration: InternalConfiguration,
  encodingId: string,
  httpClient: HttpClient
): ObjectDetectionConfigurationDetails => {
  const {get, post, delete_} = httpClient;

  const resourceDetails = (objectDetectionId): ObjectDetectionConfigurationDetail => {
    return {
      details: () => {
        const url = urljoin(
          configuration.apiBaseUrl,
          'encoding/encodings',
          encodingId,
          OBJECT_DETECTION_PATH,
          objectDetectionId
        );

        return get(configuration, url);
      },
      customData: () => {
        const url = urljoin(
          configuration.apiBaseUrl,
          'encoding/encodings',
          encodingId,
          OBJECT_DETECTION_PATH,
          objectDetectionId,
          'customData'
        );
        return get(configuration, url);
      },
      delete: () => {
        const url = urljoin(
          configuration.apiBaseUrl,
          'encoding/encodings',
          encodingId,
          OBJECT_DETECTION_PATH,
          objectDetectionId
        );
        return delete_(configuration, url);
      },
      results: () => {
        const url = urljoin(
          configuration.apiBaseUrl,
          'encoding/encodings',
          encodingId,
          OBJECT_DETECTION_PATH,
          objectDetectionId,
          'results'
        );
        return get(configuration, url);
      }
    };
  };

  const add = config => {
    const url = urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, OBJECT_DETECTION_PATH);
    return post<ApiResource<ObjectDetectionConfig>, any>(configuration, url, config);
  };

  const list = utils.buildListCallFunction<ObjectDetectionConfig>(
    httpClient,
    configuration,
    urljoin(configuration.apiBaseUrl, 'encoding/encodings', encodingId, OBJECT_DETECTION_PATH)
  );

  const resource = Object.assign(resourceDetails, {add, list});
  return resource;
};

interface ObjectDetectionConfig {}
interface ObjectDetectionResult {}

interface ObjectDetectionConfigurationDetail {
  details: Details<ObjectDetectionConfig>;
  delete: Delete<{}>;
  customData: CustomData;
  results: List<ObjectDetectionResult>;
}

export interface ObjectDetectionConfigurationDetails {
  (id: string): ObjectDetectionConfigurationDetail;
  list: List<ObjectDetectionConfig>;
  add: Create<ObjectDetectionConfig>;
}

export default (configuration: InternalConfiguration, encodingId: string): ObjectDetectionConfigurationDetails => {
  return objectDetection(configuration, encodingId, http);
};
