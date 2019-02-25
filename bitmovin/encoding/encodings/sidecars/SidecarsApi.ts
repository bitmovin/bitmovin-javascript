import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import SidecarFile from '../../../models/SidecarFile';
import PaginationResponse from '../../../models/PaginationResponse';
import SidecarFilesListQueryParams from './SidecarFilesListQueryParams';

/**
 * SidecarsApi - object-oriented interface
 * @export
 * @class SidecarsApi
 * @extends {BaseAPI}
 */
export default class SidecarsApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Add Sidecar
     * @param {string} encodingId Id of the encoding.
     * @param {SidecarFile} [sidecarFile]
     * @throws {RequiredError}
     * @memberof SidecarsApi
     */
    public create(encodingId: string, sidecarFile?: SidecarFile): Promise<SidecarFile> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<SidecarFile>('/encoding/encodings/{encoding_id}/sidecars', pathParamMap, sidecarFile);
    }

    /**
     * @summary Delete Sidecar
     * @param {string} encodingId Id of the encoding.
     * @param {string} sidecarId Id of the sidecar.
     * @throws {RequiredError}
     * @memberof SidecarsApi
     */
    public delete(encodingId: string, sidecarId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            sidecar_id: sidecarId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/sidecars/{sidecar_id}', pathParamMap);
    }

    /**
     * @summary Sidecar Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} sidecarId Id of the sidecar.
     * @throws {RequiredError}
     * @memberof SidecarsApi
     */
    public get(encodingId: string, sidecarId: string): Promise<SidecarFile> {
        const pathParamMap = {
            encoding_id: encodingId,
            sidecar_id: sidecarId
        };
        return this.restClient.get<SidecarFile>('/encoding/encodings/{encoding_id}/sidecars/{sidecar_id}', pathParamMap);
    }

    /**
     * @summary List Sidecars
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof SidecarsApi
     */
    public list(encodingId: string, queryParams?: SidecarFilesListQueryParams): Promise<PaginationResponse<SidecarFile>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<SidecarFile>>('/encoding/encodings/{encoding_id}/sidecars', pathParamMap, queryParams);
    }

}
