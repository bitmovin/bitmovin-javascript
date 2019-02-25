/**
 * Manifest type to be generated for the Fragmented MP4 Muxing. Only significant if a valid fragmentDuration is passed. If this is not set, Smooth Streaming is assumed.
 * @export
 * @enum {string}
 */
enum FragmentedMp4MuxingManifestType {
    SMOOTH = 'SMOOTH',
    DASH_ON_DEMAND = 'DASH_ON_DEMAND',
    HLS_BYTE_RANGES = 'HLS_BYTE_RANGES',
    NONE = 'NONE',
    HLS_BYTE_RANGES_AND_IFRAME_PLAYLIST = 'HLS_BYTE_RANGES_AND_IFRAME_PLAYLIST'
}

export default FragmentedMp4MuxingManifestType;

