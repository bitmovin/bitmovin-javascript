import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import GroupsApi from './groups/GroupsApi';
import BitmovinResource from '../../models/BitmovinResource';
import BitmovinResponse from '../../models/BitmovinResponse';
import Organization from '../../models/Organization';
import ResponseEnvelope from '../../models/ResponseEnvelope';
import PaginationResponse from '../../models/PaginationResponse';

/**
 * OrganizationsApi - object-oriented interface
 * @export
 * @class OrganizationsApi
 * @extends {BaseAPI}
 */
export default class OrganizationsApi extends BaseAPI {
    public groups: GroupsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.groups = new GroupsApi(configuration);
    }

    /**
     * @summary Add Organization
     * @param {Organization} [organization] Orgnaization Details
     * @throws {RequiredError}
     * @memberof OrganizationsApi
     */
    public create(organization?: Organization): Promise<Organization> {
        return this.restClient.post<Organization>('/account/organizations', {}, organization);
    }

    /**
     * @summary Delete Organization
     * @param {string} organizationId Id of the organization
     * @throws {RequiredError}
     * @memberof OrganizationsApi
     */
    public delete(organizationId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            organization_id: organizationId
        };
        return this.restClient.delete<BitmovinResponse>('/account/organizations/{organization_id}', pathParamMap);
    }

    /**
     * @summary Organization Details
     * @param {string} organizationId Id of the organization
     * @throws {RequiredError}
     * @memberof OrganizationsApi
     */
    public get(organizationId: string): Promise<Organization> {
        const pathParamMap = {
            organization_id: organizationId
        };
        return this.restClient.get<Organization>('/account/organizations/{organization_id}', pathParamMap);
    }

    /**
     * @summary List Organizations
     * @throws {RequiredError}
     * @memberof OrganizationsApi
     */
    public list(): Promise<PaginationResponse<Organization>> {
        return this.restClient.get<PaginationResponse<Organization>>('/account/organizations', {});
    }

}
