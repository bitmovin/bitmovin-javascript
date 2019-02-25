import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import FinishedApi from './finished/FinishedApi';
import ErrorApi from './error/ErrorApi';

/**
 * EncodingsApi - object-oriented interface
 * @export
 * @class EncodingsApi
 * @extends {BaseAPI}
 */
export default class EncodingsApi extends BaseAPI {
    public finished: FinishedApi;
    public error: ErrorApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.finished = new FinishedApi(configuration);
        this.error = new ErrorApi(configuration);
    }

}
