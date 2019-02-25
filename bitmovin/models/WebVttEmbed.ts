import BitmovinResource from './BitmovinResource';
import InputStream from './InputStream';

/**
 * @export
 * @interface WebVttEmbed
 */
export default interface WebVttEmbed extends BitmovinResource {
    /**
     * The input stream to extract the subtitle from
     * @type {InputStream}
     * @memberof WebVttEmbed
     */
    inputStream: InputStream;

}
