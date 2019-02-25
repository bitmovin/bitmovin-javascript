import BitmovinResource from './BitmovinResource';

/**
 * @export
 * @interface SmoothStreamingRepresentation
 */
export default interface SmoothStreamingRepresentation extends BitmovinResource {
    /**
     * Id of the encoding
     * @type {string}
     * @memberof SmoothStreamingRepresentation
     */
    encodingId: string;

    /**
     * Id of the muxing.
     * @type {string}
     * @memberof SmoothStreamingRepresentation
     */
    muxingId: string;

    /**
     * The Smooth Streaming ismv or isma file that will be referenced in the manifest.
     * @type {string}
     * @memberof SmoothStreamingRepresentation
     */
    mediaFile: string;

    /**
     * Language of the MP4 file
     * @type {string}
     * @memberof SmoothStreamingRepresentation
     */
    language?: string;

    /**
     * Track where this MP4 shoudl be added
     * @type {string}
     * @memberof SmoothStreamingRepresentation
     */
    trackName?: string;

}
