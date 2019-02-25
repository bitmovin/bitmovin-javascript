import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import DailyStatisticsPerLabel from '../../../../models/DailyStatisticsPerLabel';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import DailyStatisticsPerLabelsListQueryParams from './DailyStatisticsPerLabelsListQueryParams';
import DailyStatisticsPerLabelsListByDateRangeQueryParams from './DailyStatisticsPerLabelsListByDateRangeQueryParams';

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
     * @summary Get Daily Statistics per Label
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof DailyApi
     */
    public list(queryParams?: DailyStatisticsPerLabelsListQueryParams): Promise<PaginationResponse<DailyStatisticsPerLabel>> {
        return this.restClient.get<PaginationResponse<DailyStatisticsPerLabel>>('/encoding/statistics/labels/daily', {}, queryParams);
    }

    /**
     * @summary Get daily statistics per label within specific dates
     * @param {string} from Start date. Format: yyyy-MM-dd
     * @param {string} to End date. Format: yyyy-MM-dd
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof DailyApi
     */
    public listByDateRange(from: string, to: string, queryParams?: DailyStatisticsPerLabelsListByDateRangeQueryParams): Promise<PaginationResponse<DailyStatisticsPerLabel>> {
        const pathParamMap = {
            from: from,
            to: to
        };
        return this.restClient.get<PaginationResponse<DailyStatisticsPerLabel>>('/encoding/statistics/labels/daily/{from}/{to}', pathParamMap, queryParams);
    }

}
