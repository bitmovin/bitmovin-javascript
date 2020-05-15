import {licenses} from '../../bitmovin/analytics/licenses';
import {Platform, platforms} from '../../bitmovin/analytics/releases/platforms';
import {Channel} from '../../bitmovin/player/channels';
import {
  assertItCallsCorrectUrl,
  assertItReturnsUnderlyingPromise,
  assertPayload,
  mockGet,
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
    describe('reorder', () => {
      // \\ is needed to escape ? in url, otherwise regex matching failed
      assertItCallsCorrectUrl('POST', '/v1/analytics/licenses/licenseId/changeorder\\?orderIndex=0', () =>
        licensesClient.reorder('licenseId', 0)
      );
      assertItReturnsUnderlyingPromise(mockPost, licensesClient.reorder);
    });
  });
  describe('releases', () => {
    describe('platforms', () => {
      const client = platforms(testConfiguration, mockHttp);

      describe('list', () => {
        assertItCallsCorrectUrl('GET', '/v1/analytics/releases/platforms', client.list);
        assertItReturnsUnderlyingPromise(mockGet, client.list);
      });
      describe('channels', () => {
        describe('list', () => {
          assertItCallsCorrectUrl('GET', '/v1/analytics/releases/ios', client(Platform.IOs).channels.list);
          assertItReturnsUnderlyingPromise(mockGet, client(Platform.IOs).channels.list);
        });
        describe('versions', () => {
          describe('list', () => {
            assertItCallsCorrectUrl(
              'GET',
              '/v1/analytics/releases/ios/stable',
              client(Platform.IOs).channels(Channel.Stable).versions.list
            );
            assertItReturnsUnderlyingPromise(mockGet, client(Platform.IOs).channels(Channel.Stable).versions.list);
          });
          describe('specificVersion', () => {
            describe('list', () => {
              assertItCallsCorrectUrl(
                'GET',
                '/v1/analytics/releases/ios/stable/1.5',
                client(Platform.IOs)
                  .channels(Channel.Stable)
                  .versions('1.5').list
              );
              assertItReturnsUnderlyingPromise(
                mockGet,
                client(Platform.IOs)
                  .channels(Channel.Stable)
                  .versions('1.5').list
              );
            });
            describe('latest', () => {
              assertItCallsCorrectUrl(
                'GET',
                '/v1/analytics/releases/ios/stable/1.5/latest',
                client(Platform.IOs)
                  .channels(Channel.Stable)
                  .versions('1.5').latest
              );
              assertItReturnsUnderlyingPromise(
                mockGet,
                client(Platform.IOs)
                  .channels(Channel.Stable)
                  .versions('1.5').latest
              );
            });
          });
        });
      });
    });
  });
});
