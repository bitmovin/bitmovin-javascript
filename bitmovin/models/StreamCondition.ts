import AbstractCondition from './AbstractCondition';
import ConditionOperator from './ConditionOperator';
import ConditionType from './ConditionType';
import StreamConditionAttribute from './StreamConditionAttribute';

/**
 * @export
 * @interface StreamCondition
 */
export default interface StreamCondition extends AbstractCondition {
    /**
     * @type {StreamConditionAttribute}
     * @memberof StreamCondition
     */
    attribute: StreamConditionAttribute;

    /**
     * @type {ConditionOperator}
     * @memberof StreamCondition
     */
    operator: ConditionOperator;

    /**
     * The value that should be used for comparison
     * @type {string}
     * @memberof StreamCondition
     */
    value: string;

}
