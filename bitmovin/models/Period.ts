import BitmovinResponse from './BitmovinResponse';

/**
 * @export
 * @interface Period
 */
export default interface Period extends BitmovinResponse {
    /**
     * Starting time in seconds
     * @type {number}
     * @memberof Period
     */
    start?: number;

    /**
     * Duration in seconds
     * @type {number}
     * @memberof Period
     */
    duration?: number;

}
