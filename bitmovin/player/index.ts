import playerChannels, {Channels} from './channels';
import customBuilds from './customBuilds';
import playerLicenses, {Licenses} from './licenses';
import playerStatistics from './statistics';

const player = (internalConfig): Player => ({
  channels: playerChannels(internalConfig),
  licenses: playerLicenses(internalConfig),
  statistics: playerStatistics(internalConfig),
  customBuilds: customBuilds(internalConfig)
});

export interface Player {
  channels: Channels;
  licenses: Licenses;
  statistics: object;
  customBuilds: object;
}

export default player;
