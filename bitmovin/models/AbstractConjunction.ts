import AbstractCondition from './AbstractCondition';
import ConditionType from './ConditionType';

/**
 * @export
 * @interface AbstractConjunction
 */
export default interface AbstractConjunction extends AbstractCondition {
    /**
     * Array to perform the AND/OR evaluation on
     * @type {Array<AbstractCondition>}
     * @memberof AbstractConjunction
     */
    conditions?: Array<AbstractCondition>;

}
