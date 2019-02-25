import EncodingOutput from './EncodingOutput';
import Manifest from './Manifest';
import ManifestType from './ManifestType';

/**
 * @export
 * @interface SmoothStreamingManifest
 */
export default interface SmoothStreamingManifest extends Manifest {
    /**
     * Filename of the server manifest
     * @type {string}
     * @memberof SmoothStreamingManifest
     */
    serverManifestName?: string;

    /**
     * Filename of the client manifest
     * @type {string}
     * @memberof SmoothStreamingManifest
     */
    clientManifestName?: string;

}
