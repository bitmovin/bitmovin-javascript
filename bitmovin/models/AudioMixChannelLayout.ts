/**
 * Channel layout of this audio mix
 * @export
 * @enum {string}
 */
enum AudioMixChannelLayout {
    NONE = 'NONE',
    CL_MONO = 'CL_MONO',
    CL_STEREO = 'CL_STEREO',
    CL_SURROUND = 'CL_SURROUND',
    CL_QUAD = 'CL_QUAD',
    CL_OCTAGONAL = 'CL_OCTAGONAL',
    CL_HEXAGONAL = 'CL_HEXAGONAL',
    CL_STEREO_DOWNMIX = 'CL_STEREO_DOWNMIX',
    CL_2_1 = 'CL_2_1',
    CL_2_2 = 'CL_2_2',
    CL_3_1 = 'CL_3_1',
    CL_4_0 = 'CL_4_0',
    CL_4_1 = 'CL_4_1',
    CL_5_0 = 'CL_5_0',
    CL_5_1 = 'CL_5_1',
    CL_5_0_BACK = 'CL_5_0_BACK',
    CL_5_1_BACK = 'CL_5_1_BACK',
    CL_6_0 = 'CL_6_0',
    CL_6_0_FRONT = 'CL_6_0_FRONT',
    CL_6_1 = 'CL_6_1',
    CL_6_1_BACK = 'CL_6_1_BACK',
    CL_6_1_FRONT = 'CL_6_1_FRONT',
    CL_7_0 = 'CL_7_0',
    CL_7_0_FRONT = 'CL_7_0_FRONT',
    CL_7_1 = 'CL_7_1',
    CL_7_1_WIDE = 'CL_7_1_WIDE',
    CL_7_1_WIDE_BACK = 'CL_7_1_WIDE_BACK'
}

export default AudioMixChannelLayout;

