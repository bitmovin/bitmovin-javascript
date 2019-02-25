import EncodingOutput from './EncodingOutput';
import HlsVersion from './HlsVersion';
import Manifest from './Manifest';
import ManifestType from './ManifestType';

/**
 * @export
 * @interface HlsManifest
 */
export default interface HlsManifest extends Manifest {
    /**
     * The filename of your manifest
     * @type {string}
     * @memberof HlsManifest
     */
    manifestName: string;

    /**
     * If this is set, the EXT-X-VERSION tags of the Media Playlists are set to the provided version
     * @type {HlsVersion}
     * @memberof HlsManifest
     */
    hlsMediaPlaylistVersion?: HlsVersion;

    /**
     * If this is set, the EXT-X-VERSION tag of the Master Playlist is set to the provided version
     * @type {HlsVersion}
     * @memberof HlsManifest
     */
    hlsMasterPlaylistVersion?: HlsVersion;

}
