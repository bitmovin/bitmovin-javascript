import moment from 'moment';

import {getConfiguration} from '../utils';
import {queries} from '../../bitmovin/analytics/queries';
import {
  mockGet,
  mockPost,
  mockDelete,
  mockHttp,
  methodToMock,
  assertPayload,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  assertItReturnsPromise,
  testSetup
} from '../assertions';

let testConfiguration = getConfiguration();

describe('analytics', () => {
  beforeEach(testSetup);
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

    describe('builder', () => {
      const start = moment()
        .subtract(1, 'months')
        .toDate();
      const end = moment().toDate();
      const testBuilderFunction = (func, percentile) => {
        const fn = func('STARTUPTIME', percentile)
          .licenseKey('license-key')
          .between(start, end)
          .interval('DAY')
          .filter('STARTUPTIME', 'GT', 0)
          .filter('CDN_PROVIDER', 'EQ', 'akamai')
          .groupBy('VIDEOID')
          .groupBy('CDN_PROVIDER')
          .orderBy('DAY', 'DESC')
          .orderBy('VIDEOID', 'ASC')
          .limit(10)
          .offset(20);

        assertItReturnsPromise(mockPost, () => {
          return fn.query();
        });
        assertPayload(
          mockPost,
          () => {
            return fn.query();
          },
          {
            dimension: 'STARTUPTIME',
            licenseKey: 'license-key',
            start: start,
            end: end,
            filters: [
              {name: 'STARTUPTIME', operator: 'GT', value: 0},
              {name: 'CDN_PROVIDER', operator: 'EQ', value: 'akamai'}
            ],
            groupBy: ['VIDEOID', 'CDN_PROVIDER'],
            interval: 'DAY',
            orderBy: [{name: 'DAY', order: 'DESC'}, {name: 'VIDEOID', order: 'ASC'}],
            limit: 10,
            offset: 20,
            percentile
          }
        );
      };
      testBuilderFunction(queriesClient.builder.max);
      testBuilderFunction(queriesClient.builder.min);
      testBuilderFunction(queriesClient.builder.avg);
      testBuilderFunction(queriesClient.builder.sum);
      testBuilderFunction(queriesClient.builder.count);
      testBuilderFunction(queriesClient.builder.median);
      testBuilderFunction(queriesClient.builder.variance);
      testBuilderFunction(queriesClient.builder.percentile, 95);
      testBuilderFunction(queriesClient.builder.stddev);

      const testBuilderFunctionAtTheEnd = funcName => {
        const query = queriesClient.builder
          .licenseKey('my-license')
          .between(start, end)
          [funcName]('ERROR_RATE');

        assertPayload(mockPost, () => query.query(), {
          dimension: 'ERROR_RATE',
          licenseKey: 'my-license',
          start,
          end,
          filters: [],
          groupBy: [],
          orderBy: []
        });
      };
      testBuilderFunctionAtTheEnd('max');
      testBuilderFunctionAtTheEnd('min');
      testBuilderFunctionAtTheEnd('avg');
      testBuilderFunctionAtTheEnd('sum');
      testBuilderFunctionAtTheEnd('count');
      testBuilderFunctionAtTheEnd('median');
      testBuilderFunctionAtTheEnd('variance');
      testBuilderFunctionAtTheEnd('percentile');
      testBuilderFunctionAtTheEnd('stddev');

      const testImmutableBuilder = () => {
        const query = queriesClient.builder.count('USER_ID').between(start, end);

        const start1 = moment()
          .subtract(1, 'months')
          .toDate();
        const end1 = moment().toDate();
        const query1 = query.filter('STARTUPTIME', 'GT', 0);
        const query2 = query.filter('CDN_PROVIDER', 'EQ', 'akamai');

        assertPayload(mockPost, () => query1.query(), {
          dimension: 'USER_ID',
          start,
          end,
          filters: [
            {
              name: 'STARTUPTIME',
              operator: 'GT',
              value: 0
            }
          ],
          groupBy: [],
          orderBy: []
        });

        assertPayload(mockPost, () => query2.query(), {
          dimension: 'USER_ID',
          start,
          end,
          filters: [
            {
              name: 'CDN_PROVIDER',
              operator: 'EQ',
              value: 'akamai'
            }
          ],
          groupBy: [],
          orderBy: []
        });
      };
      testImmutableBuilder();
    });
  });
});
