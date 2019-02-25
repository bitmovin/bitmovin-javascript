import AudioStreamDetails from './AudioStreamDetails';
import MetaStreamDetails from './MetaStreamDetails';
import SubtitleStreamDetails from './SubtitleStreamDetails';
import VideoStreamDetails from './VideoStreamDetails';

/**
 * @export
 * @interface AnalysisDetails
 */
export default interface AnalysisDetails {
    /**
     * @type {Array<VideoStreamDetails>}
     * @memberof AnalysisDetails
     */
    videoStreams?: Array<VideoStreamDetails>;

    /**
     * @type {Array<AudioStreamDetails>}
     * @memberof AnalysisDetails
     */
    audioStreams?: Array<AudioStreamDetails>;

    /**
     * @type {Array<MetaStreamDetails>}
     * @memberof AnalysisDetails
     */
    metaStreams?: Array<MetaStreamDetails>;

    /**
     * @type {Array<SubtitleStreamDetails>}
     * @memberof AnalysisDetails
     */
    subtitleStreams?: Array<SubtitleStreamDetails>;

}
