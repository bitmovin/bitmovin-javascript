import playerChannels from './channels';
import customBuilds from './customBuilds';
import playerLicenses from './licenses';
import playerStatistics from './statistics';

const player = (internalConfig): Player => ({
  channels: playerChannels(internalConfig),
  licenses: playerLicenses(internalConfig),
  statistics: playerStatistics(internalConfig),
  customBuilds: customBuilds(internalConfig)
});

export interface Player {
  channels: object;
  licenses: object;
  statistics: object;
  customBuilds: object;
}

export default player;
