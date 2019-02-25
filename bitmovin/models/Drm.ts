import BitmovinResource from './BitmovinResource';
import DrmType from './DrmType';
import EncodingOutput from './EncodingOutput';

/**
 * @export
 * @interface Drm
 */
export default interface Drm extends BitmovinResource {
    /**
     * @type {DrmType}
     * @memberof Drm
     */
    type?: DrmType;

    /**
     * @type {Array<EncodingOutput>}
     * @memberof Drm
     */
    outputs?: Array<EncodingOutput>;

}
