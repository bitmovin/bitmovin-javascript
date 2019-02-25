
/**
 * @export
 * @interface AutoRestartConfiguration
 */
export default interface AutoRestartConfiguration {
    /**
     * If no segments were generated for the given number of seconds, a restart is triggered. Minimum: 30.0
     * @type {number}
     * @memberof AutoRestartConfiguration
     */
    segmentsWrittenTimeout?: number;

    /**
     * If no data was written for the given number of seconds, a restart is triggered. Minimum: 30.0
     * @type {number}
     * @memberof AutoRestartConfiguration
     */
    bytesWrittenTimeout?: number;

    /**
     * If no frames were generated for the given number of seconds, a restart is triggered. Minimum: 30.0
     * @type {number}
     * @memberof AutoRestartConfiguration
     */
    framesWrittenTimeout?: number;

    /**
     * If HLS manifests were not updated for the given number of seconds, a restart is triggered. Minimum: 30.0
     * @type {number}
     * @memberof AutoRestartConfiguration
     */
    hlsManifestsUpdateTimeout?: number;

    /**
     * If DASH manifests were not updated for the given number of seconds, a restart is triggered. Minimum: 30.0
     * @type {number}
     * @memberof AutoRestartConfiguration
     */
    dashManifestsUpdateTimeout?: number;

    /**
     * Defines a schedule for restarts using the unix crontab syntax. This example would trigger a restart every monday at 05:30 (AM)
     * @type {string}
     * @memberof AutoRestartConfiguration
     */
    scheduleExpression?: string;

}
