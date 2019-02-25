import AudioMixChannel from './AudioMixChannel';
import AudioMixChannelLayout from './AudioMixChannelLayout';
import Filter from './Filter';
import FilterType from './FilterType';

/**
 * @export
 * @interface AudioMixFilter
 */
export default interface AudioMixFilter extends Filter {
    /**
     * Channel layout of the audio codec configuration
     * @type {AudioMixChannelLayout}
     * @memberof AudioMixFilter
     */
    channelLayout: AudioMixChannelLayout;

    /**
     * List of mixed channels that matches the channel layout
     * @type {Array<AudioMixChannel>}
     * @memberof AudioMixFilter
     */
    audioMixChannels: Array<AudioMixChannel>;

}
