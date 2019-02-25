import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import AnalyticsAvgQueryRequest from '../../../models/AnalyticsAvgQueryRequest';
import AnalyticsQueryRequest from '../../../models/AnalyticsQueryRequest';
import AnalyticsResponse from '../../../models/AnalyticsResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';

/**
 * AvgApi - object-oriented interface
 * @export
 * @class AvgApi
 * @extends {BaseAPI}
 */
export default class AvgApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Avg
     * @param {AnalyticsAvgQueryRequest} [analyticsAvgQueryRequest]
     * @throws {RequiredError}
     * @memberof AvgApi
     */
    public create(analyticsAvgQueryRequest?: AnalyticsAvgQueryRequest): Promise<AnalyticsResponse> {
        return this.restClient.post<AnalyticsResponse>('/analytics/queries/avg', {}, analyticsAvgQueryRequest);
    }

}
