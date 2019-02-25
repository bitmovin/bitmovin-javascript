import AnalyticsLicenseDomain from './AnalyticsLicenseDomain';
import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface AnalyticsLicenseDetails
 */
export default interface AnalyticsLicenseDetails extends BitmovinResource {
    /**
     * License Key
     * @type {string}
     * @memberof AnalyticsLicenseDetails
     */
    licenseKey: string;

    /**
     * Maximum number of datapoints
     * @type {number}
     * @memberof AnalyticsLicenseDetails
     */
    maxDatapoints: number;

    /**
     * Number of datapoints recorded
     * @type {number}
     * @memberof AnalyticsLicenseDetails
     */
    datapoints: number;

    /**
     * Whitelisted domains
     * @type {Array<AnalyticsLicenseDomain>}
     * @memberof AnalyticsLicenseDetails
     */
    domains: Array<AnalyticsLicenseDomain>;

}
