import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface SmoothManifestContentProtection
 */
export default interface SmoothManifestContentProtection extends BitmovinResource {
    /**
     * Id of the encoding.
     * @type {string}
     * @memberof SmoothManifestContentProtection
     */
    encodingId: string;

    /**
     * Id of the muxing.
     * @type {string}
     * @memberof SmoothManifestContentProtection
     */
    muxingId: string;

    /**
     * Id of the drm.
     * @type {string}
     * @memberof SmoothManifestContentProtection
     */
    drmId: string;

}
