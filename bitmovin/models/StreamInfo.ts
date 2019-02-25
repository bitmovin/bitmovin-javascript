import AudioGroupConfiguration from './AudioGroupConfiguration';
import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface StreamInfo
 */
export default interface StreamInfo extends BitmovinResource {
    /**
     * It MUST match the value of the GROUP-ID attribute of an Audio EXT-X-MEDIA tag elsewhere in the Master Playlist. Either this or `audioGroups` must be set.
     * @type {string}
     * @memberof StreamInfo
     */
    audio?: string;

    /**
     * HLS Audio Group Configuration. You will want to use this configuration property in case you specify conditions on audio streams. The first matching audio group will be used for the specific variant stream. Either this or `audio` must be set.
     * @type {AudioGroupConfiguration}
     * @memberof StreamInfo
     */
    audioGroups?: AudioGroupConfiguration;

    /**
     * It MUST match the value of the GROUP-ID attribute of a Video EXT-X-MEDIA tag elsewhere in the Master Playlist
     * @type {string}
     * @memberof StreamInfo
     */
    video?: string;

    /**
     * It MUST match the value of the GROUP-ID attribute of a Subtitles EXT-X-MEDIA tag elsewhere in the Master Playlist
     * @type {string}
     * @memberof StreamInfo
     */
    subtitles?: string;

    /**
     * If the value is not 'NONE', it MUST match the value of the GROUP-ID attribute of a Closed Captions EXT-X-MEDIA tag elsewhere in the Playlist
     * @type {string}
     * @memberof StreamInfo
     */
    closedCaptions: string;

    /**
     * Id of the encoding.
     * @type {string}
     * @memberof StreamInfo
     */
    encodingId: string;

    /**
     * Id of the stream.
     * @type {string}
     * @memberof StreamInfo
     */
    streamId: string;

    /**
     * Id of the muxing.
     * @type {string}
     * @memberof StreamInfo
     */
    muxingId: string;

    /**
     * Id of the DRM.
     * @type {string}
     * @memberof StreamInfo
     */
    drmId?: string;

    /**
     * Path to segments.
     * @type {string}
     * @memberof StreamInfo
     */
    segmentPath: string;

    /**
     * The URI of the playlist file.
     * @type {string}
     * @memberof StreamInfo
     */
    uri: string;

    /**
     * Number of the first segment. Default is 0.
     * @type {number}
     * @memberof StreamInfo
     */
    startSegmentNumber?: number;

    /**
     * Number of the last segment. Default is the last one that was encoded.
     * @type {number}
     * @memberof StreamInfo
     */
    endSegmentNumber?: number;

}
