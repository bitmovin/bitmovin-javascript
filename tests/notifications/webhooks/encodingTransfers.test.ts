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

describe('transfers', () => {
  beforeEach(() => {
    testSetup();
  });

  describe('finished', () => {
    describe('list', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.transfers.finished.list();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/finished'
        );
      });

      it('should include limit', async () => {
        await notificationWebhooks.encoding.transfers.finished.list(10);
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/finished?limit=10'
        );
      });

      it('should include offset', async () => {
        await notificationWebhooks.encoding.transfers.finished.list(undefined, 10);
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/finished?offset=10'
        );
      });
    });

    describe('create', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.transfers.finished.create(testWebhookNotification);
        expect(mockHttp.post).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/finished',
          testWebhookNotification
        );
      });
    });

    describe('details', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.transfers.finished(testNotificationId).details();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/finished/${testNotificationId}`
        );
      });
    });

    describe('delete', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.transfers.finished(testNotificationId).delete();
        expect(mockHttp.delete_).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/finished/${testNotificationId}`
        );
      });
    });

    describe('customData', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.transfers.finished(testNotificationId).customData();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/finished/${testNotificationId}`
        );
      });
    });

    describe('single encoding notifications', () => {
      describe('list', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding.transfers(testEncodingId).finished.list();
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/finished`
          );
        });

        it('should include limit', async () => {
          await notificationWebhooks.encoding.transfers(testEncodingId).finished.list(10);
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/finished?limit=10`
          );
        });

        it('should include offset', async () => {
          await notificationWebhooks.encoding.transfers(testEncodingId).finished.list(undefined, 10);
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/finished?offset=10`
          );
        });
      });

      describe('create', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding.transfers(testEncodingId).finished.create(testWebhookNotification);
          expect(mockHttp.post).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/finished`,
            testWebhookNotification
          );
        });
      });

      describe('details', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding
            .transfers(testEncodingId)
            .finished(testNotificationId)
            .details();
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/finished/${testNotificationId}`
          );
        });
      });

      describe('delete', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding
            .transfers(testEncodingId)
            .finished(testNotificationId)
            .delete();
          expect(mockHttp.delete_).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/finished/${testNotificationId}`
          );
        });
      });

      describe('customData', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding
            .transfers(testEncodingId)
            .finished(testNotificationId)
            .customData();
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/finished/${testNotificationId}`
          );
        });
      });
    });
  });

  describe('error', () => {
    describe('list', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.transfers.error.list();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/error'
        );
      });

      it('should include limit', async () => {
        await notificationWebhooks.encoding.transfers.error.list(10);
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/error?limit=10'
        );
      });

      it('should include offset', async () => {
        await notificationWebhooks.encoding.transfers.error.list(undefined, 10);
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/error?offset=10'
        );
      });
    });

    describe('create', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.transfers.error.create(testWebhookNotification);
        expect(mockHttp.post).toHaveBeenCalledWith(
          testConfiguration,
          'https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/error',
          testWebhookNotification
        );
      });
    });

    describe('details', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.transfers.error(testNotificationId).details();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/error/${testNotificationId}`
        );
      });
    });

    describe('delete', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.transfers.error(testNotificationId).delete();
        expect(mockHttp.delete_).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/error/${testNotificationId}`
        );
      });
    });

    describe('customData', () => {
      it('should call the correct url', async () => {
        await notificationWebhooks.encoding.transfers.error(testNotificationId).customData();
        expect(mockHttp.get).toHaveBeenCalledWith(
          testConfiguration,
          `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/error/${testNotificationId}`
        );
      });
    });

    describe('single encoding notifications', () => {
      describe('list', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding.transfers(testEncodingId).error.list();
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/error`
          );
        });

        it('should include limit', async () => {
          await notificationWebhooks.encoding.transfers(testEncodingId).error.list(10);
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/error?limit=10`
          );
        });

        it('should include offset', async () => {
          await notificationWebhooks.encoding.transfers(testEncodingId).error.list(undefined, 10);
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/error?offset=10`
          );
        });
      });

      describe('create', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding.transfers(testEncodingId).error.create(testWebhookNotification);
          expect(mockHttp.post).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/error`,
            testWebhookNotification
          );
        });
      });

      describe('details', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding
            .transfers(testEncodingId)
            .error(testNotificationId)
            .details();
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/error/${testNotificationId}`
          );
        });
      });

      describe('delete', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding
            .transfers(testEncodingId)
            .error(testNotificationId)
            .delete();
          expect(mockHttp.delete_).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/error/${testNotificationId}`
          );
        });
      });

      describe('customData', () => {
        it('should call the correct url', async () => {
          await notificationWebhooks.encoding
            .transfers(testEncodingId)
            .error(testNotificationId)
            .customData();
          expect(mockHttp.get).toHaveBeenCalledWith(
            testConfiguration,
            `https://api.bitmovin.com/v1/notifications/webhooks/encoding/transfers/${testEncodingId}/error/${testNotificationId}`
          );
        });
      });
    });
  });
});
