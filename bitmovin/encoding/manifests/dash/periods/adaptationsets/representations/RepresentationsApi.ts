import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import VttApi from './vtt/VttApi';
import SidecarApi from './sidecar/SidecarApi';
import Fmp4Api from './fmp4/Fmp4Api';
import Mp4Api from './mp4/Mp4Api';
import WebmApi from './webm/WebmApi';

/**
 * RepresentationsApi - object-oriented interface
 * @export
 * @class RepresentationsApi
 * @extends {BaseAPI}
 */
export default class RepresentationsApi extends BaseAPI {
    public vtt: VttApi;
    public sidecar: SidecarApi;
    public fmp4: Fmp4Api;
    public mp4: Mp4Api;
    public webm: WebmApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.vtt = new VttApi(configuration);
        this.sidecar = new SidecarApi(configuration);
        this.fmp4 = new Fmp4Api(configuration);
        this.mp4 = new Mp4Api(configuration);
        this.webm = new WebmApi(configuration);
    }

}
