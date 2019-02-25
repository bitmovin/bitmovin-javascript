import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import DomainsApi from './domains/DomainsApi';
import AnalyticsLicense from '../../models/AnalyticsLicense';
import ResponseEnvelope from '../../models/ResponseEnvelope';
import PaginationResponse from '../../models/PaginationResponse';

/**
 * LicensesApi - object-oriented interface
 * @export
 * @class LicensesApi
 * @extends {BaseAPI}
 */
export default class LicensesApi extends BaseAPI {
    public domains: DomainsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.domains = new DomainsApi(configuration);
    }

    /**
     * @summary Get License
     * @param {string} licenseId License id
     * @throws {RequiredError}
     * @memberof LicensesApi
     */
    public get(licenseId: string): Promise<AnalyticsLicense> {
        const pathParamMap = {
            license_id: licenseId
        };
        return this.restClient.get<AnalyticsLicense>('/analytics/licenses/{license_id}', pathParamMap);
    }

    /**
     * @summary List Analytics Licenses
     * @throws {RequiredError}
     * @memberof LicensesApi
     */
    public list(): Promise<PaginationResponse<AnalyticsLicense>> {
        return this.restClient.get<PaginationResponse<AnalyticsLicense>>('/analytics/licenses', {});
    }

}
