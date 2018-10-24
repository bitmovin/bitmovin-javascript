import {liveStatistics} from '../../bitmovin/encoding/statistics/liveStatistics';
import {assertItCallsUrlAndReturnsPromise, mockHttp, testSetup} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();
describe('encoding', () => {
  describe('live-statistics', () => {
    beforeEach(testSetup);
    const client = liveStatistics(testConfiguration, 'encoding-id', mockHttp);

    assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/statistics/encodings/encoding-id/live-statistics', client);

    describe('events', () => {
      describe('list', () => {
        describe('un parameterized list call', () => {
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/statistics/encodings/encoding-id/live-statistics/events',
            client.events.list
          );
        });

        describe('list call with limit only', () => {
          const limit = 100;
          const expectedGetParameter = 'limit=' + limit;
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/statistics/encodings/encoding-id/live-statistics/events\\?' + expectedGetParameter,
            () => client.events.list(limit)
          );
        });

        describe('list call with offset only', () => {
          const offset = 0;
          const expectedGetParameter = 'offset=' + offset;
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/statistics/encodings/encoding-id/live-statistics/events\\?' + expectedGetParameter,
            () => client.events.list(undefined, offset)
          );
        });

        describe('list call with sort only', () => {
          const sort = 'createdAt:DESC';
          const expectedGetParameter = 'sort=' + sort;
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/statistics/encodings/encoding-id/live-statistics/events\\?' + expectedGetParameter,
            () => client.events.list(undefined, undefined, sort)
          );
        });

        describe('list call with multiple double filter only', () => {
          const filter = {
            type: ['VOD', 'LIVE'],
            status: ['RUNNING', 'QUEUED']
          };

          const expectedGetParameter = 'type=VOD,LIVE&status=RUNNING,QUEUED';
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/statistics/encodings/encoding-id/live-statistics/events\\?' + expectedGetParameter,
            () => client.events.list(undefined, undefined, undefined, filter)
          );
        });

        describe('fully parameterized list call with multiple double filter', () => {
          const limit = 100;
          const offset = 0;
          const sort = 'createdAt:ASC';
          const filter = {
            type: ['VOD', 'LIVE'],
            status: ['RUNNING', 'QUEUED']
          };

          const expectedGetParameter =
            'type=VOD,LIVE&status=RUNNING,QUEUED&limit=' + limit + '&offset=' + offset + '&sort=' + sort;
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/statistics/encodings/encoding-id/live-statistics/events\\?' + expectedGetParameter,
            () => client.events.list(limit, offset, sort, filter)
          );
        });
      });
    });

    describe('streams', () => {
      describe('list', () => {
        describe('un parameterized list call', () => {
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/statistics/encodings/encoding-id/live-statistics/streams',
            client.streams.list
          );
        });

        describe('list call with limit only', () => {
          const limit = 100;
          const expectedGetParameter = 'limit=' + limit;
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/statistics/encodings/encoding-id/live-statistics/streams\\?' + expectedGetParameter,
            () => client.streams.list(limit)
          );
        });

        describe('list call with offset only', () => {
          const offset = 0;
          const expectedGetParameter = 'offset=' + offset;
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/statistics/encodings/encoding-id/live-statistics/streams\\?' + expectedGetParameter,
            () => client.streams.list(undefined, offset)
          );
        });

        describe('list call with sort only', () => {
          const sort = 'createdAt:DESC';
          const expectedGetParameter = 'sort=' + sort;
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/statistics/encodings/encoding-id/live-statistics/streams\\?' + expectedGetParameter,
            () => client.streams.list(undefined, undefined, sort)
          );
        });

        describe('list call with multiple double filter only', () => {
          const filter = {
            type: ['VOD', 'LIVE'],
            status: ['RUNNING', 'QUEUED']
          };

          const expectedGetParameter = 'type=VOD,LIVE&status=RUNNING,QUEUED';
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/statistics/encodings/encoding-id/live-statistics/streams\\?' + expectedGetParameter,
            () => client.streams.list(undefined, undefined, undefined, filter)
          );
        });

        describe('fully parameterized list call with multiple double filter', () => {
          const limit = 100;
          const offset = 0;
          const sort = 'createdAt:ASC';
          const filter = {
            type: ['VOD', 'LIVE'],
            status: ['RUNNING', 'QUEUED']
          };

          const expectedGetParameter =
            'type=VOD,LIVE&status=RUNNING,QUEUED&limit=' + limit + '&offset=' + offset + '&sort=' + sort;
          assertItCallsUrlAndReturnsPromise(
            'GET',
            '/v1/encoding/statistics/encodings/encoding-id/live-statistics/streams\\?' + expectedGetParameter,
            () => client.streams.list(limit, offset, sort, filter)
          );
        });
      });
    });
  });
});
