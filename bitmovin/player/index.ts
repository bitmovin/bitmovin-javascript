import playerChannels, {Channels} from './channels';
import customBuilds, {CustomBuilds} from './customBuilds';
import playerLicenses, {Licenses} from './licenses';
import playerStatistics, {Statistics} from './statistics';

const player = (internalConfig): Player => ({
  channels: playerChannels(internalConfig),
  licenses: playerLicenses(internalConfig),
  statistics: playerStatistics(internalConfig),
  customBuilds: customBuilds(internalConfig)
});

export interface Player {
  channels: Channels;
  licenses: Licenses;
  statistics: Statistics;
  customBuilds: CustomBuilds;
}

export default player;
