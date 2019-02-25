import BillableEncodingMinutesDetails from './BillableEncodingMinutesDetails';
import CodecConfigType from './CodecConfigType';
import EncodingMode from './EncodingMode';
import PsnrPerStreamMode from './PsnrPerStreamMode';
import StatisticsPerTitleStream from './StatisticsPerTitleStream';

/**
 * @export
 * @interface BillableEncodingMinutes
 */
export default interface BillableEncodingMinutes {
    /**
     * @type {EncodingMode}
     * @memberof BillableEncodingMinutes
     */
    encodingMode?: EncodingMode;

    /**
     * @type {CodecConfigType}
     * @memberof BillableEncodingMinutes
     */
    codec: CodecConfigType;

    /**
     * @type {StatisticsPerTitleStream}
     * @memberof BillableEncodingMinutes
     */
    perTitleResultStream?: StatisticsPerTitleStream;

    /**
     * @type {PsnrPerStreamMode}
     * @memberof BillableEncodingMinutes
     */
    psnrMode?: PsnrPerStreamMode;

    /**
     * Details about billable minutes for each resolution category
     * @type {Array<BillableEncodingMinutesDetails>}
     * @memberof BillableEncodingMinutes
     */
    billableMinutesDetails?: Array<BillableEncodingMinutesDetails>;

}
