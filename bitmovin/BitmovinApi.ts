import { BaseAPI } from './common/BaseAPI';
import { Configuration } from './common/RestClient';
import AccountApi from './account/AccountApi';
import AnalyticsApi from './analytics/AnalyticsApi';
import EncodingApi from './encoding/EncodingApi';
import NotificationsApi from './notifications/NotificationsApi';
import PlayerApi from './player/PlayerApi';

/**
 * BitmovinApi - object-oriented interface
 * @export
 * @class BitmovinApi
 * @extends {BaseAPI}
 */
export default class BitmovinApi extends BaseAPI {
    public account: AccountApi;
    public analytics: AnalyticsApi;
    public encoding: EncodingApi;
    public notifications: NotificationsApi;
    public player: PlayerApi;

    constructor(configuration: Configuration) {
        super(configuration);
        this.account = new AccountApi(configuration);
        this.analytics = new AnalyticsApi(configuration);
        this.encoding = new EncodingApi(configuration);
        this.notifications = new NotificationsApi(configuration);
        this.player = new PlayerApi(configuration);
    }

}
