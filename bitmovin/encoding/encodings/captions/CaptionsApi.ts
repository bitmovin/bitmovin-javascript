import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CeaApi from './cea/CeaApi';
import WebvttApi from './webvtt/WebvttApi';
import TtmlApi from './ttml/TtmlApi';
import SccApi from './scc/SccApi';

/**
 * CaptionsApi - object-oriented interface
 * @export
 * @class CaptionsApi
 * @extends {BaseAPI}
 */
export default class CaptionsApi extends BaseAPI {
    public cea: CeaApi;
    public webvtt: WebvttApi;
    public ttml: TtmlApi;
    public scc: SccApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.cea = new CeaApi(configuration);
        this.webvtt = new WebvttApi(configuration);
        this.ttml = new TtmlApi(configuration);
        this.scc = new SccApi(configuration);
    }

}
