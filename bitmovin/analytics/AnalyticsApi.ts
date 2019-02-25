import { BaseAPI } from '../common/BaseAPI';
import { Configuration } from '../common/RestClient';
import ImpressionsApi from './impressions/ImpressionsApi';
import QueriesApi from './queries/QueriesApi';
import LicensesApi from './licenses/LicensesApi';

/**
 * AnalyticsApi - object-oriented interface
 * @export
 * @class AnalyticsApi
 * @extends {BaseAPI}
 */
export default class AnalyticsApi extends BaseAPI {
    public impressions: ImpressionsApi;
    public queries: QueriesApi;
    public licenses: LicensesApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.impressions = new ImpressionsApi(configuration);
        this.queries = new QueriesApi(configuration);
        this.licenses = new LicensesApi(configuration);
    }

}
