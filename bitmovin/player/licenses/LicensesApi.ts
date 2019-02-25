import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import DomainsApi from './domains/DomainsApi';
import ThirdPartyLicensingApi from './thirdPartyLicensing/ThirdPartyLicensingApi';
import PlayerLicense from '../../models/PlayerLicense';
import ResponseEnvelope from '../../models/ResponseEnvelope';
import PaginationResponse from '../../models/PaginationResponse';
import PlayerLicensesListQueryParams from './PlayerLicensesListQueryParams';

/**
 * LicensesApi - object-oriented interface
 * @export
 * @class LicensesApi
 * @extends {BaseAPI}
 */
export default class LicensesApi extends BaseAPI {
    public domains: DomainsApi;
    public thirdPartyLicensing: ThirdPartyLicensingApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.domains = new DomainsApi(configuration);
        this.thirdPartyLicensing = new ThirdPartyLicensingApi(configuration);
    }

    /**
     * @summary Get License
     * @param {string} licenseId ID of the License
     * @throws {RequiredError}
     * @memberof LicensesApi
     */
    public get(licenseId: string): Promise<PlayerLicense> {
        const pathParamMap = {
            license_id: licenseId
        };
        return this.restClient.get<PlayerLicense>('/player/licenses/{license_id}', pathParamMap);
    }

    /**
     * @summary List Player Licenses
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof LicensesApi
     */
    public list(queryParams?: PlayerLicensesListQueryParams): Promise<PaginationResponse<PlayerLicense>> {
        return this.restClient.get<PaginationResponse<PlayerLicense>>('/player/licenses', {}, queryParams);
    }

}
