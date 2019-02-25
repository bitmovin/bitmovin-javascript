import AdaptationSetRole from './AdaptationSetRole';
import BitmovinResponse from './BitmovinResponse';
import CustomAttribute from './CustomAttribute';

/**
 * @export
 * @interface AdaptationSet
 */
export default interface AdaptationSet extends BitmovinResponse {
    /**
     * Custom adaptation set attributes
     * @type {Array<CustomAttribute>}
     * @memberof AdaptationSet
     */
    customAttributes?: Array<CustomAttribute>;

    /**
     * Roles of the adaptation set
     * @type {Array<AdaptationSetRole>}
     * @memberof AdaptationSet
     */
    roles?: Array<AdaptationSetRole>;

}
