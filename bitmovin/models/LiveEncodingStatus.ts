/**
 * @export
 * @enum {string}
 */
enum LiveEncodingStatus {
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
    WAITING_FOR_FIRST_CONNECT = 'WAITING_FOR_FIRST_CONNECT',
    ERROR = 'ERROR',
    NOT_AVAILABLE = 'NOT_AVAILABLE',
    FINISHED = 'FINISHED'
}

export default LiveEncodingStatus;

