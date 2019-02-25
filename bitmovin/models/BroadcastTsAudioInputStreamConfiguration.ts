import BroadcastTsInputStreamConfiguration from './BroadcastTsInputStreamConfiguration';
import RaiUnit from './RaiUnit';

/**
 * @export
 * @interface BroadcastTsAudioInputStreamConfiguration
 */
export default interface BroadcastTsAudioInputStreamConfiguration extends BroadcastTsInputStreamConfiguration {
    /**
     * Use ATSC buffer model for AC-3. If true, use the ATSC version of the T-STD buffer model is used. This parameter applies to AC-3 streams only.
     * @type {boolean}
     * @memberof BroadcastTsAudioInputStreamConfiguration
     */
    useATSCBufferModel?: boolean;

    /**
     * Language of the audio stream. Specified according to the ISO 639-2 alpha code for the language descriptor.
     * @type {string}
     * @memberof BroadcastTsAudioInputStreamConfiguration
     */
    language?: string;

}
