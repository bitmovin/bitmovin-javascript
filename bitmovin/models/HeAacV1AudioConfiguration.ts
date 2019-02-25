import AacChannelLayout from './AacChannelLayout';
import AudioConfiguration from './AudioConfiguration';
import CodecConfigType from './CodecConfigType';

/**
 * @export
 * @interface HeAacV1AudioConfiguration
 */
export default interface HeAacV1AudioConfiguration extends AudioConfiguration {
    /**
     * Channel layout of the audio codec configuration
     * @type {AacChannelLayout}
     * @memberof HeAacV1AudioConfiguration
     */
    channelLayout?: AacChannelLayout;

}
