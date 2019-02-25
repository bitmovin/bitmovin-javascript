import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import KubernetesApi from './kubernetes/KubernetesApi';
import AwsApi from './aws/AwsApi';

/**
 * InfrastructureApi - object-oriented interface
 * @export
 * @class InfrastructureApi
 * @extends {BaseAPI}
 */
export default class InfrastructureApi extends BaseAPI {
    public kubernetes: KubernetesApi;
    public aws: AwsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.kubernetes = new KubernetesApi(configuration);
        this.aws = new AwsApi(configuration);
    }

}
