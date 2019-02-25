import BasicMediaInfo from './BasicMediaInfo';

/**
 * @export
 * @interface VttMediaInfo
 */
export default interface VttMediaInfo extends BasicMediaInfo {
    /**
     * The URL of the referenced VTT file
     * @type {string}
     * @memberof VttMediaInfo
     */
    vttUrl: string;

    /**
     * The URI of the Rendition
     * @type {string}
     * @memberof VttMediaInfo
     */
    uri: string;

    /**
     * A value of true indicates that the Rendition contains content which is considered essential to play.
     * @type {boolean}
     * @memberof VttMediaInfo
     */
    forced?: boolean;

}
