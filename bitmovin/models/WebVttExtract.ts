import BitmovinResource from './BitmovinResource';
import EncodingOutput from './EncodingOutput';
import InputStream from './InputStream';

/**
 * @export
 * @interface WebVttExtract
 */
export default interface WebVttExtract extends BitmovinResource {
    /**
     * The input stream to extract the subtitle from
     * @type {InputStream}
     * @memberof WebVttExtract
     */
    inputStream: InputStream;

    /**
     * @type {Array<EncodingOutput>}
     * @memberof WebVttExtract
     */
    outputs: Array<EncodingOutput>;

    /**
     * Name of the captions file
     * @type {string}
     * @memberof WebVttExtract
     */
    fileName?: string;

}
