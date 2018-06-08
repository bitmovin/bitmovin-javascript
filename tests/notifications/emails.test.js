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

const testNotificationId = 'testNotificationId';
const testEncodingId = 'testEncodingId';

describe('liveInputStreamChanged', () => {
  beforeEach(() => {
    testSetup();
  });

  describe('list', () => {
    describe('list', () => {
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
        await notificationEmails.encoding.encodings.liveInputStreamChanged(testNotificationId).details();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed/${testNotificationId}`
        );
      });
    });

    describe('delete', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding.encodings.liveInputStreamChanged(testNotificationId).delete();
        expect(mockHttp.delete_).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed/${testNotificationId}`
        );
      });
    });

    describe('replace', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding.encodings
          .liveInputStreamChanged(testNotificationId)
          .replace(testEmailNotificationWithConditions);
        expect(mockHttp.put).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/live-input-stream-changed/${testNotificationId}`,
          testEmailNotificationWithConditions
        );
      });
    });
  });

  describe('single', () => {
    describe('list', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding.encodings(testEncodingId).liveInputStreamChanged.list();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/${testEncodingId}/live-input-stream-changed`
        );
      });

      it('should include limit', async () => {
        await notificationEmails.encoding.encodings(testEncodingId).liveInputStreamChanged.list(10);
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/${testEncodingId}/live-input-stream-changed?limit=10`
        );
      });

      it('should include offset', async () => {
        await notificationEmails.encoding.encodings(testEncodingId).liveInputStreamChanged.list(null, 10);
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/${testEncodingId}/live-input-stream-changed?offset=10`
        );
      });
    });

    describe('create', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding
          .encodings(testEncodingId)
          .liveInputStreamChanged.create(testEmailNotificationWithConditions);
        expect(mockHttp.post).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/${testEncodingId}/live-input-stream-changed`,
          testEmailNotificationWithConditions
        );
      });
    });

    describe('details', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding
          .encodings(testEncodingId)
          .liveInputStreamChanged(testNotificationId)
          .details();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/${testEncodingId}/live-input-stream-changed/${testNotificationId}`
        );
      });
    });

    describe('delete', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding
          .encodings(testEncodingId)
          .liveInputStreamChanged(testNotificationId)
          .delete();
        expect(mockHttp.delete_).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/${testEncodingId}/live-input-stream-changed/${testNotificationId}`
        );
      });
    });

    describe('replace', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding
          .encodings(testEncodingId)
          .liveInputStreamChanged(testNotificationId)
          .replace(testEmailNotificationWithConditions);
        expect(mockHttp.put).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/${testEncodingId}/live-input-stream-changed/${testNotificationId}`,
          testEmailNotificationWithConditions
        );
      });
    });
  });
});
