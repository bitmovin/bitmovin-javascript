/**
 * The attribute that should be checked
 * @export
 * @enum {string}
 */
enum StreamConditionAttribute {
    MEDIA_TYPE = 'MEDIA_TYPE',
    STREAM_ID = 'STREAM_ID',
    BITS_READ_AVG = 'BITS_READ_AVG',
    BITS_READ_MIN = 'BITS_READ_MIN',
    BITS_READ_MAX = 'BITS_READ_MAX',
    SAMPLES_READ_AVG = 'SAMPLES_READ_AVG',
    SAMPLES_READ_MIN = 'SAMPLES_READ_MIN',
    SAMPLES_READ_MAX = 'SAMPLES_READ_MAX',
    WIDTH = 'WIDTH',
    HEIGHT = 'HEIGHT',
    CODEC = 'CODEC'
}

export default StreamConditionAttribute;

