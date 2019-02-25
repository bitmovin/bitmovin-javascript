import AbstractCondition from './AbstractCondition';
import ConditionAttribute from './ConditionAttribute';
import ConditionOperator from './ConditionOperator';
import ConditionType from './ConditionType';

/**
 * @export
 * @interface Condition
 */
export default interface Condition extends AbstractCondition {
    /**
     * @type {ConditionAttribute}
     * @memberof Condition
     */
    attribute: ConditionAttribute;

    /**
     * @type {ConditionOperator}
     * @memberof Condition
     */
    operator: ConditionOperator;

    /**
     * The value that should be used for comparison
     * @type {string}
     * @memberof Condition
     */
    value: string;

}
