import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import CustomdataApi from './customdata/CustomdataApi';
import AkamaiNetStorageInput from '../../../models/AkamaiNetStorageInput';
import ResponseEnvelope from '../../../models/ResponseEnvelope';
import PaginationResponse from '../../../models/PaginationResponse';
import AkamaiNetStorageInputsListQueryParams from './AkamaiNetStorageInputsListQueryParams';

/**
 * AkamaiNetstorageApi - object-oriented interface
 * @export
 * @class AkamaiNetstorageApi
 * @extends {BaseAPI}
 */
export default class AkamaiNetstorageApi extends BaseAPI {
    public customdata: CustomdataApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.customdata = new CustomdataApi(configuration);
    }

    /**
     * @summary Create Akamai NetStorage Input
     * @param {AkamaiNetStorageInput} [akamaiNetStorageInput] The Akamai NetStorage input to be created
     * @throws {RequiredError}
     * @memberof AkamaiNetstorageApi
     */
    public create(akamaiNetStorageInput?: AkamaiNetStorageInput): Promise<AkamaiNetStorageInput> {
        return this.restClient.post<AkamaiNetStorageInput>('/encoding/inputs/akamai-netstorage', {}, akamaiNetStorageInput);
    }

    /**
     * @summary Delete Akamai NetStorage Input
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof AkamaiNetstorageApi
     */
    public delete(inputId: string): Promise<AkamaiNetStorageInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.delete<AkamaiNetStorageInput>('/encoding/inputs/akamai-netstorage/{input_id}', pathParamMap);
    }

    /**
     * @summary Akamai NetStorage Input Details
     * @param {string} inputId Id of the input
     * @throws {RequiredError}
     * @memberof AkamaiNetstorageApi
     */
    public get(inputId: string): Promise<AkamaiNetStorageInput> {
        const pathParamMap = {
            input_id: inputId
        };
        return this.restClient.get<AkamaiNetStorageInput>('/encoding/inputs/akamai-netstorage/{input_id}', pathParamMap);
    }

    /**
     * @summary List Akamai NetStorage Inputs
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof AkamaiNetstorageApi
     */
    public list(queryParams?: AkamaiNetStorageInputsListQueryParams): Promise<PaginationResponse<AkamaiNetStorageInput>> {
        return this.restClient.get<PaginationResponse<AkamaiNetStorageInput>>('/encoding/inputs/akamai-netstorage', {}, queryParams);
    }

}
