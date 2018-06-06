// @flow
import emails from '../../bitmovin/notifications/emails';
import {getConfiguration} from '../utils';
import {mockHttp, testSetup} from '../assertions';

const testConfiguration = getConfiguration();

describe('liveInputStreamChanged', () => {
  describe('list', () => {
    describe('list', () => {
      beforeEach(() => {
        testSetup();
      });

      it('should call the correct url', async () => {
        const notificationEmails = emails(testConfiguration, mockHttp);
        await notificationEmails.encoding.encodings.liveInputStreamChanged.list();
        expect(mockHttp.get).toHaveBeenCalledWith(testConfiguration, 'https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed');
      });

      it('should include limit', async () => {
        const notificationEmails = emails(testConfiguration, mockHttp);
        await notificationEmails.encoding.encodings.liveInputStreamChanged.list(10);
        expect(mockHttp.get).toHaveBeenCalledWith(testConfiguration, 'https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed?limit=10');
      });

      it('should include offset', async () => {
        const notificationEmails = emails(testConfiguration, mockHttp);
        await notificationEmails.encoding.encodings.liveInputStreamChanged.list(null, 10);
        expect(mockHttp.get).toHaveBeenCalledWith(testConfiguration, 'https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed?offset=10');
      });
    });

    describe('create', () => {

    });

    describe('details', () => {

    });

    describe('delete', () => {

    });

    describe('replace', () => {

    });
  });

  describe('single', () => {
    describe('list', () => {

    });

    describe('create', () => {

    });

    describe('details', () => {

    });

    describe('delete', () => {

    });

    describe('replace', () => {

    });
  });
});