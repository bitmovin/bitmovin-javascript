import RaiUnit from './RaiUnit';

/**
 * @export
 * @interface BroadcastTsInputStreamConfiguration
 */
export default interface BroadcastTsInputStreamConfiguration {
    /**
     * The UUID of the stream to which this configuration belongs to. This has to be a ID of a stream that has been added to the current muxing.
     * @type {string}
     * @memberof BroadcastTsInputStreamConfiguration
     */
    streamId?: string;

    /**
     * An integer value. Packet Identifier (PID) for this stream.
     * @type {number}
     * @memberof BroadcastTsInputStreamConfiguration
     */
    packetIdentifier?: number;

    /**
     * Start stream with initial discontinuity indicator set to one. If true, set the discontinuity indicator in the first packet for this PID.
     * @type {boolean}
     * @memberof BroadcastTsInputStreamConfiguration
     */
    startWithDiscontinuityIndicator?: boolean;

    /**
     * Align access units to PES packets. If true, align access units to PES packet headers. Uses adaptation field stuffing to position an access unit at the beginning of each PES packet.
     * @type {boolean}
     * @memberof BroadcastTsInputStreamConfiguration
     */
    alignPes?: boolean;

    /**
     * @type {RaiUnit}
     * @memberof BroadcastTsInputStreamConfiguration
     */
    setRaiOnAu?: RaiUnit;

}
