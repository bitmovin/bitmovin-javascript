/**
 * Subpixel motion estimation and mode decision
 * @export
 * @enum {string}
 */
enum H264SubMe {
    FULLPEL = 'FULLPEL',
    SAD = 'SAD',
    SATD = 'SATD',
    QPEL3 = 'QPEL3',
    QPEL4 = 'QPEL4',
    QPEL5 = 'QPEL5',
    RD_IP = 'RD_IP',
    RD_ALL = 'RD_ALL',
    RD_REF_IP = 'RD_REF_IP',
    RD_REF_ALL = 'RD_REF_ALL',
    QPRD = 'QPRD',
    FULL_RD = 'FULL_RD'
}

export default H264SubMe;

