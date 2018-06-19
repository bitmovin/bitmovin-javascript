import emails from '../../../bitmovin/notifications/emails';
import {mockHttp, testSetup} from '../../assertions';
import {getConfiguration} from '../../utils';

const testConfiguration = getConfiguration();
const notificationEmails = emails(testConfiguration, mockHttp);

describe('emails', () => {
  beforeEach(() => {
    testSetup();
  });

  describe('list', () => {
    it('should call correct url', async () => {
      await notificationEmails.list();
      expect(mockHttp.get).toHaveBeenCalledWith(testConfiguration, 'https://api.bitmovin.com/v1/notifications/emails');
    });

    it('should include limit', async () => {
      await notificationEmails.list(10);
      expect(mockHttp.get).toHaveBeenCalledWith(
        testConfiguration,
        'https://api.bitmovin.com/v1/notifications/emails?limit=10'
      );
    });

    it('should include offset', async () => {
      await notificationEmails.list(undefined, 10);
      expect(mockHttp.get).toHaveBeenCalledWith(
        testConfiguration,
        'https://api.bitmovin.com/v1/notifications/emails?offset=10'
      );
    });
  });

  describe('encoding', () => {
    describe('list', () => {
      it('should call correct url', async () => {
        await notificationEmails.encoding.list();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/emails/encoding'
        );
      });
    });
  });
});
