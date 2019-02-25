import BitmovinResponse from './BitmovinResponse';

/**
 * @export
 * @interface AnalyticsImpressionDetails
 */
export default interface AnalyticsImpressionDetails extends BitmovinResponse {
    /**
     * Is an ad playing. 0 indicates no, 1 indicates yes
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    ad?: number;

    /**
     * Collector version
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    analyticsVersion?: string;

    /**
     * Autonomous System Number inferred from the IP address
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    asn?: number;

    /**
     * Audio Bitrate
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    audioBitrate?: number;

    /**
     * Autoplay enabled
     * @type {boolean}
     * @memberof AnalyticsImpressionDetails
     */
    autoplay?: boolean;

    /**
     * Browser name
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    browser?: string;

    /**
     * Browser version major
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    browserVersionMajor?: string;

    /**
     * Browser version minor
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    browserVersionMinor?: string;

    /**
     * Millisecond the player buffered
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    buffered?: number;

    /**
     * CDN Provider
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    cdnProvider?: string;

    /**
     * City
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    city?: string;

    /**
     * Current time of the client
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    clientTime?: number;

    /**
     * Country
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    country?: string;

    /**
     * Custom user ID
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    customUserId?: string;

    /**
     * Free form data set via the customData1 field in the analytics collector configuration
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    customData1?: string;

    /**
     * Free form data set via the customData2 field in the analytics collector configuration
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    customData2?: string;

    /**
     * Free form data set via the customData3 field in the analytics collector configuration
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    customData3?: string;

    /**
     * Free form data set via the customData4 field in the analytics collector configuration
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    customData4?: string;

    /**
     * Free form data set via the customData5 field in the analytics collector configuration
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    customData5?: string;

    /**
     * Type of the device detected via User Agent
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    deviceType?: string;

    /**
     * Domain the player was loaded on (.www is stripped away)
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    domain?: string;

    /**
     * Time in milliseconds it took the DRM server to respond
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    drmLoadTime?: number;

    /**
     * DRM system used for this impression
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    drmType?: string;

    /**
     * Dropped frames during playback
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    droppedFrames?: number;

    /**
     * Duration of the sample in milliseconds
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    duration?: number;

    /**
     * Error code
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    errorCode?: number;

    /**
     * Error message
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    errorMessage?: string;

    /**
     * A/B test experiment name
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    experimentName?: string;

    /**
     * Random UUID that is used to identify a sessions
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    impressionId: string;

    /**
     * IP Address of the client
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    ipAddress?: string;

    /**
     * Is chromecast active
     * @type {boolean}
     * @memberof AnalyticsImpressionDetails
     */
    isCasting?: boolean;

    /**
     * Is the stream live or VoD
     * @type {boolean}
     * @memberof AnalyticsImpressionDetails
     */
    isLive?: boolean;

    /**
     * Is the player muted
     * @type {boolean}
     * @memberof AnalyticsImpressionDetails
     */
    isMuted?: boolean;

    /**
     * The users Internet Service Provider inferred via the IP address
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    isp?: string;

    /**
     * Language set in the browser
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    language?: string;

    /**
     * Analytics license key
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    licenseKey?: string;

    /**
     * Operating system
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    operatingSystem?: string;

    /**
     * Operating system version major
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    operatingSystemVersionMajor?: string;

    /**
     * Operating system version minor
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    operatingSystemVersionMinor?: string;

    /**
     * Time in milliseconds the page took to load
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    pageLoadTime?: number;

    /**
     * Player load type. 1 = Foreground, 2 = Background
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    pageLoadType?: number;

    /**
     * path on the website
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    path?: string;

    /**
     * Milliseconds the player was paused
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    paused?: number;

    /**
     * Platform the player is running on (web, android, ios)
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    platform?: string;

    /**
     * Milliseconds the player played
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    played?: number;

    /**
     * Video player being used for this session
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    player?: string;

    /**
     * Player license key
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    playerKey?: string;

    /**
     * Time in milliseconds the player took to start up
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    playerStartuptime?: number;

    /**
     * HTML or native playback
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    playerTech?: string;

    /**
     * Player software version
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    playerVersion?: string;

    /**
     * Geographic region (ISO 3166-2 code)
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    region?: string;

    /**
     * Screen as reported by the browser
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    screenHeight?: number;

    /**
     * Screen as reported by the browser
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    screenWidth?: number;

    /**
     * Milliseconds it took the player to seek
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    seeked?: number;

    /**
     * Sequence number of the sample in which it occured in the session
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    sequenceNumber?: number;

    /**
     * Video size (FULLSCREEN or WINDOW)
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    size?: string;

    /**
     * Combination of player- and videoStartuptime
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    startupTime?: number;

    /**
     * Internal state of the analytics state machine
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    state?: string;

    /**
     * Format of the stream (HLS, DASH, Progressive MP4)
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    streamFormat?: string;

    /**
     * Current time in milliseconds
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    time?: number;

    /**
     * ID that is persisted across sessions to identify a browser
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    userId?: string;

    /**
     * Bitrate of the played back video rendition
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    videoBitrate?: number;

    /**
     * Length of the video in milliseconds
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    videoDuration?: number;

    /**
     * ID of the video as configured via the analytics config
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    videoId?: string;

    /**
     * Free form human readable video title as configured in the analytics config
     * @type {string}
     * @memberof AnalyticsImpressionDetails
     */
    videoTitle?: string;

    /**
     * Resolution of the played back Video Rendition
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    videoPlaybackHeight?: number;

    /**
     * Resolution of the played back Video Rendition
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    videoPlaybackWidth?: number;

    /**
     * Time in milliseconds it took to start video playback
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    videoStartupTime?: number;

    /**
     * End time of the sample in the video (milliseconds)
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    videotimeEnd?: number;

    /**
     * Start time of the sample in the video (milliseconds)
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    videotimeStart?: number;

    /**
     * Height of the video player on the page
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    videoWindowHeight?: number;

    /**
     * Width of the video player on the page
     * @type {number}
     * @memberof AnalyticsImpressionDetails
     */
    videoWindowWidth?: number;

}
