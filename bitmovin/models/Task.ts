import BitmovinResponse from './BitmovinResponse';
import ErrorDetails from './ErrorDetails';
import Message from './Message';
import Status from './Status';
import Subtask from './Subtask';

/**
 * @export
 * @interface Task
 */
export default interface Task extends BitmovinResponse {
    /**
     * Current status
     * @type {Status}
     * @memberof Task
     */
    status: Status;

    /**
     * Estimated ETA in seconds
     * @type {number}
     * @memberof Task
     */
    eta?: number;

    /**
     * Progress in percent
     * @type {number}
     * @memberof Task
     */
    progress?: number;

    /**
     * List of subtasks
     * @type {Array<Subtask>}
     * @memberof Task
     */
    subtasks?: Array<Subtask>;

    /**
     * Task specific messages
     * @type {Array<Message>}
     * @memberof Task
     */
    messages?: Array<Message>;

    /**
     * Timestamp when the task was created, expressed in UTC: YYYY-MM-DDThh:mm:ssZ
     * @type {Date}
     * @memberof Task
     */
    createdAt?: Date;

    /**
     * Timestamp when the task status changed to \"QUEUED\", expressed in UTC: YYYY-MM-DDThh:mm:ssZ
     * @type {Date}
     * @memberof Task
     */
    queuedAt?: Date;

    /**
     * Timestamp when the task status changed to to \"RUNNING\", expressed in UTC: YYYY-MM-DDThh:mm:ssZ
     * @type {Date}
     * @memberof Task
     */
    runningAt?: Date;

    /**
     * Timestamp when the task status changed to \"FINISHED\", expressed in UTC: YYYY-MM-DDThh:mm:ssZ
     * @type {Date}
     * @memberof Task
     */
    finishedAt?: Date;

    /**
     * Timestamp when the task status changed to \"ERROR\", expressed in UTC: YYYY-MM-DDThh:mm:ssZ
     * @type {Date}
     * @memberof Task
     */
    errorAt?: Date;

    /**
     * Additional optional error details
     * @type {ErrorDetails}
     * @memberof Task
     */
    error?: ErrorDetails;

}
