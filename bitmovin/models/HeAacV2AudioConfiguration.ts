import AacChannelLayout from './AacChannelLayout';
import AudioConfiguration from './AudioConfiguration';
import CodecConfigType from './CodecConfigType';

/**
 * @export
 * @interface HeAacV2AudioConfiguration
 */
export default interface HeAacV2AudioConfiguration extends AudioConfiguration {
    /**
     * Channel layout of the audio codec configuration
     * @type {AacChannelLayout}
     * @memberof HeAacV2AudioConfiguration
     */
    channelLayout?: AacChannelLayout;

}
