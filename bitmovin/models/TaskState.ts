/**
 * @export
 * @enum {string}
 */
enum TaskState {
    ENQUEUED = 'ENQUEUED',
    ASSIGNED = 'ASSIGNED',
    PREPARED = 'PREPARED',
    INPROGRESS = 'INPROGRESS',
    FINISHED = 'FINISHED',
    ERROR = 'ERROR',
    DEQUEUED = 'DEQUEUED'
}

export default TaskState;

