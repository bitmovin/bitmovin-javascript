import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import IngestApi from './ingest/IngestApi';
import ConcatenationApi from './concatenation/ConcatenationApi';
import TrimmingApi from './trimming/TrimmingApi';

/**
 * InputStreamsApi - object-oriented interface
 * @export
 * @class InputStreamsApi
 * @extends {BaseAPI}
 */
export default class InputStreamsApi extends BaseAPI {
    public ingest: IngestApi;
    public concatenation: ConcatenationApi;
    public trimming: TrimmingApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.ingest = new IngestApi(configuration);
        this.concatenation = new ConcatenationApi(configuration);
        this.trimming = new TrimmingApi(configuration);
    }

}
