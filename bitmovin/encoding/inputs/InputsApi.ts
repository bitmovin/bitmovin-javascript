import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import TypeApi from './type/TypeApi';
import RtmpApi from './rtmp/RtmpApi';
import RedundantRtmpApi from './redundantRtmp/RedundantRtmpApi';
import S3Api from './s3/S3Api';
import S3RoleBasedApi from './s3RoleBased/S3RoleBasedApi';
import GenericS3Api from './genericS3/GenericS3Api';
import LocalApi from './local/LocalApi';
import GcsApi from './gcs/GcsApi';
import AzureApi from './azure/AzureApi';
import FtpApi from './ftp/FtpApi';
import SftpApi from './sftp/SftpApi';
import HttpApi from './http/HttpApi';
import HttpsApi from './https/HttpsApi';
import AsperaApi from './aspera/AsperaApi';
import AkamaiNetstorageApi from './akamaiNetstorage/AkamaiNetstorageApi';
import TcpApi from './tcp/TcpApi';
import UdpApi from './udp/UdpApi';
import UdpMulticastApi from './udpMulticast/UdpMulticastApi';
import ZixiApi from './zixi/ZixiApi';
import Input from '../../models/Input';
import ResponseEnvelope from '../../models/ResponseEnvelope';
import PaginationResponse from '../../models/PaginationResponse';
import InputsListQueryParams from './InputsListQueryParams';

/**
 * InputsApi - object-oriented interface
 * @export
 * @class InputsApi
 * @extends {BaseAPI}
 */
export default class InputsApi extends BaseAPI {
    public type: TypeApi;
    public rtmp: RtmpApi;
    public redundantRtmp: RedundantRtmpApi;
    public s3: S3Api;
    public s3RoleBased: S3RoleBasedApi;
    public genericS3: GenericS3Api;
    public local: LocalApi;
    public gcs: GcsApi;
    public azure: AzureApi;
    public ftp: FtpApi;
    public sftp: SftpApi;
    public http: HttpApi;
    public https: HttpsApi;
    public aspera: AsperaApi;
    public akamaiNetstorage: AkamaiNetstorageApi;
    public tcp: TcpApi;
    public udp: UdpApi;
    public udpMulticast: UdpMulticastApi;
    public zixi: ZixiApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.type = new TypeApi(configuration);
        this.rtmp = new RtmpApi(configuration);
        this.redundantRtmp = new RedundantRtmpApi(configuration);
        this.s3 = new S3Api(configuration);
        this.s3RoleBased = new S3RoleBasedApi(configuration);
        this.genericS3 = new GenericS3Api(configuration);
        this.local = new LocalApi(configuration);
        this.gcs = new GcsApi(configuration);
        this.azure = new AzureApi(configuration);
        this.ftp = new FtpApi(configuration);
        this.sftp = new SftpApi(configuration);
        this.http = new HttpApi(configuration);
        this.https = new HttpsApi(configuration);
        this.aspera = new AsperaApi(configuration);
        this.akamaiNetstorage = new AkamaiNetstorageApi(configuration);
        this.tcp = new TcpApi(configuration);
        this.udp = new UdpApi(configuration);
        this.udpMulticast = new UdpMulticastApi(configuration);
        this.zixi = new ZixiApi(configuration);
    }

    /**
     * @summary List all Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof InputsApi
     */
    public list(queryParams?: InputsListQueryParams): Promise<PaginationResponse<Input>> {
        return this.restClient.get<PaginationResponse<Input>>('/encoding/inputs', {}, queryParams);
    }

}
