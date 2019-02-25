import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface IFramePlaylist
 */
export default interface IFramePlaylist extends BitmovinResource {
    /**
     * The filename of your I-frame playlist
     * @type {string}
     * @memberof IFramePlaylist
     */
    filename: string;

}
