// @flow
import emails from '../../bitmovin/notifications/emails';
import {getConfiguration} from '../utils';
import {mockHttp, testSetup} from '../assertions';

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