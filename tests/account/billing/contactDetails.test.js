import { contactDetails } from '../../../bitmovin/account/billing/contactDetails'

import {
  mockGet,
  mockPut,
  mockHttp,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup,
} from '../../assertions';

import {getConfiguration} from '../../utils';

let testConfiguration = getConfiguration();

describe('account', () => {
  beforeEach(testSetup);
  describe('billing', () => {
    describe('accountDetails', () => {
      const client = contactDetails(testConfiguration, mockHttp);
      describe('details', () => {
        assertItCallsCorrectUrl('GET', '/v1/account/billing/account-details', client.details);
        assertItReturnsUnderlyingPromise(mockGet, client.details);
      });
      describe('update', () => {
        assertItCallsCorrectUrl('PUT', '/v1/account/billing/account-details', client.update);
        assertItReturnsUnderlyingPromise(mockPut, client.update);
      });
    });
  });
});

