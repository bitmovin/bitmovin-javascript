import {machineLearning} from '../../bitmovin/encoding/encodings/machineLearning';
import {objectDetection} from '../../bitmovin/encoding/encodings/machineLearning/objectDetection';
import {
  assertItCallsCorrectUrl,
  assertItReturnsUnderlyingPromise,
  mockDelete,
  mockGet,
  mockHttp,
  mockPost,
  testSetup
} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('machine learning', () => {
    beforeEach(testSetup);
    const client = machineLearning(testConfiguration, 'encoding-id', mockHttp);

    describe('object Detection', () => {
      describe('list', () => {
        assertItCallsCorrectUrl(
          'GET',
          'v1/encoding/encodings/encoding-id/machine-learning/object-detection',
          client.objectDetection.list
        );
        assertItReturnsUnderlyingPromise(mockGet, client.objectDetection.list);
      });

      describe('add', () => {
        assertItCallsCorrectUrl(
          'POST',
          'v1/encoding/encodings/encoding-id/machine-learning/object-detection',
          client.objectDetection.add
        );
        assertItReturnsUnderlyingPromise(mockPost, () => client.objectDetection.add({}));
      });

      describe('details', () => {
        assertItCallsCorrectUrl(
          'GET',
          'v1/encoding/encodings/encoding-id/machine-learning/object-detection/object-detection-id',
          client.objectDetection('object-detection-id').details
        );
        assertItReturnsUnderlyingPromise(mockGet, client.objectDetection('object-detection-id').details);
      });

      describe('customData', () => {
        assertItCallsCorrectUrl(
          'GET',
          'v1/encoding/encodings/encoding-id/machine-learning/object-detection/object-detection-id/customData',
          client.objectDetection('object-detection-id').customData
        );
        assertItReturnsUnderlyingPromise(mockGet, client.objectDetection('object-detection-id').customData);
      });

      describe('delete', () => {
        assertItCallsCorrectUrl(
          'DELETE',
          'v1/encoding/encodings/encoding-id/machine-learning/object-detection/object-detection-id',
          client.objectDetection('object-detection-id').delete
        );
        assertItReturnsUnderlyingPromise(mockDelete, client.objectDetection('object-detection-id').delete);
      });

      describe('results', () => {
        assertItCallsCorrectUrl(
          'GET',
          'v1/encoding/encodings/encoding-id/machine-learning/object-detection/object-detection-id/results',
          client.objectDetection('object-detection-id').results
        );
        assertItReturnsUnderlyingPromise(mockGet, client.objectDetection('object-detection-id').results);
      });
    });
  });
});
