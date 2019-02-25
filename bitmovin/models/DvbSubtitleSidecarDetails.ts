import BitmovinResource from './BitmovinResource';
import InputStream from './InputStream';
import Output from './Output';

/**
 * @export
 * @interface DvbSubtitleSidecarDetails
 */
export default interface DvbSubtitleSidecarDetails extends BitmovinResource {
    /**
     * The input stream to extract the subtitle from
     * @type {InputStream}
     * @memberof DvbSubtitleSidecarDetails
     */
    inputStream: InputStream;

    /**
     * The output where the extracted subtitle should be written to
     * @type {Array<Output>}
     * @memberof DvbSubtitleSidecarDetails
     */
    outputs?: Array<Output>;

    /**
     * Naming strategy for the image files
     * @type {string}
     * @memberof DvbSubtitleSidecarDetails
     */
    imageFileNaming?: string;

    /**
     * Name of the index file
     * @type {string}
     * @memberof DvbSubtitleSidecarDetails
     */
    indexFilename?: string;

    /**
     * Specify the format of the generated images
     * @type {string}
     * @memberof DvbSubtitleSidecarDetails
     */
    imageFormat?: string;

    /**
     * @type {string}
     * @memberof DvbSubtitleSidecarDetails
     */
    outputFormat?: string;

}
