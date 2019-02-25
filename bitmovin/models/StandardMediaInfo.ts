import SegmentsMediaInfo from './SegmentsMediaInfo';

/**
 * @export
 * @interface StandardMediaInfo
 */
export default interface StandardMediaInfo extends SegmentsMediaInfo {
    /**
     * The URI of the Rendition
     * @type {string}
     * @memberof StandardMediaInfo
     */
    uri: string;

}
