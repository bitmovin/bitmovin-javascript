import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface Domain
 */
export default interface Domain extends BitmovinResource {
    /**
     * Host where the player is allowed to play
     * @type {string}
     * @memberof Domain
     */
    url: string;

}
