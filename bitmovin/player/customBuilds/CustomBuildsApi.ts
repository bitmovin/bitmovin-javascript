import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import WebApi from './web/WebApi';

/**
 * CustomBuildsApi - object-oriented interface
 * @export
 * @class CustomBuildsApi
 * @extends {BaseAPI}
 */
export default class CustomBuildsApi extends BaseAPI {
    public web: WebApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.web = new WebApi(configuration);
    }

}
