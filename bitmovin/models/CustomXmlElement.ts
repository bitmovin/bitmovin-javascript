import BitmovinResponse from './BitmovinResponse';

/**
 * @export
 * @interface CustomXmlElement
 */
export default interface CustomXmlElement extends BitmovinResponse {
    /**
     * String representation of the XML element
     * @type {string}
     * @memberof CustomXmlElement
     */
    data: string;

}
