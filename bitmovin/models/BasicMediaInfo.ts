import BitmovinResponse from './BitmovinResponse';

/**
 * @export
 * @interface BasicMediaInfo
 */
export default interface BasicMediaInfo extends BitmovinResponse {
    /**
     * The value is a quoted-string which specifies the group to which the Rendition belongs.
     * @type {string}
     * @memberof BasicMediaInfo
     */
    groupId: string;

    /**
     * Primary language in the rendition.
     * @type {string}
     * @memberof BasicMediaInfo
     */
    language?: string;

    /**
     * Identifies a language that is associated with the Rendition.
     * @type {string}
     * @memberof BasicMediaInfo
     */
    assocLanguage?: string;

    /**
     * Human readable description of the rendition.
     * @type {string}
     * @memberof BasicMediaInfo
     */
    name: string;

    /**
     * If set to true, the client SHOULD play this Rendition of the content in the absence of information from the user.
     * @type {boolean}
     * @memberof BasicMediaInfo
     */
    isDefault?: boolean;

    /**
     * If set to true, the client MAY choose to play this Rendition in the absence of explicit user preference.
     * @type {boolean}
     * @memberof BasicMediaInfo
     */
    autoselect?: boolean;

    /**
     * Contains Uniform Type Identifiers
     * @type {Array<string>}
     * @memberof BasicMediaInfo
     */
    characteristics?: Array<string>;

}
