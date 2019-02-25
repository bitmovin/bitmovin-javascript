import MediaStream from './MediaStream';

/**
 * @export
 * @interface AudioStream
 */
export default interface AudioStream extends MediaStream {
    /**
     * Audio sampling rate in Hz
     * @type {number}
     * @memberof AudioStream
     */
    sampleRate?: number;

    /**
     * Bitrate in bps
     * @type {number}
     * @memberof AudioStream
     */
    bitrate?: number;

    /**
     * Bitrate in bps
     * @type {number}
     * @memberof AudioStream
     */
    rate?: number;

    /**
     * Audio channel format
     * @type {string}
     * @memberof AudioStream
     */
    channelFormat?: string;

    /**
     * Language of the stream
     * @type {string}
     * @memberof AudioStream
     */
    language?: string;

    /**
     * Hearing impaired support
     * @type {boolean}
     * @memberof AudioStream
     */
    hearingImpaired?: boolean;

}
