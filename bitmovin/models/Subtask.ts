import BitmovinResponse from './BitmovinResponse';
import Message from './Message';
import Status from './Status';

/**
 * @export
 * @interface Subtask
 */
export default interface Subtask extends BitmovinResponse {
    /**
     * Current status
     * @type {Status}
     * @memberof Subtask
     */
    status: Status;

    /**
     * Progress in percent
     * @type {number}
     * @memberof Subtask
     */
    progress?: number;

    /**
     * Name of the subtask
     * @type {string}
     * @memberof Subtask
     */
    name: string;

    /**
     * Task specific messages
     * @type {Array<Message>}
     * @memberof Subtask
     */
    messages?: Array<Message>;

    /**
     * Timestamp when the subtask was created, expressed in UTC: YYYY-MM-DDThh:mm:ssZ 
     * @type {Date}
     * @memberof Subtask
     */
    createdAt?: Date;

    /**
     * Timestamp when the subtask was last updated, expressed in UTC: YYYY-MM-DDThh:mm:ssZ 
     * @type {Date}
     * @memberof Subtask
     */
    updatedAt?: Date;

    /**
     * Timestamp when the subtask was started, expressed in UTC: YYYY-MM-DDThh:mm:ssZ 
     * @type {Date}
     * @memberof Subtask
     */
    startedAt?: Date;

    /**
     * Timestamp when the subtask status changed to 'QUEUED', expressed in UTC: YYYY-MM-DDThh:mm:ssZ 
     * @type {Date}
     * @memberof Subtask
     */
    queuedAt?: Date;

    /**
     * Timestamp when the subtask status changed to to 'RUNNING', expressed in UTC: YYYY-MM-DDThh:mm:ssZ 
     * @type {Date}
     * @memberof Subtask
     */
    runningAt?: Date;

    /**
     * Timestamp when the subtask status changed to 'FINISHED', expressed in UTC: YYYY-MM-DDThh:mm:ssZ 
     * @type {Date}
     * @memberof Subtask
     */
    finishedAt?: Date;

    /**
     * Timestamp when the subtask status changed to 'ERROR', expressed in UTC: YYYY-MM-DDThh:mm:ssZ 
     * @type {Date}
     * @memberof Subtask
     */
    errorAt?: Date;

}
