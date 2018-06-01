import {getConfiguration} from '../utils';
import {statistics} from '../../bitmovin/encoding/statistics';
import {dateToApiRequestString, getFirstDayOfTheWeekFromDate} from '../../bitmovin/utils/DateUtils';
import {
  mockHttp,
  assertItCallsUrlAndReturnsPromise,
  testSetup, mockGet
} from '../assertions';

let testConfiguration = getConfiguration();
describe('encoding', () => {
  beforeEach(testSetup);
  const client = statistics(testConfiguration, mockHttp);

  describe('statistics', () => {
    describe('overall', () => {
      assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/statistics', client.overall);
    });

    describe('daily', () => {
      assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/statistics/daily', client.daily);
    });

    describe('encodings', () => {
      describe('live-statistics', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/statistics/encodings/encoding-id/live-statistics', client.encodings('encoding-id').liveStatistics);
      });

      describe('vod', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/statistics/encodings/vod', client.vod.list);
      });

      describe('vod within dates', () => {
        const startDate = dateToApiRequestString(getFirstDayOfTheWeekFromDate());
        const endDate = dateToApiRequestString(new Date());

        const expectedUrl = `/v1/encoding/statistics/encodings/vod/${startDate}/${endDate}`;

        it(`Should call GET with ${expectedUrl} once.`, () => {
          return client.vod.list({from: startDate, to: endDate}).then(() => {
            expect(mockGet).toBeCalled();
          });
        });
        it(`should call GET with ${expectedUrl}`, () => {
          return client.vod.list({from: startDate, to: endDate}).then(() => {
            expect(mockGet.mock.calls[0][1]).toEqual(expect.stringMatching(expectedUrl));
          });
        });
      });

      describe('vod daily within dates', () => {
        const startDate = dateToApiRequestString(getFirstDayOfTheWeekFromDate());
        const endDate = dateToApiRequestString(new Date());

        const expectedUrl = `/v1/encoding/statistics/encodings/vod/daily/${startDate}/${endDate}`;

        it(`Should call GET with ${expectedUrl} once.`, () => {
          return client.vod.daily({from: startDate, to: endDate}).then(() => {
            expect(mockGet).toBeCalled();
          });
        });
        it(`should call GET with ${expectedUrl}`, () => {
          return client.vod.daily({from: startDate, to: endDate}).then(() => {
            expect(mockGet.mock.calls[0][1]).toEqual(expect.stringMatching(expectedUrl));
          });
        });
      });


      describe('live', () => {
        assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/statistics/encodings/live', client.live.list);
      });

      describe('live within dates', () => {
        const startDate = dateToApiRequestString(getFirstDayOfTheWeekFromDate());
        const endDate = dateToApiRequestString(new Date());

        const expectedUrl = `/v1/encoding/statistics/encodings/live/${startDate}/${endDate}`;

        it(`Should call GET with ${expectedUrl} once.`, () => {
          return client.live.list({from: startDate, to: endDate}).then(() => {
            expect(mockGet).toBeCalled();
          });
        });

        it(`should call GET with ${expectedUrl}`, () => {
          return client.live.list({from: startDate, to: endDate}).then(() => {
            const calledUrl = mockGet.mock.calls[0][1];
            expect(calledUrl).toEqual(expect.stringMatching(expectedUrl));
          });
        });
      });

      describe('live daily within dates', () => {
        const startDate = dateToApiRequestString(getFirstDayOfTheWeekFromDate());
        const endDate = dateToApiRequestString(new Date());

        const expectedUrl = `/v1/encoding/statistics/encodings/live/daily/${startDate}/${endDate}`;

        it(`Should call GET with ${expectedUrl} once.`, () => {
          return client.live.daily({from: startDate, to: endDate}).then(() => {
            expect(mockGet).toBeCalled();
          });
        });

        it(`should call GET with ${expectedUrl}`, () => {
          return client.live.daily({from: startDate, to: endDate}).then(() => {
            const calledUrl = mockGet.mock.calls[0][1];
            expect(calledUrl).toEqual(expect.stringMatching(expectedUrl));
          });
        });
      });

    });

  });
});
