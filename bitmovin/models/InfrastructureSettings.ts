import CloudRegion from './CloudRegion';

/**
 * @export
 * @interface InfrastructureSettings
 */
export default interface InfrastructureSettings {
    /**
     * Id of a custom infrastructure, e.g., Kubernetes Cluster
     * @type {string}
     * @memberof InfrastructureSettings
     */
    infrastructureId?: string;

    /**
     * @type {CloudRegion}
     * @memberof InfrastructureSettings
     */
    cloudRegion?: CloudRegion;

}
