import EncodingOutput from './EncodingOutput';
import FragmentedMp4MuxingManifestType from './FragmentedMp4MuxingManifestType';
import Ignoring from './Ignoring';
import InternalChunkLength from './InternalChunkLength';
import Muxing from './Muxing';
import MuxingStream from './MuxingStream';
import MuxingType from './MuxingType';
import StreamConditionsMode from './StreamConditionsMode';
import TimeCode from './TimeCode';

/**
 * @export
 * @interface Mp4Muxing
 */
export default interface Mp4Muxing extends Muxing {
    /**
     * Name of the new Video
     * @type {string}
     * @memberof Mp4Muxing
     */
    filename?: string;

    /**
     *  Duration of fragments in milliseconds. Required for Fragmented MP4 Muxing (for Smooth Streaming or DASH On-Demand). Not setting this will result in unfragmented mp4.
     * @type {number}
     * @memberof Mp4Muxing
     */
    fragmentDuration?: number;

    /**
     * @type {TimeCode}
     * @memberof Mp4Muxing
     */
    timeCode?: TimeCode;

    /**
     * @type {FragmentedMp4MuxingManifestType}
     * @memberof Mp4Muxing
     */
    fragmentedMP4MuxingManifestType?: FragmentedMp4MuxingManifestType;

    /**
     * Modifies the internal chunk length used for chunked encoding
     * @type {InternalChunkLength}
     * @memberof Mp4Muxing
     */
    internalChunkLength?: InternalChunkLength;

}
