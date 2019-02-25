import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import TimeBasedApi from './timeBased/TimeBasedApi';
import TimecodeTrackApi from './timecodeTrack/TimecodeTrackApi';
import H264PictureTimingApi from './h264PictureTiming/H264PictureTimingApi';

/**
 * TrimmingApi - object-oriented interface
 * @export
 * @class TrimmingApi
 * @extends {BaseAPI}
 */
export default class TrimmingApi extends BaseAPI {
    public timeBased: TimeBasedApi;
    public timecodeTrack: TimecodeTrackApi;
    public h264PictureTiming: H264PictureTimingApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.timeBased = new TimeBasedApi(configuration);
        this.timecodeTrack = new TimecodeTrackApi(configuration);
        this.h264PictureTiming = new H264PictureTimingApi(configuration);
    }

}
