import StorageStatistics from './StorageStatistics';

/**
 * @export
 * @interface OverallStatistics
 */
export default interface OverallStatistics {
    /**
     * @type {number}
     * @memberof OverallStatistics
     */
    bytesStoredTotal?: number;

    /**
     * @type {number}
     * @memberof OverallStatistics
     */
    bytesTransferredTotal?: number;

    /**
     * @type {Array<StorageStatistics>}
     * @memberof OverallStatistics
     */
    storages?: Array<StorageStatistics>;

}
