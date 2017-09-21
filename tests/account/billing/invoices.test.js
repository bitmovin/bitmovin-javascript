import { invoices } from '../../../bitmovin/account/billing/invoices'
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
    describe('invoices/encodings', () => {
      const client = invoices(testConfiguration, mockHttp);
      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/account/billing/invoices/encoding', client.encoding.list);
        assertItReturnsUnderlyingPromise(mockGet, client.encoding.list);
      });
    });

    describe('invoices/player', () => {
      const client = invoices(testConfiguration, mockHttp);
      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/account/billing/invoices/player', client.player.list);
        assertItReturnsUnderlyingPromise(mockGet, client.player.list);
      });
    });

    describe('invoices/analytics', () => {
      const client = invoices(testConfiguration, mockHttp);
      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/account/billing/invoices/analytics', client.analytics.list);
        assertItReturnsUnderlyingPromise(mockGet, client.player.list);
      });
    });
  });
});

