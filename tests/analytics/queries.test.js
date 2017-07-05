import {getConfiguration} from '../utils';
import { queries } from '../../bitmovin/analytics/queries';

import {
  mockGet,
  mockPost,
  mockDelete,
  mockHttp,
  methodToMock,
  assertPayload,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup
} from '../assertions';

let testConfiguration = getConfiguration();

describe('analytics', () => {
  beforeEach(testSetup)
  const queriesClient = queries(testConfiguration, mockHttp);

  describe('queries', () => {
    describe('min', () => {
      assertItCallsCorrectUrl('POST', '/v1/analytics/queries/min', queriesClient.min);
      assertItReturnsUnderlyingPromise(mockPost, queriesClient.min);
    });
    describe('max', () => {
      assertItCallsCorrectUrl('POST', '/v1/analytics/queries/max', queriesClient.max);
      assertItReturnsUnderlyingPromise(mockPost, queriesClient.max);
    });
    describe('sum', () => {
      assertItCallsCorrectUrl('POST', '/v1/analytics/queries/sum', queriesClient.sum);
      assertItReturnsUnderlyingPromise(mockPost, queriesClient.sum);
    });
    describe('avg', () => {
      assertItCallsCorrectUrl('POST', '/v1/analytics/queries/avg', queriesClient.avg);
      assertItReturnsUnderlyingPromise(mockPost, queriesClient.avg);
    });
    describe('median', () => {
      assertItCallsCorrectUrl('POST', '/v1/analytics/queries/median', queriesClient.median);
      assertItReturnsUnderlyingPromise(mockPost, queriesClient.median);
    });
    describe('percentile', () => {
      assertItCallsCorrectUrl('POST', '/v1/analytics/queries/percentile', queriesClient.percentile);
      assertItReturnsUnderlyingPromise(mockPost, queriesClient.percentile);
    });
    describe('variance', () => {
      assertItCallsCorrectUrl('POST', '/v1/analytics/queries/variance', queriesClient.variance);
      assertItReturnsUnderlyingPromise(mockPost, queriesClient.variance);
    });
    describe('stddev', () => {
      assertItCallsCorrectUrl('POST', '/v1/analytics/queries/stddev', queriesClient.stddev);
      assertItReturnsUnderlyingPromise(mockPost, queriesClient.stddev);
    });
  });
});
