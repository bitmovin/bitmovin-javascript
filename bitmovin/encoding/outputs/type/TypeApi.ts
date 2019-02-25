import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import OutputTypeResponse from '../../../models/OutputTypeResponse';
import ResponseEnvelope from '../../../models/ResponseEnvelope';

/**
 * TypeApi - object-oriented interface
 * @export
 * @class TypeApi
 * @extends {BaseAPI}
 */
export default class TypeApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Get Output Type
     * @param {string} outputId Id of the wanted output
     * @throws {RequiredError}
     * @memberof TypeApi
     */
    public get(outputId: string): Promise<OutputTypeResponse> {
        const pathParamMap = {
            output_id: outputId
        };
        return this.restClient.get<OutputTypeResponse>('/encoding/outputs/{output_id}/type', pathParamMap);
    }

}
