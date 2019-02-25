import BitmovinResource from './BitmovinResource';
import InputPath from './InputPath';

/**
 * @export
 * @interface BurnInSubtitleSrt
 */
export default interface BurnInSubtitleSrt extends BitmovinResource {
    /**
     * The input location to get the SRT file from
     * @type {InputPath}
     * @memberof BurnInSubtitleSrt
     */
    input: InputPath;

}
