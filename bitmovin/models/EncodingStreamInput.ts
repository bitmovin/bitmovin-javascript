import EncodingStreamInputDetails from './EncodingStreamInputDetails';

/**
 * @export
 * @interface EncodingStreamInput
 */
export default interface EncodingStreamInput {
    /**
     * Input id
     * @type {string}
     * @memberof EncodingStreamInput
     */
    inputId?: string;

    /**
     * Path to media file
     * @type {string}
     * @memberof EncodingStreamInput
     */
    inputPath?: string;

    /**
     * @type {EncodingStreamInputDetails}
     * @memberof EncodingStreamInput
     */
    details: EncodingStreamInputDetails;

}
