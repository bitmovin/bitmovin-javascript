import StandardMediaInfo from './StandardMediaInfo';

/**
 * @export
 * @interface SubtitlesMediaInfo
 */
export default interface SubtitlesMediaInfo extends StandardMediaInfo {
    /**
     * A value of true indicates that the Rendition contains content which is considered essential to play.
     * @type {boolean}
     * @memberof SubtitlesMediaInfo
     */
    forced?: boolean;

}
