import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import AudioMixFilter from '../../../models/AudioMixFilter';
import BitmovinResponse from '../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import AudioMixFiltersListQueryParams from './AudioMixFiltersListQueryParams';

/**
 * AudioMixApi - object-oriented interface
 * @export
 * @class AudioMixApi
 * @extends {BaseAPI}
 */
export default class AudioMixApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Audio Mix Filter
     * @param {AudioMixFilter} [audioMixFilter]
     * @throws {RequiredError}
     * @memberof AudioMixApi
     */
    public create(audioMixFilter?: AudioMixFilter): Promise<AudioMixFilter> {
        return this.restClient.post<AudioMixFilter>('/encoding/filters/audio-mix', {}, audioMixFilter);
    }

    /**
     * @summary Delete Audio Mix Filter
     * @param {string} filterId Id of the Audio Mix configuration.
     * @throws {RequiredError}
     * @memberof AudioMixApi
     */
    public delete(filterId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/filters/audio-mix/{filter_id}', pathParamMap);
    }

    /**
     * @summary Audio Mix Filter Details
     * @param {string} filterId Id of the Audio Mix configuration.
     * @throws {RequiredError}
     * @memberof AudioMixApi
     */
    public get(filterId: string): Promise<AudioMixFilter> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.get<AudioMixFilter>('/encoding/filters/audio-mix/{filter_id}', pathParamMap);
    }

    /**
     * @summary List Audio Mix Filters
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof AudioMixApi
     */
    public list(queryParams?: AudioMixFiltersListQueryParams): Promise<PaginationResponse<AudioMixFilter>> {
        return this.restClient.get<PaginationResponse<AudioMixFilter>>('/encoding/filters/audio-mix', {}, queryParams);
    }

}
