import BitmovinResource from './BitmovinResource';
import EncodingOutput from './EncodingOutput';

/**
 * @export
 * @interface SidecarFile
 */
export default interface SidecarFile extends BitmovinResource {
    /**
     * Id of input
     * @type {string}
     * @memberof SidecarFile
     */
    inputId: string;

    /**
     * Path to sidecar file
     * @type {string}
     * @memberof SidecarFile
     */
    inputPath: string;

    /**
     * @type {Array<EncodingOutput>}
     * @memberof SidecarFile
     */
    outputs?: Array<EncodingOutput>;

}
