import notifications from '../../bitmovin/notifications';
import {mockHttp, testSetup} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();
const notificationsApi = notifications(testConfiguration, mockHttp);

const testNotificationId = 'id';

describe('notifications', () => {
  beforeEach(() => {
    testSetup();
  });

  describe('list', () => {
    it('should call correct url', async () => {
      await notificationsApi.list();
      expect(mockHttp.get).toHaveBeenCalledWith(testConfiguration, 'https://api.bitmovin.com/v1/notifications');
    });

    it('should include limit', async () => {
      await notificationsApi.list(10);
      expect(mockHttp.get).toHaveBeenCalledWith(
        testConfiguration,
        'https://api.bitmovin.com/v1/notifications?limit=10'
      );
    });

    it('should include offset', async () => {
      await notificationsApi.list(undefined, 10);
      expect(mockHttp.get).toHaveBeenCalledWith(
        testConfiguration,
        'https://api.bitmovin.com/v1/notifications?offset=10'
      );
    });
  });

  describe('details', () => {
    it('should call correct url', async () => {
      await notificationsApi(testNotificationId).details();
      expect(mockHttp.get).toHaveBeenCalledWith(
        testConfiguration,
        `https://api.bitmovin.com/v1/notifications/${testNotificationId}`
      );
    });
  });

  describe('delete', () => {
    it('should call correct url', async () => {
      await notificationsApi(testNotificationId).delete();
      expect(mockHttp.delete_).toHaveBeenCalledWith(
        testConfiguration,
        `https://api.bitmovin.com/v1/notifications/${testNotificationId}`
      );
    });
  });
});
