import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import Tenant from '../../../../models/Tenant';
import PaginationResponse from '../../../../models/PaginationResponse';

/**
 * TenantsApi - object-oriented interface
 * @export
 * @class TenantsApi
 * @extends {BaseAPI}
 */
export default class TenantsApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Tenant to Group
     * @param {string} organizationId Id of the organization
     * @param {string} groupId Id of the group
     * @param {Tenant} [tenant] Tenant details
     * @throws {RequiredError}
     * @memberof TenantsApi
     */
    public create(organizationId: string, groupId: string, tenant?: Tenant): Promise<Tenant> {
        const pathParamMap = {
            organization_id: organizationId,
            group_id: groupId
        };
        return this.restClient.post<Tenant>('/account/organizations/{organization_id}/groups/{group_id}/tenants', pathParamMap, tenant);
    }

    /**
     * @summary Delete Tenant
     * @param {string} organizationId Id of the organization
     * @param {string} groupId Id of the group
     * @param {string} tenantId Id of the tenant.
     * @throws {RequiredError}
     * @memberof TenantsApi
     */
    public delete(organizationId: string, groupId: string, tenantId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            organization_id: organizationId,
            group_id: groupId,
            tenant_id: tenantId
        };
        return this.restClient.delete<BitmovinResponse>('/account/organizations/{organization_id}/groups/{group_id}/tenants/{tenant_id}', pathParamMap);
    }

    /**
     * @summary Tenant Details
     * @param {string} organizationId Id of the organization
     * @param {string} groupId Id of the group
     * @param {string} tenantId Id of the tenant.
     * @throws {RequiredError}
     * @memberof TenantsApi
     */
    public get(organizationId: string, groupId: string, tenantId: string): Promise<Tenant> {
        const pathParamMap = {
            organization_id: organizationId,
            group_id: groupId,
            tenant_id: tenantId
        };
        return this.restClient.get<Tenant>('/account/organizations/{organization_id}/groups/{group_id}/tenants/{tenant_id}', pathParamMap);
    }

    /**
     * @summary List Tenants
     * @param {string} organizationId Id of the organization
     * @param {string} groupId Id of the group
     * @throws {RequiredError}
     * @memberof TenantsApi
     */
    public list(organizationId: string, groupId: string): Promise<PaginationResponse<Tenant>> {
        const pathParamMap = {
            organization_id: organizationId,
            group_id: groupId
        };
        return this.restClient.get<PaginationResponse<Tenant>>('/account/organizations/{organization_id}/groups/{group_id}/tenants', pathParamMap);
    }

}
