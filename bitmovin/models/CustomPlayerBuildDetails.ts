import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface CustomPlayerBuildDetails
 */
export default interface CustomPlayerBuildDetails extends BitmovinResource {
    /**
     * The player version that should be used for the custom player build. If not set the 'latest' version is used. 
     * @type {string}
     * @memberof CustomPlayerBuildDetails
     */
    playerVersion: string;

    /**
     * The domains that the player is locked to. If not set the player will only work with 'localhost'. Not more than 49 additional domains can be added. 
     * @type {Array<string>}
     * @memberof CustomPlayerBuildDetails
     */
    domains: Array<string>;

}
