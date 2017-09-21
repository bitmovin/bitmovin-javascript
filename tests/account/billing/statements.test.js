import { statements } from '../../../bitmovin/account/billing/statements';
import { getConfiguration } from '../../utils';
import {
  mockGet,
  mockHttp,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup,
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
    });

    describe('statements/player', () => {
      const client = statements(testConfiguration, mockHttp);
      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/account/billing/statements/player', client.player.list);
        assertItReturnsUnderlyingPromise(mockGet, client.player.list);
      });
    });

    describe('statements/analytics', () => {
      const client = statements(testConfiguration, mockHttp);
      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/account/billing/statements/analytics', client.analytics.list);
        assertItReturnsUnderlyingPromise(mockGet, client.player.list);
      });
    });
  });
});

