import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import EncodingStatisticsLive from '../../../../models/EncodingStatisticsLive';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import EncodingStatisticsLivesListQueryParams from './EncodingStatisticsLivesListQueryParams';
import EncodingStatisticsLivesListByDateRangeQueryParams from './EncodingStatisticsLivesListByDateRangeQueryParams';

/**
 * LiveApi - object-oriented interface
 * @export
 * @class LiveApi
 * @extends {BaseAPI}
 */
export default class LiveApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary List Live Encoding Statistics
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof LiveApi
     */
    public list(queryParams?: EncodingStatisticsLivesListQueryParams): Promise<PaginationResponse<EncodingStatisticsLive>> {
        return this.restClient.get<PaginationResponse<EncodingStatisticsLive>>('/encoding/statistics/encodings/live', {}, queryParams);
    }

    /**
     * @summary List live encoding statistics within specific dates
     * @param {string} from Start date, format: yyyy-MM-dd
     * @param {string} to End date, format: yyyy-MM-dd
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof LiveApi
     */
    public listByDateRange(from: string, to: string, queryParams?: EncodingStatisticsLivesListByDateRangeQueryParams): Promise<PaginationResponse<EncodingStatisticsLive>> {
        const pathParamMap = {
            from: from,
            to: to
        };
        return this.restClient.get<PaginationResponse<EncodingStatisticsLive>>('/encoding/statistics/encodings/live/{from}/{to}', pathParamMap, queryParams);
    }

}
