import DeinterlaceFrameSelectionMode from './DeinterlaceFrameSelectionMode';
import DeinterlaceMode from './DeinterlaceMode';
import Filter from './Filter';
import FilterType from './FilterType';
import PictureFieldParity from './PictureFieldParity';

/**
 * @export
 * @interface DeinterlaceFilter
 */
export default interface DeinterlaceFilter extends Filter {
    /**
     * @type {PictureFieldParity}
     * @memberof DeinterlaceFilter
     */
    parity?: PictureFieldParity;

    /**
     * @type {DeinterlaceMode}
     * @memberof DeinterlaceFilter
     */
    mode?: DeinterlaceMode;

    /**
     * @type {DeinterlaceFrameSelectionMode}
     * @memberof DeinterlaceFilter
     */
    frameSelectionMode?: DeinterlaceFrameSelectionMode;

}
