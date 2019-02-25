import BitmovinResource from './BitmovinResource';
import WebhookEncryption from './WebhookEncryption';
import WebhookHttpMethod from './WebhookHttpMethod';
import WebhookSignature from './WebhookSignature';

/**
 * @export
 * @interface Webhook
 */
export default interface Webhook extends BitmovinResource {
    /**
     * Webhook url
     * @type {string}
     * @memberof Webhook
     */
    url: string;

    /**
     * HTTP method used for the webhook
     * @type {WebhookHttpMethod}
     * @memberof Webhook
     */
    method?: WebhookHttpMethod;

    /**
     * Whether to skip SSL certification verification or not
     * @type {boolean}
     * @memberof Webhook
     */
    insecureSsl?: boolean;

    /**
     * Encryption used for the webhook
     * @type {WebhookEncryption}
     * @memberof Webhook
     */
    encryption?: WebhookEncryption;

    /**
     * Signature used for the webhook
     * @type {WebhookSignature}
     * @memberof Webhook
     */
    signature?: WebhookSignature;

}
