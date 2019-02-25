import BitmovinResource from './BitmovinResource';
import InputStream from './InputStream';

/**
 * @export
 * @interface TtmlEmbed
 */
export default interface TtmlEmbed extends BitmovinResource {
    /**
     * The input stream to extract the subtitle from
     * @type {InputStream}
     * @memberof TtmlEmbed
     */
    inputStream: InputStream;

}
