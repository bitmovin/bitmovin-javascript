import BitmovinResource from './BitmovinResource';
import LogLevel from './LogLevel';

/**
 * @export
 * @interface PrewarmEncoderSettings
 */
export default interface PrewarmEncoderSettings extends BitmovinResource {
    /**
     * Encoder Version to be prewarmed. Only one encoder of this version can be prewarmed per cluster.
     * @type {string}
     * @memberof PrewarmEncoderSettings
     */
    encoderVersion: string;

    /**
     * The minimum number of prewarmed encoders of this Version
     * @type {number}
     * @memberof PrewarmEncoderSettings
     */
    minPrewarmed: number;

    /**
     * The maximum number of concurrent prewarmed encoders of this Version
     * @type {number}
     * @memberof PrewarmEncoderSettings
     */
    maxPrewarmed?: number;

    /**
     * @type {LogLevel}
     * @memberof PrewarmEncoderSettings
     */
    logLevel?: LogLevel;

}
