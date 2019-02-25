import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import InterlaceFilter from '../../../models/InterlaceFilter';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import InterlaceFiltersListQueryParams from './InterlaceFiltersListQueryParams';

/**
 * InterlaceApi - object-oriented interface
 * @export
 * @class InterlaceApi
 * @extends {BaseAPI}
 */
export default class InterlaceApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Interlace Filter
     * @param {InterlaceFilter} [interlaceFilter]
     * @throws {RequiredError}
     * @memberof InterlaceApi
     */
    public create(interlaceFilter?: InterlaceFilter): Promise<InterlaceFilter> {
        return this.restClient.post<InterlaceFilter>('/encoding/filters/interlace', {}, interlaceFilter);
    }

    /**
     * @summary Delete Interlace Filter
     * @param {string} filterId Id of the Interlace Filter
     * @throws {RequiredError}
     * @memberof InterlaceApi
     */
    public delete(filterId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/filters/interlace/{filter_id}', pathParamMap);
    }

    /**
     * @summary Interlace Filter Details
     * @param {string} filterId Id of the Interlace Filter
     * @throws {RequiredError}
     * @memberof InterlaceApi
     */
    public get(filterId: string): Promise<InterlaceFilter> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.get<InterlaceFilter>('/encoding/filters/interlace/{filter_id}', pathParamMap);
    }

    /**
     * @summary List Interlace Filters
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof InterlaceApi
     */
    public list(queryParams?: InterlaceFiltersListQueryParams): Promise<PaginationResponse<InterlaceFilter>> {
        return this.restClient.get<PaginationResponse<InterlaceFilter>>('/encoding/filters/interlace', {}, queryParams);
    }

}
