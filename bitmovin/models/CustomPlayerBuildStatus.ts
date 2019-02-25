import Message from './Message';
import Status from './Status';

/**
 * @export
 * @interface CustomPlayerBuildStatus
 */
export default interface CustomPlayerBuildStatus {
    /**
     * Status of the player build
     * @type {Status}
     * @memberof CustomPlayerBuildStatus
     */
    status: Status;

    /**
     * The estimated time span of the custom player build in seconds.
     * @type {number}
     * @memberof CustomPlayerBuildStatus
     */
    eta?: number;

    /**
     * The actual progress of the custom player build.
     * @type {number}
     * @memberof CustomPlayerBuildStatus
     */
    progress: number;

    /**
     * @type {Message}
     * @memberof CustomPlayerBuildStatus
     */
    messages?: Message;

    /**
     * @type {string}
     * @memberof CustomPlayerBuildStatus
     */
    subtasks?: string;

}
