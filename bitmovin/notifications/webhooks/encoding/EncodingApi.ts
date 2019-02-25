import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import EncodingsApi from './encodings/EncodingsApi';

/**
 * EncodingApi - object-oriented interface
 * @export
 * @class EncodingApi
 * @extends {BaseAPI}
 */
export default class EncodingApi extends BaseAPI {
    public encodings: EncodingsApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.encodings = new EncodingsApi(configuration);
    }

}
