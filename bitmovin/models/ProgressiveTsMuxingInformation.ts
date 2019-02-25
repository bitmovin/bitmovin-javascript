import MuxingInformationAudioTrack from './MuxingInformationAudioTrack';
import MuxingInformationVideoTrack from './MuxingInformationVideoTrack';
import ProgressiveMuxingInformation from './ProgressiveMuxingInformation';
import ProgressiveTsMuxingInformationByteRanges from './ProgressiveTsMuxingInformationByteRanges';

/**
 * @export
 * @interface ProgressiveTsMuxingInformation
 */
export default interface ProgressiveTsMuxingInformation extends ProgressiveMuxingInformation {
    /**
     * Byte ranges for the segments within the TS file
     * @type {Array<ProgressiveTsMuxingInformationByteRanges>}
     * @memberof ProgressiveTsMuxingInformation
     */
    byteRanges?: Array<ProgressiveTsMuxingInformationByteRanges>;

}
