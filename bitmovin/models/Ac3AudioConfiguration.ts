import Ac3ChannelLayout from './Ac3ChannelLayout';
import AudioConfiguration from './AudioConfiguration';
import CodecConfigType from './CodecConfigType';

/**
 * @export
 * @interface Ac3AudioConfiguration
 */
export default interface Ac3AudioConfiguration extends AudioConfiguration {
    /**
     * Channel layout of the audio codec configuration
     * @type {Ac3ChannelLayout}
     * @memberof Ac3AudioConfiguration
     */
    channelLayout?: Ac3ChannelLayout;

}
