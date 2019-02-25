import StreamDetails from './StreamDetails';

/**
 * @export
 * @interface SubtitleStreamDetails
 */
export default interface SubtitleStreamDetails extends StreamDetails {
    /**
     * @type {string}
     * @memberof SubtitleStreamDetails
     */
    language?: string;

    /**
     * @type {boolean}
     * @memberof SubtitleStreamDetails
     */
    hearingImpaired?: boolean;

}
