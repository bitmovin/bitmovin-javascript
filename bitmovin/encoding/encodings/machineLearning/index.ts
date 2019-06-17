import http from '../../../utils/http';
import {HttpClient, InternalConfiguration} from '../../../utils/types';

import {objectDetection} from './objectDetection';

export const machineLearning = (
  configuration: InternalConfiguration,
  encodingId: string,
  httpClient: HttpClient
): MachineLearning => ({
  objectDetection: objectDetection(configuration, encodingId, httpClient)
});

export interface MachineLearning {
  objectDetection: any;
}

export default (configuration: InternalConfiguration, encodingId: string): MachineLearning => {
  return machineLearning(configuration, encodingId, http);
};
