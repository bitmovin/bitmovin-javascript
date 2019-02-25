import StreamDetails from './StreamDetails';

/**
 * @export
 * @interface AudioStreamDetails
 */
export default interface AudioStreamDetails extends StreamDetails {
    /**
     * @type {number}
     * @memberof AudioStreamDetails
     */
    sampleRate?: number;

    /**
     * @type {number}
     * @memberof AudioStreamDetails
     */
    bitrate?: number;

    /**
     * @type {string}
     * @memberof AudioStreamDetails
     */
    language?: string;

    /**
     * @type {boolean}
     * @memberof AudioStreamDetails
     */
    hearingImpaired?: boolean;

}
