import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import DailyApi from './daily/DailyApi';
import EncodingsApi from './encodings/EncodingsApi';
import LabelsApi from './labels/LabelsApi';
import ResponseEnvelope from '../../models/ResponseEnvelope';
import Statistics from '../../models/Statistics';
import PaginationResponse from '../../models/PaginationResponse';
import StatisticssListQueryParams from './StatisticssListQueryParams';

/**
 * StatisticsApi - object-oriented interface
 * @export
 * @class StatisticsApi
 * @extends {BaseAPI}
 */
export default class StatisticsApi extends BaseAPI {
    public daily: DailyApi;
    public encodings: EncodingsApi;
    public labels: LabelsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.daily = new DailyApi(configuration);
        this.encodings = new EncodingsApi(configuration);
        this.labels = new LabelsApi(configuration);
    }

    /**
     * @summary Show Overall Statistics
     * @throws {RequiredError}
     * @memberof StatisticsApi
     */
    public get(): Promise<Statistics> {
        return this.restClient.get<Statistics>('/encoding/statistics', {});
    }

    /**
     * @summary Show Overall Statistics Within Specific Dates
     * @param {string} from Start date, format: yyyy-MM-dd
     * @param {string} to End date, format: yyyy-MM-dd
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof StatisticsApi
     */
    public list(from: string, to: string, queryParams?: StatisticssListQueryParams): Promise<PaginationResponse<Statistics>> {
        const pathParamMap = {
            from: from,
            to: to
        };
        return this.restClient.get<PaginationResponse<Statistics>>('/encoding/statistics/{from}/{to}', pathParamMap, queryParams);
    }

}
