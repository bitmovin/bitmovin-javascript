import SourceChannel from './SourceChannel';

/**
 * @export
 * @interface AudioMixChannel
 */
export default interface AudioMixChannel {
    /**
     * Channel number of this mix (starting with 0)
     * @type {number}
     * @memberof AudioMixChannel
     */
    channelNumber: number;

    /**
     * List of source channels to be mixed
     * @type {Array<SourceChannel>}
     * @memberof AudioMixChannel
     */
    sourceChannels: Array<SourceChannel>;

}
