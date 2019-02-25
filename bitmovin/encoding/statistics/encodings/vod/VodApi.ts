import { BaseAPI } from '../../../../common/BaseAPI';
import { Configuration } from '../../../../common/RestClient';
import EncodingStatisticsVod from '../../../../models/EncodingStatisticsVod';
import ResponseEnvelope from '../../../../models/ResponseEnvelope';
import PaginationResponse from '../../../../models/PaginationResponse';
import EncodingStatisticsVodsListByDateRangeQueryParams from './EncodingStatisticsVodsListByDateRangeQueryParams';
import EncodingStatisticsVodsListQueryParams from './EncodingStatisticsVodsListQueryParams';

/**
 * VodApi - object-oriented interface
 * @export
 * @class VodApi
 * @extends {BaseAPI}
 */
export default class VodApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary List VOD Encoding Statistics
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof VodApi
     */
    public list(queryParams?: EncodingStatisticsVodsListQueryParams): Promise<PaginationResponse<EncodingStatisticsVod>> {
        return this.restClient.get<PaginationResponse<EncodingStatisticsVod>>('/encoding/statistics/encodings/vod', {}, queryParams);
    }

    /**
     * @summary List VOD Encoding Statistics Within Specific Dates
     * @param {string} from Start date, format: yyyy-MM-dd
     * @param {string} to End date, format: yyyy-MM-dd
     * @param {*} [queryParams] query parameters for filtering, sorting and pagination
     * @throws {RequiredError}
     * @memberof VodApi
     */
    public listByDateRange(from: string, to: string, queryParams?: EncodingStatisticsVodsListByDateRangeQueryParams): Promise<PaginationResponse<EncodingStatisticsVod>> {
        const pathParamMap = {
            from: from,
            to: to
        };
        return this.restClient.get<PaginationResponse<EncodingStatisticsVod>>('/encoding/statistics/encodings/vod/{from}/{to}', pathParamMap, queryParams);
    }

}
