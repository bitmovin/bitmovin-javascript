import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import AnalyticsMinQueryRequest from '../../../models/AnalyticsMinQueryRequest';
import AnalyticsQueryRequest from '../../../models/AnalyticsQueryRequest';
import AnalyticsResponse from '../../../models/AnalyticsResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';

/**
 * MinApi - object-oriented interface
 * @export
 * @class MinApi
 * @extends {BaseAPI}
 */
export default class MinApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Min
     * @param {AnalyticsMinQueryRequest} [analyticsMinQueryRequest]
     * @throws {RequiredError}
     * @memberof MinApi
     */
    public create(analyticsMinQueryRequest?: AnalyticsMinQueryRequest): Promise<AnalyticsResponse> {
        return this.restClient.post<AnalyticsResponse>('/analytics/queries/min', {}, analyticsMinQueryRequest);
    }

}
