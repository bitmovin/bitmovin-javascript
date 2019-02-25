import StreamInfosDetails from './StreamInfosDetails';

/**
 * @export
 * @interface StreamInfos
 */
export default interface StreamInfos {
    /**
     * Timestamp of the event expressed in UTC: YYYY-MM-DDThh:mm:ssZ
     * @type {Date}
     * @memberof StreamInfos
     */
    time: Date;

    /**
     * Details about billable minutes for each resolution category
     * @type {Array<StreamInfosDetails>}
     * @memberof StreamInfos
     */
    streamInfos?: Array<StreamInfosDetails>;

}
