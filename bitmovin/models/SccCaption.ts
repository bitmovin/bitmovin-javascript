import BitmovinResource from './BitmovinResource';
import InputPath from './InputPath';

/**
 * @export
 * @interface SccCaption
 */
export default interface SccCaption extends BitmovinResource {
    /**
     * The input location to get the scc file from
     * @type {InputPath}
     * @memberof SccCaption
     */
    input: InputPath;

}
