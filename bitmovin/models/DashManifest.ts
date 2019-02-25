import DashProfile from './DashProfile';
import EncodingOutput from './EncodingOutput';
import Manifest from './Manifest';
import ManifestType from './ManifestType';
import XmlNamespace from './XmlNamespace';

/**
 * @export
 * @interface DashManifest
 */
export default interface DashManifest extends Manifest {
    /**
     * @type {DashProfile}
     * @memberof DashManifest
     */
    profile?: DashProfile;

    /**
     * The filename of your manifest
     * @type {string}
     * @memberof DashManifest
     */
    manifestName?: string;

    /**
     * List of additional XML namespaces to add to the DASH Manifest
     * @type {Array<XmlNamespace>}
     * @memberof DashManifest
     */
    namespaces?: Array<XmlNamespace>;

}
