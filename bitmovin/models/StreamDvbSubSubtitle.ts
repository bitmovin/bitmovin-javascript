import BitmovinResource from './BitmovinResource';
import InputStream from './InputStream';

/**
 * @export
 * @interface StreamDvbSubSubtitle
 */
export default interface StreamDvbSubSubtitle extends BitmovinResource {
    /**
     * The input stream to extract the subtitle from
     * @type {InputStream}
     * @memberof StreamDvbSubSubtitle
     */
    inputStream: InputStream;

}
