import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import DailyStatistics from '../../../models/DailyStatistics';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import DailyStatisticssListQueryParams from './DailyStatisticssListQueryParams';
import DailyStatisticssListByDateRangeQueryParams from './DailyStatisticssListByDateRangeQueryParams';

/**
 * DailyApi - object-oriented interface
 * @export
 * @class DailyApi
 * @extends {BaseAPI}
 */
export default class DailyApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary List Daily Statistics
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof DailyApi
     */
    public list(queryParams?: DailyStatisticssListQueryParams): Promise<PaginationResponse<DailyStatistics>> {
        return this.restClient.get<PaginationResponse<DailyStatistics>>('/encoding/statistics/daily', {}, queryParams);
    }

    /**
     * @summary List daily statistics within specific dates
     * @param {string} from Start date, format: yyyy-MM-dd
     * @param {string} to End date, format: yyyy-MM-dd
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof DailyApi
     */
    public listByDateRange(from: string, to: string, queryParams?: DailyStatisticssListByDateRangeQueryParams): Promise<PaginationResponse<DailyStatistics>> {
        const pathParamMap = {
            from: from,
            to: to
        };
        return this.restClient.get<PaginationResponse<DailyStatistics>>('/encoding/statistics/daily/{from}/{to}', pathParamMap, queryParams);
    }

}
