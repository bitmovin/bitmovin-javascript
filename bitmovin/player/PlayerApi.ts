import { BaseAPI } from '../common/BaseAPI';
import { Configuration } from '../common/RestClient';
import ChannelsApi from './channels/ChannelsApi';
import LicensesApi from './licenses/LicensesApi';
import CustomBuildsApi from './customBuilds/CustomBuildsApi';

/**
 * PlayerApi - object-oriented interface
 * @export
 * @class PlayerApi
 * @extends {BaseAPI}
 */
export default class PlayerApi extends BaseAPI {
    public channels: ChannelsApi;
    public licenses: LicensesApi;
    public customBuilds: CustomBuildsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.channels = new ChannelsApi(configuration);
        this.licenses = new LicensesApi(configuration);
        this.customBuilds = new CustomBuildsApi(configuration);
    }

}
