import {licenses} from '../../bitmovin/analytics/licenses';
import {
  assertItCallsCorrectUrl,
  assertItReturnsUnderlyingPromise,
  assertPayload,
  mockHttp,
  mockPost,
  testSetup
} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();

describe('analytics', () => {
  const licensesClient = licenses(testConfiguration, mockHttp);
  beforeEach(testSetup);

  describe('license', () => {
    describe('create', () => {
      assertItCallsCorrectUrl('POST', '/v1/analytics/licenses', () => licensesClient.create({name: 'test-name'}));
      assertItReturnsUnderlyingPromise(mockPost, licensesClient.create);
      assertPayload(mockPost, () => licensesClient.create({name: 'test-name'}), {name: 'test-name'});
    });
  });
});
