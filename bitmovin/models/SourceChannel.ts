import SourceChannelType from './SourceChannelType';

/**
 * @export
 * @interface SourceChannel
 */
export default interface SourceChannel {
    /**
     * Gain for this source channel. Default is 1.0.
     * @type {number}
     * @memberof SourceChannel
     */
    gain?: number;

    /**
     * @type {SourceChannelType}
     * @memberof SourceChannel
     */
    type: SourceChannelType;

    /**
     * Number of this source channel. If type is 'CHANNEL_NUMBER', this must be set.
     * @type {number}
     * @memberof SourceChannel
     */
    channelNumber?: number;

}
