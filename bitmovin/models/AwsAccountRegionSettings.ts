import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface AwsAccountRegionSettings
 */
export default interface AwsAccountRegionSettings extends BitmovinResource {
    /**
     * Limit for the amount of running encodings at a time. Leave empty for no limit.
     * @type {number}
     * @memberof AwsAccountRegionSettings
     */
    limitParallelEncodings?: number;

    /**
     * Maximum amount of encoding coordinators and workers allowed in this region at any time. Leave empty for no limit.
     * @type {number}
     * @memberof AwsAccountRegionSettings
     */
    maximumAmountOfCoordinatorsAndWorkersInRegion?: number;

    /**
     * Limit the amount of money to spend in this region on this account. Leave empty for no limit.
     * @type {number}
     * @memberof AwsAccountRegionSettings
     */
    maxMoneyToSpendPerMonth?: number;

    /**
     * Id of the security group for encoding instances
     * @type {string}
     * @memberof AwsAccountRegionSettings
     */
    securityGroupId: string;

    /**
     * Id of the subnet for encoding instances
     * @type {string}
     * @memberof AwsAccountRegionSettings
     */
    subnetId: string;

    /**
     * Which machine types are allowed to be deployed. Leave empty for no machine type restrictions.
     * @type {Array<string>}
     * @memberof AwsAccountRegionSettings
     */
    machineTypes?: Array<string>;

    /**
     * Custom SSH port. Valid values: 1 - 65535. Leave empty if the default SSH port 22 is OK.
     * @type {number}
     * @memberof AwsAccountRegionSettings
     */
    sshPort?: number;

}
