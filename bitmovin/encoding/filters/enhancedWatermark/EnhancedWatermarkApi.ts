import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import EnhancedWatermarkFilter from '../../../models/EnhancedWatermarkFilter';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import EnhancedWatermarkFiltersListQueryParams from './EnhancedWatermarkFiltersListQueryParams';

/**
 * EnhancedWatermarkApi - object-oriented interface
 * @export
 * @class EnhancedWatermarkApi
 * @extends {BaseAPI}
 */
export default class EnhancedWatermarkApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Enhanced Watermark Filter
     * @param {EnhancedWatermarkFilter} [enhancedWatermarkFilter] Only one horizontal and one vertical distance parameter is allowed, either top or bottom, and either left or right. See example body.
     * @throws {RequiredError}
     * @memberof EnhancedWatermarkApi
     */
    public create(enhancedWatermarkFilter?: EnhancedWatermarkFilter): Promise<EnhancedWatermarkFilter> {
        return this.restClient.post<EnhancedWatermarkFilter>('/encoding/filters/enhanced-watermark', {}, enhancedWatermarkFilter);
    }

    /**
     * @summary Delete Enhanced Watermark Filter
     * @param {string} filterId Id of the enhanced watermark configuration.
     * @throws {RequiredError}
     * @memberof EnhancedWatermarkApi
     */
    public delete(filterId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/filters/enhanced-watermark/{filter_id}', pathParamMap);
    }

    /**
     * @summary Enhanced Watermark Filter Details
     * @param {string} filterId Id of the enhanced watermark configuration.
     * @throws {RequiredError}
     * @memberof EnhancedWatermarkApi
     */
    public get(filterId: string): Promise<EnhancedWatermarkFilter> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.get<EnhancedWatermarkFilter>('/encoding/filters/enhanced-watermark/{filter_id}', pathParamMap);
    }

    /**
     * @summary List Enhanced Watermark Filters
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof EnhancedWatermarkApi
     */
    public list(queryParams?: EnhancedWatermarkFiltersListQueryParams): Promise<PaginationResponse<EnhancedWatermarkFilter>> {
        return this.restClient.get<PaginationResponse<EnhancedWatermarkFilter>>('/encoding/filters/enhanced-watermark', {}, queryParams);
    }

}
