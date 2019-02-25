import CloudRegion from './CloudRegion';

/**
 * @export
 * @interface AnalysisStartRequest
 */
export default interface AnalysisStartRequest {
    /**
     * @type {string}
     * @memberof AnalysisStartRequest
     */
    path?: string;

    /**
     * @type {CloudRegion}
     * @memberof AnalysisStartRequest
     */
    cloudRegion?: CloudRegion;

}
