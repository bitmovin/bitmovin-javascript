import { BaseAPI } from '../../common/BaseAPI';
import { Configuration } from '../../common/RestClient';
import TypeApi from './type/TypeApi';
import S3Api from './s3/S3Api';
import S3RoleBasedApi from './s3RoleBased/S3RoleBasedApi';
import GenericS3Api from './genericS3/GenericS3Api';
import LocalApi from './local/LocalApi';
import GcsApi from './gcs/GcsApi';
import AzureApi from './azure/AzureApi';
import FtpApi from './ftp/FtpApi';
import SftpApi from './sftp/SftpApi';
import AkamaiNetstorageApi from './akamaiNetstorage/AkamaiNetstorageApi';
import Output from '../../models/Output';
import ResponseEnvelope from '../../models/ResponseEnvelope';
import PaginationResponse from '../../models/PaginationResponse';
import OutputsListQueryParams from './OutputsListQueryParams';

/**
 * OutputsApi - object-oriented interface
 * @export
 * @class OutputsApi
 * @extends {BaseAPI}
 */
export default class OutputsApi extends BaseAPI {
    public type: TypeApi;
    public s3: S3Api;
    public s3RoleBased: S3RoleBasedApi;
    public genericS3: GenericS3Api;
    public local: LocalApi;
    public gcs: GcsApi;
    public azure: AzureApi;
    public ftp: FtpApi;
    public sftp: SftpApi;
    public akamaiNetstorage: AkamaiNetstorageApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.type = new TypeApi(configuration);
        this.s3 = new S3Api(configuration);
        this.s3RoleBased = new S3RoleBasedApi(configuration);
        this.genericS3 = new GenericS3Api(configuration);
        this.local = new LocalApi(configuration);
        this.gcs = new GcsApi(configuration);
        this.azure = new AzureApi(configuration);
        this.ftp = new FtpApi(configuration);
        this.sftp = new SftpApi(configuration);
        this.akamaiNetstorage = new AkamaiNetstorageApi(configuration);
    }

    /**
     * @summary List all Outputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof OutputsApi
     */
    public list(queryParams?: OutputsListQueryParams): Promise<PaginationResponse<Output>> {
        return this.restClient.get<PaginationResponse<Output>>('/encoding/outputs', {}, queryParams);
    }

}
