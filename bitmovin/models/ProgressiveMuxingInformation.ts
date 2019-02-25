import MuxingInformationAudioTrack from './MuxingInformationAudioTrack';
import MuxingInformationVideoTrack from './MuxingInformationVideoTrack';

/**
 * @export
 * @interface ProgressiveMuxingInformation
 */
export default interface ProgressiveMuxingInformation {
    /**
     * The mime type of the muxing
     * @type {string}
     * @memberof ProgressiveMuxingInformation
     */
    mimeType?: string;

    /**
     * The file size of the muxing in bytes
     * @type {number}
     * @memberof ProgressiveMuxingInformation
     */
    fileSize?: number;

    /**
     * The container format used
     * @type {string}
     * @memberof ProgressiveMuxingInformation
     */
    containerFormat?: string;

    /**
     * The bitrate of the container if available (tracks + container overhead)
     * @type {number}
     * @memberof ProgressiveMuxingInformation
     */
    containerBitrate?: number;

    /**
     * The duration of the container in seconds
     * @type {number}
     * @memberof ProgressiveMuxingInformation
     */
    duration?: number;

    /**
     * Information about the video tracks in the container
     * @type {Array<MuxingInformationVideoTrack>}
     * @memberof ProgressiveMuxingInformation
     */
    videoTracks?: Array<MuxingInformationVideoTrack>;

    /**
     * Information about the audio tracks in the container
     * @type {Array<MuxingInformationAudioTrack>}
     * @memberof ProgressiveMuxingInformation
     */
    audioTracks?: Array<MuxingInformationAudioTrack>;

}
