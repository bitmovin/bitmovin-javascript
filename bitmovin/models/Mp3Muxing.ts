import EncodingOutput from './EncodingOutput';
import Ignoring from './Ignoring';
import Muxing from './Muxing';
import MuxingStream from './MuxingStream';
import MuxingType from './MuxingType';
import StreamConditionsMode from './StreamConditionsMode';

/**
 * @export
 * @interface Mp3Muxing
 */
export default interface Mp3Muxing extends Muxing {
    /**
     * Name of the new file
     * @type {string}
     * @memberof Mp3Muxing
     */
    filename: string;

}
