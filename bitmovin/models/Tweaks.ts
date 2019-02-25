import AudioVideoSyncMode from './AudioVideoSyncMode';

/**
 * @export
 * @interface Tweaks
 */
export default interface Tweaks {
    /**
     * Defines special audio video sync handling
     * @type {AudioVideoSyncMode}
     * @memberof Tweaks
     */
    audioVideoSyncMode?: AudioVideoSyncMode;

}
