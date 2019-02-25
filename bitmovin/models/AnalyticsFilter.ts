import AnalyticsOperator from './AnalyticsOperator';

/**
 * @export
 * @interface AnalyticsFilter
 */
export default interface AnalyticsFilter {
    /**
     * @type {string}
     * @memberof AnalyticsFilter
     */
    name?: string;

    /**
     * @type {AnalyticsOperator}
     * @memberof AnalyticsFilter
     */
    operator: AnalyticsOperator;

    /**
     * The value to compare to the property specified by the name
     * @type {string}
     * @memberof AnalyticsFilter
     */
    value: string;

}
