import BitmovinResource from './BitmovinResource';
import CloudRegion from './CloudRegion';
import InfrastructureSettings from './InfrastructureSettings';

/**
 * @export
 * @interface Encoding
 */
export default interface Encoding extends BitmovinResource {
    /**
     * @type {CloudRegion}
     * @memberof Encoding
     */
    cloudRegion?: CloudRegion;

    /**
     * Version of the encoder
     * @type {string}
     * @memberof Encoding
     */
    encoderVersion?: string;

    /**
     * Define an external infrastructure to run the encoding on. Note If you set this value, the `cloudRegion` must be 'EXTERNAL'.
     * @type {string}
     * @memberof Encoding
     */
    infrastructureId?: string;

    /**
     * @type {InfrastructureSettings}
     * @memberof Encoding
     */
    infrastructure?: InfrastructureSettings;

    /**
     * You may pass a list of groups associated with this encoding. This will enable you to group results in the statistics resource
     * @type {Array<string>}
     * @memberof Encoding
     */
    labels?: Array<string>;

}
