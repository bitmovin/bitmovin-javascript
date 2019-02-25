import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface Keyframe
 */
export default interface Keyframe extends BitmovinResource {
    /**
     * Time in seconds where the keyframe should be inserted
     * @type {number}
     * @memberof Keyframe
     */
    time: number;

    /**
     * Instructs the encoder to cut the segment at this position
     * @type {boolean}
     * @memberof Keyframe
     */
    segmentCut?: boolean;

}
