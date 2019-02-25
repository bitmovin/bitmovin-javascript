import SegmentsMediaInfo from './SegmentsMediaInfo';

/**
 * @export
 * @interface ClosedCaptionsMediaInfo
 */
export default interface ClosedCaptionsMediaInfo extends SegmentsMediaInfo {
    /**
     * Specifies a Rendition within the segments in the Media Playlist. (See HLS spec 4.3.4.1. EXT-X-MEDIA INSTREAM-ID)
     * @type {string}
     * @memberof ClosedCaptionsMediaInfo
     */
    instreamId: string;

    /**
     * A value of true indicates that the Rendition contains content which is considered essential to play.
     * @type {boolean}
     * @memberof ClosedCaptionsMediaInfo
     */
    forced?: boolean;

}
