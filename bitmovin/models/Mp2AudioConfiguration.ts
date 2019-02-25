import AudioConfiguration from './AudioConfiguration';
import ChannelLayout from './ChannelLayout';
import CodecConfigType from './CodecConfigType';

/**
 * @export
 * @interface Mp2AudioConfiguration
 */
export default interface Mp2AudioConfiguration extends AudioConfiguration {
    /**
     * Channel layout of the audio codec configuration
     * @type {ChannelLayout}
     * @memberof Mp2AudioConfiguration
     */
    channelLayout?: ChannelLayout;

}
