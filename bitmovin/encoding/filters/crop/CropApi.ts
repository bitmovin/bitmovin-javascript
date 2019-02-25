import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import CropFilter from '../../../models/CropFilter';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import CropFiltersListQueryParams from './CropFiltersListQueryParams';

/**
 * CropApi - object-oriented interface
 * @export
 * @class CropApi
 * @extends {BaseAPI}
 */
export default class CropApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Crop Filter
     * @param {CropFilter} [cropFilter]
     * @throws {RequiredError}
     * @memberof CropApi
     */
    public create(cropFilter?: CropFilter): Promise<CropFilter> {
        return this.restClient.post<CropFilter>('/encoding/filters/crop', {}, cropFilter);
    }

    /**
     * @summary Delete Crop Filter
     * @param {string} filterId Id of the Crop configuration.
     * @throws {RequiredError}
     * @memberof CropApi
     */
    public delete(filterId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/filters/crop/{filter_id}', pathParamMap);
    }

    /**
     * @summary Crop Filter Details
     * @param {string} filterId Id of the Crop configuration.
     * @throws {RequiredError}
     * @memberof CropApi
     */
    public get(filterId: string): Promise<CropFilter> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.get<CropFilter>('/encoding/filters/crop/{filter_id}', pathParamMap);
    }

    /**
     * @summary List Crop Filters
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof CropApi
     */
    public list(queryParams?: CropFiltersListQueryParams): Promise<PaginationResponse<CropFilter>> {
        return this.restClient.get<PaginationResponse<CropFilter>>('/encoding/filters/crop', {}, queryParams);
    }

}
