import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import PrewarmEncoderSettings from '../../../../models/PrewarmEncoderSettings';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import PrewarmEncoderSettingssListQueryParams from './PrewarmEncoderSettingssListQueryParams';

/**
 * PrewarmedDeploymentApi - object-oriented interface
 * @export
 * @class PrewarmedDeploymentApi
 * @extends {BaseAPI}
 */
export default class PrewarmedDeploymentApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Prewarm Encoders
     * @param {string} infrastructureId Id of the kubernetes cluster.
     * @param {PrewarmEncoderSettings} [prewarmEncoderSettings]
     * @throws {RequiredError}
     * @memberof PrewarmedDeploymentApi
     */
    public create(infrastructureId: string, prewarmEncoderSettings?: PrewarmEncoderSettings): Promise<PrewarmEncoderSettings> {
        const pathParamMap = {
            infrastructure_id: infrastructureId
        };
        return this.restClient.post<PrewarmEncoderSettings>('/encoding/infrastructure/kubernetes/{infrastructure_id}/prewarmed-deployment', pathParamMap, prewarmEncoderSettings);
    }

    /**
     * @summary Delete Prewarmed Encoders
     * @param {string} infrastructureId Id of the kubernetes cluster.
     * @param {string} deploymentId Id of the prewarmed deployment.
     * @throws {RequiredError}
     * @memberof PrewarmedDeploymentApi
     */
    public delete(infrastructureId: string, deploymentId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            infrastructure_id: infrastructureId,
            deployment_id: deploymentId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/infrastructure/kubernetes/{infrastructure_id}/prewarmed-deployment/{deployment_id}', pathParamMap);
    }

    /**
     * @summary Get Prewarmed Encoders
     * @param {string} infrastructureId Id of the kubernetes cluster.
     * @param {string} deploymentId Id of the prewarmed deployment.
     * @throws {RequiredError}
     * @memberof PrewarmedDeploymentApi
     */
    public get(infrastructureId: string, deploymentId: string): Promise<PrewarmEncoderSettings> {
        const pathParamMap = {
            infrastructure_id: infrastructureId,
            deployment_id: deploymentId
        };
        return this.restClient.get<PrewarmEncoderSettings>('/encoding/infrastructure/kubernetes/{infrastructure_id}/prewarmed-deployment/{deployment_id}', pathParamMap);
    }

    /**
     * @summary List Prewarmed Encoders
     * @param {string} infrastructureId Id of the kubernetes cluster.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof PrewarmedDeploymentApi
     */
    public list(infrastructureId: string, queryParams?: PrewarmEncoderSettingssListQueryParams): Promise<PaginationResponse<PrewarmEncoderSettings>> {
        const pathParamMap = {
            infrastructure_id: infrastructureId
        };
        return this.restClient.get<PaginationResponse<PrewarmEncoderSettings>>('/encoding/infrastructure/kubernetes/{infrastructure_id}/prewarmed-deployment', pathParamMap, queryParams);
    }

}
