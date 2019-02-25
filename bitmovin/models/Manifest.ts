import BitmovinResource from './BitmovinResource';
import EncodingOutput from './EncodingOutput';
import ManifestType from './ManifestType';

/**
 * @export
 * @interface Manifest
 */
export default interface Manifest extends BitmovinResource {
    /**
     * @type {ManifestType}
     * @memberof Manifest
     */
    type?: ManifestType;

    /**
     * The outputs to store the manifest
     * @type {Array<EncodingOutput>}
     * @memberof Manifest
     */
    outputs: Array<EncodingOutput>;

}
