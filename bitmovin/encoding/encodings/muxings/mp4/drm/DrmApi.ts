import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import PlayreadyApi from './playready/PlayreadyApi';
import ClearkeyApi from './clearkey/ClearkeyApi';
import WidevineApi from './widevine/WidevineApi';
import MarlinApi from './marlin/MarlinApi';
import CencApi from './cenc/CencApi';
import Drm from '../../../../../models/Drm';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../models/PaginationResponse';

/**
 * DrmApi - object-oriented interface
 * @export
 * @class DrmApi
 * @extends {BaseAPI}
 */
export default class DrmApi extends BaseAPI {
    public playready: PlayreadyApi;
    public clearkey: ClearkeyApi;
    public widevine: WidevineApi;
    public marlin: MarlinApi;
    public cenc: CencApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.playready = new PlayreadyApi(configuration);
        this.clearkey = new ClearkeyApi(configuration);
        this.widevine = new WidevineApi(configuration);
        this.marlin = new MarlinApi(configuration);
        this.cenc = new CencApi(configuration);
    }

    /**
     * @summary List all DRM configurations of MP4 Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the MP4 muxing
     * @throws {RequiredError}
     * @memberof DrmApi
     */
    public list(encodingId: string, muxingId: string): Promise<PaginationResponse<Drm>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<Drm>>('/encoding/encodings/{encoding_id}/muxings/mp4/{muxing_id}/drm', pathParamMap);
    }

}
