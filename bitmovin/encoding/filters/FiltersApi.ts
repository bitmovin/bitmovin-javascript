import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import WatermarkApi from './watermark/WatermarkApi';
import AudioVolumeApi from './audioVolume/AudioVolumeApi';
import EnhancedWatermarkApi from './enhancedWatermark/EnhancedWatermarkApi';
import CropApi from './crop/CropApi';
import RotateApi from './rotate/RotateApi';
import DeinterlaceApi from './deinterlace/DeinterlaceApi';
import AudioMixApi from './audioMix/AudioMixApi';
import DenoiseHqdn3dApi from './denoiseHqdn3d/DenoiseHqdn3dApi';
import TextApi from './text/TextApi';
import InterlaceApi from './interlace/InterlaceApi';
import UnsharpApi from './unsharp/UnsharpApi';
import ScaleApi from './scale/ScaleApi';
import TypeApi from './type/TypeApi';
import Filter from '../../models/Filter';
import ResponseEnvelope from '../../models/ResponseEnvelope';
import PaginationResponse from '../../models/PaginationResponse';
import FiltersListQueryParams from './FiltersListQueryParams';

/**
 * FiltersApi - object-oriented interface
 * @export
 * @class FiltersApi
 * @extends {BaseAPI}
 */
export default class FiltersApi extends BaseAPI {
    public watermark: WatermarkApi;
    public audioVolume: AudioVolumeApi;
    public enhancedWatermark: EnhancedWatermarkApi;
    public crop: CropApi;
    public rotate: RotateApi;
    public deinterlace: DeinterlaceApi;
    public audioMix: AudioMixApi;
    public denoiseHqdn3d: DenoiseHqdn3dApi;
    public text: TextApi;
    public interlace: InterlaceApi;
    public unsharp: UnsharpApi;
    public scale: ScaleApi;
    public type: TypeApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.watermark = new WatermarkApi(configuration);
        this.audioVolume = new AudioVolumeApi(configuration);
        this.enhancedWatermark = new EnhancedWatermarkApi(configuration);
        this.crop = new CropApi(configuration);
        this.rotate = new RotateApi(configuration);
        this.deinterlace = new DeinterlaceApi(configuration);
        this.audioMix = new AudioMixApi(configuration);
        this.denoiseHqdn3d = new DenoiseHqdn3dApi(configuration);
        this.text = new TextApi(configuration);
        this.interlace = new InterlaceApi(configuration);
        this.unsharp = new UnsharpApi(configuration);
        this.scale = new ScaleApi(configuration);
        this.type = new TypeApi(configuration);
    }

    /**
     * @summary List all Filters
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof FiltersApi
     */
    public list(queryParams?: FiltersListQueryParams): Promise<PaginationResponse<Filter>> {
        return this.restClient.get<PaginationResponse<Filter>>('/encoding/filters', {}, queryParams);
    }

}
