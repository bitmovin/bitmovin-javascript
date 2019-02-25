import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import AacApi from './aac/AacApi';
import HeAacV1Api from './heAacV1/HeAacV1Api';
import HeAacV2Api from './heAacV2/HeAacV2Api';
import VorbisApi from './vorbis/VorbisApi';
import OpusApi from './opus/OpusApi';
import Ac3Api from './ac3/Ac3Api';
import Eac3Api from './eac3/Eac3Api';
import Mp2Api from './mp2/Mp2Api';
import Mp3Api from './mp3/Mp3Api';

/**
 * AudioApi - object-oriented interface
 * @export
 * @class AudioApi
 * @extends {BaseAPI}
 */
export default class AudioApi extends BaseAPI {
    public aac: AacApi;
    public heAacV1: HeAacV1Api;
    public heAacV2: HeAacV2Api;
    public vorbis: VorbisApi;
    public opus: OpusApi;
    public ac3: Ac3Api;
    public eac3: Eac3Api;
    public mp2: Mp2Api;
    public mp3: Mp3Api;

    constructor(configuration: Configuration) {
        super(configuration);
        this.aac = new AacApi(configuration);
        this.heAacV1 = new HeAacV1Api(configuration);
        this.heAacV2 = new HeAacV2Api(configuration);
        this.vorbis = new VorbisApi(configuration);
        this.opus = new OpusApi(configuration);
        this.ac3 = new Ac3Api(configuration);
        this.eac3 = new Eac3Api(configuration);
        this.mp2 = new Mp2Api(configuration);
        this.mp3 = new Mp3Api(configuration);
    }

}
