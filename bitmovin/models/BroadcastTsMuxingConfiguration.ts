import BroadcastTsAudioInputStreamConfiguration from './BroadcastTsAudioInputStreamConfiguration';
import BroadcastTsProgramConfiguration from './BroadcastTsProgramConfiguration';
import BroadcastTsTransportConfiguration from './BroadcastTsTransportConfiguration';
import BroadcastTsVideoInputStreamConfiguration from './BroadcastTsVideoInputStreamConfiguration';

/**
 * @export
 * @interface BroadcastTsMuxingConfiguration
 */
export default interface BroadcastTsMuxingConfiguration {
    /**
     * Transport configuration details for the Broadcast TS muxing.
     * @type {BroadcastTsTransportConfiguration}
     * @memberof BroadcastTsMuxingConfiguration
     */
    transport?: BroadcastTsTransportConfiguration;

    /**
     * Program configuration details for the Broadcast TS muxing.
     * @type {BroadcastTsProgramConfiguration}
     * @memberof BroadcastTsMuxingConfiguration
     */
    program?: BroadcastTsProgramConfiguration;

    /**
     * @type {Array<BroadcastTsVideoInputStreamConfiguration>}
     * @memberof BroadcastTsMuxingConfiguration
     */
    videoStreams?: Array<BroadcastTsVideoInputStreamConfiguration>;

    /**
     * @type {Array<BroadcastTsAudioInputStreamConfiguration>}
     * @memberof BroadcastTsMuxingConfiguration
     */
    audioStreams?: Array<BroadcastTsAudioInputStreamConfiguration>;

}
