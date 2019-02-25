import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import WidevineApi from './widevine/WidevineApi';
import PlayreadyApi from './playready/PlayreadyApi';
import PrimetimeApi from './primetime/PrimetimeApi';
import FairplayApi from './fairplay/FairplayApi';
import MarlinApi from './marlin/MarlinApi';
import ClearkeyApi from './clearkey/ClearkeyApi';
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
    public widevine: WidevineApi;
    public playready: PlayreadyApi;
    public primetime: PrimetimeApi;
    public fairplay: FairplayApi;
    public marlin: MarlinApi;
    public clearkey: ClearkeyApi;
    public cenc: CencApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.widevine = new WidevineApi(configuration);
        this.playready = new PlayreadyApi(configuration);
        this.primetime = new PrimetimeApi(configuration);
        this.fairplay = new FairplayApi(configuration);
        this.marlin = new MarlinApi(configuration);
        this.clearkey = new ClearkeyApi(configuration);
        this.cenc = new CencApi(configuration);
    }

    /**
     * @summary List all DRMs of FMP4 Muxing
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the fMP4 muxing
     * @throws {RequiredError}
     * @memberof DrmApi
     */
    public list(encodingId: string, muxingId: string): Promise<PaginationResponse<Drm>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<Drm>>('/encoding/encodings/{encoding_id}/muxings/fmp4/{muxing_id}/drm', pathParamMap);
    }

}
