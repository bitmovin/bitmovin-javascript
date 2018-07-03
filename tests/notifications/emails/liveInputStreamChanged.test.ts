import emails from '../../../bitmovin/notifications/emails';
import {EmailNotificationWithConditions, EventTypes} from '../../../bitmovin/notifications/types';
import {mockHttp, testSetup} from '../../assertions';
import {getConfiguration} from '../../utils';

const testConfiguration = getConfiguration();
const notificationEmails = emails(testConfiguration, mockHttp);

const testEmailNotificationWithConditions: EmailNotificationWithConditions = {
  id: 'id',
  type: 'EMAIL',
  eventType: EventTypes.LIVE_INPUT_STREAM_CHANGED,
  resolve: true,
  conditions: {
    type: 'AND',
    conditions: []
  },
  emails: [],
  name: 'name',
  description: 'description'
};

const testNotificationId = 'testNotificationId';
const testEncodingId = 'testEncodingId';

describe('liveInputStreamChanged', () => {
  beforeEach(() => {
    testSetup();
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

  describe('single encoding notifications', () => {
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
