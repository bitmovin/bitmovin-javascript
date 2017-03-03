import {getConfiguration} from '../utils';
import { manifests } from '../../bitmovin/encoding/manifests';

import {
  mockGet,
  mockPost,
  mockDelete,
  mockHttp,
  methodToMock,
  assertPayload,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup,
  assertItReturnsPromise,
  assertItReturnsCorrectResponse,
  assertItCallsUrlAndReturnsPromise
} from '../assertions';

let testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('manifests', () => {
    beforeEach(testSetup);
    const client = manifests(testConfiguration, mockHttp);
    describe('list', () => {
      assertItCallsUrlAndReturnsPromise('GET', '/v1/encoding/manifests', client.list);
    });
  });
});
