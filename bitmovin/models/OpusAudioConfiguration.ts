import AudioConfiguration from './AudioConfiguration';
import CodecConfigType from './CodecConfigType';
import OpusChannelLayout from './OpusChannelLayout';

/**
 * @export
 * @interface OpusAudioConfiguration
 */
export default interface OpusAudioConfiguration extends AudioConfiguration {
    /**
     * Channel layout of the audio codec configuration
     * @type {OpusChannelLayout}
     * @memberof OpusAudioConfiguration
     */
    channelLayout?: OpusChannelLayout;

}
