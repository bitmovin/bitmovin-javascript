import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import RegionsApi from './regions/RegionsApi';
import AwsAccount from '../../../models/AwsAccount';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import AwsAccountsListQueryParams from './AwsAccountsListQueryParams';

/**
 * AwsApi - object-oriented interface
 * @export
 * @class AwsApi
 * @extends {BaseAPI}
 */
export default class AwsApi extends BaseAPI {
    public regions: RegionsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.regions = new RegionsApi(configuration);
    }

    /**
     * @summary Add AWS Account
     * @param {AwsAccount} [awsAccount]
     * @throws {RequiredError}
     * @memberof AwsApi
     */
    public create(awsAccount?: AwsAccount): Promise<AwsAccount> {
        return this.restClient.post<AwsAccount>('/encoding/infrastructure/aws', {}, awsAccount);
    }

    /**
     * @summary Delete AWS Account
     * @param {string} infrastructureId Id of the AWS account
     * @throws {RequiredError}
     * @memberof AwsApi
     */
    public delete(infrastructureId: string): Promise<AwsAccount> {
        const pathParamMap = {
            infrastructure_id: infrastructureId
        };
        return this.restClient.delete<AwsAccount>('/encoding/infrastructure/aws/{infrastructure_id}', pathParamMap);
    }

    /**
     * @summary AWS Account Details
     * @param {string} infrastructureId Id of the AWS account
     * @throws {RequiredError}
     * @memberof AwsApi
     */
    public get(infrastructureId: string): Promise<AwsAccount> {
        const pathParamMap = {
            infrastructure_id: infrastructureId
        };
        return this.restClient.get<AwsAccount>('/encoding/infrastructure/aws/{infrastructure_id}', pathParamMap);
    }

    /**
     * @summary List AWS Accounts
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof AwsApi
     */
    public list(queryParams?: AwsAccountsListQueryParams): Promise<PaginationResponse<AwsAccount>> {
        return this.restClient.get<PaginationResponse<AwsAccount>>('/encoding/infrastructure/aws', {}, queryParams);
    }

}
