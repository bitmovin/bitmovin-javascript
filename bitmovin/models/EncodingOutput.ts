import AclEntry from './AclEntry';

/**
 * @export
 * @interface EncodingOutput
 */
export default interface EncodingOutput {
    /**
     * Id of the corresponding output
     * @type {string}
     * @memberof EncodingOutput
     */
    outputId: string;

    /**
     * Subdirectory where to save the files to
     * @type {string}
     * @memberof EncodingOutput
     */
    outputPath: string;

    /**
     * @type {Array<AclEntry>}
     * @memberof EncodingOutput
     */
    acl?: Array<AclEntry>;

}
