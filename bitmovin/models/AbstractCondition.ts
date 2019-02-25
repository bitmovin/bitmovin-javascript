import ConditionType from './ConditionType';

/**
 * @export
 * @interface AbstractCondition
 */
export default interface AbstractCondition {
    /**
     * @type {ConditionType}
     * @memberof AbstractCondition
     */
    type?: ConditionType;

}
