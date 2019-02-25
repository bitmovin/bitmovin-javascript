import MediaStream from './MediaStream';

/**
 * @export
 * @interface SubtitleStream
 */
export default interface SubtitleStream extends MediaStream {
    /**
     * Language of the stream
     * @type {string}
     * @memberof SubtitleStream
     */
    language?: string;

    /**
     * Hearing impaired support
     * @type {boolean}
     * @memberof SubtitleStream
     */
    hearingImpaired?: boolean;

}
