import {after, before, describe, it} from 'mocha';
import assert from 'assert';

import {getConfiguration} from '../utils';
import channels from '../../bitmovin/player/channels';

let testConfiguration = getConfiguration();

describe('[Player Channels]', () => {
  const channelsClient = channels(testConfiguration);

  it('should list channels', (done) => {
    channelsClient.list().then((result) => {
      assert(result.channels instanceof Array);
      done();
    }).catch((error) => {
      done(new Error(error));
    });
  });

  // TODO: can't test atm because there are no player channels available
  it.skip('should list player versions for specific channel', (done) => {
  });

  // TODO: can't test atm because there are no player channels available
  it.skip('should get the latest player version of a specific channel', (done) => {
  });
});
