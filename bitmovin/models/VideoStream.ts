import MediaStream from './MediaStream';

/**
 * @export
 * @interface VideoStream
 */
export default interface VideoStream extends MediaStream {
    /**
     * Frame rate of the video
     * @type {string}
     * @memberof VideoStream
     */
    fps?: string;

    /**
     * Bitrate in bps
     * @type {string}
     * @memberof VideoStream
     */
    bitrate?: string;

    /**
     * Bitrate in bps
     * @type {number}
     * @memberof VideoStream
     */
    rate?: number;

    /**
     * Width of the video
     * @type {number}
     * @memberof VideoStream
     */
    width: number;

    /**
     * Height of the video
     * @type {number}
     * @memberof VideoStream
     */
    height: number;

    /**
     * Pixel aspect ratio of the video. Default is 1.0
     * @type {number}
     * @memberof VideoStream
     */
    par?: number;

    /**
     * Rotation of the video for mobile devices. Default is 0.
     * @type {number}
     * @memberof VideoStream
     */
    rotation?: number;

}
