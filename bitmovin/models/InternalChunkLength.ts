import ChunkLengthMode from './ChunkLengthMode';

/**
 * @export
 * @interface InternalChunkLength
 */
export default interface InternalChunkLength {
    /**
     * Defines how the internal chunk length for encoding will be determined
     * @type {ChunkLengthMode}
     * @memberof InternalChunkLength
     */
    mode: ChunkLengthMode;

    /**
     * Defines a custom internal chunk length in seconds to be used for encoding if mode is set to `CUSTOM`. Valid range is from 1 to 180 seconds
     * @type {number}
     * @memberof InternalChunkLength
     */
    customChunkLength?: number;

}
