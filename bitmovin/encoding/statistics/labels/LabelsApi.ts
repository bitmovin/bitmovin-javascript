import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import DailyApi from './daily/DailyApi';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import StatisticsPerLabel from '../../../models/StatisticsPerLabel';
import PaginationResponse from '../../../models/PaginationResponse';
import StatisticsPerLabelsListQueryParams from './StatisticsPerLabelsListQueryParams';
import StatisticsPerLabelsListByDateRangeQueryParams from './StatisticsPerLabelsListByDateRangeQueryParams';

/**
 * LabelsApi - object-oriented interface
 * @export
 * @class LabelsApi
 * @extends {BaseAPI}
 */
export default class LabelsApi extends BaseAPI {
    public daily: DailyApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.daily = new DailyApi(configuration);
    }

    /**
     * @summary Get Statistics per Label
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof LabelsApi
     */
    public list(queryParams?: StatisticsPerLabelsListQueryParams): Promise<PaginationResponse<StatisticsPerLabel>> {
        return this.restClient.get<PaginationResponse<StatisticsPerLabel>>('/encoding/statistics/labels/', {}, queryParams);
    }

    /**
     * @summary Get statistics per label within specific dates
     * @param {string} from Start date. Format: yyyy-MM-dd
     * @param {string} to End date. Format: yyyy-MM-dd
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof LabelsApi
     */
    public listByDateRange(from: string, to: string, queryParams?: StatisticsPerLabelsListByDateRangeQueryParams): Promise<PaginationResponse<StatisticsPerLabel>> {
        const pathParamMap = {
            from: from,
            to: to
        };
        return this.restClient.get<PaginationResponse<StatisticsPerLabel>>('/encoding/statistics/labels/{from}/{to}', pathParamMap, queryParams);
    }

}
