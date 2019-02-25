import BitmovinResponse from './BitmovinResponse';

/**
 * @export
 * @interface AnalyticsLicense
 */
export default interface AnalyticsLicense extends BitmovinResponse {
    /**
     * Name of the Analytics License
     * @type {string}
     * @memberof AnalyticsLicense
     */
    name?: string;

    /**
     * License Key
     * @type {string}
     * @memberof AnalyticsLicense
     */
    licenseKey: string;

}
