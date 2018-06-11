import Bitmovin from '../bitmovin';

describe('Bitmovin default exports', () => {
  const apiKey = 'test-api-key';
  const additionalHeaders = {'X-Test-Header': 'test'};

  const client = Bitmovin({
    apiKey,
    additionalHeaders
  });

  describe('encoding', () => {
    const assertItContains = key => {
      it('should contain ' + key, () => {
        expect(typeof client.encoding[key]).toBeDefined();
      });
    };
    assertItContains('encodings');
    assertItContains('codecConfigurations');
    assertItContains('inputs');
    assertItContains('outputs');
    assertItContains('manifests');
    assertItContains('filters');
    assertItContains('statistics');
    assertItContains('infrastructure');
  });
  describe('analytics', () => {
    const assertItContains = key => {
      it('should contain ' + key, () => {
        expect(typeof client.analytics[key]).toEqual('function');
      });
    };
    assertItContains('impressions');
    assertItContains('licenses');
    assertItContains('queries');
  });
  describe('player', () => {
    const assertItContains = key => {
      it('should contain ' + key, () => {
        expect(typeof client.player[key]).toEqual('function');
      });
    };
    assertItContains('licenses');
    assertItContains('channels');
    expect(typeof client.player.customBuilds).toBeDefined();
  });
});
