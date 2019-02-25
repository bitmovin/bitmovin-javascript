import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import LatestApi from './latest/LatestApi';
import PlayerVersion from '../../../models/PlayerVersion';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';

/**
 * VersionsApi - object-oriented interface
 * @export
 * @class VersionsApi
 * @extends {BaseAPI}
 */
export default class VersionsApi extends BaseAPI {
    public latest: LatestApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.latest = new LatestApi(configuration);
    }

    /**
     * @summary List Player Versions for Channel
     * @param {string} channelName Name of the channel to get the player versions for.
     * @throws {RequiredError}
     * @memberof VersionsApi
     */
    public list(channelName: string): Promise<PaginationResponse<PlayerVersion>> {
        const pathParamMap = {
            channel_name: channelName
        };
        return this.restClient.get<PaginationResponse<PlayerVersion>>('/player/channels/{channel_name}/versions', pathParamMap);
    }

}
