import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import WebvttApi from './webvtt/WebvttApi';
import TtmlApi from './ttml/TtmlApi';

/**
 * CaptionsApi - object-oriented interface
 * @export
 * @class CaptionsApi
 * @extends {BaseAPI}
 */
export default class CaptionsApi extends BaseAPI {
    public webvtt: WebvttApi;
    public ttml: TtmlApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.webvtt = new WebvttApi(configuration);
        this.ttml = new TtmlApi(configuration);
    }

}
