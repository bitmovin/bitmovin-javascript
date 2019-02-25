import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import VersionsApi from './versions/VersionsApi';
import PlayerChannel from '../../models/PlayerChannel';
import ResponseEnvelope from '../../models/ResponseEnvelope';
import PaginationResponse from '../../models/PaginationResponse';

/**
 * ChannelsApi - object-oriented interface
 * @export
 * @class ChannelsApi
 * @extends {BaseAPI}
 */
export default class ChannelsApi extends BaseAPI {
    public versions: VersionsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.versions = new VersionsApi(configuration);
    }

    /**
     * @summary List Player Channels
     * @throws {RequiredError}
     * @memberof ChannelsApi
     */
    public list(): Promise<PaginationResponse<PlayerChannel>> {
        return this.restClient.get<PaginationResponse<PlayerChannel>>('/player/channels', {});
    }

}
