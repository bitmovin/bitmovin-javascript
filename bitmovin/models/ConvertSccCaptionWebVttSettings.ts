import ConvertSccPositionMode from './ConvertSccPositionMode';

/**
 * @export
 * @interface ConvertSccCaptionWebVttSettings
 */
export default interface ConvertSccCaptionWebVttSettings {
    /**
     * @type {ConvertSccPositionMode}
     * @memberof ConvertSccCaptionWebVttSettings
     */
    positionMode?: ConvertSccPositionMode;

    /**
     * Remove flash (blinking) information when converting SCC to WebVTT
     * @type {boolean}
     * @memberof ConvertSccCaptionWebVttSettings
     */
    removeFlash?: boolean;

    /**
     * Remove color information when converting SCC to WebVTT
     * @type {boolean}
     * @memberof ConvertSccCaptionWebVttSettings
     */
    removeColor?: boolean;

}
