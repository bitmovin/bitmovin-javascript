import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import Mp4Api from './mp4/Mp4Api';

/**
 * RepresentationsApi - object-oriented interface
 * @export
 * @class RepresentationsApi
 * @extends {BaseAPI}
 */
export default class RepresentationsApi extends BaseAPI {
    public mp4: Mp4Api;

    constructor(configuration: Configuration) {
        super(configuration);
        this.mp4 = new Mp4Api(configuration);
    }

}
