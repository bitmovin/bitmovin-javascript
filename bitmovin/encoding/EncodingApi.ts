import { BaseAPI } from '../common/BaseAPI';
import { Configuration } from '../common/RestClient';
import InputsApi from './inputs/InputsApi';
import OutputsApi from './outputs/OutputsApi';
import ConfigurationsApi from './configurations/ConfigurationsApi';
import FiltersApi from './filters/FiltersApi';
import EncodingsApi from './encodings/EncodingsApi';
import ManifestsApi from './manifests/ManifestsApi';
import InfrastructureApi from './infrastructure/InfrastructureApi';
import StatisticsApi from './statistics/StatisticsApi';

/**
 * EncodingApi - object-oriented interface
 * @export
 * @class EncodingApi
 * @extends {BaseAPI}
 */
export default class EncodingApi extends BaseAPI {
    public inputs: InputsApi;
    public outputs: OutputsApi;
    public configurations: ConfigurationsApi;
    public filters: FiltersApi;
    public encodings: EncodingsApi;
    public manifests: ManifestsApi;
    public infrastructure: InfrastructureApi;
    public statistics: StatisticsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.inputs = new InputsApi(configuration);
        this.outputs = new OutputsApi(configuration);
        this.configurations = new ConfigurationsApi(configuration);
        this.filters = new FiltersApi(configuration);
        this.encodings = new EncodingsApi(configuration);
        this.manifests = new ManifestsApi(configuration);
        this.infrastructure = new InfrastructureApi(configuration);
        this.statistics = new StatisticsApi(configuration);
    }

}
