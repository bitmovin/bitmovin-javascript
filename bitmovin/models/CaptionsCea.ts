import BitmovinResource from './BitmovinResource';
import EncodingOutput from './EncodingOutput';
import InputStream from './InputStream';
import OutputFormat from './OutputFormat';

/**
 * @export
 * @interface CaptionsCea
 */
export default interface CaptionsCea extends BitmovinResource {
    /**
     * Select the channel for the caption information
     * @type {number}
     * @memberof CaptionsCea
     */
    channel?: number;

    /**
     * The input stream to extract the subtitle from
     * @type {InputStream}
     * @memberof CaptionsCea
     */
    inputStream: InputStream;

    /**
     * @type {OutputFormat}
     * @memberof CaptionsCea
     */
    outputFormat: OutputFormat;

    /**
     * Name of the captions file
     * @type {string}
     * @memberof CaptionsCea
     */
    filename?: string;

    /**
     * @type {Array<EncodingOutput>}
     * @memberof CaptionsCea
     */
    outputs: Array<EncodingOutput>;

}
