import { BaseAPI } from '../../../common/BaseAPI';
import { Configuration } from '../../../common/RestClient';
import BitmovinResponse from '../../../models/BitmovinResponse';
import PlayerThirdPartyLicensing from '../../../models/PlayerThirdPartyLicensing';
import ResponseEnvelope from '../../../models/ResponseEnvelope';

/**
 * ThirdPartyLicensingApi - object-oriented interface
 * @export
 * @class ThirdPartyLicensingApi
 * @extends {BaseAPI}
 */
export default class ThirdPartyLicensingApi extends BaseAPI {

    constructor(configuration: Configuration) {
        super(configuration);
    }

    /**
     * @summary Enable Third Party Licensing
     * @param {string} licenseId Id of the Player License
     * @param {PlayerThirdPartyLicensing} [playerThirdPartyLicensing] Third Party Licensing settings to apply to Player License
     * @throws {RequiredError}
     * @memberof ThirdPartyLicensingApi
     */
    public create(licenseId: string, playerThirdPartyLicensing?: PlayerThirdPartyLicensing): Promise<PlayerThirdPartyLicensing> {
        const pathParamMap = {
            license_id: licenseId
        };
        return this.restClient.post<PlayerThirdPartyLicensing>('/player/licenses/{license_id}/third-party-licensing', pathParamMap, playerThirdPartyLicensing);
    }

    /**
     * @summary Delete Third Party Licensing Configuration
     * @param {string} licenseId Id of the Player License
     * @throws {RequiredError}
     * @memberof ThirdPartyLicensingApi
     */
    public delete(licenseId: string): Promise<BitmovinResponse> {
        const pathParamMap = {
            license_id: licenseId
        };
        return this.restClient.delete<BitmovinResponse>('/player/licenses/{license_id}/third-party-licensing', pathParamMap);
    }

    /**
     * @summary Get Third Party Licensing Configuration
     * @param {string} licenseId Id of the Player License
     * @throws {RequiredError}
     * @memberof ThirdPartyLicensingApi
     */
    public get(licenseId: string): Promise<PlayerThirdPartyLicensing> {
        const pathParamMap = {
            license_id: licenseId
        };
        return this.restClient.get<PlayerThirdPartyLicensing>('/player/licenses/{license_id}/third-party-licensing', pathParamMap);
    }

}
