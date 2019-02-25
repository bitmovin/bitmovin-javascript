
/**
 * @export
 * @interface MuxingInformationAudioTrack
 */
export default interface MuxingInformationAudioTrack {
    /**
     * The stream index in the container
     * @type {number}
     * @memberof MuxingInformationAudioTrack
     */
    index?: number;

    /**
     * The codec used for the track
     * @type {string}
     * @memberof MuxingInformationAudioTrack
     */
    codec?: string;

    /**
     * The codec string of the track
     * @type {string}
     * @memberof MuxingInformationAudioTrack
     */
    codecIso?: string;

    /**
     * The bitrate of the audio track
     * @type {number}
     * @memberof MuxingInformationAudioTrack
     */
    bitRate?: number;

    /**
     * @type {number}
     * @memberof MuxingInformationAudioTrack
     */
    rate?: number;

    /**
     * The sampling rate of the audio stream
     * @type {number}
     * @memberof MuxingInformationAudioTrack
     */
    sampleRate?: number;

    /**
     * The number of channels in this audio stream
     * @type {number}
     * @memberof MuxingInformationAudioTrack
     */
    channels?: number;

    /**
     * TODO add description
     * @type {number}
     * @memberof MuxingInformationAudioTrack
     */
    duration?: number;

}
