import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import Acl from '../../../../models/Acl';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';

/**
 * PermissionsApi - object-oriented interface
 * @export
 * @class PermissionsApi
 * @extends {BaseAPI}
 */
export default class PermissionsApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Set Group Permissions
     * @param {string} organizationId Id of the organization
     * @param {string} groupId Id of the group
     * @param {Acl} [acl]
     * @throws {RequiredError}
     * @memberof PermissionsApi
     */
    public create(organizationId: string, groupId: string, acl?: Acl): Promise<Acl> {
        const pathParamMap = {
            organization_id: organizationId,
            group_id: groupId
        };
        return this.restClient.post<Acl>('/account/organizations/{organization_id}/groups/{group_id}/permissions', pathParamMap, acl);
    }

    /**
     * @summary Delete Permission
     * @param {string} organizationId Id of the organization
     * @param {string} groupId Id of the group
     * @param {string} permissionId Id of the permission
     * @throws {RequiredError}
     * @memberof PermissionsApi
     */
    public delete(organizationId: string, groupId: string, permissionId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            organization_id: organizationId,
            group_id: groupId,
            permission_id: permissionId
        };
        return this.restClient.delete<BitmovinResponse>('/account/organizations/{organization_id}/groups/{group_id}/permissions/{permission_id}', pathParamMap);
    }

    /**
     * @summary Get Group Permissions
     * @param {string} organizationId Id of the organization
     * @param {string} groupId Id of the group
     * @throws {RequiredError}
     * @memberof PermissionsApi
     */
    public list(organizationId: string, groupId: string): Promise<PaginationResponse<Acl>> {
        const pathParamMap = {
            organization_id: organizationId,
            group_id: groupId
        };
        return this.restClient.get<PaginationResponse<Acl>>('/account/organizations/{organization_id}/groups/{group_id}/permissions', pathParamMap);
    }

}
