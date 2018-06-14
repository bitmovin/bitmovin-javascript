import {infrastructure} from '../../bitmovin/encoding/infrastructure';
import {aws} from '../../bitmovin/encoding/infrastructure/aws';
import {
  assertItCallsCorrectUrl,
  assertItReturnsUnderlyingPromise,
  mockDelete,
  mockGet,
  mockHttp,
  mockPost,
  testSetup
} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();

describe('encoding', () => {
  describe('infrastructure', () => {
    beforeEach(testSetup);

    const client = infrastructure(testConfiguration, mockHttp);

    const testInfrastructureType = type => {
      describe(type, () => {
        describe('list', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/infrastructure/${type}`, client[type].list);
          assertItReturnsUnderlyingPromise(mockGet, client[type].list);
        });
        describe('list limit offset', () => {
          assertItCallsCorrectUrl('GET', `/v1/encoding/infrastructure/${type}\\?limit=100&offset=15`, () =>
            client[type].list(100, 15)
          );
          assertItReturnsUnderlyingPromise(mockGet, () => client[type].list(100, 15));
        });
        describe('list limit offset sort', () => {
          assertItCallsCorrectUrl(
            'GET',
            `/v1/encoding/infrastructure/${type}\\?limit=100&offset=15&sort=createdAt:DESC`,
            () => client[type].list(100, 15, 'createdAt:DESC')
          );
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
          assertItCallsCorrectUrl(
            'GET',
            `/v1/encoding/infrastructure/${type}/someId/customData`,
            client[type]('someId').customData
          );
          assertItReturnsUnderlyingPromise(mockGet, client[type]('someId').customData);
        });
        describe('delete', () => {
          assertItCallsCorrectUrl(
            'DELETE',
            `/v1/encoding/infrastructure/${type}/someId`,
            client[type]('someId').delete
          );
          assertItReturnsUnderlyingPromise(mockDelete, client[type]('someId').delete);
        });
      });
    };

    testInfrastructureType('kubernetes');
  });

  describe('infrastructure aws', () => {
    beforeEach(testSetup);

    const client = aws(testConfiguration, mockHttp);

    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/infrastructure/aws', client.list);
      assertItReturnsUnderlyingPromise(mockGet, client.list);
    });
    describe('list limit offset', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/infrastructure/aws\\?limit=100&offset=15', () =>
        client.list(100, 15)
      );
      assertItReturnsUnderlyingPromise(mockGet, () => client.list(100, 15));
    });
    describe('list limit offset sort', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/infrastructure/aws\\?limit=100&offset=15&sort=createdAt:DESC', () =>
        client.list(100, 15, 'createdAt:DESC')
      );
      assertItReturnsUnderlyingPromise(mockGet, () => client.list(100, 15, 'createdAt:DESC'));
    });
    describe('create', () => {
      assertItCallsCorrectUrl('POST', '/v1/encoding/infrastructure/aws', () => client.create({}));
      assertItReturnsUnderlyingPromise(mockPost, () => client.create({}));
    });
    describe('details', () => {
      assertItCallsCorrectUrl('GET', '/v1/encoding/infrastructure/aws/someId', client('someId').details);
      assertItReturnsUnderlyingPromise(mockGet, client('someId').details);
    });
    describe('delete', () => {
      assertItCallsCorrectUrl('DELETE', '/v1/encoding/infrastructure/aws/someId', client('someId').delete);
      assertItReturnsUnderlyingPromise(mockDelete, client('someId').delete);
    });
    describe('regions', () => {
      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/encoding/infrastructure/aws/someId/regions', client('someId').regions.list);
        assertItReturnsUnderlyingPromise(mockGet, client('someId').regions.list);
      });

      describe('list with limit offset', () => {
        assertItCallsCorrectUrl('GET', '/v1/encoding/infrastructure/aws/someId/regions\\?limit=10&offset=10', () =>
          client('someId').regions.list(10, 10)
        );
        assertItReturnsUnderlyingPromise(mockGet, () => client('someId').regions.list(10, 10));
      });

      describe('add', () => {
        assertItCallsCorrectUrl('POST', '/v1/encoding/infrastructure/aws/someId/regions/someRegion', () =>
          client('someId')
            .regions('someRegion')
            .add({})
        );
        assertItReturnsUnderlyingPromise(mockPost, () =>
          client('someId')
            .regions('someRegion')
            .add({})
        );
      });

      describe('get', () => {
        assertItCallsCorrectUrl(
          'GET',
          '/v1/encoding/infrastructure/aws/someId/regions/someRegion',
          client('someId').regions('someRegion').details
        );
        assertItReturnsUnderlyingPromise(mockGet, client('someId').regions('someRegion').details);
      });

      describe('delete', () => {
        assertItCallsCorrectUrl(
          'DELETE',
          '/v1/encoding/infrastructure/aws/someId/regions/someRegion',
          client('someId').regions('someRegion').delete
        );
        assertItReturnsUnderlyingPromise(mockGet, client('someId').regions('someRegion').delete);
      });
    });
  });
});
