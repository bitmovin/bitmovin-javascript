import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import DvbsubApi from './dvbsub/DvbsubApi';

/**
 * SubtitlesApi - object-oriented interface
 * @export
 * @class SubtitlesApi
 * @extends {BaseAPI}
 */
export default class SubtitlesApi extends BaseAPI {
    public dvbsub: DvbsubApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.dvbsub = new DvbsubApi(configuration);
    }

}
