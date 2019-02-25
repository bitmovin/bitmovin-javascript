
/**
 * @export
 * @interface MuxingInformationVideoTrack
 */
export default interface MuxingInformationVideoTrack {
    /**
     * The stream index in the container
     * @type {number}
     * @memberof MuxingInformationVideoTrack
     */
    index?: number;

    /**
     * The codec used for the track
     * @type {string}
     * @memberof MuxingInformationVideoTrack
     */
    codec?: string;

    /**
     * The codec string of the track
     * @type {string}
     * @memberof MuxingInformationVideoTrack
     */
    codecIso?: string;

    /**
     * The bitrate of the video track
     * @type {number}
     * @memberof MuxingInformationVideoTrack
     */
    bitRate?: number;

    /**
     * TODO add description
     * @type {number}
     * @memberof MuxingInformationVideoTrack
     */
    rate?: number;

    /**
     * The pixel format used
     * @type {string}
     * @memberof MuxingInformationVideoTrack
     */
    pixelFormat?: string;

    /**
     * The frame mode (e.g. progressive)
     * @type {string}
     * @memberof MuxingInformationVideoTrack
     */
    frameMode?: string;

    /**
     * The width of the frame in pixel
     * @type {number}
     * @memberof MuxingInformationVideoTrack
     */
    frameWidth?: number;

    /**
     * The height of the frame in pixel
     * @type {number}
     * @memberof MuxingInformationVideoTrack
     */
    frameHeight?: number;

    /**
     * The frame rate of the stream in fractional format
     * @type {string}
     * @memberof MuxingInformationVideoTrack
     */
    frameRate?: string;

    /**
     * The start time in seconds
     * @type {number}
     * @memberof MuxingInformationVideoTrack
     */
    startTime?: number;

    /**
     * The duration in seconds
     * @type {number}
     * @memberof MuxingInformationVideoTrack
     */
    duration?: number;

    /**
     * The number of frames of that video track
     * @type {number}
     * @memberof MuxingInformationVideoTrack
     */
    numberOfFrames?: number;

    /**
     * The aspect ratio of the stream
     * @type {string}
     * @memberof MuxingInformationVideoTrack
     */
    aspectRatio?: string;

}
