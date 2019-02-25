import SignatureType from './SignatureType';

/**
 * @export
 * @interface WebhookSignature
 */
export default interface WebhookSignature {
    /**
     * The signature type used for the webhook
     * @type {SignatureType}
     * @memberof WebhookSignature
     */
    type: SignatureType;

    /**
     * The key of the signature
     * @type {string}
     * @memberof WebhookSignature
     */
    key?: string;

}
