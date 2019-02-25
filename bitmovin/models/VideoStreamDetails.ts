import StreamDetails from './StreamDetails';

/**
 * @export
 * @interface VideoStreamDetails
 */
export default interface VideoStreamDetails extends StreamDetails {
    /**
     * @type {string}
     * @memberof VideoStreamDetails
     */
    fps?: string;

    /**
     * @type {number}
     * @memberof VideoStreamDetails
     */
    width?: number;

    /**
     * @type {number}
     * @memberof VideoStreamDetails
     */
    height?: number;

    /**
     * @type {number}
     * @memberof VideoStreamDetails
     */
    bitrate?: number;

}
