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
  channels: any;
  licenses: any;
  statistics: any;
  customBuilds: any;
}

export default player;
