import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import AnalyticsImpressionDetails from '../../models/AnalyticsImpressionDetails';
import AnalyticsLicense from '../../models/AnalyticsLicense';
import ResponseEnvelope from '../../models/ResponseEnvelope';

/**
 * ImpressionsApi - object-oriented interface
 * @export
 * @class ImpressionsApi
 * @extends {BaseAPI}
 */
export default class ImpressionsApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Impression Details
     * @param {string} impressionId Impression id
     * @param {AnalyticsLicense} [analyticsLicense] Analytics license
     * @throws {RequiredError}
     * @memberof ImpressionsApi
     */
    public create(impressionId: string, analyticsLicense?: AnalyticsLicense): Promise<AnalyticsImpressionDetails> {
        const pathParamMap = {
            impression_id: impressionId
        };
        return this.restClient.post<AnalyticsImpressionDetails>('/analytics/impressions/{impression_id}', pathParamMap, analyticsLicense);
    }

}
