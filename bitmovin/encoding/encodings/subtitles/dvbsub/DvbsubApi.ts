import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import BitmovinResponse from '../../../../models/BitmovinResponse';
import DvbSubtitleSidecarDetails from '../../../../models/DvbSubtitleSidecarDetails';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import DvbSubtitleSidecarDetailssListQueryParams from './DvbSubtitleSidecarDetailssListQueryParams';

/**
 * DvbsubApi - object-oriented interface
 * @export
 * @class DvbsubApi
 * @extends {BaseAPI}
 */
export default class DvbsubApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Extract DVB-SUB Subtitle
     * @param {string} encodingId Id of the encoding.
     * @param {DvbSubtitleSidecarDetails} [dvbSubtitleSidecarDetails]
     * @throws {RequiredError}
     * @memberof DvbsubApi
     */
    public create(encodingId: string, dvbSubtitleSidecarDetails?: DvbSubtitleSidecarDetails): Promise<DvbSubtitleSidecarDetails> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<DvbSubtitleSidecarDetails>('/encoding/encodings/{encoding_id}/subtitles/dvbsub', pathParamMap, dvbSubtitleSidecarDetails);
    }

    /**
     * @summary Delete DVB-SUB Subtitle
     * @param {string} encodingId Id of the encoding.
     * @param {string} subtitleId Id of the subtitle.
     * @throws {RequiredError}
     * @memberof DvbsubApi
     */
    public delete(encodingId: string, subtitleId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId,
            subtitle_id: subtitleId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/encodings/{encoding_id}/subtitles/dvbsub/{subtitle_id}', pathParamMap);
    }

    /**
     * @summary Subtitle DVB-SUB Details
     * @param {string} encodingId Id of the encoding.
     * @param {string} subtitleId Id of the subtitle.
     * @throws {RequiredError}
     * @memberof DvbsubApi
     */
    public get(encodingId: string, subtitleId: string): Promise<DvbSubtitleSidecarDetails> {
        const pathParamMap = {
            encoding_id: encodingId,
            subtitle_id: subtitleId
        };
        return this.restClient.get<DvbSubtitleSidecarDetails>('/encoding/encodings/{encoding_id}/subtitles/dvbsub/{subtitle_id}', pathParamMap);
    }

    /**
     * @summary List DVB-SUB Subtitle
     * @param {string} encodingId Id of the encoding.
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof DvbsubApi
     */
    public list(encodingId: string, queryParams?: DvbSubtitleSidecarDetailssListQueryParams): Promise<PaginationResponse<DvbSubtitleSidecarDetails>> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<PaginationResponse<DvbSubtitleSidecarDetails>>('/encoding/encodings/{encoding_id}/subtitles/dvbsub', pathParamMap, queryParams);
    }

}
