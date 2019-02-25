
/**
 * @export
 * @interface RtmpIngestPoint
 */
export default interface RtmpIngestPoint {
    /**
     * The name of the application where the ingest is streamed to. This has to be unique for each ingest point
     * @type {string}
     * @memberof RtmpIngestPoint
     */
    applicationName: string;

    /**
     * The stream key for the backup input
     * @type {string}
     * @memberof RtmpIngestPoint
     */
    streamKey: string;

}
