import webhooks from '../../../bitmovin/notifications/webhooks';
import {mockHttp, testSetup} from '../../assertions';
import {getConfiguration} from '../../utils';

const testConfiguration = getConfiguration();
const notificationWebhooks = webhooks(testConfiguration, mockHttp);

const testWebhookNotification = {
  url: '',
  id: '',
  schema: ''
};

const testNotificationId = 'testNotificationId';
const testEncodingId = 'testEncodingId';

describe('encodings', () => {
  beforeEach(() => {
    testSetup();
  });

  describe('finished', () => {
    describe('list', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.encodings.finished.list();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/finished'
        );
      });

      it('should include limit', async () => {
        await notificationWebhooks.encoding.encodings.finished.list(10);
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/finished?limit=10'
        );
      });

      it('should include offset', async () => {
        await notificationWebhooks.encoding.encodings.finished.list(undefined, 10);
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/finished?offset=10'
        );
      });
    });

    describe('create', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.encodings.finished.create(testWebhookNotification);
        expect(mockHttp.post).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/finished',
          testWebhookNotification
        );
      });
    });

    describe('details', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.encodings.finished(testNotificationId).details();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/finished/${testNotificationId}`
        );
      });
    });

    describe('delete', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.encodings.finished(testNotificationId).delete();
        expect(mockHttp.delete_).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/finished/${testNotificationId}`
        );
      });
    });

    describe('customData', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.encodings.finished(testNotificationId).customData();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/finished/${testNotificationId}`
        );
      });
    });

    describe('single encoding notifications', () => {
      describe('list', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding.encodings(testEncodingId).finished.list();
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/finished`
          );
        });

        it('should include limit', async () => {
          await notificationWebhooks.encoding.encodings(testEncodingId).finished.list(10);
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/finished?limit=10`
          );
        });

        it('should include offset', async () => {
          await notificationWebhooks.encoding.encodings(testEncodingId).finished.list(undefined, 10);
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/finished?offset=10`
          );
        });
      });

      describe('create', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding.encodings(testEncodingId).finished.create(testWebhookNotification);
          expect(mockHttp.post).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/finished`,
            testWebhookNotification
          );
        });
      });

      describe('details', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding
            .encodings(testEncodingId)
            .finished(testNotificationId)
            .details();
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/finished/${testNotificationId}`
          );
        });
      });

      describe('delete', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding
            .encodings(testEncodingId)
            .finished(testNotificationId)
            .delete();
          expect(mockHttp.delete_).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/finished/${testNotificationId}`
          );
        });
      });

      describe('customData', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding
            .encodings(testEncodingId)
            .finished(testNotificationId)
            .customData();
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/finished/${testNotificationId}`
          );
        });
      });
    });
  });

  describe('error', () => {
    describe('list', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.encodings.error.list();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/error'
        );
      });

      it('should include limit', async () => {
        await notificationWebhooks.encoding.encodings.error.list(10);
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/error?limit=10'
        );
      });

      it('should include offset', async () => {
        await notificationWebhooks.encoding.encodings.error.list(undefined, 10);
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/error?offset=10'
        );
      });
    });

    describe('create', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.encodings.error.create(testWebhookNotification);
        expect(mockHttp.post).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/error',
          testWebhookNotification
        );
      });
    });

    describe('details', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.encodings.error(testNotificationId).details();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/error/${testNotificationId}`
        );
      });
    });

    describe('delete', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.encodings.error(testNotificationId).delete();
        expect(mockHttp.delete_).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/error/${testNotificationId}`
        );
      });
    });

    describe('customData', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.encodings.error(testNotificationId).customData();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/error/${testNotificationId}`
        );
      });
    });

    describe('single encoding notifications', () => {
      describe('list', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding.encodings(testEncodingId).error.list();
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/error`
          );
        });

        it('should include limit', async () => {
          await notificationWebhooks.encoding.encodings(testEncodingId).error.list(10);
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/error?limit=10`
          );
        });

        it('should include offset', async () => {
          await notificationWebhooks.encoding.encodings(testEncodingId).error.list(undefined, 10);
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/error?offset=10`
          );
        });
      });

      describe('create', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding.encodings(testEncodingId).error.create(testWebhookNotification);
          expect(mockHttp.post).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/error`,
            testWebhookNotification
          );
        });
      });

      describe('details', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding
            .encodings(testEncodingId)
            .error(testNotificationId)
            .details();
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/error/${testNotificationId}`
          );
        });
      });

      describe('delete', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding
            .encodings(testEncodingId)
            .error(testNotificationId)
            .delete();
          expect(mockHttp.delete_).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/error/${testNotificationId}`
          );
        });
      });

      describe('customData', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding
            .encodings(testEncodingId)
            .error(testNotificationId)
            .customData();
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/encodings/${testEncodingId}/error/${testNotificationId}`
          );
        });
      });
    });
  });
});
