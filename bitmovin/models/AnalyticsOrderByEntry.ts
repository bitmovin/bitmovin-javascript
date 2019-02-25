import AnalyticsOrder from './AnalyticsOrder';

/**
 * @export
 * @interface AnalyticsOrderByEntry
 */
export default interface AnalyticsOrderByEntry {
    /**
     * @type {string}
     * @memberof AnalyticsOrderByEntry
     */
    name?: string;

    /**
     * @type {AnalyticsOrder}
     * @memberof AnalyticsOrderByEntry
     */
    order: AnalyticsOrder;

}
