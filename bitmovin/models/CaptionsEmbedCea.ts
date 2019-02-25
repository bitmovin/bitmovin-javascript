import BitmovinResource from './BitmovinResource';
import InputStream from './InputStream';

/**
 * @export
 * @interface CaptionsEmbedCea
 */
export default interface CaptionsEmbedCea extends BitmovinResource {
    /**
     * Select the channel for the caption information
     * @type {number}
     * @memberof CaptionsEmbedCea
     */
    channel?: number;

    /**
     * The input stream to extract the subtitle from
     * @type {InputStream}
     * @memberof CaptionsEmbedCea
     */
    inputStream: InputStream;

}
