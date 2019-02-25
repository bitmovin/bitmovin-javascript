import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import BitmovinResponse from '../../../models/BitmovinResponse';
import LiveEncoding from '../../../models/LiveEncoding';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import StartLiveEncodingRequest from '../../../models/StartLiveEncodingRequest';

/**
 * LiveApi - object-oriented interface
 * @export
 * @class LiveApi
 * @extends {BaseAPI}
 */
export default class LiveApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Live Encoding Details
     * @param {string} encodingId Id of the encoding.
     * @throws {RequiredError}
     * @memberof LiveApi
     */
    public get(encodingId: string): Promise<LiveEncoding> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<LiveEncoding>('/encoding/encodings/{encoding_id}/live', pathParamMap);
    }

    /**
     * @summary Live Encoding Start Details
     * @param {string} encodingId Id of the encoding
     * @throws {RequiredError}
     * @memberof LiveApi
     */
    public getStartRequest(encodingId: string): Promise<StartLiveEncodingRequest> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.get<StartLiveEncodingRequest>('/encoding/encodings/{encoding_id}/live/start', pathParamMap);
    }

    /**
     * @summary Re-Start Live Encoding
     * @param {string} encodingId Id of the encoding
     * @throws {RequiredError}
     * @memberof LiveApi
     */
    public restart(encodingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<BitmovinResponse>('/encoding/encodings/{encoding_id}/live/restart', pathParamMap);
    }

    /**
     * @summary Start Live Encoding
     * @param {string} encodingId Id of the encoding
     * @param {StartLiveEncodingRequest} [startLiveEncodingRequest]
     * @throws {RequiredError}
     * @memberof LiveApi
     */
    public start(encodingId: string, startLiveEncodingRequest?: StartLiveEncodingRequest): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<BitmovinResponse>('/encoding/encodings/{encoding_id}/live/start', pathParamMap, startLiveEncodingRequest);
    }

    /**
     * @summary Stop Live Encoding
     * @param {string} encodingId Id of the encoding
     * @throws {RequiredError}
     * @memberof LiveApi
     */
    public stop(encodingId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            encoding_id: encodingId
        };
        return this.restClient.post<BitmovinResponse>('/encoding/encodings/{encoding_id}/live/stop', pathParamMap);
    }

}
