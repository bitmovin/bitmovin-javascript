import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import RotateFilter from '../../../models/RotateFilter';
import PaginationResponse from '../../../models/PaginationResponse';
import RotateFiltersListQueryParams from './RotateFiltersListQueryParams';

/**
 * RotateApi - object-oriented interface
 * @export
 * @class RotateApi
 * @extends {BaseAPI}
 */
export default class RotateApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Rotate Filter
     * @param {RotateFilter} [rotateFilter]
     * @throws {RequiredError}
     * @memberof RotateApi
     */
    public create(rotateFilter?: RotateFilter): Promise<RotateFilter> {
        return this.restClient.post<RotateFilter>('/encoding/filters/rotate', {}, rotateFilter);
    }

    /**
     * @summary Delete Rotate Filter
     * @param {string} filterId Id of the Rotate configuration.
     * @throws {RequiredError}
     * @memberof RotateApi
     */
    public delete(filterId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/filters/rotate/{filter_id}', pathParamMap);
    }

    /**
     * @summary Rotate Filter Details
     * @param {string} filterId Id of the Rotate configuration.
     * @throws {RequiredError}
     * @memberof RotateApi
     */
    public get(filterId: string): Promise<RotateFilter> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.get<RotateFilter>('/encoding/filters/rotate/{filter_id}', pathParamMap);
    }

    /**
     * @summary List Rotate Filters
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof RotateApi
     */
    public list(queryParams?: RotateFiltersListQueryParams): Promise<PaginationResponse<RotateFilter>> {
        return this.restClient.get<PaginationResponse<RotateFilter>>('/encoding/filters/rotate', {}, queryParams);
    }

}
