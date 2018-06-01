import {getConfiguration} from '../utils';
import {licenses} from '../../bitmovin/player/licenses';
import {domains} from '../../bitmovin/player/domains';
import {channels} from '../../bitmovin/player/channels';
import {
  mockGet,
  mockPost,
  mockPut,
  mockDelete,
  mockHttp,
  methodToMock,
  assertPayload,
  assertItReturnsUnderlyingPromise,
  assertItCallsCorrectUrl,
  testSetup,
  assertItReturnsPromise,
  assertItReturnsCorrectResponse
} from '../assertions';
import {thirdPartyLicensing} from '../../bitmovin/player/thirdPartyLicensing';

let testConfiguration = getConfiguration();

describe('player', () => {
  const licensesClient = licenses(testConfiguration, mockHttp);
  beforeEach(testSetup);

  describe('license', () => {
    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/player/licenses', licensesClient.list);
      assertItReturnsUnderlyingPromise(mockGet, licensesClient.list);
    });

    describe('detail', () => {
      assertItCallsCorrectUrl('GET', '/v1/player/licenses/my-license-id', () =>
        licensesClient('my-license-id').details()
      );
      assertItReturnsUnderlyingPromise(mockGet, licensesClient('my-license-id').details);
    });

    describe('update', () => {
      assertItCallsCorrectUrl('PUT', '/v1/player/licenses/my-license-id', () =>
        licensesClient('my-license-id').update()
      );
      assertItReturnsUnderlyingPromise(mockPut, licensesClient('my-license-id').update);
      assertPayload(mockPut, () => licensesClient('my-license-id').update({name: 'foo'}), {name: 'foo'});
    });

    describe('domains', () => {
      const domainClient = domains(testConfiguration, 'license-id', mockHttp);

      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/player/licenses/license-id/domains', domainClient.list);
        assertItReturnsUnderlyingPromise(mockGet, domainClient.list);
      });
      describe('add', () => {
        assertItCallsCorrectUrl('POST', '/v1/player/licenses/license-id/domains', domainClient.add);

        assertItReturnsUnderlyingPromise(mockPost, () =>
          domainClient.add({
            url: 'foo'
          })
        );
        assertPayload(mockPost, () => domainClient.add({url: 'foo'}), {url: 'foo'});
      });
      describe('delete', () => {
        assertItCallsCorrectUrl(
          'DELETE',
          '/v1/player/licenses/license-id/domains/domain-id',
          domainClient('domain-id').delete
        );
        assertItReturnsUnderlyingPromise(mockDelete, domainClient('domain-id').delete);
      });
    });

    describe('third-party-licensing', () => {
      const licenseId = 'someLicenseId';
      const thirdPartyLicensingClient = thirdPartyLicensing(testConfiguration, licenseId, mockHttp);

      describe('add', () => {
        const thirdPartyLicensing = {
          licenseCheckServer: 'https://your.server.to',
          licenseCheckTimeout: 5000,
          errorAction: 'yourErrorAction',
          timeoutAction: 'yourTimeoutAction'
        };

        assertItCallsCorrectUrl(
          'POST',
          '/v1/player/licenses/' + licenseId + '/third-party-licensing',
          thirdPartyLicensingClient.add
        );
        assertItReturnsUnderlyingPromise(mockPost, () => thirdPartyLicensingClient.add(thirdPartyLicensing));
        assertPayload(mockPost, () => thirdPartyLicensingClient.add(thirdPartyLicensing), thirdPartyLicensing);
      });

      describe('get', () => {
        assertItCallsCorrectUrl(
          'GET',
          '/v1/player/licenses/' + licenseId + '/third-party-licensing',
          thirdPartyLicensingClient.get
        );
        assertItReturnsUnderlyingPromise(mockGet, thirdPartyLicensingClient.get);
      });

      describe('delete', () => {
        assertItCallsCorrectUrl(
          'DELETE',
          '/v1/player/licenses/' + licenseId + '/third-party-licensing',
          thirdPartyLicensingClient.delete
        );
        assertItReturnsUnderlyingPromise(mockGet, thirdPartyLicensingClient.delete);
      });
    });
  });

  describe('channels', () => {
    const client = channels(testConfiguration, mockHttp);

    describe('list', () => {
      assertItCallsCorrectUrl('GET', '/v1/player/channels', client.list);
      assertItReturnsUnderlyingPromise(mockGet, client.list);
    });
    describe('versions', () => {
      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/player/channels/stable/versions', client('stable').versions.list);
        assertItReturnsUnderlyingPromise(mockGet, client('stable').versions.list);
      });
      describe('latest', () => {
        assertItCallsCorrectUrl('GET', '/v1/player/channels/stable/versions/latest', client('stable').versions.latest);
        assertItReturnsUnderlyingPromise(mockGet, client('stable').versions.latest);
      });
    });
  });
});
