import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomPlayerBuildDownload from '../../../../models/CustomPlayerBuildDownload';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';

/**
 * DownloadApi - object-oriented interface
 * @export
 * @class DownloadApi
 * @extends {BaseAPI}
 */
export default class DownloadApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Custom Web Player Build Download Link
     * @param {string} customBuildId Id of the custom player build
     * @throws {RequiredError}
     * @memberof DownloadApi
     */
    public get(customBuildId: string): Promise<CustomPlayerBuildDownload> {
        const pathParamMap = {
            custom_build_id: customBuildId
        };
        return this.restClient.get<CustomPlayerBuildDownload>('/player/custom-builds/web/{custom_build_id}/download', pathParamMap);
    }

}
