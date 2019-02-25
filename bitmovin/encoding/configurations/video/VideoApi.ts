import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import H264Api from './h264/H264Api';
import H265Api from './h265/H265Api';
import Vp8Api from './vp8/Vp8Api';
import Vp9Api from './vp9/Vp9Api';
import Av1Api from './av1/Av1Api';
import MjpegApi from './mjpeg/MjpegApi';

/**
 * VideoApi - object-oriented interface
 * @export
 * @class VideoApi
 * @extends {BaseAPI}
 */
export default class VideoApi extends BaseAPI {
    public h264: H264Api;
    public h265: H265Api;
    public vp8: Vp8Api;
    public vp9: Vp9Api;
    public av1: Av1Api;
    public mjpeg: MjpegApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.h264 = new H264Api(configuration);
        this.h265 = new H265Api(configuration);
        this.vp8 = new Vp8Api(configuration);
        this.vp9 = new Vp9Api(configuration);
        this.av1 = new Av1Api(configuration);
        this.mjpeg = new MjpegApi(configuration);
    }

}
