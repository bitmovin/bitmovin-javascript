import emails from '../../../bitmovin/notifications/emails';
import {EmailNotificationWithConditions, EventTypes} from '../../../bitmovin/notifications/types';
import {mockHttp, testSetup} from '../../assertions';
import {getConfiguration} from '../../utils';

const testConfiguration = getConfiguration();
const notificationEmails = emails(testConfiguration, mockHttp);

const testEmailNotificationWithConditions: EmailNotificationWithConditions = {
  id: 'id',
  type: 'EMAIL',
  eventType: EventTypes.ENCODING_ERROR,
  resolve: true,
  conditions: {
    type: 'AND',
    conditions: []
  },
  emails: [],
  name: 'name',
  description: 'description',
  resourceId: 'aaaaa-aaaa-aaaa-aaaaa'
};

const testNotificationId = 'testNotificationId';
const testEncodingId = 'testEncodingId';

describe('error', () => {
  beforeEach(() => {
    testSetup();
  });

  describe('create', () => {
    it('should call the correct url', async () => {
      await notificationEmails.encoding.encodings.error.create(testEmailNotificationWithConditions);
      expect(mockHttp.post).toHaveBeenCalledWith(
        testConfiguration,
        'https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/error',
        testEmailNotificationWithConditions
      );
    });
  });

  describe('replace', () => {
    it('should call the correct url', async () => {
      await notificationEmails.encoding.encodings
        .error(testNotificationId)
        .replace(testEmailNotificationWithConditions);
      expect(mockHttp.put).toHaveBeenCalledWith(
        testConfiguration,
        `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/error/${testNotificationId}`,
        testEmailNotificationWithConditions
      );
    });
  });

  describe('single encoding notifications', () => {
    describe('create', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding.encodings(testEncodingId).error.create(testEmailNotificationWithConditions);
        expect(mockHttp.post).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/${testEncodingId}/error`,
          testEmailNotificationWithConditions
        );
      });
    });

    describe('replace', () => {
      it('should call the correct url', async () => {
        await notificationEmails.encoding
          .encodings(testEncodingId)
          .error(testNotificationId)
          .replace(testEmailNotificationWithConditions);
        expect(mockHttp.put).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/emails/encoding/encodings/${testEncodingId}/error/${testNotificationId}`,
          testEmailNotificationWithConditions
        );
      });
    });
  });
});
