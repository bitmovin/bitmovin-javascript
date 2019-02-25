import BitmovinResource from './BitmovinResource';
import EncodingOutput from './EncodingOutput';
import InputStream from './InputStream';

/**
 * @export
 * @interface TtmlExtract
 */
export default interface TtmlExtract extends BitmovinResource {
    /**
     * The input stream to extract the subtitle from
     * @type {InputStream}
     * @memberof TtmlExtract
     */
    inputStream: InputStream;

    /**
     * @type {Array<EncodingOutput>}
     * @memberof TtmlExtract
     */
    outputs: Array<EncodingOutput>;

    /**
     * Name of the captions file
     * @type {string}
     * @memberof TtmlExtract
     */
    fileName?: string;

}
