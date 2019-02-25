import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import AwsAccountRegionSettings from '../../../../models/AwsAccountRegionSettings';
import AwsCloudRegion from '../../../../models/AwsCloudRegion';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import AwsAccountRegionSettingssListQueryParams from './AwsAccountRegionSettingssListQueryParams';

/**
 * RegionsApi - object-oriented interface
 * @export
 * @class RegionsApi
 * @extends {BaseAPI}
 */
export default class RegionsApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add AWS Region Setting
     * @param {string} infrastructureId Id of the AWS account
     * @param {AwsCloudRegion} region AWS region.
     * @param {AwsAccountRegionSettings} [awsAccountRegionSettings]
     * @throws {RequiredError}
     * @memberof RegionsApi
     */
    public create(infrastructureId: string, region: AwsCloudRegion, awsAccountRegionSettings?: AwsAccountRegionSettings): Promise<AwsAccountRegionSettings> {
        const pathParamMap = {
            infrastructure_id: infrastructureId,
            region: region
        };
        return this.restClient.post<AwsAccountRegionSettings>('/encoding/infrastructure/aws/{infrastructure_id}/regions/{region}', pathParamMap, awsAccountRegionSettings);
    }

    /**
     * @summary Delete AWS Region Settings
     * @param {string} infrastructureId Id of the AWS account
     * @param {AwsCloudRegion} region AWS region.
     * @throws {RequiredError}
     * @memberof RegionsApi
     */
    public delete(infrastructureId: string, region: AwsCloudRegion): Promise<AwsAccountRegionSettings> {
        const pathParamMap = {
            infrastructure_id: infrastructureId,
            region: region
        };
        return this.restClient.delete<AwsAccountRegionSettings>('/encoding/infrastructure/aws/{infrastructure_id}/regions/{region}', pathParamMap);
    }

    /**
     * @summary AWS Region Settings Details
     * @param {string} infrastructureId Id of the AWS account
     * @param {AwsCloudRegion} region AWS region.
     * @throws {RequiredError}
     * @memberof RegionsApi
     */
    public get(infrastructureId: string, region: AwsCloudRegion): Promise<AwsAccountRegionSettings> {
        const pathParamMap = {
            infrastructure_id: infrastructureId,
            region: region
        };
        return this.restClient.get<AwsAccountRegionSettings>('/encoding/infrastructure/aws/{infrastructure_id}/regions/{region}', pathParamMap);
    }

    /**
     * @summary List AWS Region Settings
     * @param {string} infrastructureId Id of the AWS account
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof RegionsApi
     */
    public list(infrastructureId: string, queryParams?: AwsAccountRegionSettingssListQueryParams): Promise<PaginationResponse<AwsAccountRegionSettings>> {
        const pathParamMap = {
            infrastructure_id: infrastructureId
        };
        return this.restClient.get<PaginationResponse<AwsAccountRegionSettings>>('/encoding/infrastructure/aws/{infrastructure_id}/regions', pathParamMap, queryParams);
    }

}
