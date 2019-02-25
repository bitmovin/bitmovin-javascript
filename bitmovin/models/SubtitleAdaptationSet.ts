import AdaptationSet from './AdaptationSet';
import AdaptationSetRole from './AdaptationSetRole';
import CustomAttribute from './CustomAttribute';

/**
 * @export
 * @interface SubtitleAdaptationSet
 */
export default interface SubtitleAdaptationSet extends AdaptationSet {
    /**
     * ISO 639-1 (Alpha-2) code identifying the language of the subtitle adaptation set
     * @type {string}
     * @memberof SubtitleAdaptationSet
     */
    lang: string;

}
