import AdaptationSet from './AdaptationSet';
import AdaptationSetRole from './AdaptationSetRole';
import CustomAttribute from './CustomAttribute';

/**
 * @export
 * @interface AudioAdaptationSet
 */
export default interface AudioAdaptationSet extends AdaptationSet {
    /**
     * ISO 639-1 (Alpha-2) code identifying the language of the audio adaptation set
     * @type {string}
     * @memberof AudioAdaptationSet
     */
    lang: string;

}
