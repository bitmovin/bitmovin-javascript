import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import CountApi from './count/CountApi';
import SumApi from './sum/SumApi';
import AvgApi from './avg/AvgApi';
import MinApi from './min/MinApi';
import MaxApi from './max/MaxApi';
import StddevApi from './stddev/StddevApi';
import PercentileApi from './percentile/PercentileApi';
import VarianceApi from './variance/VarianceApi';
import MedianApi from './median/MedianApi';

/**
 * QueriesApi - object-oriented interface
 * @export
 * @class QueriesApi
 * @extends {BaseAPI}
 */
export default class QueriesApi extends BaseAPI {
    public count: CountApi;
    public sum: SumApi;
    public avg: AvgApi;
    public min: MinApi;
    public max: MaxApi;
    public stddev: StddevApi;
    public percentile: PercentileApi;
    public variance: VarianceApi;
    public median: MedianApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.count = new CountApi(configuration);
        this.sum = new SumApi(configuration);
        this.avg = new AvgApi(configuration);
        this.min = new MinApi(configuration);
        this.max = new MaxApi(configuration);
        this.stddev = new StddevApi(configuration);
        this.percentile = new PercentileApi(configuration);
        this.variance = new VarianceApi(configuration);
        this.median = new MedianApi(configuration);
    }

}
