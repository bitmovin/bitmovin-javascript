import BitmovinResponse from './BitmovinResponse';

/**
 * @export
 * @interface MediaStream
 */
export default interface MediaStream extends BitmovinResponse {
    /**
     * Position starts from 0 and indicates the position of the stream in the media. 0 means that this is the first stream found in the media
     * @type {number}
     * @memberof MediaStream
     */
    position?: number;

    /**
     * Duration of the stream in seconds
     * @type {number}
     * @memberof MediaStream
     */
    duration?: number;

    /**
     * Codec of the stream
     * @type {string}
     * @memberof MediaStream
     */
    codec?: string;

}
