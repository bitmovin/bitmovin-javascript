import AudioConfiguration from './AudioConfiguration';
import CodecConfigType from './CodecConfigType';
import VorbisChannelLayout from './VorbisChannelLayout';

/**
 * @export
 * @interface VorbisAudioConfiguration
 */
export default interface VorbisAudioConfiguration extends AudioConfiguration {
    /**
     * Channel layout of the audio codec configuration
     * @type {VorbisChannelLayout}
     * @memberof VorbisAudioConfiguration
     */
    channelLayout?: VorbisChannelLayout;

}
