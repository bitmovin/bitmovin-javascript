import AutoRestartConfiguration from './AutoRestartConfiguration';
import EncodingMode from './EncodingMode';
import LiveDashManifest from './LiveDashManifest';
import LiveHlsManifest from './LiveHlsManifest';
import ReuploadSettings from './ReuploadSettings';

/**
 * @export
 * @interface StartLiveEncodingRequest
 */
export default interface StartLiveEncodingRequest {
    /**
     * Key for the stream. (a-zA-Z, 3-20 characters)
     * @type {string}
     * @memberof StartLiveEncodingRequest
     */
    streamKey: string;

    /**
     * List of Hls manifests to use for this live encoding
     * @type {Array<LiveHlsManifest>}
     * @memberof StartLiveEncodingRequest
     */
    hlsManifests?: Array<LiveHlsManifest>;

    /**
     * List of Dash manifests to use for this live encoding
     * @type {Array<LiveDashManifest>}
     * @memberof StartLiveEncodingRequest
     */
    dashManifests?: Array<LiveDashManifest>;

    /**
     * The pass mode of the encoding
     * @type {EncodingMode}
     * @memberof StartLiveEncodingRequest
     */
    liveEncodingMode?: EncodingMode;

    /**
     * Reupload specific files during a live encoding. This can be helpful if an automatic life cycle policy is enabled on the output storage
     * @type {ReuploadSettings}
     * @memberof StartLiveEncodingRequest
     */
    reuploadSettings?: ReuploadSettings;

    /**
     * Configuration for auto restarting the live encoding
     * @type {AutoRestartConfiguration}
     * @memberof StartLiveEncodingRequest
     */
    autoRestartConfiguration?: AutoRestartConfiguration;

}
