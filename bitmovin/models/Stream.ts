import AbstractCondition from './AbstractCondition';
import AppliedStreamSettings from './AppliedStreamSettings';
import BitmovinResource from './BitmovinResource';
import DecodingErrorMode from './DecodingErrorMode';
import EncodingOutput from './EncodingOutput';
import Ignoring from './Ignoring';
import InputStream from './InputStream';
import StreamMetadata from './StreamMetadata';
import StreamMode from './StreamMode';
import StreamPerTitleSettings from './StreamPerTitleSettings';

/**
 * @export
 * @interface Stream
 */
export default interface Stream extends BitmovinResource {
    /**
     * @type {Array<InputStream>}
     * @memberof Stream
     */
    inputStreams: Array<InputStream>;

    /**
     * @type {Array<EncodingOutput>}
     * @memberof Stream
     */
    outputs?: Array<EncodingOutput>;

    /**
     * Set true to create quality metadata for this stream
     * @type {boolean}
     * @memberof Stream
     */
    createQualityMetaData?: boolean;

    /**
     * Id of the codec configuration
     * @type {string}
     * @memberof Stream
     */
    codecConfigId: string;

    /**
     * Number of encoded segments. Available after encoding finishes.
     * @type {number}
     * @memberof Stream
     */
    segmentsEncoded?: number;

    /**
     * Conditions to evaluate before creating the stream. If this evaluation fails, the stream won't be created. All muxings that depend on the stream will also not be created.
     * @type {AbstractCondition}
     * @memberof Stream
     */
    conditions?: AbstractCondition;

    /**
     * If this is set and contains objects, then this stream has been ignored during the encoding process
     * @type {Array<Ignoring>}
     * @memberof Stream
     */
    ignoredBy?: Array<Ignoring>;

    /**
     * Mode of the stream
     * @type {StreamMode}
     * @memberof Stream
     */
    mode?: StreamMode;

    /**
     * Settings to configure Per-Title on stream level
     * @type {StreamPerTitleSettings}
     * @memberof Stream
     */
    perTitleSettings?: StreamPerTitleSettings;

    /**
     * @type {StreamMetadata}
     * @memberof Stream
     */
    metadata?: StreamMetadata;

    /**
     * Determines how to react to errors during decoding
     * @type {DecodingErrorMode}
     * @memberof Stream
     */
    decodingErrorMode?: DecodingErrorMode;

    /**
     * Contains stream properties which may not have been defined in the configuration
     * @type {AppliedStreamSettings}
     * @memberof Stream
     */
    appliedSettings?: AppliedStreamSettings;

}
