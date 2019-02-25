import BitmovinResponse from './BitmovinResponse';
import Domain from './Domain';

/**
 * @export
 * @interface PlayerLicense
 */
export default interface PlayerLicense extends BitmovinResponse {
    /**
     * Name of the resource
     * @type {string}
     * @memberof PlayerLicense
     */
    name?: string;

    /**
     * Creation timestamp expressed in UTC: YYYY-MM-DDThh:mm:ssZ
     * @type {Date}
     * @memberof PlayerLicense
     */
    createdAt?: Date;

    /**
     * License Key
     * @type {string}
     * @memberof PlayerLicense
     */
    licenseKey?: string;

    /**
     * Number of impressions recorded
     * @type {number}
     * @memberof PlayerLicense
     */
    impressions?: number;

    /**
     * Maximum number of impressions
     * @type {number}
     * @memberof PlayerLicense
     */
    maxImpressions?: number;

    /**
     * Flag if third party licensing is enabled
     * @type {boolean}
     * @memberof PlayerLicense
     */
    thirdPartyLicensingEnabled?: boolean;

    /**
     * Whitelisted domains
     * @type {Array<Domain>}
     * @memberof PlayerLicense
     */
    domains?: Array<Domain>;

}
