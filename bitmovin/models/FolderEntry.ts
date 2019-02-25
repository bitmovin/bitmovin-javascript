import FolderEntryType from './FolderEntryType';

/**
 * @export
 * @interface FolderEntry
 */
export default interface FolderEntry {
    /**
     * @type {FolderEntryType}
     * @memberof FolderEntry
     */
    type?: FolderEntryType;

    /**
     * @type {string}
     * @memberof FolderEntry
     */
    path?: string;

}
