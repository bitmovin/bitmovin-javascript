import EncodingMode from './EncodingMode';
import ManifestResource from './ManifestResource';
import PerTitle from './PerTitle';
import Scheduling from './Scheduling';
import Trimming from './Trimming';
import Tweaks from './Tweaks';

/**
 * @export
 * @interface StartEncodingRequest
 */
export default interface StartEncodingRequest {
    /**
     * Allows to encode only part of the input. Defines start (offset) and duration of the desired section.
     * @type {Trimming}
     * @memberof StartEncodingRequest
     */
    trimming?: Trimming;

    /**
     * Set scheduling parameters of the encoding.
     * @type {Scheduling}
     * @memberof StartEncodingRequest
     */
    scheduling?: Scheduling;

    /**
     * Set special tweaks for your encoding job.
     * @type {Tweaks}
     * @memberof StartEncodingRequest
     */
    tweaks?: Tweaks;

    /**
     * Enable frame dropping/duplication to handle variable frames per seconds of video input streams
     * @type {boolean}
     * @memberof StartEncodingRequest
     */
    handleVariableInputFps?: boolean;

    /**
     * The pass mode of the encoding
     * @type {EncodingMode}
     * @memberof StartEncodingRequest
     */
    encodingMode?: EncodingMode;

    /**
     * List of preview DASH manifests to be created
     * @type {Array<ManifestResource>}
     * @memberof StartEncodingRequest
     */
    previewDashManifests?: Array<ManifestResource>;

    /**
     * List of preview HLS manifests to be created
     * @type {Array<ManifestResource>}
     * @memberof StartEncodingRequest
     */
    previewHlsManifests?: Array<ManifestResource>;

    /**
     * List of VoD DASH manifests to be created after encoding finished successfully
     * @type {Array<ManifestResource>}
     * @memberof StartEncodingRequest
     */
    vodDashManifests?: Array<ManifestResource>;

    /**
     * List of VoD HLS manifests to be created after encoding finished successfully
     * @type {Array<ManifestResource>}
     * @memberof StartEncodingRequest
     */
    vodHlsManifests?: Array<ManifestResource>;

    /**
     * Per-Title settings
     * @type {PerTitle}
     * @memberof StartEncodingRequest
     */
    perTitle?: PerTitle;

}
