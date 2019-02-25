
/**
 * @export
 * @interface CustomData
 */
export default interface CustomData {
    /**
     * User-specific meta data. This can hold a custom JSON object.
     * @type {{ [key: string]: any; }}
     * @memberof CustomData
     */
    customData?: { [key: string]: any; };

    /**
     * Creation timestamp expressed in UTC: YYYY-MM-DDThh:mm:ssZ
     * @type {Date}
     * @memberof CustomData
     */
    createdAt?: Date;

}
