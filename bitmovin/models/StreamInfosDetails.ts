import LiveEncodingCodec from './LiveEncodingCodec';
import MediaType from './MediaType';

/**
 * @export
 * @interface StreamInfosDetails
 */
export default interface StreamInfosDetails {
    /**
     * The id of the stream
     * @type {number}
     * @memberof StreamInfosDetails
     */
    id: number;

    /**
     * The media type of the stream
     * @type {MediaType}
     * @memberof StreamInfosDetails
     */
    mediaType: MediaType;

    /**
     * The width of the stream, if it is a video stream
     * @type {number}
     * @memberof StreamInfosDetails
     */
    width?: number;

    /**
     * The height of the stream, if it is a video stream
     * @type {number}
     * @memberof StreamInfosDetails
     */
    height?: number;

    /**
     * The rate (sample rate / fps) of the stream
     * @type {number}
     * @memberof StreamInfosDetails
     */
    rate: number;

    /**
     * The codec of the input stream
     * @type {LiveEncodingCodec}
     * @memberof StreamInfosDetails
     */
    codec: LiveEncodingCodec;

    /**
     * The minimum samples read per second within the last minute
     * @type {number}
     * @memberof StreamInfosDetails
     */
    samplesReadPerSecondMin: number;

    /**
     * The maximum samples read per second within the last minute
     * @type {number}
     * @memberof StreamInfosDetails
     */
    samplesReadPerSecondMax: number;

    /**
     * The average samples read per second within the last minute
     * @type {number}
     * @memberof StreamInfosDetails
     */
    samplesReadPerSecondAvg: number;

    /**
     * The minimum amount of backup samples used per second within the last minute. This will be written when no live stream is ingested. The last picture will be repeated with silent audio.
     * @type {number}
     * @memberof StreamInfosDetails
     */
    samplesBackupPerSecondMin: number;

    /**
     * The maximum amount of backup samples used per second within the last minute. This will be written when no live stream is ingested. The last picture will be repeated with silent audio.
     * @type {number}
     * @memberof StreamInfosDetails
     */
    samplesBackupPerSecondMax: number;

    /**
     * The average amount of backup samples used per second within the last minute. This will be written when no live stream is ingested. The last picture will be repeated with silent audio.
     * @type {number}
     * @memberof StreamInfosDetails
     */
    samplesBackupPerSecondAvg: number;

    /**
     * The minimum bytes read per second within the last minute
     * @type {number}
     * @memberof StreamInfosDetails
     */
    bytesReadPerSecondMin: number;

    /**
     * The maximum bytes read per second within the last minute
     * @type {number}
     * @memberof StreamInfosDetails
     */
    bytesReadPerSecondMax: number;

    /**
     * The average bytes read per second within the last minute
     * @type {number}
     * @memberof StreamInfosDetails
     */
    bytesReadPerSecondAvg: number;

    /**
     * The minimum amount of backup bytes used per second within the last minute. This will be written when no live stream is ingested. The last picture will be repeated with silent audio.
     * @type {number}
     * @memberof StreamInfosDetails
     */
    bytesBackupPerSecondMin: number;

    /**
     * The maximum amount of backup bytes used per second within the last minute. This will be written when no live stream is ingested. The last picture will be repeated with silent audio.
     * @type {number}
     * @memberof StreamInfosDetails
     */
    bytesBackupPerSecondMax: number;

    /**
     * The average amount of backup bytes used per second within the last minute. This will be written when no live stream is ingested. The last picture will be repeated with silent audio.
     * @type {number}
     * @memberof StreamInfosDetails
     */
    bytesBackupPerSecondAvg: number;

}
