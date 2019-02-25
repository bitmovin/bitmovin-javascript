import EncryptionType from './EncryptionType';

/**
 * @export
 * @interface WebhookEncryption
 */
export default interface WebhookEncryption {
    /**
     * The encryption algorithm used for the webhook
     * @type {EncryptionType}
     * @memberof WebhookEncryption
     */
    type: EncryptionType;

    /**
     * The key of the encryption
     * @type {string}
     * @memberof WebhookEncryption
     */
    key: string;

}
