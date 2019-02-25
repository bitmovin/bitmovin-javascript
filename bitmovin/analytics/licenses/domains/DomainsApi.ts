import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import BitmovinResponse from '../../../models/BitmovinResponse';
import Domain from '../../../models/Domain';
import DomainList from '../../../models/DomainList';
import ResponseEnvelope from '../../../models/ResponseEnvelope';

/**
 * DomainsApi - object-oriented interface
 * @export
 * @class DomainsApi
 * @extends {BaseAPI}
 */
export default class DomainsApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Domain
     * @param {string} licenseId License id
     * @param {Domain} [domain]
     * @throws {RequiredError}
     * @memberof DomainsApi
     */
    public create(licenseId: string, domain?: Domain): Promise<Domain> {
        const pathParamMap = {
            license_id: licenseId
        };
        return this.restClient.post<Domain>('/analytics/licenses/{license_id}/domains', pathParamMap, domain);
    }

    /**
     * @summary Delete Domain
     * @param {string} licenseId License id
     * @param {string} domainId id of domain to delete
     * @throws {RequiredError}
     * @memberof DomainsApi
     */
    public delete(licenseId: string, domainId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            license_id: licenseId,
            domain_id: domainId
        };
        return this.restClient.delete<BitmovinResponse>('/analytics/licenses/{license_id}/domains/{domain_id}', pathParamMap);
    }

    /**
     * @summary List License Domains
     * @param {string} licenseId License id
     * @throws {RequiredError}
     * @memberof DomainsApi
     */
    public get(licenseId: string): Promise<DomainList> {
        const pathParamMap = {
            license_id: licenseId
        };
        return this.restClient.get<DomainList>('/analytics/licenses/{license_id}/domains', pathParamMap);
    }

}
