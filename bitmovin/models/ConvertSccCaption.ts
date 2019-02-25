import BitmovinResource from './BitmovinResource';
import ConvertSccCaptionWebVttSettings from './ConvertSccCaptionWebVttSettings';
import EncodingOutput from './EncodingOutput';
import InputPath from './InputPath';
import StreamCaptionOutputFormat from './StreamCaptionOutputFormat';

/**
 * @export
 * @interface ConvertSccCaption
 */
export default interface ConvertSccCaption extends BitmovinResource {
    /**
     * The input location to get the scc file from
     * @type {InputPath}
     * @memberof ConvertSccCaption
     */
    input: InputPath;

    /**
     * @type {Array<EncodingOutput>}
     * @memberof ConvertSccCaption
     */
    outputs: Array<EncodingOutput>;

    /**
     * Name of the captions file
     * @type {string}
     * @memberof ConvertSccCaption
     */
    fileName: string;

    /**
     * @type {StreamCaptionOutputFormat}
     * @memberof ConvertSccCaption
     */
    outputFormat: StreamCaptionOutputFormat;

    /**
     * Optional settings when converting SCC to WebVTT
     * @type {ConvertSccCaptionWebVttSettings}
     * @memberof ConvertSccCaption
     */
    webVttSettings?: ConvertSccCaptionWebVttSettings;

}
