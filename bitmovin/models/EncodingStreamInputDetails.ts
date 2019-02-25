import AudioStream from './AudioStream';
import MediaStream from './MediaStream';
import SubtitleStream from './SubtitleStream';
import VideoStream from './VideoStream';

/**
 * @export
 * @interface EncodingStreamInputDetails
 */
export default interface EncodingStreamInputDetails {
    /**
     * Format name
     * @type {string}
     * @memberof EncodingStreamInputDetails
     */
    formatName?: string;

    /**
     * The start time in seconds
     * @type {number}
     * @memberof EncodingStreamInputDetails
     */
    startTime?: number;

    /**
     * Duration in seconds
     * @type {number}
     * @memberof EncodingStreamInputDetails
     */
    duration?: number;

    /**
     * Input file size in bytes
     * @type {number}
     * @memberof EncodingStreamInputDetails
     */
    size?: number;

    /**
     * Bitrate in bps
     * @type {number}
     * @memberof EncodingStreamInputDetails
     */
    bitrate?: number;

    /**
     * Additional metadata saved in the input file
     * @type {Array<string>}
     * @memberof EncodingStreamInputDetails
     */
    tags?: Array<string>;

    /**
     * Video streams in the input file
     * @type {Array<VideoStream>}
     * @memberof EncodingStreamInputDetails
     */
    videoStreams?: Array<VideoStream>;

    /**
     * Audio stream in the input file
     * @type {Array<AudioStream>}
     * @memberof EncodingStreamInputDetails
     */
    audioStreams?: Array<AudioStream>;

    /**
     * Meta data streams in the input file
     * @type {Array<MediaStream>}
     * @memberof EncodingStreamInputDetails
     */
    metaStreams?: Array<MediaStream>;

    /**
     * Subtitle streams in the input file
     * @type {Array<SubtitleStream>}
     * @memberof EncodingStreamInputDetails
     */
    subtitleStreams?: Array<SubtitleStream>;

}
