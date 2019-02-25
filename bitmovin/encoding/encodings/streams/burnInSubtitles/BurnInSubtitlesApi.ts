import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import SrtApi from './srt/SrtApi';

/**
 * BurnInSubtitlesApi - object-oriented interface
 * @export
 * @class BurnInSubtitlesApi
 * @extends {BaseAPI}
 */
export default class BurnInSubtitlesApi extends BaseAPI {
    public srt: SrtApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.srt = new SrtApi(configuration);
    }

}
