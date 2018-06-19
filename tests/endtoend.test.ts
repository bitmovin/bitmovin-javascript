import Bitmovin from '../bitmovin';
import {
  EmailNotificationWithConditions,
  EventTypes,
  WebhookEncryptionResponse,
  WebhookHttpMethod,
  WebhookSignatureResponse
} from '../bitmovin/notifications/types';

describe('end to end', () => {
  it('should do stuff', async () => {
    const bitmovin = Bitmovin({apiKey: 'b92d9679-83f3-4241-8378-31c3f0239e35'});
    const encodingFinishedWebhook = {
      url: 'domysee.com'
    };
    try {
      const notification: EmailNotificationWithConditions = {
        id: '',
        type: 'EMAIL',
        eventType: EventTypes.LIVE_INPUT_STREAM_CHANGED,
        emails: ['dominik.weber@bitmovin.com'],
        conditions: {
          type: 'OR',
          conditions: []
        }
      };
      // const result = await bitmovin.notifications.emails.encoding.encodings.liveInputStreamChanged.create();
      const result = await bitmovin.notifications.webhooks.encoding.encodings.finished.create(encodingFinishedWebhook);
      const x = 10;
    } catch (e) {
      const x = e;
    }
  });
});
