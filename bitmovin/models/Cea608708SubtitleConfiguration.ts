
/**
 * @export
 * @interface Cea608708SubtitleConfiguration
 */
export default interface Cea608708SubtitleConfiguration {
    /**
     * If enabled, CEA 608 an CEA 708 subtitles will be copied from the input video stream to the output video stream. Note: This does not work, if the output framerate is different than the input framerate (except doubling the framerate with deinterlacing per field)
     * @type {boolean}
     * @memberof Cea608708SubtitleConfiguration
     */
    passthroughActivated?: boolean;

}
