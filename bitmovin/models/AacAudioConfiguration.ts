import AacChannelLayout from './AacChannelLayout';
import AudioConfiguration from './AudioConfiguration';
import CodecConfigType from './CodecConfigType';

/**
 * @export
 * @interface AacAudioConfiguration
 */
export default interface AacAudioConfiguration extends AudioConfiguration {
    /**
     * Channel layout of the audio codec configuration
     * @type {AacChannelLayout}
     * @memberof AacAudioConfiguration
     */
    channelLayout?: AacChannelLayout;

}
