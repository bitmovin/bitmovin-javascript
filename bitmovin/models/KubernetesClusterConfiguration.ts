
/**
 * @export
 * @interface KubernetesClusterConfiguration
 */
export default interface KubernetesClusterConfiguration {
    /**
     * Number of parallel scheduled encodings on the Kubernetes cluster
     * @type {number}
     * @memberof KubernetesClusterConfiguration
     */
    parallelEncodings: number;

    /**
     * Number of worker nodes used for each encoding on the Kubernetes cluster
     * @type {number}
     * @memberof KubernetesClusterConfiguration
     */
    workersPerEncoding: number;

}
