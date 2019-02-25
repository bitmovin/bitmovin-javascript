import Ac3ChannelLayout from './Ac3ChannelLayout';
import AudioConfiguration from './AudioConfiguration';
import CodecConfigType from './CodecConfigType';

/**
 * @export
 * @interface Eac3AudioConfiguration
 */
export default interface Eac3AudioConfiguration extends AudioConfiguration {
    /**
     * Channel layout of the audio codec configuration
     * @type {Ac3ChannelLayout}
     * @memberof Eac3AudioConfiguration
     */
    channelLayout?: Ac3ChannelLayout;

}
