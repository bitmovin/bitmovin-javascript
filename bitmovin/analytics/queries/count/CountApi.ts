import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import AnalyticsCountQueryRequest from '../../../models/AnalyticsCountQueryRequest';
import AnalyticsQueryRequest from '../../../models/AnalyticsQueryRequest';
import AnalyticsResponse from '../../../models/AnalyticsResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';

/**
 * CountApi - object-oriented interface
 * @export
 * @class CountApi
 * @extends {BaseAPI}
 */
export default class CountApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Count
     * @param {AnalyticsCountQueryRequest} [analyticsCountQueryRequest]
     * @throws {RequiredError}
     * @memberof CountApi
     */
    public create(analyticsCountQueryRequest?: AnalyticsCountQueryRequest): Promise<AnalyticsResponse> {
        return this.restClient.post<AnalyticsResponse>('/analytics/queries/count', {}, analyticsCountQueryRequest);
    }

}
