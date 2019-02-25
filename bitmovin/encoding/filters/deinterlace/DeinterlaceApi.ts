import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import DeinterlaceFilter from '../../../models/DeinterlaceFilter';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import DeinterlaceFiltersListQueryParams from './DeinterlaceFiltersListQueryParams';

/**
 * DeinterlaceApi - object-oriented interface
 * @export
 * @class DeinterlaceApi
 * @extends {BaseAPI}
 */
export default class DeinterlaceApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Deinterlace Filter
     * @param {DeinterlaceFilter} [deinterlaceFilter]
     * @throws {RequiredError}
     * @memberof DeinterlaceApi
     */
    public create(deinterlaceFilter?: DeinterlaceFilter): Promise<DeinterlaceFilter> {
        return this.restClient.post<DeinterlaceFilter>('/encoding/filters/deinterlace', {}, deinterlaceFilter);
    }

    /**
     * @summary Delete Deinterlace Filter
     * @param {string} filterId Id of the deinterlace filter
     * @throws {RequiredError}
     * @memberof DeinterlaceApi
     */
    public delete(filterId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/filters/deinterlace/{filter_id}', pathParamMap);
    }

    /**
     * @summary Deinterlace Filter Details
     * @param {string} filterId Id of the deinterlace filter
     * @throws {RequiredError}
     * @memberof DeinterlaceApi
     */
    public get(filterId: string): Promise<DeinterlaceFilter> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.get<DeinterlaceFilter>('/encoding/filters/deinterlace/{filter_id}', pathParamMap);
    }

    /**
     * @summary List Deinterlace Filters
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof DeinterlaceApi
     */
    public list(queryParams?: DeinterlaceFiltersListQueryParams): Promise<PaginationResponse<DeinterlaceFilter>> {
        return this.restClient.get<PaginationResponse<DeinterlaceFilter>>('/encoding/filters/deinterlace', {}, queryParams);
    }

}
