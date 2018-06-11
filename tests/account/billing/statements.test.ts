import {statements} from '../../../bitmovin/account/billing/statements';
import {getConfiguration} from '../../utils';
import {
  mockGet,
  mockHttp,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup
} from '../../assertions';

let testConfiguration = getConfiguration();

describe('account', () => {
  beforeEach(testSetup);
  describe('billing', () => {
    describe('statements/encodings', () => {
      const client = statements(testConfiguration, mockHttp);
      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/account/billing/statements/encoding', client.encoding.list);
        assertItReturnsUnderlyingPromise(mockGet, client.encoding.list);
      });

      describe('list with limit offset', () => {
        const limit = 100;
        const offset = 15;
        const expectedGetParameters = '\\?limit=' + limit + '&offset=' + offset;

        assertItCallsCorrectUrl('GET', '/v1/account/billing/statements/encoding' + expectedGetParameters, () =>
          client.encoding.list(limit, offset)
        );
        assertItReturnsUnderlyingPromise(mockGet, client.encoding.list);
      });
    });

    describe('statements/player', () => {
      const client = statements(testConfiguration, mockHttp);
      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/account/billing/statements/player', client.player.list);
        assertItReturnsUnderlyingPromise(mockGet, client.player.list);
      });

      describe('list with limit offset', () => {
        const limit = 100;
        const offset = 15;
        const expectedGetParameters = '\\?limit=' + limit + '&offset=' + offset;

        assertItCallsCorrectUrl('GET', '/v1/account/billing/statements/player' + expectedGetParameters, () =>
          client.player.list(limit, offset)
        );
        assertItReturnsUnderlyingPromise(mockGet, client.encoding.list);
      });
    });

    describe('statements/analytics', () => {
      const client = statements(testConfiguration, mockHttp);
      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/account/billing/statements/analytics', client.analytics.list);
        assertItReturnsUnderlyingPromise(mockGet, client.player.list);
      });

      describe('list with limit offset', () => {
        const limit = 100;
        const offset = 15;
        const expectedGetParameters = '\\?limit=' + limit + '&offset=' + offset;

        assertItCallsCorrectUrl('GET', '/v1/account/billing/statements/analytics' + expectedGetParameters, () =>
          client.analytics.list(limit, offset)
        );
        assertItReturnsUnderlyingPromise(mockGet, client.encoding.list);
      });
    });
  });
});
