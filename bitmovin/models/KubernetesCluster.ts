import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface KubernetesCluster
 */
export default interface KubernetesCluster extends BitmovinResource {
    /**
     * Shows if the Bitmovin Agent is alive
     * @type {boolean}
     * @memberof KubernetesCluster
     */
    online?: boolean;

    /**
     * Shows if the Kubernetes cluster is accessible by the Bitmovin Agent
     * @type {boolean}
     * @memberof KubernetesCluster
     */
    connected?: boolean;

    /**
     * @type {string}
     * @memberof KubernetesCluster
     */
    agentDeploymentDownloadUrl?: string;

}
