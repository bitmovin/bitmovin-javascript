
/**
 * @export
 * @interface BroadcastTsProgramConfiguration
 */
export default interface BroadcastTsProgramConfiguration {
    /**
     * An integer value. Value for program_number field in Program Map Table (PMT). The value zero is reserved for the NIT PID entry in the PAT.
     * @type {number}
     * @memberof BroadcastTsProgramConfiguration
     */
    programNumber?: number;

    /**
     * An integer value. Packet identifier (PID) to use for Program Map Table (PMT). Recommended value is 2 x programNumber.
     * @type {number}
     * @memberof BroadcastTsProgramConfiguration
     */
    pidForPMT?: number;

    /**
     * Insert Program Clock References (PCRs) on all packetized elemementary stream packets. When false, indicates that PCRs should be inserted on every PES header. This parameter is effective only when the PCR packet identifier is the same as a video or audio elementary stream.
     * @type {boolean}
     * @memberof BroadcastTsProgramConfiguration
     */
    insertProgramClockRefOnPes?: boolean;

}
