// @flow
import emails from '../../bitmovin/notifications/emails';
import {getConfiguration} from '../utils';
import {mockHttp, testSetup} from '../assertions';

const testConfiguration = getConfiguration();
const notificationEmails = emails(testConfiguration, mockHttp);

const testEmailNotificationWithConditions = {
  resolve: true,
  conditions: [],
  emails: [],
  name: 'name',
  description: 'description',
  customData: null
};

const testId = 'testid';

describe('liveInputStreamChanged', () => {
  describe('list', () => {
    describe('list', () => {
      beforeEach(() => {
        testSetup();
      });

      it('should call the correct url', async () => {
        await notificationEmails.encoding.encodings.liveInputStreamChanged.list();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed'
        );
      });

      it('should include limit', async () => {
        await notificationEmails.encoding.encodings.liveInputStreamChanged.list(10);
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed?limit=10'
        );
      });

      it('should include offset', async () => {
        await notificationEmails.encoding.encodings.liveInputStreamChanged.list(null, 10);
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed?offset=10'
        );
      });
    });

    describe('create', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding.encodings.liveInputStreamChanged.create(testEmailNotificationWithConditions);
        expect(mockHttp.post).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed',
          testEmailNotificationWithConditions
        );
      });
    });

    describe('details', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding.encodings.liveInputStreamChanged(testId).details();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed/${testId}`
        );
      });
    });

    describe('delete', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding.encodings.liveInputStreamChanged(testId).delete();
        expect(mockHttp.delete_).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed/${testId}`
        );
      });
    });

    describe('replace', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding.encodings.liveInputStreamChanged(testId).replace(testEmailNotificationWithConditions);
        expect(mockHttp.put).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed/${testId}`,
          testEmailNotificationWithConditions
        );
      });
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
