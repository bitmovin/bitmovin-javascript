import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import AnalyticsMaxQueryRequest from '../../../models/AnalyticsMaxQueryRequest';
import AnalyticsQueryRequest from '../../../models/AnalyticsQueryRequest';
import AnalyticsResponse from '../../../models/AnalyticsResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';

/**
 * MaxApi - object-oriented interface
 * @export
 * @class MaxApi
 * @extends {BaseAPI}
 */
export default class MaxApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Max
     * @param {AnalyticsMaxQueryRequest} [analyticsMaxQueryRequest]
     * @throws {RequiredError}
     * @memberof MaxApi
     */
    public create(analyticsMaxQueryRequest?: AnalyticsMaxQueryRequest): Promise<AnalyticsResponse> {
        return this.restClient.post<AnalyticsResponse>('/analytics/queries/max', {}, analyticsMaxQueryRequest);
    }

}
