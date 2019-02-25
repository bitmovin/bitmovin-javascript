import { BaseAPI } from '../../../../../../common/BaseAPI';
import { Configuration } from '../../../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import AesEncryptionDrm from '../../../../../../models/AesEncryptionDrm';
import BitmovinResponse from '../../../../../../models/BitmovinResponse';
import ResponseEnvelope from '../../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../../models/PaginationResponse';
import AesEncryptionDrmsListQueryParams from './AesEncryptionDrmsListQueryParams';

/**
 * AesApi - object-oriented interface
 * @export
 * @class AesApi
 * @extends {BaseAPI}
 */
export default class AesApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Add AES Encryption to TS Segment
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the TS muxing.
     * @param {AesEncryptionDrm} [aesEncryptionDrm] TODO Add Description
     * @throws {RequiredError}
     * @memberof AesApi
     */
    public create(encodingId: string, muxingId: string, aesEncryptionDrm?: AesEncryptionDrm): Promise<AesEncryptionDrm> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.post<AesEncryptionDrm>('/encoding/encodings/{encoding_id}/muxings/ts/{muxing_id}/drm/aes', pathParamMap, aesEncryptionDrm);
    }

    /**
     * @summary Delete AES Encryption from TS Segment
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the transport stream segment.
     * @param {string} drmId Id of the PlayReady DRM configuration.
     * @throws {RequiredError}
     * @memberof AesApi
     */
    public delete(encodingId: string, muxingId: string, drmId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/muxings/ts/{muxing_id}/drm/aes/{drm_id}', pathParamMap);
    }

    /**
     * @summary AES Encryption Details of TS Segment
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the transport stream segment.
     * @param {string} drmId Id of the AESEncryption configuration.
     * @throws {RequiredError}
     * @memberof AesApi
     */
    public get(encodingId: string, muxingId: string, drmId: string): Promise<AesEncryptionDrm> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId,
            drm_id: drmId
        };
        return this.restClient.get<AesEncryptionDrm>('/encoding/encodings/{encoding_id}/muxings/ts/{muxing_id}/drm/aes/{drm_id}', pathParamMap);
    }

    /**
     * @summary List AES Encryption of TS Segment
     * @param {string} encodingId Id of the encoding.
     * @param {string} muxingId Id of the transport stream segment.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof AesApi
     */
    public list(encodingId: string, muxingId: string, queryParams?: AesEncryptionDrmsListQueryParams): Promise<PaginationResponse<AesEncryptionDrm>> {
        const pathParamMap = {
            encoding_id: encodingId,
            muxing_id: muxingId
        };
        return this.restClient.get<PaginationResponse<AesEncryptionDrm>>('/encoding/encodings/{encoding_id}/muxings/ts/{muxing_id}/drm/aes', pathParamMap, queryParams);
    }

}
