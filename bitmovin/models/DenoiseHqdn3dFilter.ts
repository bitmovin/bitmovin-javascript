import Filter from './Filter';
import FilterType from './FilterType';

/**
 * @export
 * @interface DenoiseHqdn3dFilter
 */
export default interface DenoiseHqdn3dFilter extends Filter {
    /**
     * A non-negative floating point number which specifies spatial luma strength. It defaults to 4.0.
     * @type {number}
     * @memberof DenoiseHqdn3dFilter
     */
    lumaSpatial?: number;

    /**
     * A non-negative floating point number which specifies spatial chroma strength. It defaults to 3.0*luma_spatial/4.0.
     * @type {number}
     * @memberof DenoiseHqdn3dFilter
     */
    chromaSpatial?: number;

    /**
     * A floating point number which specifies luma temporal strength. It defaults to 6.0*luma_spatial/4.0.
     * @type {number}
     * @memberof DenoiseHqdn3dFilter
     */
    lumaTmp?: number;

    /**
     * A floating point number which specifies chroma temporal strength. It defaults to luma_tmp*chroma_spatial/luma_spatial.
     * @type {number}
     * @memberof DenoiseHqdn3dFilter
     */
    chromaTmp?: number;

}
