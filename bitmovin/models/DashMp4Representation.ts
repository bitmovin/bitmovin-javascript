import DashRepresentation from './DashRepresentation';

/**
 * @export
 * @interface DashMp4Representation
 */
export default interface DashMp4Representation extends DashRepresentation {
    /**
     * Path to the MP4 file
     * @type {string}
     * @memberof DashMp4Representation
     */
    filePath: string;

}
