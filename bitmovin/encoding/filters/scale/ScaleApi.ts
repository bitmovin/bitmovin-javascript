import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import ScaleFilter from '../../../models/ScaleFilter';
import PaginationResponse from '../../../models/PaginationResponse';
import ScaleFiltersListQueryParams from './ScaleFiltersListQueryParams';

/**
 * ScaleApi - object-oriented interface
 * @export
 * @class ScaleApi
 * @extends {BaseAPI}
 */
export default class ScaleApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Scale Filter
     * @param {ScaleFilter} [scaleFilter]
     * @throws {RequiredError}
     * @memberof ScaleApi
     */
    public create(scaleFilter?: ScaleFilter): Promise<ScaleFilter> {
        return this.restClient.post<ScaleFilter>('/encoding/filters/scale', {}, scaleFilter);
    }

    /**
     * @summary Delete Scale Filter
     * @param {string} filterId Id of the scale filter
     * @throws {RequiredError}
     * @memberof ScaleApi
     */
    public delete(filterId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/filters/scale/{filter_id}', pathParamMap);
    }

    /**
     * @summary Scale Filter Details
     * @param {string} filterId Id of the scale filter
     * @throws {RequiredError}
     * @memberof ScaleApi
     */
    public get(filterId: string): Promise<ScaleFilter> {
        const pathParamMap = {
            filter_id: filterId
        };
        return this.restClient.get<ScaleFilter>('/encoding/filters/scale/{filter_id}', pathParamMap);
    }

    /**
     * @summary List Scale Filters
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof ScaleApi
     */
    public list(queryParams?: ScaleFiltersListQueryParams): Promise<PaginationResponse<ScaleFilter>> {
        return this.restClient.get<PaginationResponse<ScaleFilter>>('/encoding/filters/scale', {}, queryParams);
    }

}
