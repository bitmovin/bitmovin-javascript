import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import AnalyticsMedianQueryRequest from '../../../models/AnalyticsMedianQueryRequest';
import AnalyticsQueryRequest from '../../../models/AnalyticsQueryRequest';
import AnalyticsResponse from '../../../models/AnalyticsResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';

/**
 * MedianApi - object-oriented interface
 * @export
 * @class MedianApi
 * @extends {BaseAPI}
 */
export default class MedianApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Median
     * @param {AnalyticsMedianQueryRequest} [analyticsMedianQueryRequest]
     * @throws {RequiredError}
     * @memberof MedianApi
     */
    public create(analyticsMedianQueryRequest?: AnalyticsMedianQueryRequest): Promise<AnalyticsResponse> {
        return this.restClient.post<AnalyticsResponse>('/analytics/queries/median', {}, analyticsMedianQueryRequest);
    }

}
