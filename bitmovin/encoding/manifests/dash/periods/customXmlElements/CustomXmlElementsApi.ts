import { BaseAPI } from '../../../../../common/BaseAPI';
import { Configuration } from '../../../../../common/RestClient';
import BitmovinResponse from '../../../../../models/BitmovinResponse';
import CustomXmlElement from '../../../../../models/CustomXmlElement';
import ResponseEnvelope from '../../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../../models/PaginationResponse';
import CustomXmlElementsListQueryParams from './CustomXmlElementsListQueryParams';

/**
 * CustomXmlElementsApi - object-oriented interface
 * @export
 * @class CustomXmlElementsApi
 * @extends {BaseAPI}
 */
export default class CustomXmlElementsApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Add Custom XML Element to Period
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {CustomXmlElement} [customXmlElement] Data of the custom XML element to be added to the period
     * @throws {RequiredError}
     * @memberof CustomXmlElementsApi
     */
    public create(manifestId: string, periodId: string, customXmlElement?: CustomXmlElement): Promise<CustomXmlElement> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId
        };
        return this.restClient.post<CustomXmlElement>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/custom-xml-elements', pathParamMap, customXmlElement);
    }

    /**
     * @summary Delete Custom XML Element
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} customXmlElementId Id of the Custom XML Element
     * @throws {RequiredError}
     * @memberof CustomXmlElementsApi
     */
    public delete(manifestId: string, periodId: string, customXmlElementId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            custom_xml_element_id: customXmlElementId
        };
        return this.restClient.delete<BitmovinResponse>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/custom-xml-elements/{custom_xml_element_id}', pathParamMap);
    }

    /**
     * @summary Custom XML Element Details
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {string} customXmlElementId Id of the Custom XML Element
     * @throws {RequiredError}
     * @memberof CustomXmlElementsApi
     */
    public get(manifestId: string, periodId: string, customXmlElementId: string): Promise<CustomXmlElement> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId,
            custom_xml_element_id: customXmlElementId
        };
        return this.restClient.get<CustomXmlElement>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/custom-xml-elements/{custom_xml_element_id}', pathParamMap);
    }

    /**
     * @summary List all Custom XML Elements of Period
     * @param {string} manifestId Id of the manifest
     * @param {string} periodId Id of the period
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof CustomXmlElementsApi
     */
    public list(manifestId: string, periodId: string, queryParams?: CustomXmlElementsListQueryParams): Promise<PaginationResponse<CustomXmlElement>> {
        const pathParamMap = {
            manifest_id: manifestId,
            period_id: periodId
        };
        return this.restClient.get<PaginationResponse<CustomXmlElement>>('/encoding/manifests/dash/{manifest_id}/periods/{period_id}/custom-xml-elements', pathParamMap, queryParams);
    }

}
