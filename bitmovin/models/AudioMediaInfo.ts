import StandardMediaInfo from './StandardMediaInfo';

/**
 * @export
 * @interface AudioMediaInfo
 */
export default interface AudioMediaInfo extends StandardMediaInfo {
    /**
     * A value of true indicates that the Rendition contains content which is considered essential to play.
     * @type {boolean}
     * @memberof AudioMediaInfo
     */
    forced?: boolean;

}
