import AudioConfiguration from './AudioConfiguration';
import ChannelLayout from './ChannelLayout';
import CodecConfigType from './CodecConfigType';

/**
 * @export
 * @interface Mp3AudioConfiguration
 */
export default interface Mp3AudioConfiguration extends AudioConfiguration {
    /**
     * Channel layout of the audio codec configuration
     * @type {ChannelLayout}
     * @memberof Mp3AudioConfiguration
     */
    channelLayout?: ChannelLayout;

}
