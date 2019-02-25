import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface CustomWebPlayerBuildDomain
 */
export default interface CustomWebPlayerBuildDomain extends BitmovinResource {
    /**
     * Domain where the player is allowed to play
     * @type {string}
     * @memberof CustomWebPlayerBuildDomain
     */
    domain: string;

}
