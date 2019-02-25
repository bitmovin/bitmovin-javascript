import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import ManifestTypeResponse from '../../../models/ManifestTypeResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';

/**
 * TypeApi - object-oriented interface
 * @export
 * @class TypeApi
 * @extends {BaseAPI}
 */
export default class TypeApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Get Manifest Type
     * @param {string} manifestId UUID of the manifest
     * @throws {RequiredError}
     * @memberof TypeApi
     */
    public get(manifestId: string): Promise<ManifestTypeResponse> {
        const pathParamMap = {
            manifest_id: manifestId
        };
        return this.restClient.get<ManifestTypeResponse>('/encoding/manifests/{manifest_id}/type', pathParamMap);
    }

}
