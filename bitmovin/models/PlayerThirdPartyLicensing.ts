import PlayerThirdPartyLicensingErrorAction from './PlayerThirdPartyLicensingErrorAction';

/**
 * @export
 * @interface PlayerThirdPartyLicensing
 */
export default interface PlayerThirdPartyLicensing {
    /**
     * URL to your license check server
     * @type {string}
     * @memberof PlayerThirdPartyLicensing
     */
    licenseCheckServer: string;

    /**
     * Timeout in ms
     * @type {number}
     * @memberof PlayerThirdPartyLicensing
     */
    licenseCheckTimeout: number;

    /**
     * Specify if the Licensing Request should fail or not on Third Party Licensing Error
     * @type {PlayerThirdPartyLicensingErrorAction}
     * @memberof PlayerThirdPartyLicensing
     */
    errorAction: PlayerThirdPartyLicensingErrorAction;

    /**
     * Specify if the Licensing Request should fail or not on Third Party Licensing timeout
     * @type {PlayerThirdPartyLicensingErrorAction}
     * @memberof PlayerThirdPartyLicensing
     */
    timeoutAction: PlayerThirdPartyLicensingErrorAction;

}
