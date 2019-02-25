
/**
 * @export
 * @interface Trimming
 */
export default interface Trimming {
    /**
     * Defines the offset in seconds from which the encoding should start, beginning at 0.
     * @type {number}
     * @memberof Trimming
     */
    offset?: number;

    /**
     * Defines how many seconds from the input will be encoded.
     * @type {number}
     * @memberof Trimming
     */
    duration?: number;

    /**
     * If set, \"duration\" will be interpreted as a maximum and not cause an error if the input is too short
     * @type {boolean}
     * @memberof Trimming
     */
    ignoreDurationIfInputTooShort?: boolean;

    /**
     * Defines the H264 picture timing of the first frame from which the encoding should start. Any defined offset or duration in seconds will be ignored.
     * @type {string}
     * @memberof Trimming
     */
    startPicTiming?: string;

    /**
     * Defines the H264 picture timing of the last frame, that will be included in the encoding. Any defined offset or duration in seconds will be ignored.
     * @type {string}
     * @memberof Trimming
     */
    endPicTiming?: string;

}
