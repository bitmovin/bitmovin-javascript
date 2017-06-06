import { infrastructure } from '../../bitmovin/encoding/infrastructure';
import { getConfiguration } from '../utils';

import {
  mockGet,
  mockPost,
  mockDelete,
  mockHttp,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup,
} from '../assertions';

let testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('infrastructure', () => {
    beforeEach(testSetup);

    const client = infrastructure(testConfiguration, mockHttp);

    const testInfrastructureType = (type) => {
      describe(type, () => {
        describe('list', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/infrastructure/${type}`, client[type].list);
          assertItReturnsUnderlyingPromise(mockGet, client[type].list);
        });
        describe('list limit offset', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/infrastructure/${type}\\?limit=100&offset=15`, () => client[type].list(100, 15));
          assertItReturnsUnderlyingPromise(mockGet, () => client[type].list(100, 15));
        });
        describe('list limit offset sort', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/infrastructure/${type}\\?limit=100&offset=15&sort=createdAt:DESC`, () => client[type].list(100, 15, 'createdAt:DESC'));
          assertItReturnsUnderlyingPromise(mockGet, () => client[type].list(100, 15, 'createdAt:DESC'));
        });
        describe('create', () => {
          assertItCallsCorrectUrl('POST', `/v1/encoding/infrastructure/${type}`, () => client[type].create({}));
          assertItReturnsUnderlyingPromise(mockPost, () => client[type].create({}));
        });
        describe('details', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/infrastructure/${type}/someId`, client[type]('someId').details);
          assertItReturnsUnderlyingPromise(mockGet, client[type]('someId').details);
        });
        describe('customData', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/infrastructure/${type}/someId/customData`, client[type]('someId').customData);
          assertItReturnsUnderlyingPromise(mockGet, client[type]('someId').customData);
        });
        describe('delete', () => {
          assertItCallsCorrectUrl('DELETE', `/v1/encoding/infrastructure/${type}/someId`, client[type]('someId').delete);
          assertItReturnsUnderlyingPromise(mockDelete, client[type]('someId').delete);
        });
      });
    };

    testInfrastructureType('kubernetes');

  });
});
