
/**
 * @export
 * @interface XmlNamespace
 */
export default interface XmlNamespace {
    /**
     * Name of the XML Namespace reference
     * @type {string}
     * @memberof XmlNamespace
     */
    prefix: string;

    /**
     * Source of the XML Namespace reference
     * @type {string}
     * @memberof XmlNamespace
     */
    uri: string;

}
